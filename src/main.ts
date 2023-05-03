import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
async function bootstrap() {
  const logger = new Logger(bootstrap.name);
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const port = configService.get('PORT');
  const options = new DocumentBuilder()
    .setTitle('News API')
    .setVersion('0.0.1')
    .addBearerAuth()
    .setDescription(
      `News APIs. 
       Base url: http://localhost:9000`,
    )
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/docs', app, document);
  await app.listen(port);
  logger.log(`Server is up and running on http://localhost:${port}`);
}
bootstrap();
