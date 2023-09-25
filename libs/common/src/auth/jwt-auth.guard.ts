import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AUTH_SERVICE } from '@app/common/constants';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { UserDto } from '../dto';
import { Reflector } from '@nestjs/core';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  private readonly logger = new Logger(JwtAuthGuard.name);
  constructor(
    @Inject(AUTH_SERVICE) private readonly authClient: ClientProxy,
    private readonly reflector: Reflector,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const jwt =
      request.cookies?.Authentication || request.headers?.authenthication;

    // no token
    if (!jwt) {
      return false;
    }

    // check if user in roles
    const roles = this.reflector.get<string[]>('roles', context.getHandler());

    return this.authClient
      .send<UserDto>('authenticate', {
        Authentication: jwt,
      })
      .pipe(
        tap((res) => {
          if (roles) {
            for (const role of roles) {
              if (!res.roles.includes(role)) {
                throw new UnauthorizedException('Unauthorized');
              }
            }
          }
          context.switchToHttp().getRequest().user = res;
        }),
        map(() => true),
        catchError(() => of(false)),
      );
  }
}
