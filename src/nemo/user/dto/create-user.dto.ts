import { IsString, IsEmail, Length } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Length(3, 30, { message: 'Username must be between 3 and 30 characters' })
  username: string;

  @IsString()
  @Length(8, 255, { message: 'Password must be at least 8 characters long' })
  password: string;

  @IsString()
  @Length(8, 255, {
    message: 'Confirm Password must be at least 8 characters long',
  })
  ConfirmPassword: string;

  @IsEmail({}, { message: 'Invalid email format' })
  email: string;
}
