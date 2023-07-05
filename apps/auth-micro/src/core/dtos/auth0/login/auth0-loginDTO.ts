export class Auth0LoginDTO {
  client_id: string;
  client_secret: string;
  audience: string;
  grant_type: string;
  username?: string;
  password?: string;
}
