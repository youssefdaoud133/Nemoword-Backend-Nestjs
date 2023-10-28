import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AccountService } from './account.service';
import { Account } from './entity/account.entity';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}
  @UseGuards(AuthGuard)
  @Post()
  async createAccount(
    @Body() { email, password },
    @Req() req: any,
  ): Promise<Account> {
    return this.accountService.createAccount(email, password, req);
  }
  @Get()
  async findAccountWithUser(@Body() { ids }) {
    return this.accountService.findOne(ids);
  }
}
