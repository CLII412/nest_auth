import { Posts } from 'src/posts/entities/post.entity';
import { DeleteResult, EntityRepository, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcryptjs';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(user: CreateUserDto): Promise<User> {
    const { email, password } = user;
    if (email) {
      user.email = email;
    }
    if (password) {
      user.password = password;
    }
    return await this.save(user);
  }

  async getUserPosts(user: User): Promise<Posts[]> {
    return user.posts;
  }

  async getUserByEmail(email: string): Promise<User> {
    return await this.findOne({ where: { email: email } });
  }

  async getAllUsers(): Promise<User[]> {
    const users = this.createQueryBuilder('users');
    users.select(['users.id', 'users.email']);
    return await users.getMany();
  }

  async changeUserInfo(
    user: User,
    updateUserDto: UpdateUserDto,
  ): Promise<UpdateUserDto> {
    const { email, password } = updateUserDto;
    if (email) {
      user.email = email;
    }
    if (password) {
      user.password = await bcrypt.hash(password, 5);
    }
    return await this.save(user);
  }

  async removeUser(users: User): Promise<DeleteResult> {
    return await this.delete(users);
  }
}
