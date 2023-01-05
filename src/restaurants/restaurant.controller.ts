import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Restaurant } from './schemas/restaurant.schema';
import { RestaurantService } from './restaurants.service';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';

@Controller('restaurants')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}
  @Post('create-restaurant')
  async create(@Body() createRestaurantDto: CreateRestaurantDto) {
    await this.restaurantService.create(createRestaurantDto);
  }

  @Get()
  async findAll(): Promise<Restaurant[]> {
    return this.restaurantService.findAll();
  }

  @Get(':ownerId')
  async findByOwnerId(@Param('ownerId') ownerId: string): Promise<Restaurant> {
    return this.restaurantService.findByOwnerId(ownerId);
  }
}
