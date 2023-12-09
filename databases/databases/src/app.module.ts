import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RedisService } from './redis/redis.service';
import { RedisKeyStorageService } from './redis/redis.key-storage.service';

@Module({
  controllers: [AppController],
  providers: [AppService, RedisService, RedisKeyStorageService],
})
export class AppModule {}
