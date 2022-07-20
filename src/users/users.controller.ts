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
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { GetUser } from './decorator/get-user.decorator';
import { User } from './entities/user.entity';
import { UserGuard } from './guard/user.guard';
import { AuthAccountOwnerGuard } from 'src/auth/guard/auth-owner.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @Get('/posts/:userId')
  @UseGuards(AuthGuard, UserGuard)
  getUserPosts(@GetUser() user: User) {
    return this.usersService.getUserPosts(user);
  }

  @Get(':userId')
  @UseGuards(AuthGuard, UserGuard)
  getUserById(@GetUser() user: User) {
    return this.usersService.getUser(user);
  }

  @Get('email/:email')
  @UseGuards(AuthGuard, UserGuard)
  getUserByEmail(@GetUser() user: User) {
    return this.usersService.getUser(user);
  }

  @Patch(':userId')
  @UseGuards(AuthGuard, UserGuard, AuthAccountOwnerGuard)
  changeUserInfo(@GetUser() user: User, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.changeUserInfo(user, updateUserDto);
  }

  @Delete(':userId')
  @UseGuards(AuthGuard, UserGuard, AuthAccountOwnerGuard)
  removeUser(@GetUser() user: User) {
    return this.usersService.removeUser(user);
  }
}
