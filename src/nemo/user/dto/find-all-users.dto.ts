import { IsString, IsEmail, Length } from 'class-validator';

export class FindAllUsersDto {
  username: string;
  password: string;
  email: string;
}
