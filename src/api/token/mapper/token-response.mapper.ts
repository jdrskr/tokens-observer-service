import { Token } from '@domain/index';
import { TokenResponseDto } from '../dto/token-response.dto';

export const mapper = (token: Token): TokenResponseDto => {
  return {
    id: token.id,
    name: token.name,
    symbol: token.symbol,
  };
};
