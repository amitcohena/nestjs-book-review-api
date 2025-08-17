import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable global validation
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,            // Strip properties that are not explicitly allowed in DTOs
    forbidNonWhitelisted: true, // Throw an error if non-allowed properties are provided
    transform: true,            // Automatically transform payloads to match DTO types
  }));

  await app.listen(3000);
  console.log('Server running on http://localhost:3000');
}
bootstrap();
