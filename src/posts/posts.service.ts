import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Posts } from './entities/post.entity';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { PostsRepository } from './posts.repository';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostsRepository)
    private postsRepository: PostsRepository,
  ) {}

  async createPost(createUserDto: CreatePostDto): Promise<Posts> {
    return await this.postsRepository.createPost(createUserDto);
  }

  async getPostOwner(post: Posts): Promise<User> {
    return await this.postsRepository.getPostOwner(post);
  }

  async getAllPosts(): Promise<Posts[]> {
    return await this.postsRepository.getAllPosts();
  }

  async getPostById(post: Posts): Promise<Posts> {
    return await this.postsRepository.getPostById(post);
  }

  async changeUserInfo(
    post: Posts,
    updatePostDto: UpdatePostDto,
  ): Promise<UpdatePostDto> {
    return await this.postsRepository.changePostInfo(post, updatePostDto);
  }

  async removePost(post: Posts): Promise<DeleteResult> {
    return await this.postsRepository.delete(post);
  }
}
