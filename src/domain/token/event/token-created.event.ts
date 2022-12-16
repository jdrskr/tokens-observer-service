import EntityCreatedEvent from '@domain/shared/event/base-events/entity-created.event';
import Token from '../model/token';

export default class TokenCreatedEvent extends EntityCreatedEvent<Token> {
  constructor(id: string) {
    super(id);
  }
}
