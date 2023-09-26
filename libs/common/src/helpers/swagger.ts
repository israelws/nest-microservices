import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const swagger = (
  app: INestApplication,
  title?: string,
  description?: string,
  version?: string,
  tag?: string,
) => {
  const config = new DocumentBuilder()
    .setTitle(title || 'NestJS Microservices')
    .setDescription(description || 'NestJS Microservices')
    .setVersion(version || '1.0')
    .addTag(tag || 'nestjs')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
};
