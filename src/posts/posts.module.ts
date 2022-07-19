import { Module, forwardRef } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Posts } from './entities/post.entity';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Posts, User]),
    forwardRef(() => AuthModule),
    // forwardRef(() => PostsModule),
  ],
  exports: [PostsService],
  controllers: [PostsController],
  providers: [PostsService, UsersService],
})
export class PostsModule {}
