import { Module } from '@nestjs/common';
import { ServiceModule } from '@service/service.module';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';

@Module({
  imports: [ServiceModule],
  controllers: [ApiController],
  providers: [ApiService],
})
export class AppModule {}
