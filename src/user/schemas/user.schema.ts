import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Exclude } from 'class-transformer';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop({ unique: true })
  email: string;

  @Prop()
  @Exclude()
  password: string;

  @Prop()
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
