import { FindAllUsersDto } from 'src/nemo/user/dto/find-all-users.dto';

export class FindAllFishesDto {
  id: number;
  userId?: number;
  password: string;
  email: string;
  // user: FindAllUsersDto;
}
