import { IBusinessRule } from '@domain/shared/rule/business-rule';

export default class TokenNameMustBeValidRule implements IBusinessRule {
  private readonly name: string;

  constructor(name: string) {
    this.name = name;
  }
  errorMessage = `Token name must be not empty.`;

  isValid(): boolean {
    return !!this.name;
  }
}
