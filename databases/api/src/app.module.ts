import { Module } from '@nestjs/common';
import { RedisController } from './redis/redis.controller';
import { AppService } from './app.service';
import { RedisService } from './redis/redis.service';
import { RedisKeyStorageService } from './redis/redis.key-storage.service';
import { MongoModule } from './mongo/mongo.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  controllers: [RedisController],
  providers: [AppService, RedisService, RedisKeyStorageService],
  imports: [
    MongoModule,
    MongooseModule.forRoot('mongodb://root:example@localhost:27017/'),
  ],
})
export class AppModule {}
