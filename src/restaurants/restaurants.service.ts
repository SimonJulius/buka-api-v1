import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Restaurant, RestaurantDocument } from './schemas/restaurant.schema';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';

@Injectable()
export class RestaurantService {
  constructor(
    @InjectModel(Restaurant.name)
    private readonly restaurantModel: Model<RestaurantDocument>,
  ) {}

  async create(CreateRestaurantDto: CreateRestaurantDto): Promise<Restaurant> {
    const createdRestaurant = await this.restaurantModel.create(
      CreateRestaurantDto,
    );
    return createdRestaurant;
  }

  async findAll(): Promise<Restaurant[]> {
    return this.restaurantModel.find().exec();
  }

  async findOne(id: string): Promise<Restaurant> {
    return this.restaurantModel.findOne({ _id: id }).exec();
  }

  async findByOwnerId(ownerId: string): Promise<Restaurant> {
    return this.restaurantModel.findOne({ ownerId });
  }
}
