import { Module, forwardRef } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Posts } from 'src/posts/entities/post.entity';
import { AuthModule } from 'src/auth/auth.module';
import { PostsModule } from 'src/posts/posts.module';
import { UserRepository } from './users.repository';
import { PostsRepository } from 'src/posts/posts.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Posts, UserRepository, PostsRepository]),
    forwardRef(() => AuthModule),
    forwardRef(() => PostsModule),
  ],
  exports: [UsersService],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
