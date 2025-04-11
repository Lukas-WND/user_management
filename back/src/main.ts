import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT || 3000;
  const FRONT_ORIGIN = process.env.FRONTEND_ORIGIN;
  const FRONT_PORT = process.env.FRONT_PORT;

  app.use(cookieParser());

  const config = new DocumentBuilder()
    .setTitle('Users management')
    .setDescription('Users management`s API docs')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('docs', app, document);

  app.enableCors({
    origin: `http://${FRONT_ORIGIN}:${FRONT_PORT}`,
    credentials: true,
  });
  await app.listen(PORT, () =>
    console.log(`Running API in mode ${process.env.NODE_ENV} on port: ${PORT}`),
  );
}

bootstrap();
