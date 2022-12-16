import EntityCreatedEvent from '@domain/shared/event/base-events/entity-created.event';
import EntityUpdatedEvent from '@domain/shared/event/base-events/entity-updated.event';
import EntityDeletedEvent from '@domain/shared/event/base-events/entity-deleted.event';
import BaseEntityEventFactory from '@domain/shared/event/base-events/entity-event.factory';

import TokenCreatedEvent from './token-created.event';
import TokenDeletedEvent from './token-deleted.event';
import TokenUpdatedEvent from './token-updated.event';
import Token from '../model/token';

export default class TokenEventFactory
  implements BaseEntityEventFactory<Token>
{
  entityCreatedEvent(id: string): EntityCreatedEvent<Token> {
    return new TokenCreatedEvent(id);
  }
  entityUpdatedEvent(id: string): EntityUpdatedEvent<Token> {
    return new TokenUpdatedEvent(id);
  }
  entityDeletedEvent(id: string): EntityDeletedEvent<Token> {
    return new TokenDeletedEvent(id);
  }
}
