import {
  Injectable,
  CanActivate,
  ExecutionContext,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { log } from 'console';
import { ERROR_MESSAGE } from 'src/constants/errors';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class UserGuard implements CanActivate {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { params } = request;

    let user;

    if (params.userId) {
      user = await this.userRepository.findOne({
        where: { id: params.userId },
        relations: ['posts'],
      });
      request.user = user;
    } else if (params.email) {
      user = await this.userRepository.findOne({
        where: { email: params.email },
        relations: ['posts'],
      });
      request.user = user;
    } else {
      throw new BadRequestException(ERROR_MESSAGE.USER_NOT_FOUND);
    }

    if (!user) {
      throw new BadRequestException(ERROR_MESSAGE.USER_NOT_FOUND);
    }

    return true;
  }
}
