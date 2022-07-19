import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    const newUser = this.userRepository.create(createUserDto);
    await this.userRepository.save(newUser);

    return newUser;
  }

  async getUserByEmail(email: string) {
    return await this.userRepository.findOneBy({ email });
  }

  async getAllUsers() {
    return await this.userRepository.find();
  }

  async getUserById(id: number) {
    return await this.userRepository.findOneBy({ id });
  }

  async changeUserInfo(id: number, updatePostDto: UpdateUserDto) {
    return await this.userRepository.update({ id }, { ...updatePostDto });
  }

  async removeUser(id: number) {
    return await this.userRepository.delete({ id });
  }
}
