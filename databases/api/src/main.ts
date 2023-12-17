import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { MongoStartService } from './mongo/mongo.start.service';
import mongoose from 'mongoose';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Accept');
    next();
  });

  app.enableCors({
    allowedHeaders: '*',
    origin: '*',
  });

  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);

  mongoose.set('debug', (collectionName, method, query, doc) => {
    Logger.debug(`${collectionName}.${method}`, JSON.stringify(query), doc);
  });

  const mongoService = app.get(MongoStartService);

  try {
    const existingUsers = await mongoService.getAllCustomersAtStart();
    const existingProducts = await mongoService.getAllProductsAtStart();

    if (existingUsers.length === 0 && existingProducts.length === 0) {
      await mongoService.createUsers();
      await mongoService.createProducts();
      console.log('Инициализация данных завершена.');
    } else {
      console.log('Данные уже существуют в базе.');
    }
  } catch (error) {
    console.error('Ошибка инициализации данных:', error);
  }
}
bootstrap();
