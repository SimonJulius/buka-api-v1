import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';

import { Food } from './schema/food.schema';
import { FoodService } from './food.service';
import { CreateFoodDto } from './dto/create-food.dto';
import { JwtAuthGuard } from '../auth/auth-guard/jwt-auth.guard';
import RequestWithRestaurant from './req-with-restaurant.interface';

@Controller('food')
export class FoodController {
  constructor(private readonly foodService: FoodService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create-food')
  async createFood(
    @Body() createFoodDto: CreateFoodDto,
    @Req() req: RequestWithRestaurant,
  ) {
    return this.foodService.createFood(createFoodDto, req.restaurant);
  }
}
