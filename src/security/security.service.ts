import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class SecurityService {
  async HashPassword(password: string) {
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(password, saltOrRounds);
    return hash;
  }
  async VarifyPassword(password: string, HashPassword: string) {
    const isMatch = await bcrypt.compare(password, HashPassword);
    return isMatch;
  }
}
