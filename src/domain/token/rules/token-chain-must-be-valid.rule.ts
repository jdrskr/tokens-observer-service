import { IBusinessRule } from '@domain/shared/rule/business-rule';
import { ChainEnum } from '../model/token';

export default class TokenChainMustBeValidRule implements IBusinessRule {
  private readonly chain: ChainEnum;

  constructor(symbol: ChainEnum) {
    this.chain = symbol;
  }
  errorMessage = `Token chain must be not empty.`;

  isValid(): boolean {
    return !!this.chain;
  }
}
