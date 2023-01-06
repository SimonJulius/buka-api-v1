import { IsNotEmpty } from 'class-validator';

export class CreateRestaurantDto {
  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  readonly description: string;

  readonly ownerId: string;
}
