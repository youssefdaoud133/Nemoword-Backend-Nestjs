import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getRepository } from 'typeorm';
import { User } from './entity/user.entity';
import { promises } from 'dns';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async CreateUser(body: CreateUserDto, WhoCreated: User): Promise<any> {
    return { newuser: await this.usersRepository.save(body), WhoCreated };
  }
  async FindAllUsers(): Promise<User[]> {
    return await this.usersRepository.find();
  }
  async FindOneId(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  async FindOneEmail(email: string): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { email } });

    if (!user) {
      throw new NotFoundException(`User with Email ${email} not found`);
    }

    return user;
  }
  async UpdateUser(id: number, UpdateData: Partial<User>) {
    const user = await this.usersRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    // Update the user's data
    this.usersRepository.merge(user, UpdateData);
    const updatedUser = await this.usersRepository.save(user);

    return user;
  }
  async deleteUser(id: number) {
    const user = await this.usersRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    const msg: User = await this.usersRepository.remove(user);
    return { msg: `${msg.username} is deleted` };
  }
}
