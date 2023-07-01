import {
  Auth0ErrorResponseDTO,
  Auth0LoginResponseDTO,
  Auth0UserCreateDTO,
  Auth0UserCreateResponseDTO,
} from '../../../dtos/auth0';
import { UserValidateTokenResponseDTO } from '../../../dtos/user/user-validate-token-response.dto';

export interface IAuth0Service {
  getAppAuth0Token(): Promise<Auth0LoginResponseDTO | Auth0ErrorResponseDTO>;
  createAuthUser(
    authUserCreateDTO: Auth0UserCreateDTO,
    token: string,
  ): Promise<Auth0UserCreateResponseDTO | Auth0ErrorResponseDTO>;
  getAppUserAuth0Token(
    username: string,
    password: string,
  ): Promise<Auth0LoginResponseDTO | Auth0ErrorResponseDTO>;
  validateAuth0Token(token: string): Promise<UserValidateTokenResponseDTO>;
}
