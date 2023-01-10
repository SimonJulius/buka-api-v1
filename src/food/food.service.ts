import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { Food, FoodDocument } from './schema/food.schema';
import { Restaurant } from '../restaurants/schemas/restaurant.schema';
import { CreateFoodDto } from './dto/create-food.dto';

@Injectable()
export class FoodService {
  constructor(
    @InjectModel(Food.name)
    private foodModel: Model<FoodDocument>,
  ) {}

  async createFood(createFoodDto: CreateFoodDto, restaurant: Restaurant) {
    const createdFood = new this.foodModel({
      ...createFoodDto,
      restaurant,
    });
    await createdFood.populate('restaurant');

    return createdFood.save();
  }
}
