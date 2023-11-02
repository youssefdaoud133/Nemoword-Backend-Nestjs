import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
  UsePipes,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { ConfirmPasswordPipe } from './pipes/ConfirmPasswordPipe';
import HGE from 'src/HGE';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @UsePipes(new ConfirmPasswordPipe())
  @Post()
  async create(@Body() user: CreateUserDto) {
    const result = await HGE(() => this.userService.CreateUser(user));
    return result;
  }

  // @Get()
  // FindAllUsers() {
  //   return this.userService.FindAllUsers();
  // }
  // @Get(':id')
  // FindOneId(@Param('id') id) {
  //   return this.userService.FindOneId(id);
  // }
  // @Patch(':id')
  // UpdateUser(@Param('id') id, @Body() UpdateData) {
  //   return this.userService.UpdateUser(id, UpdateData);
  // }
  // @Delete(':id')
  // deleteUser(@Param('id') id) {
  //   return this.userService.deleteUser(id);
  // }
}
