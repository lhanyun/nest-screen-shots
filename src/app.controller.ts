import { Controller, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('screenshot')
  async screenshot(@Body('url') url: string): Promise<string> {
    return this.appService.screenshot(url);
  }
}