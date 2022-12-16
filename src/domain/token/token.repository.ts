import { IRepository } from '@domain/shared/repository/repository';
import Token from './model/token';

export default interface ITokenRepository extends IRepository<Token> {
  findAll(): Promise<Token[]>;
}
