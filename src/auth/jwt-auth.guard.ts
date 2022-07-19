import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  Param,
  UnauthorizedException,
} from '@nestjs/common';
import { async, Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { log } from 'console';
import { PostsService } from 'src/posts/posts.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private postService: PostsService,
    private reflector: Reflector,
    private jwtService: JwtService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      // const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      //   'posts',
      //   [context.getHandler(), context.getClass()],
      // );

      const req = context.switchToHttp().getRequest();

      const authHeader = req.headers.authorization;
      const bearer = authHeader.split(' ')[0];
      const token = authHeader.split(' ')[1];

      if (bearer !== 'Bearer' || !token) {
        throw new UnauthorizedException({
          message: 'Пользователь не авторизован',
        });
      }

      const user = this.jwtService.verify(token);

      const x = async () => {
        const post = await this.postService.getPostById(req.params.id);
        const user = await post.user;
        log(user);
      };
      // return user.posts.some(posts => .includes(posts.value));
      x();
      return true;
    } catch (e) {
      console.log(e);
      throw new HttpException('Нет доступа', HttpStatus.FORBIDDEN);
    }
  }
}
