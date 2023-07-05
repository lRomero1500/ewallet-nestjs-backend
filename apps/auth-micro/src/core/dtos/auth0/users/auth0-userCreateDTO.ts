export class Auth0UserCreateDTO {
  email: string;
  blocked: boolean;
  email_verified: boolean;
  given_name: string;
  family_name: string;
  name: string;
  picture: string;
  user_id: string;
  connection: string;
  password: string;
  verify_email: boolean;
}
