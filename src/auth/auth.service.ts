import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/nemo/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/Signup.dto';
import { FindAllUsersDto } from 'src/nemo/user/dto/find-all-users.dto';
import { SecurityService } from 'src/security/security.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private securityService: SecurityService,
    private jwtService: JwtService,
  ) {}

  async signIn(
    email: string,
    pass: string,
  ): Promise<{ access_token: string } | any> {
    try {
      const user = await this.usersService.FindOneEmail(email);

      // varify password
      if (!(await this.securityService.VarifyPassword(pass, user?.password))) {
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
  // sign up endpoint
  async signUp(body: SignUpDto): Promise<{ status: string } | any> {
    const data: FindAllUsersDto = await this.usersService.CreateUser(body);

    // check if email is signed up or not
    if (data.username) {
      return { status: 'your account has been signed up' };
    } else {
      return { status: 'you have not been signed up' };
    }
  }
  async myprofile(myprofile: { sub: number; email: string }): Promise<any> {
    const user = await this.usersService.FindOneId(myprofile.sub);

    return user;
  }
}
