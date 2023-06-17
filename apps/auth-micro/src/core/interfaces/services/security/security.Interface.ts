import {
  Auth0ErrorResponseDTO,
  Auth0LoginResponseDTO,
  Auth0UserCreateDTO,
  Auth0UserCreateResponseDTO,
} from '../../../dtos/auth0';

export interface ISecurityService {
  getAppAuth0Token(): Promise<Auth0LoginResponseDTO | Auth0ErrorResponseDTO>;
  createAuthUser(
    authUserCreateDTO: Auth0UserCreateDTO,
    token: string,
  ): Promise<Auth0UserCreateResponseDTO | Auth0ErrorResponseDTO>;
}
