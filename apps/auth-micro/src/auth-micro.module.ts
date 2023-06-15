import { Module } from '@nestjs/common';
import { SecurityService } from './services/security/security.service';

@Module({
  imports: [],
  controllers: [],
  providers: [SecurityService],
})
export class AuthMicroModule {}
