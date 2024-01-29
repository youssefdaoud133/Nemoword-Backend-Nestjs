import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
const { v4: uuidv4 } = require('uuid');
import { promises } from 'dns';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClient, Prisma } from '@prisma/client';
import { HttpException, HttpStatus } from '@nestjs/common';
import { FindAllUsersDto } from './dto/find-all-users.dto';
import { SecurityService } from 'src/security/security.service';

const client = new PrismaClient();
@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private securityService: SecurityService,
  ) {}

  async CreateUser(body: CreateUserDto | any): Promise<any> {
    // hash password
    body.password = await this.securityService.HashPassword(body.password);
    try {
      return await this.prisma.user.create({
        data: body,
      });
    } catch (e) {
      console.log(e);

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

  async FindAllUsers(): Promise<FindAllUsersDto[]> {
    return await this.prisma.user.findMany();
  }
  async FindOneId(id: number): Promise<FindAllUsersDto> {
    const user = await this.prisma.user.findUnique({
      where: { id: id },
    });

    if (!user) {
      throw new HttpException(
        `User with ID ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    return user;
  }
  async FindOneEmail(email: string): Promise<FindAllUsersDto> {
    const user = await this.prisma.user.findUnique({
      where: { email: email },
    });

    if (!user) {
      throw new HttpException(
        `User with Email ${email} not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    return user;
  }

  async UpdateUser(id: number, UpdateData: Partial<FindAllUsersDto>) {
    try {
      const user = await this.prisma.user.update({
        where: { id: id },
        data: UpdateData,
      });

      return user;
    } catch (e) {
      // if any error occurs
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2025') {
          // Throw a custom exception with a specific status code and message
          throw new HttpException(
            `User with ID ${id} not found`,
            HttpStatus.NOT_FOUND,
          );
        }
      }
      // Handle other unexpected errors or throw a generic exception
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteUser(id: number) {
    try {
      // try to find and delete
      const user = await this.prisma.user.delete({ where: { id: id } });

      return { msg: `${user.username} is deleted` };
    } catch (e) {
      // if any error occurs
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2025') {
          // Throw a custom exception with a specific status code and message
          throw new HttpException(
            `User with ID ${id} not found`,
            HttpStatus.NOT_FOUND,
          );
        }
      }
      // Handle other unexpected errors or throw a generic exception
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
