import { Module } from '@nestjs/common';
import { ServiceModule } from '@service/service.module';
import { TokenController } from './token.controller';
import { TokenService } from './token.service';

@Module({
  imports: [ServiceModule],
  providers: [TokenService],
  controllers: [TokenController],
})
export class TokenModule {}
