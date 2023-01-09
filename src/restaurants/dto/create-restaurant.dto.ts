import { IsNotEmpty, IsString } from 'class-validator';
// import { ObjectId } from 'mongoose';
// import { User } from 'src/user/schemas/user.schema';

export class CreateRestaurantDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  readonly description: string;

  // readonly ownerId: User;
}
