import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostOwnerGuard } from './guard/post-owner.guard';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { GetPost } from './decorator/get-post.decorator';
import { Posts } from './entities/post.entity';
import { PostGuard } from './guard/post.guard';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() createPostDto: CreatePostDto) {
    return this.postsService.createPost(createPostDto);
  }

  @Get()
  getAllPosts() {
    return this.postsService.getAllPosts();
  }

  @Get(':postId')
  @UseGuards(PostGuard)
  getPostById(@GetPost() post: Posts) {
    return this.postsService.getPostById(post);
  }

  @Get('/author/:postId')
  @UseGuards(PostGuard)
  getPostAuthor(@GetPost() post: Posts) {
    return this.postsService.getPostOwner(post);
  }

  @Patch(':postId')
  @UseGuards(AuthGuard, PostGuard, PostOwnerGuard)
  update(@GetPost() post: Posts, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.changeUserInfo(post, updatePostDto);
  }

  @Delete(':postId')
  @UseGuards(AuthGuard, PostGuard, PostOwnerGuard)
  remove(@GetPost() post: Posts) {
    return this.postsService.removePost(post);
  }
}
