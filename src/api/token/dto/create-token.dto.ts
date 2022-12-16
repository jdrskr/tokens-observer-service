import { ChainEnum } from '@domain/index';

export interface CreateTokenDto {
  name: string;
  symbol: string;
  address: string;
  chain: ChainEnum;
  updateContinuously?: boolean;
}
