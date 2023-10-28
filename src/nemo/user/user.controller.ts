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
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { User } from './entity/user.entity';
import { ConfirmPasswordPipe } from './pipes/ConfirmPasswordPipe';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @UsePipes(new ConfirmPasswordPipe())
  @Post()
  create(@Body() user: CreateUserDto, @Req() req: any) {
    return this.userService.CreateUser(user, req.user);
  }
  @Get()
  FindAllUsers() {
    return this.userService.FindAllUsers();
  }
  @Get(':id')
  FindOneId(@Param('id') id) {
    return this.userService.FindOneId(id);
  }
  @Patch(':id')
  UpdateUser(@Param('id') id, @Body() UpdateData) {
    return this.userService.UpdateUser(id, UpdateData);
  }
  @Delete(':id')
  deleteUser(@Param('id') id) {
    return this.userService.deleteUser(id);
  }
}
