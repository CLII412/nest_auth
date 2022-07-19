import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Posts } from './entities/post.entity';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Posts)
    private postsRepository: Repository<Posts>,
    private userService: UsersService,
  ) {}

  async create(createPostDto: CreatePostDto) {
    const user = await this.userService.getUserById(createPostDto.userId);
    const newPost = this.postsRepository.create(createPostDto);
    newPost.user = user;
    await this.postsRepository.save(newPost);
    return newPost;
  }

  async findAll() {
    return await this.postsRepository.find();
  }

  async getPostById(id: number) {
    const post = await this.postsRepository.findOneBy({ id });
    return post;
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    return await this.postsRepository.update({ id }, { ...updatePostDto });
  }

  async remove(id: number) {
    return await this.postsRepository.delete({ id });
  }
}
