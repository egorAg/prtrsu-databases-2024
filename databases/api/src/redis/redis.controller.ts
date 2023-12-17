import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from '../app.service';
import { SetTextData } from '../dto/set-text-data.dto';
import { GetTextData } from '../dto/get-text-data.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Routes } from '../global/routes';

@Controller('redis-connector')
@ApiTags('Redis')
export class RedisController {
  constructor(private readonly appService: AppService) {}

  @ApiOkResponse({
    status: 200,
    schema: {
      example: 'Success',
    },
  })
  @Post(Routes.Redis.SET_TEXT_DATA)
  setText(@Body() data: SetTextData): any {
    return this.appService.setTextData(data);
  }

  @ApiOkResponse({
    status: 200,
    schema: {
      properties: {
        fontFamily: {
          example: 'Helvetica',
          enum: ['Helvetica', 'New York', 'Source Code Pro'],
        },
        fontSize: {
          example: 16,
          minimum: 1,
          maximum: 512,
        },
        fontStyle: {
          example: 'semi-bold',
        },
        fontColor: { example: '#000000' },
      },
    },
  })
  @Post(Routes.Redis.GET_TEXT_DATA)
  getUserSettings(@Body() data: GetTextData): any {
    return this.appService.getUserSettings(data.usename);
  }

  @ApiOkResponse({
    status: 200,
    schema: {
      example: 'user1',
      enum: ['user1', 'user2', 'user3', 'user4', 'user5'],
    },
  })
  @Get(Routes.Redis.GET_USERS)
  getUsers(): any {
    return this.appService.getUserList();
  }

  @ApiOkResponse({
    status: 200,
    schema: {
      example: 'Иди нахуй',
    },
  })
  @Get(Routes.Redis.GET_FONTS)
  getFonts(): any {
    return this.appService.getFontList;
  }
}
