import { Injectable, OnModuleInit } from '@nestjs/common';
import { RedisKeyStorageService } from './redis/redis.key-storage.service';
import { SetTextData } from './dto/set-text-data.dto';
import * as crypto from 'crypto'

const GROUP = '223-ZИС'

@Injectable()
export class AppService {
  constructor(
    private readonly keyStorage: RedisKeyStorageService
  ) {}

  public getFontList() {
    return {
        "helvetica": "Helvetica",
        "new_york": "New York",
        "source_code": "Source Code Pro"
    }
  }

  public getDefaultSettings() {
    return {
      "fontFamily": "helvetica",
      "fontSize":   "16",
      "fontStyle":  "normal",
      "fontColor":  "#000000",
    }
  }

  public getUserList() {
    return ['user1', 'user2', 'user3', 'user4', 'user5']
  }

  async setTextData( data: SetTextData ): Promise<string> {
    const key = await this.getKeyTemplate(data.user);

    await this.keyStorage.set(key, JSON.stringify(data.text));

    return 'Success';
  }

  // получение настроек пользователя - с редиса либо дефолтные
  public async getUserSettings(user: string) {
    const uuid = await this.getUserKeyByUsername(user);

    if (!uuid) {
      return this.getDefaultSettings()
    }

    const key = `${GROUP}-${user}-${uuid}`

    const isExists = await this.keyStorage.exists(key);

    if (isExists) {
      return this.keyStorage.get(key);
    } else {
      return this.getDefaultSettings();
    }
  }

  // проверка на существование настроек для пользователя
  private async getUserKeyByUsername(username: string) {
    const key = await this.keyStorage.exists(username);

    if (!key) {
      return;
    }

    return this.keyStorage.get(username);
  }

  //Получение ключа для установки настроек текста
  private async getKeyTemplate(username: string) {
    const uuid = crypto.randomUUID();
    await this.keyStorage.set(username, uuid);
    return `${GROUP}-${username}-${uuid}`;
}
}