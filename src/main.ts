import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ApiModule } from './api/api.module';

async function bootstrap() {
  const app = await NestFactory.create(ApiModule);

  const config = new DocumentBuilder()
    .setTitle('Token Observer Service')
    .setDescription('The token observer service API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('public/api', app, document);

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  await app.listen(3000);
}
bootstrap();
