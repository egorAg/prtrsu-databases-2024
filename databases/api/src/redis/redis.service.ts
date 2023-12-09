import { Injectable } from '@nestjs/common';
import { createClient, RedisClientType } from 'redis';

@Injectable()
export class RedisService {
  private _client: RedisClientType;
  public async client() {
    if (this._client?.isOpen) {
      return this._client;
    } else {
      this._client = createClient({
        socket: {
          host: '127.0.0.1',
          port: 6379,
        },
        password: 'qweQWE123!',
      });

      await this._client.connect();

      return this._client;
    }
  }
}
