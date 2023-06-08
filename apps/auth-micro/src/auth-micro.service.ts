import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthMicroService {
  getHello(): string {
    return 'Hello World!';
  }
}
