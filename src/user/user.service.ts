import { Model } from 'mongoose';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UserUtils } from '../utils/users.utils';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserDocument> {
    try {
      createUserDto.password = await UserUtils.saltAndHashPassword(
        createUserDto.password,
      );
      const createdUser = await this.userModel.create(createUserDto);
      return createdUser;
    } catch (error) {
      if (error?.code === 11000) {
        throw new HttpException(
          'User with the same email address already exists',
          HttpStatus.BAD_REQUEST,
        );
      } else {
        throw new HttpException(
          'Something went wrong',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(id: string): Promise<User> {
    return this.userModel.findOne({ _id: id }).exec();
  }

  async findByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ email }).exec();
  }

  async delete(id: string): Promise<User> {
    const deletedUser = this.userModel.findByIdAndRemove({ _id: id }).exec();
    return deletedUser;
  }
}
