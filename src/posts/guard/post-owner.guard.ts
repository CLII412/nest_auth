import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { PostsService } from 'src/posts/posts.service';

@Injectable()
export class PostOwnerGuard implements CanActivate {
  constructor(
    private postService: PostsService,
    private jwtService: JwtService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const req = context.switchToHttp().getRequest();
      const user = this.jwtService.verify(req.token);
      return req.post.user.email === user.email;
    } catch (e) {
      throw new ForbiddenException();
    }
  }
}
