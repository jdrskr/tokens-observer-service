import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { v4 as uuid } from 'uuid';
import { Token } from '@domain';
import { TokenRepository } from '@persistance/token/token.repository';

import CreateTokenCommand from './create-token.command';

@CommandHandler(CreateTokenCommand)
export default class CreateTokenCommandHandler
  implements ICommandHandler<CreateTokenCommand>
{
  constructor(private readonly tokenRepository: TokenRepository) {}

  async execute(command: CreateTokenCommand): Promise<Token> {
    const token = Token.create({ id: uuid(), ...command });

    const entity = await this.tokenRepository.add(token);

    return entity;
  }
}
