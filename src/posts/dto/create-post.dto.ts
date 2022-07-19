import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  userId: number;
}
