import { Body, Controller, Post } from '@nestjs/common';
import { AuthUseCases } from '../../use-cases/auth/auth.use-cases';
import { SignInDTO, UserProfileDTO } from '../../core/dtos';

@Controller('auth')
export class AuthController {
  constructor(private readonly AuthUseCases: AuthUseCases) {}
  @Post('/signIn')
  async singIn(@Body() data: SignInDTO): Promise<UserProfileDTO> {
    return await this.AuthUseCases.authSignIn(data);
  }
}
