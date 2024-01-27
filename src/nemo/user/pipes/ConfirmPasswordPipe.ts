import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class ConfirmPasswordPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (value.password !== value.ConfirmPassword) {
      throw new BadRequestException(
        'Password and confirm password do not match',
      );
    }

    // Remove the ConfirmPassword property
    delete value.ConfirmPassword;

    return value;
  }
}
