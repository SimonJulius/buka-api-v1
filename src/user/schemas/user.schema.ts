import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';
import { Exclude, Transform } from 'class-transformer';

export type UserDocument = Document & User;

@Schema({ timestamps: true })
export class User {
  @Transform(({ value }) => value.toString())
  _id: ObjectId;

  @Prop({ trim: true })
  firstName: string;

  @Prop({ trim: true })
  lastName: string;

  @Prop({ unique: true, lowercase: true })
  email: string;

  @Prop()
  @Exclude()
  password: string;

  @Prop()
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
