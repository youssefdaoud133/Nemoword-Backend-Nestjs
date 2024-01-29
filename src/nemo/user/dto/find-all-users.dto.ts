import { IsString, IsEmail, Length } from 'class-validator';

export class FindAllUsersDto {
  id: number;
  username: string;
  password: string;
  email: string;
}
