import { Injectable } from '@nestjs/common';
import { Repository, getRepository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from './entity/account.entity';
import { User } from '../user/entity/user.entity';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private accountRepository: Repository<Account>,
  ) {}

  async createAccount(
    email: string,
    password: string,
    req: any,
  ): Promise<Account> {
    // Hash and store the password securely in the database
    const hashedPassword = password;

    const account: Account = this.accountRepository.create({
      email,
      password: hashedPassword,
    });
    console.log(req.user);
    req.user.accounts = [account];

    return this.accountRepository.save(account);
  }
  async findOne(id: number) {
    return this.accountRepository
      .createQueryBuilder('account')
      .where('account.id = :id', { id })
      .leftJoinAndSelect('account.user', 'user')
      .getOne();
  }
}
