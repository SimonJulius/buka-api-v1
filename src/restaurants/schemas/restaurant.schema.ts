import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

import { User } from '../../user/schemas/user.schema';

export type RestaurantDocument = HydratedDocument<Restaurant>;

@Schema()
export class Restaurant {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  ownerId: User;
}

export const RestaurantSchema = SchemaFactory.createForClass(Restaurant);
