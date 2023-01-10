import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, ObjectId } from 'mongoose';
import { Transform, Type } from 'class-transformer';

import { Restaurant } from '../../restaurants/schemas/restaurant.schema';

export type FoodDocument = Food & Document;

@Schema({ timestamps: true })
export class Food {
  @Transform((value) => value.toString())
  _id: ObjectId;

  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  quatity: number;

  @Prop()
  category: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Restaurant.name })
  @Type(() => Restaurant)
  restaunrant: Restaurant;
}

export const FoodSchema = SchemaFactory.createForClass(Food);
