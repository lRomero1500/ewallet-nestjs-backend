import { Body, Controller, Post } from '@nestjs/common';
import { SignInDTO, UserProfileDTO } from '../../core/dtos';
import { AuthUseCases } from '../../use-cases';

@Controller('auth')
export class AuthController {
  constructor(private readonly authUseCases: AuthUseCases) {}
  @Post('/signIn')
  async singIn(@Body() data: SignInDTO): Promise<UserProfileDTO> {
    return await this.authUseCases.authSignIn(data);
  }
}
