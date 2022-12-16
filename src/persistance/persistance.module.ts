import { Module } from '@nestjs/common';
import { TokenRepository } from './token/token.repository';

const repositories = [TokenRepository];

@Module({
  providers: [...repositories],
  exports: [...repositories],
})
export class PersistanceModule {}
