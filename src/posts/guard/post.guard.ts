import {
  Injectable,
  CanActivate,
  ExecutionContext,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ERROR_MESSAGE } from 'src/constants/errors';
import { Repository } from 'typeorm';
import { Posts } from '../entities/post.entity';

@Injectable()
export class PostGuard implements CanActivate {
  constructor(
    @InjectRepository(Posts)
    private postRepository: Repository<Posts>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { params } = request;

    if (!params.postId) {
      throw new BadRequestException(ERROR_MESSAGE.POST_NOT_FOUND);
    }

    const post = await this.postRepository.findOne({
      where: { id: params.postId },
      relations: ['user'],
    });

    if (!post) {
      throw new BadRequestException(ERROR_MESSAGE.POST_NOT_FOUND);
    }

    request.post = post;

    return true;
  }
}
