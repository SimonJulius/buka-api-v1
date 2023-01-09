import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Restaurant } from './schemas/restaurant.schema';
import { RestaurantService } from './restaurants.service';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { JwtAuthGuard } from '../auth/auth-guard/jwt-auth.guard';
import RequestWithUser from '../auth/req-with-user.interface';

@Controller('restaurants')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create-restaurant')
  async createRestaurant(
    @Body() createRestaurantDto: CreateRestaurantDto,
    @Req() req: RequestWithUser,
  ) {
    return this.restaurantService.create(createRestaurantDto, req.user);
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
