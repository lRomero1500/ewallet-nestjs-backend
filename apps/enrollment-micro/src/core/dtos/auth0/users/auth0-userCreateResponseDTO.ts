import { Auth0UserCreateIdentityResponseDTO } from './auth0-userCreateIdentityResponseDTO';

export class Auth0UserCreateResponseDTO {
  blocked: boolean;
  created_at: Date;
  email: string;
  email_verified: boolean;
  family_name: string;
  given_name: string;
  identities: Auth0UserCreateIdentityResponseDTO[];
  name: string;
  picture: string;
  updated_at: Date;
  user_id: string;
}
