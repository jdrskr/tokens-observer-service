import EntityBase from '@domain/shared/entity/entity-base';
import { Entity, Enum, PrimaryKey, Property } from '@mikro-orm/core';
import TokenAddressMustBeValidRule from '../rules/token-address-must-be-valid.rule';
import TokenChainMustBeValidRule from '../rules/token-chain-must-be-valid.rule';
import TokenNameMustBeValidRule from '../rules/token-name-must-be-valid';
import TokenSymbolMustBeValidRule from '../rules/token-symbol-must-be-valid';

export enum ChainEnum {
  ETHEREUM = 'ethereum',
}

export interface TokenAttributes {
  id: string;
  name: string;
  symbol: string;
  address: string;
  chain: ChainEnum;
  updateContinuously?: boolean;
}

@Entity({ tableName: 'token' })
export default class Token extends EntityBase<string> {
  @PrimaryKey({ type: 'uuid', defaultRaw: 'uuid_generate_v4()' })
  public declare id: string;

  @Property()
  public readonly name: string;

  @Property()
  public readonly symbol: string;

  @Enum({ items: () => ChainEnum })
  public readonly chain: ChainEnum;

  @Property({ unique: true })
  public readonly address: string;

  @Property()
  public readonly updateContinuously: boolean = true;

  @Property()
  public readonly createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  public readonly updatedAt: Date = new Date();

  private constructor(attributes: TokenAttributes) {
    super();

    this.Validate(new TokenAddressMustBeValidRule(attributes.address));
    this.Validate(new TokenNameMustBeValidRule(attributes.name));
    this.Validate(new TokenSymbolMustBeValidRule(attributes.symbol));
    this.Validate(new TokenChainMustBeValidRule(attributes.chain));

    this.id = attributes.id;
    this.name = attributes.name;
    this.symbol = attributes.symbol;
    this.address = attributes.address;
    this.chain = attributes.chain;

    if (attributes.updateContinuously !== undefined) {
      this.updateContinuously = attributes.updateContinuously;
    }
  }

  public static create(attributes: TokenAttributes): Token {
    return new Token(attributes);
  }
}
