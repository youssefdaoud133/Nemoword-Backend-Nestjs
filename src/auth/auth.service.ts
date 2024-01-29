import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/nemo/user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(
    email: string,
    pass: string,
  ): Promise<{ access_token: string } | any> {
    try {
      const user = await this.usersService.FindOneEmail(email);
      if (user?.password !== pass) {
        throw new UnauthorizedException(`Wrong password`);
      }
      const payload = { sub: user.id, email: user.email };

      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    } catch (e) {
      console.log(e);

      return e;
    }
  }
  async myprofile(myprofile: { sub: number; email: string }): Promise<any> {
    const user = await this.usersService.FindOneId(myprofile.sub);

    return user;
  }
}
