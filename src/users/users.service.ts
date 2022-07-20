import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Posts } from 'src/posts/entities/post.entity';
import { UserRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<CreateUserDto> {
    return await this.userRepository.createUser(createUserDto);
  }

  async getUserPosts(user: User): Promise<Posts[]> {
    return await this.userRepository.getUserPosts(user);
  }

  async getAllUsers(): Promise<User[]> {
    return await this.userRepository.getAllUsers();
  }

  async getUser(user: User): Promise<User> {
    return await this.userRepository.getUser(user);
  }

  async getUserByEmail(email: string): Promise<User> {
    return await this.userRepository.getUserByEmail(email);
  }

  async changeUserInfo(
    user: User,
    updateUserDto: UpdateUserDto,
  ): Promise<UpdateUserDto> {
    return await this.userRepository.changeUserInfo(user, updateUserDto);
  }

  async removeUser(user: User) {
    return await this.userRepository.removeUser(user);
  }
}
