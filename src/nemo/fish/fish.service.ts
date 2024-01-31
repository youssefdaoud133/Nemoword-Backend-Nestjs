import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClient, Prisma } from '@prisma/client';
import { HttpException, HttpStatus } from '@nestjs/common';
import { CreateFishDto } from './dto/create-fish.dto';
import { FindAllFishesDto } from './dto/find-fishes.dto';
@Injectable()
export class FishService {
  constructor(private prisma: PrismaService) {}

  async CreateFish(body: CreateFishDto): Promise<any> {
    try {
      return await this.prisma.fish.create({
        data: body,
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2003') {
          // Throw a custom exception with a specific status code and message
          throw new HttpException(
            `Foreign key constraint failed on the field: ${e.meta.field_name}`,
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
  async FindAllFishes(): Promise<any[]> {
    try {
      return await this.prisma.fish.findMany({
        include: {
          user: true, // This includes the user details for each post
        },
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
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
  async FindAllFishesRelatedToUser(userid): Promise<any[]> {
    try {
      return await this.prisma.fish.findMany({
        where: {
          userId: userid, // Filter fishes by userId
        },
        include: {
          user: true, // This includes the user details for each post
        },
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
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

  async FindOneId(id: number): Promise<FindAllFishesDto> {
    const fish: FindAllFishesDto = await this.prisma.fish.findUnique({
      where: { id: id },
      include: {
        user: true, // This includes the user details for each post
      },
    });

    if (!fish) {
      throw new HttpException(
        `Fish with ID ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    return fish;
  }
}
