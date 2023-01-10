import { Request } from 'express';
import { RestaurantDocument } from 'src/restaurants/schemas/restaurant.schema';

interface RequestWithRestaurant extends Request {
  restaurant: RestaurantDocument;
}

export default RequestWithRestaurant;
