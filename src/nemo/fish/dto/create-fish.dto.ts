import {
  IsString,
  IsEmail,
  Length,
  IsNumber,
  IsNotEmpty,
} from 'class-validator';

export class CreateFishDto {
  userId: number;

  @IsString()
  password: string;

  @IsEmail({}, { message: 'Invalid email format' })
  email: string;
}
