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
import { Auth0ErrorResponseDTO } from '../../core/dtos/auth0/errors/auth0-errorResponseDTO';
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
  async getAppAuth0Token(): Promise<
    Auth0LoginResponseDTO | Auth0ErrorResponseDTO
  > {
    const data = {
      client_id: this.authClientID,
      client_secret: this.authSecret,
      audience: this.authAudience,
      grant_type: 'client_credentials',
    } satisfies Auth0LoginDTO;
    return await axios.post(`${this.auth0URL}/oauth/token`, data);
  }
  async createAuthUser(
    authUserCreateDTO: Auth0UserCreateDTO,
    token: string,
  ): Promise<Auth0UserCreateResponseDTO> {
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };
    return await axios.post(
      `${this.auth0URL}/api/v2/users`,
      authUserCreateDTO,
      options,
    );
  }
  async getAppUserAuth0Token(
    username: string,
    password: string,
  ): Promise<Auth0LoginResponseDTO | Auth0ErrorResponseDTO> {
    const data = {
      client_id: this.authClientID,
      client_secret: this.authSecret,
      audience: this.authAudience,
      grant_type: 'password',
      username,
      password,
    } satisfies Auth0LoginDTO;
    return await axios.post(`${this.auth0URL}/oauth/token`, data);
  }
}
