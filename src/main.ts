import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      //Makes sure that the incoming request doesn't have extraneous properties that we aren't using
      //It will strip out the extra properties before sending the request
      //It is a security concern so people can't pass in additional properties and gain access or privileges they aren't allowed to have
      whitelist: true,
    }),
  )
  await app.listen(3000);
}
bootstrap();
