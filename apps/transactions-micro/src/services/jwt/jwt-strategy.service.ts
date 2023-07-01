import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { passportJwtSecret } from 'jwks-rsa';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import * as dotenv from 'dotenv';
import { join } from 'path';

dotenv.config({
  path: join(
    process.cwd(),
    'environments',
    `.env.${process.env.SCOPE?.trim()}`,
  ),
});

@Injectable()
export class JwtStrategyService extends PassportStrategy(Strategy) {
  constructor() {
    super({
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
      }),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      audience: `${process.env.AUTH0_DOMAIN}/api/v2/`,
      issuer: process.env.AUTH0_DOMAIN,
      algorithms: ['RS256'],
    });
  }
  validate(payload: any): Promise<any> {
    return payload;
  }
}
