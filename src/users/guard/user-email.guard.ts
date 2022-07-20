import {
  Injectable,
  CanActivate,
  ExecutionContext,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ERROR_MESSAGE } from 'src/constants/errors';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class UserEmailGuard implements CanActivate {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { params } = request;

    if (!params.email) {
      throw new BadRequestException(ERROR_MESSAGE.USER_NOT_FOUND);
    }

    const user = await this.userRepository.findOne({
      where: { email: params.email },
      relations: ['posts'],
    });
    if (!user) {
      throw new BadRequestException(ERROR_MESSAGE.USER_NOT_FOUND);
    }

    request.user = user;

    return true;
  }
}