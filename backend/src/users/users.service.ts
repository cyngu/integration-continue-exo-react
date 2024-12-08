import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './users.schema';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async findOneByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async create(user: Partial<User>): Promise<User> {
    const existingUser = await this.findOneByEmail(user.email);
    if (existingUser) {
      throw new ConflictException('Email d\'utilisateur déjà pris');
    }

    user.password = await bcrypt.hash(user.password, 10);
    const createdUser = new this.userModel(user);
    return createdUser.save();
  }

  async validatePassword(user: User, password: string): Promise<boolean> {
    return bcrypt.compare(password, user.password);
  }

  // Récupérer tous les utilisateurs
  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }
}