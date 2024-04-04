import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClient, Prisma } from '@prisma/client';
import { HttpException, HttpStatus } from '@nestjs/common';
import { CreateFishDto } from './dto/create-fish.dto';
import { FindAllFishesDto } from './dto/find-fishes.dto';
import { SecurityService } from 'src/security/security.service';
import { UpdateFishDto } from './dto/Update-fish.dto';
@Injectable()
export class FishService {
  constructor(
    private prisma: PrismaService,
    private securityService: SecurityService,
  ) {}

  async CreateFish(body: CreateFishDto): Promise<any> {
    try {
      body.email = await this.securityService.encrypt(body.email);
      body.password = await this.securityService.encrypt(body.password);
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
      let fishes = await this.prisma.fish.findMany({
        where: {
          userId: userid, // Filter fishes by userId
        },
        include: {
          user: true, // This includes the user details for each post
        },
        orderBy: {
          createdAt: 'desc' // Order by createdAt in descending order
        }
      });
      let defishes = fishes.map((element) => {
        // Create a new object to avoid modifying the original fish object
        return {
          ...element,
          email: this.securityService.decrypt(element.email),
          password: this.securityService.decrypt(element.password),
        };
      });

      console.log(defishes);
      return defishes;
    } catch (e) {
      console.log(e);

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

  async FindOneId(id: number,userId: number): Promise<FindAllFishesDto> {
    const fish: FindAllFishesDto = await this.prisma.fish.findUnique({
      where: { id: id,
        userId: userId,
      },
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

  async deleteFish(fishId: number, userId: number) {
    // Check if the fish exists and belongs to the specified user
    const fish = await this.prisma.fish.findFirst({
      where: {
        id: fishId,
        userId: userId,
      },
    });

    if (!fish) {
      throw new NotFoundException('Fish not found');
    }

    // Delete the fish
    const deletedFish = await this.prisma.fish.delete({
      where: {
        id: fishId,
      },
    });

    return deletedFish;
  }

  async updateFish(USERID:string, id:string,updateFishDto: UpdateFishDto): Promise<any> {
    // insert id from params
    updateFishDto.FishId = id;
  
      // try find target fish
      const existingFish = this.FindOneId( parseInt(updateFishDto.FishId, 10) , parseInt(USERID,10));

      // Encrypt email and password if they're included in the update DTO
      if (updateFishDto.email) {
        updateFishDto.email = await this.securityService.encrypt(
          updateFishDto.email,
        );
      }
      if (updateFishDto.password) {
        updateFishDto.password = await this.securityService.encrypt(
          updateFishDto.password,
        );
      }
      // Remove the fishId from updateFishDto
       const { FishId, ...dataWithoutFishId } = updateFishDto;

      // Update the fish
      return await this.prisma.fish.update({
        where: {
          id:  parseInt(updateFishDto.FishId, 10),
        },
        data: dataWithoutFishId,
      });
    
  }
}
