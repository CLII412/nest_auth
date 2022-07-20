import { createParamDecorator } from '@nestjs/common';
import { Posts } from '../entities/post.entity';

export const GetPost = createParamDecorator((data: string, context) => {
  const post: Posts = context.switchToHttp().getRequest().post;

  return data ? post && post[data] : post;
});
