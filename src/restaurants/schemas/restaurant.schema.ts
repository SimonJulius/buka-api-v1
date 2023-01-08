import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, ObjectId } from 'mongoose';
import { Transform, Type } from 'class-transformer';

import { User, UserSchema } from '../../user/schemas/user.schema';

export type RestaurantDocument = Restaurant & Document;

@Schema()
export class Restaurant {
  @Transform((value) => value.toString())
  _id: ObjectId;

  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop({ type: UserSchema })
  @Type(() => User)
  @Transform(({ value }) => value.toString())
  ownerId: ObjectId;
}

export const RestaurantSchema = SchemaFactory.createForClass(Restaurant);
