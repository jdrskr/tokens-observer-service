import {
  AnyEntity,
  EntityManager,
  EntityRepository,
  FilterQuery,
  Populate,
} from '@mikro-orm/core';
import { EventBus } from '@nestjs/cqrs';
import EntityBase from '../entity/entity-base';
import BaseEntityEventFactory from '../event/base-events/entity-event.factory';
import { IUnitOfWork, UnitOfWork } from './unit-of-work';

export interface IRepository<
  TEntity extends EntityBase<TKey>,
  TKey = TEntity extends EntityBase<infer U> ? U : never,
> {
  UnitOfWork: IUnitOfWork;
  findById(id: TKey): Promise<TEntity>;
  findByCriteria<P extends Populate<TEntity> = Populate<TEntity>>(
    query: FilterQuery<TEntity>,
    populate?: P,
  ): Promise<TEntity[]>;
  findByCriteriaPaginated<P extends Populate<TEntity> = Populate<TEntity>>(
    query: FilterQuery<TEntity>,
    pagination: {
      limit: number;
      offset: number;
    },
    populate?: P,
  ): Promise<[TEntity[], number]>;
  add(item: TEntity): Promise<TEntity>;
  update(item: TEntity): Promise<TEntity>;
  // eslint-disable-next-line @typescript-eslint/ban-types
  delete(item: TEntity): Promise<{}>;
}

// eslint-disable-next-line @typescript-eslint/ban-types
declare type EntityClass<T extends AnyEntity<T>> = Function & {
  prototype: T;
};

export abstract class Repository<
  TEntity extends EntityBase<any>,
  TEntityClass extends EntityClass<TEntity> = EntityClass<TEntity>,
  TKey = TEntity extends EntityBase<infer U> ? U : never,
> implements IRepository<TEntity, TKey>
{
  protected repository: EntityRepository<TEntity>;
  constructor(
    private em: EntityManager,
    private entityType: TEntityClass,
    private eventBus?: EventBus,
    private eventFactory?: BaseEntityEventFactory<TEntity>,
  ) {
    this.repository = em.getRepository(entityType);
    this.UnitOfWork = new UnitOfWork(em, eventBus);
  }
  UnitOfWork: IUnitOfWork;

  findById(id: TKey) {
    // ???
    return this.repository.findOne(id as any);
  }

  async findByCriteria<P extends Populate<TEntity> = Populate<TEntity>>(
    query: FilterQuery<TEntity>,
    populate: P = undefined,
  ) {
    return this.repository.find(query, { populate });
  }
  async findByCriteriaPaginated<
    P extends Populate<TEntity> = Populate<TEntity>,
  >(
    query: FilterQuery<TEntity>,
    pagination: { limit: number; offset: number },
    populate?: P,
  ): Promise<[TEntity[], number]> {
    const result = this.repository.findAndCount(query, { populate });
    return result;
  }

  async add(item: TEntity): Promise<TEntity> {
    await this.repository.persist(item);
    if (this.eventFactory) {
      item.addDomainEvent(this.eventFactory.entityCreatedEvent(item.id));
    }
    return item;
  }
  async update(item: TEntity): Promise<TEntity> {
    if (this.eventFactory) {
      item.addDomainEvent(this.eventFactory.entityUpdatedEvent(item.id));
    }
    return this.repository.merge(item);
  }
  async delete(item: TEntity) {
    if (this.eventFactory) {
      item.addDomainEvent(this.eventFactory.entityDeletedEvent(item.id));
    }
    return this.repository.remove(item);
  }
}
