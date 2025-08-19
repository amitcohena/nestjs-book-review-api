import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'; // Swagger imports
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable global validation
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,            // Strip properties that are not explicitly allowed in DTOs
    forbidNonWhitelisted: true, // Throw an error if non-allowed properties are provided
    transform: true,            // Automatically transform payloads to match DTO types
    transformOptions: { enableImplicitConversion: true }, // Converts "2024" (string) to 2024 (number) using the DTO types
  }));

  // Swagger setup
  const config = new DocumentBuilder()
    .setTitle('Book Review API')
    .setDescription('Simple NestJS server that provides a REST API for managing books and user-submitted reviews')
    .setVersion('1.0.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document); // UI at http://localhost:3000/docs

  await app.listen(3000);
  console.log('Server running on http://localhost:3000');
  console.log('Swagger docs at http://localhost:3000/docs');
}
bootstrap();
