import { Entity, PrimaryKey } from '@mikro-orm/core';
import IDomainEvent from '../event/domain.event';
import { IBusinessRule } from '../rule/business-rule';

@Entity({
  abstract: true,
})
export default abstract class EntityBase<TKey> {
  @PrimaryKey()
  public id: TKey;

  public domainEvents: IDomainEvent[] = [];
  public domainEventsAsync: IDomainEvent[] = [];

  addDomainEvent(event: IDomainEvent) {
    this.domainEvents.push(event);
  }
  addAsyncDomainEvent(event: IDomainEvent) {
    this.domainEventsAsync.push(event);
  }

  Validate(buisnessRule: IBusinessRule) {
    if (!buisnessRule.isValid()) {
      throw new Error(buisnessRule.errorMessage);
    }
  }
}
