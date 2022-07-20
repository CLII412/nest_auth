import { Posts } from 'src/posts/entities/post.entity';
import { User } from 'src/users/entities/user.entity';
import { DeleteResult, EntityRepository, Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@EntityRepository(Posts)
export class PostsRepository extends Repository<Posts> {
  async createPost(createUserDto: CreatePostDto): Promise<Posts> {
    const newPost = createUserDto;
    return await this.save(newPost);
  }

  async getPostOwner(post: Posts): Promise<User> {
    return {
      id: post.user.id,
      email: post.user.email,
      password: post.user.password,
      posts: post.user.posts,
    };
  }

  async getAllPosts(): Promise<Posts[]> {
    const posts = this.createQueryBuilder('posts');
    posts.select(['posts.name', 'posts.description']);
    return await posts.getMany();
  }

  async getPostById(post: Posts): Promise<Posts> {
    return {
      id: post.id,
      name: post.name,
      description: post.description,
      user: post.user,
    };
  }

  async changePostInfo(
    post: Posts,
    updatePostDto: UpdatePostDto,
  ): Promise<UpdatePostDto> {
    const { name, description } = updatePostDto;
    if (name) {
      post.name = name;
    }
    if (description) {
      post.description = description;
    }
    return await this.save(post);
  }

  async removePost(post: Posts): Promise<DeleteResult> {
    return await this.delete(post);
  }
}
