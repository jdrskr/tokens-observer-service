import { IBusinessRule } from '@domain/shared/rule/business-rule';

export default class TokenSymbolMustBeValidRule implements IBusinessRule {
  private readonly symbol: string;

  constructor(symbol: string) {
    this.symbol = symbol;
  }
  errorMessage = `Token symbol must be not empty.`;

  isValid(): boolean {
    return !!this.symbol;
  }
}
