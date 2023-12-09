import { Injectable } from '@nestjs/common';
import { RedisService } from './redis.service';

@Injectable()
export class RedisKeyStorageService {
  connector = new RedisService();

  public async get(key: string) {
    const redis = await this.connector.client();
    return redis.get(key);
  }

  public async set(key: string, value: string, expiredAfter?: number) {
    const redis = await this.connector.client();
    await redis.set(key, value);
    if (expiredAfter) {
      await redis.expire(key, expiredAfter);
    }
  }

  public async delete(key: string): Promise<void> {
    const redis = await this.connector.client();
    await redis.del(key);
  }

  public async exists(key: string): Promise<boolean> {
    const redis = await this.connector.client();
    return (await redis.exists(key)) === 1;
  }

  async ttl(key: string): Promise<number> {
    const redis = await this.connector.client();
    return redis.ttl(key);
  }

  async expire(key: string, after: number): Promise<boolean> {
    const redis = await this.connector.client();
    return redis.expire(key, after);
  }
}
