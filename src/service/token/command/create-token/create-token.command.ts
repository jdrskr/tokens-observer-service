import { ChainEnum } from '@domain';

export default class CreateTokenCommand {
  constructor(
    public readonly name: string,
    public readonly symbol: string,
    public readonly address: string,
    public readonly chain: ChainEnum,
    public readonly updateContinuously = true,
  ) {}
}
