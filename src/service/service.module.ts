import { Module } from '@nestjs/common';
import { TokenModule } from './token/token.module';

const modules = [TokenModule];

@Module({
  imports: [...modules],
  exports: [...modules],
})
export class ServiceModule {}
