import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateUserDto {
  @IsEmail()
  email: string;

  @MinLength(6)
  @MaxLength(15)
  @IsString()
  password: string;
}
