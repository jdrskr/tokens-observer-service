import { IBusinessRule } from '@domain/shared/rule/business-rule';

export default class TokenAddressMustBeValidRule implements IBusinessRule {
  private readonly address: string;

  constructor(address: string) {
    this.address = address;
  }
  errorMessage = `Token address must be not empty.`;

  isValid(): boolean {
    return !!this.address;
  }
}
