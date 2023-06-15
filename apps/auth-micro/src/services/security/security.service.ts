import { Injectable } from '@nestjs/common';
import { ISecurityService } from '../../core/interfaces';
import {
  Auth0LoginDTO,
  Auth0LoginResponseDTO,
  Auth0UserCreateDTO,
  Auth0UserCreateResponseDTO,
} from '../../core/dtos';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class SecurityService implements ISecurityService {
  private readonly auth0URL: string;
  private readonly authClientID: string;
  private readonly authSecret: string;
  private readonly authAudience: string;
  constructor(private readonly configService: ConfigService) {
    this.auth0URL = this.configService.get<string>('auth0.host') as string;
    this.authClientID = this.configService.get<string>('auth0.clId') as string;
    this.authSecret = this.configService.get<string>('auth0.secret') as string;
    this.authAudience = this.configService.get<string>('auth0.audi') as string;
  }
  async getAppAuth0Token(
    authLoginDTO: Auth0LoginDTO,
  ): Promise<Auth0LoginResponseDTO> {
    return axios.post(`${this.auth0URL}/oauth/token`);
  }
  createAuthUser(
    authUserCreateDTO: Auth0UserCreateDTO,
  ): Promise<Auth0UserCreateResponseDTO> {
    throw new Error('Method not implemented.');
  }
}
