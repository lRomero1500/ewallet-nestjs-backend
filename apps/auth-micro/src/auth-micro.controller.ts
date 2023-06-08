import { Controller, Get } from '@nestjs/common';
import { AuthMicroService } from './auth-micro.service';

@Controller()
export class AuthMicroController {
  constructor(private readonly authMicroService: AuthMicroService) {}

  @Get()
  getHello(): string {
    return this.authMicroService.getHello();
  }
}
