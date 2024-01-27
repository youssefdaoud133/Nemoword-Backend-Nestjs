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

  @Get()
  FindAllUsers() {
    return this.userService.FindAllUsers();
  }
  @Get(':id')
  async FindOneId(@Param('id') id) {
    const result = await HGE(() =>
      this.userService.FindOneId(parseInt(id, 10)),
    );
    return result;
  }
  @Patch(':id')
  async UpdateUser(@Param('id') id, @Body() UpdateData) {
    const result = await HGE(() =>
      this.userService.UpdateUser(parseInt(id, 10), UpdateData),
    );
    return result;
  }
  @Delete(':id')
  async deleteUser(@Param('id') id) {
    const result = await HGE(() =>
      this.userService.deleteUser(parseInt(id, 10)),
    );
    return result;
  }
}
