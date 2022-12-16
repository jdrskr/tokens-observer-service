import { Module } from '@nestjs/common';
import { PersistanceModule } from '@persistance/persistance.module';

@Module({
  imports: [PersistanceModule],
})
export class ServiceModule {}
