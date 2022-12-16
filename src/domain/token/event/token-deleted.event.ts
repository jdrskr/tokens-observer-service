import EntityDeletedEvent from '@domain/shared/event/base-events/entity-deleted.event';
import Token from '../model/token';

export default class TokenDeletedEvent extends EntityDeletedEvent<Token> {
  constructor(id: string) {
    super(id);
  }
}
