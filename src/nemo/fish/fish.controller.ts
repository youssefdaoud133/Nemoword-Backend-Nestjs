import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Put,
  Delete,
  BadRequestException,
  UseGuards,
  Req,
} from '@nestjs/common';
import { FishService } from './fish.service';
import { CreateFishDto } from './dto/create-fish.dto';

import HGE from 'src/HGE';
import { Prisma } from '@prisma/client';
import { AuthGuard } from 'src/auth/auth.guard';
import { UpdateFishDto } from './dto/Update-fish.dto';

@Controller('fish')
export class FishController {
  constructor(private readonly fishService: FishService) {}
  @UseGuards(AuthGuard)
  @Post()
  async create(@Req() request: any, @Body() fish: CreateFishDto) {
    fish.userId = request.user.id;
    const result = await HGE(() => this.fishService.CreateFish(fish));
    return result;
  }

  @Get()
  FindAllFishes() {
    return this.fishService.FindAllFishes();
  }
  @UseGuards(AuthGuard)
  @Get('SpecificUser')
  async FindAllFishesRelatedToUser(@Req() request: any) {
    return this.fishService.FindAllFishesRelatedToUser(request.user.id);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async FindOneId(@Param('id') id,@Req() request: any) {
    const result = await HGE(() =>
      this.fishService.FindOneId(parseInt(id,10),request.user.id),
    );
    return result;
  }
  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteFish(@Param('id') id: string,@Req() request: any) {
    try{
      let res = await this.fishService.deleteFish(parseInt(id, 10),request.user.id);
      return {
        response: {message : `Removed successfully`}
      }
    }catch(e){
     return e;
    }
  }

  @UseGuards(AuthGuard)
  @Put(':id') // Define a PUT route for updating a fish
  async updateFish(@Param('id') id: string, @Body() updateFishDto: UpdateFishDto,@Req() request: any) {
    try {
      const updatedFish = await this.fishService.updateFish(request.user.id,id,updateFishDto);
      return {
        response: updatedFish
      };
    } catch (e) {
      return e;
    }
  }

}
