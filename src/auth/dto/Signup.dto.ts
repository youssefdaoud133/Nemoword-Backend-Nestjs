import { IsString, IsNotEmpty, IsEmail } from 'class-validator';
import { CreateUserDto } from 'src/nemo/user/dto/create-user.dto';

export class SignUpDto extends CreateUserDto {}
