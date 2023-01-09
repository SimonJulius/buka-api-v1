import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, ObjectId } from 'mongoose';
import { Transform, Type } from 'class-transformer';

import { User } from '../../user/schemas/user.schema';

export type RestaurantDocument = Restaurant & Document;

@Schema({ timestamps: true })
export class Restaurant {
  @Transform((value) => value.toString())
  _id: ObjectId;

  @Prop()
  name: string;

  @Prop({
    set: (description: string) => {
      return description.trim();
    },
  })
  description: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  @Type(() => User)
  owner: User;
}

const RestaurantSchema = SchemaFactory.createForClass(Restaurant);

RestaurantSchema.index({ name: 'text', description: 'text' });

export { RestaurantSchema };
