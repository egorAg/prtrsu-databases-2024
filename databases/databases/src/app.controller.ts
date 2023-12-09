import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { SetTextData } from './dto/set-text-data.dto';
import { GetTextData } from './dto/get-text-data.dto';

@Controller('redis-connector')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('set-text-data')
  setText( @Body() data: SetTextData ): any {
    return this.appService.setTextData( data );
  }

  @Post('get-text-data')
  setUser( @Body() data: GetTextData ): any {
    return this.appService.getUserSettings( data.usename );
  }

  @Get('get-users')
  getText(): any {
    return this.appService.getUserList()
  }

  @Get('get-fonts')
  getFonts(): any {
    return this.appService.getFontList
  }
}
