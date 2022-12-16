import { MikroORM } from '@mikro-orm/core';
import { OnApplicationBootstrap } from '@nestjs/common';
import { Module } from '@nestjs/common';
import { CoreModule } from './core/core.module';
import { TokenModule } from './token/token.module';

@Module({
  imports: [CoreModule, TokenModule],
})
export class ApiModule implements OnApplicationBootstrap {
  constructor(private readonly mikroOrm: MikroORM) {}

  async onApplicationBootstrap() {
    await this.mikroOrm.getMigrator().up();
  }
}
