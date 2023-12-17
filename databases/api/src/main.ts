import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { MongoService } from './mongo/mongo.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);

  const mongoService = app.get(MongoService);

  try {
    // Проверяем, есть ли данные в базе
    const existingUsers = await mongoService.getAllCustomers();
    const existingProducts = await mongoService.getAllProducts();

    // Если в базе нет пользователей или продуктов, создаем их
    if (existingUsers.length === 0 && existingProducts.length === 0) {
      // Сохраняем пользователей и продукты в базу данных
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
