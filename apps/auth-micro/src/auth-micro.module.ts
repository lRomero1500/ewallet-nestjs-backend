import { Module } from '@nestjs/common';
import { AuthMicroController } from './auth-micro.controller';
import { AuthMicroService } from './auth-micro.service';

@Module({
  imports: [],
  controllers: [AuthMicroController],
  providers: [AuthMicroService],
})
export class AuthMicroModule {}
