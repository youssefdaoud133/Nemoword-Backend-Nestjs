import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Put,
  Delete,
  BadRequestException,
} from '@nestjs/common';
import { FishService } from './fish.service';
import { CreateFishDto } from './dto/create-fish.dto';
import HGE from 'src/HGE';
import { Prisma } from '@prisma/client';

@Controller('fish')
export class FishController {
  constructor(private readonly fishService: FishService) {}

  @Post()
  async create(@Body() fish: CreateFishDto) {
    const result = await HGE(() => this.fishService.CreateFish(fish));
    return result;
  }

  @Get()
  FindAllUsers() {
    return this.fishService.FindAllFishes();
  }

  @Get(':id')
  async FindOneId(@Param('id') id) {
    const result = await HGE(() =>
      this.fishService.FindOneId(parseInt(id, 10)),
    );
    return result;
  }
}
