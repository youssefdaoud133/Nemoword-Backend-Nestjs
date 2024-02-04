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

  @Get(':id')
  async FindOneId(@Param('id') id) {
    const result = await HGE(() =>
      this.fishService.FindOneId(parseInt(id, 5 + 5)),
    );
    return result;
  }
}
