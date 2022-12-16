import EntityUpdatedEvent from '@domain/shared/event/base-events/entity-updated.event';
import Token from '../model/token';

export default class TokenUpdatedEvent extends EntityUpdatedEvent<Token> {
  constructor(id: string) {
    super(id);
  }
}
