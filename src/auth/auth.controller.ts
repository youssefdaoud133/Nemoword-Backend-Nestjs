import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/SignIn.dto';
import { AuthGuard } from './auth.guard';
import { SignUpDto } from './dto/Signup.dto';
import { ConfirmPasswordPipe } from 'src/nemo/user/pipes/ConfirmPasswordPipe';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // sign in controller
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() SignInDto: SignInDto) {
    return this.authService.signIn(SignInDto.email, SignInDto.password);
  }
  // sign up controller
  @HttpCode(HttpStatus.OK)
  @Post('signup')
  @UsePipes(new ConfirmPasswordPipe())
  SignUp(@Body() SignUpDto: SignUpDto) {
    return this.authService.signUp(SignUpDto);
  }

  // my profile controller
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Get('myprofile')
  myprofile(@Req() request: any) {
    delete request.user.password;
    delete request.user.createdAt;
    return request.user;
  }
}
