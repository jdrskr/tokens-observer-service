import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { v4 as uuid } from 'uuid';
import { Token } from '@domain';
import { TokenRepository } from '@persistance/token/token.repository';

import CreateTokenCommand from './create-token.command';
import { Result, ok, err, GeneralError } from '@shared/typings/result';
import { Logger } from '@nestjs/common';

@CommandHandler(CreateTokenCommand)
export default class CreateTokenCommandHandler
  implements ICommandHandler<CreateTokenCommand>
{
  private static readonly LOGGER = new Logger(CreateTokenCommandHandler.name);
  constructor(private readonly tokenRepository: TokenRepository) {}

  async execute(command: CreateTokenCommand): Promise<Result<Token>> {
    try {
      const token = Token.create({ id: uuid(), ...command });

      const entity = await this.tokenRepository.add(token);

      return ok(entity);
    } catch (e) {
      CreateTokenCommandHandler.LOGGER.error(e.message);

      return err(new GeneralError(e.message));
    }
  }
}
