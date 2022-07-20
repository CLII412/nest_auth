import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { PostsService } from 'src/posts/posts.service';
import { log } from 'console';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private postService: PostsService,
    private jwtService: JwtService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new UnauthorizedException();
    }
    const bearer = authHeader.split(' ')[0];
    const token = authHeader.split(' ')[1];
    log(bearer, token);
    if (bearer === 'Bearer' && token) {
      return true;
    } else throw new UnauthorizedException();
  }
}
