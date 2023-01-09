import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Restaurant, RestaurantDocument } from './schemas/restaurant.schema';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { User } from '../user/schemas/user.schema';

@Injectable()
export class RestaurantService {
  constructor(
    @InjectModel(Restaurant.name)
    private restaurantModel: Model<RestaurantDocument>,
  ) {}

  async create(createRestaurantDto: CreateRestaurantDto, owner: User) {
    const createdRestaurant = new this.restaurantModel({
      ...createRestaurantDto,
      owner,
    });
    await createdRestaurant.populate('owner');

    return createdRestaurant.save();
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
