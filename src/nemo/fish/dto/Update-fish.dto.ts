import {
  IsString,
  IsEmail,
  Length,
  IsNumber,
  IsNotEmpty,
} from 'class-validator';

export class UpdateFishDto {
  FishId: string;

  @IsString()
  password: string;

  @IsEmail({}, { message: 'Invalid email format' })
  email: string;
}
