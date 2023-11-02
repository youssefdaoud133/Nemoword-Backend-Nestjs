import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
const { v4: uuidv4 } = require('uuid');
import { promises } from 'dns';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClient, Prisma } from '@prisma/client';
import { HttpException, HttpStatus } from '@nestjs/common';

const client = new PrismaClient();
@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async CreateUser(body: any): Promise<any> {
    try {
      return await this.prisma.user.create({
        data: body,
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
          // Throw a custom exception with a specific status code and message
          throw new HttpException(
            'Email is already in use',
            HttpStatus.CONFLICT,
          );
        }
        // Handle other Prisma-specific errors or throw a generic exception
        throw new HttpException(
          'Database error',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      // Handle other unexpected errors or throw a generic exception
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // async FindAllUsers(): Promise<User[]> {
  //   return await this.usersRepository.find();
  // }
  // async FindOneId(id: number): Promise<User> {
  //   const user = await this.usersRepository.findOne({ where: { id } });

  //   if (!user) {
  //     throw new NotFoundException(`User with ID ${id} not found`);
  //   }

  //   return user;
  // }

  // async FindOneEmail(email: string): Promise<User> {
  //   const user = await this.usersRepository.findOne({ where: { email } });

  //   if (!user) {
  //     throw new NotFoundException(`User with Email ${email} not found`);
  //   }

  //   return user;
  // }
  // async UpdateUser(id: number, UpdateData: Partial<User>) {
  //   const user = await this.usersRepository.findOne({ where: { id } });

  //   if (!user) {
  //     throw new NotFoundException(`User with ID ${id} not found`);
  //   }

  //   // Update the user's data
  //   this.usersRepository.merge(user, UpdateData);
  //   const updatedUser = await this.usersRepository.save(user);

  //   return user;
  // }
  // async deleteUser(id: number) {
  //   const user = await this.usersRepository.findOne({ where: { id } });

  //   if (!user) {
  //     throw new NotFoundException(`User with ID ${id} not found`);
  //   }

  //   const msg: User = await this.usersRepository.remove(user);
  //   return { msg: `${msg.username} is deleted` };
  // }
}
