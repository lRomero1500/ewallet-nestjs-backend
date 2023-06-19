import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  schema: 'auth',
  name: 'auth0_api_tokens',
})
export class Auth0ApiTokenEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({
    name: 'api_token',
    type: 'varchar',
    length: 4096,
  })
  apiToken: string;
  @Column({
    name: 'expires_at',
    type: 'timestamp without time zone',
  })
  expiresAt: Date;
}
