import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthProxyService } from 'apps/enrollment-micro/src/services/auth/auth-proxy.service';
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthProxyService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    const authorization: string | null = req.headers.authorization;

    if (!authorization) {
      throw new UnauthorizedException();
    }

    const bearer: string[] = authorization.split(' ');

    if (!bearer || bearer.length < 2) {
      throw new UnauthorizedException();
    }

    const token: string = bearer[1];

    const response = await this.authService.validateToken(token);
    req.user = response.userId?.split('|')[1];
    return response.isValid;
  }
}
