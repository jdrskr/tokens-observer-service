import EntityBase from '@domain/shared/entity/entity-base';

import EntityCreatedEvent from './entity-created.event';
import EntityUpdatedEvent from './entity-updated.event';
import EntityDeletedEvent from './entity-deleted.event';

export default interface BaseEntityEventFactory<
  TEntity extends EntityBase<any>,
  TKeyA = TEntity extends EntityBase<infer U> ? U : never,
> {
  entityCreatedEvent(id: TKeyA): EntityCreatedEvent<TEntity>;
  entityUpdatedEvent(id: TKeyA): EntityUpdatedEvent<TEntity>;
  entityDeletedEvent(id: TKeyA): EntityDeletedEvent<TEntity>;
}
