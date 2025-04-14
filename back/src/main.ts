import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT || 3000;
  const FRONTEND_URL = process.env.FRONTEND_URL;

  app.use(cookieParser());

  const config = new DocumentBuilder()
    .setTitle('Users management')
    .setDescription('Users management`s API docs')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('docs', app, document);

  app.enableCors({
    origin: FRONTEND_URL,
    credentials: true,
  });
  await app.listen(PORT, () =>
    console.log(`Running API in mode ${process.env.NODE_ENV} on port: ${PORT}`),
  );
}

bootstrap();
