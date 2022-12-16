import { Module } from '@nestjs/common';
import { PersistanceModule } from '@persistance/persistance.module';

import CreateTokenCommandHandler from './command/create-token/create-token.command.handler';

const commandHandlers = [CreateTokenCommandHandler];

const queryHandlers = [];

@Module({
  imports: [PersistanceModule],
  providers: [...queryHandlers, ...commandHandlers],
  exports: [...queryHandlers, ...commandHandlers],
})
export class TokenModule {}
