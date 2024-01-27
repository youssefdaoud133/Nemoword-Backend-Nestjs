import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/SignIn.dto';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // @HttpCode(HttpStatus.OK)
  // @Post('login')
  // signIn(@Body() SignInDto: SignInDto) {
  //   return this.authService.signIn(SignInDto.email, SignInDto.password);
  // }
  // @HttpCode(HttpStatus.OK)
  // @UseGuards(AuthGuard)
  // @Get('myprofile')
  // myprofile(@Req() request: any) {
  //   return this.authService.myprofile(request.user);
  // }
}
