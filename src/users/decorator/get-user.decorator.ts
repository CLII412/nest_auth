import { createParamDecorator } from '@nestjs/common';
import { User } from '../entities/user.entity';

export const GetUser = createParamDecorator((data: string, context) => {
  const user: User = context.switchToHttp().getRequest().user;

  return data ? user && user[data] : user;
});
