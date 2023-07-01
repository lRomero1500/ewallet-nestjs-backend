import { Injectable } from '@nestjs/common';
import {
  Auth0ErrorResponseDTO,
  Auth0LoginDTO,
  Auth0LoginResponseDTO,
  Auth0UserCreateDTO,
  Auth0UserCreateResponseDTO,
  RawKeyDTO,
  UserValidateTokenResponseDTO,
} from '../../core/dtos';
import axios from 'axios';
import * as jwt from 'jsonwebtoken';
import * as jose from 'node-jose';
import { ConfigService } from '@nestjs/config';
import { IAuth0Service } from '../../core/interfaces';
import * as moment from 'moment';
@Injectable()
export class Auth0Service implements IAuth0Service {
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
    return (await axios.post(`${this.auth0URL}/oauth/token`, data)).data;
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
    return (
      await axios.post(
        `${this.auth0URL}/api/v2/users`,
        authUserCreateDTO,
        options,
      )
    ).data;
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
    return (await axios.post(`${this.auth0URL}/oauth/token`, data)).data;
  }
  async validateAuth0Token(
    token: string,
  ): Promise<UserValidateTokenResponseDTO> {
    try {
      const result: any = jwt.decode(token, { complete: true });

      const signatureUrl = `${this.auth0URL}/.well-known/jwks.json`;

      const jwksResponse = await axios.get(signatureUrl);

      const jwks = jwksResponse?.data?.keys;

      const relevantKey = jwks.filter(
        (jk: RawKeyDTO) => jk.kid === result?.header?.kid,
      );

      const key = await jose.JWK.asKey(relevantKey[0]);

      const joseResult = await jose.JWS.createVerify(key).verify(token);

      if (joseResult && Object.keys(joseResult).length > 0) {
        const d = new Date(0); // The 0 there is the key, which sets the date to the epoch
        d.setUTCSeconds(result?.payload?.exp);
        const expired = moment(d).diff(moment(), 'hours') <= 0;
        if (expired) {
          return {
            isValid: false,
            error: 'Expired',
          } satisfies UserValidateTokenResponseDTO;
        } else {
          return {
            isValid: true,
            userId: result?.payload?.sub,
          } satisfies UserValidateTokenResponseDTO;
        }
      }
      return { isValid: false };
    } catch (error) {
      return { isValid: false };
    }
  }
}
