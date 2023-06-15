import {
  Auth0LoginDTO,
  Auth0LoginResponseDTO,
  Auth0UserCreateDTO,
  Auth0UserCreateResponseDTO,
} from '../../../dtos/auth0';

export interface ISecurityService {
  getAppAuth0Token(authLoginDTO: Auth0LoginDTO): Promise<Auth0LoginResponseDTO>;
  createAuthUser(
    authUserCreateDTO: Auth0UserCreateDTO,
  ): Promise<Auth0UserCreateResponseDTO>;
}
