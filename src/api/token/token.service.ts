import { ChainEnum, Token } from '@domain';
import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateTokenCommand } from '@service/index';

@Injectable()
export class TokenService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly querybus: QueryBus,
  ) {}

  async create(
    name: string,
    symbol: string,
    address: string,
    chain: ChainEnum,
    updateContinuously = true,
  ): Promise<Token> {
    const command = new CreateTokenCommand(
      name,
      symbol,
      address,
      chain,
      updateContinuously,
    );

    return this.commandBus.execute(command);
  }
}
