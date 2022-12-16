import { EntityManager } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { Token, TokenEventFactory } from '@domain';
import { Repository } from '@domain/shared/repository/repository';
import ITokenRepository from '@domain/token/token.repository';

@Injectable()
export class TokenRepository
  extends Repository<Token>
  implements ITokenRepository
{
  constructor(entityManager: EntityManager, eventBus: EventBus) {
    super(entityManager, Token, eventBus, new TokenEventFactory());
  }

  async findAll(): Promise<Token[]> {
    return await this.repository.findAll();
  }
}
