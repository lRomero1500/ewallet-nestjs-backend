import { Controller } from '@nestjs/common';
import { UserUseCases } from '../../use-cases';
import { MessagePattern, Payload, Transport } from '@nestjs/microservices';
import { UserProfileDTO } from '../../core';

@Controller('user')
export class UserController {
  constructor(private readonly userUseCases: UserUseCases) {}

  @MessagePattern({ cmd: 'get_profile_information' }, Transport.TCP)
  async handleGetProfileInformation(
    @Payload() email: string,
  ): Promise<UserProfileDTO> {
    return await this.userUseCases.getUserProfile(email);
  }
  @MessagePattern({ cmd: 'get_profile_information_by_id' }, Transport.TCP)
  async handleGetProfileInformationById(
    @Payload() userId: string,
  ): Promise<UserProfileDTO> {
    return await this.userUseCases.getUserProfileById(userId);
  }
}
