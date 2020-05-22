import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import * as bcrypt from 'bcryptjs';

import { User } from '../interfaces/user.interface';
import { CreateUserDTO, LoginUserDTO } from '../dto/users.dto';

@Injectable()
export class UsersService {

    constructor(
        @InjectModel('User') private userModel: Model<User>
    ) { }

    async getUsers(): Promise<User[]> {
        const users = await this.userModel.find({}, 'first_name last_name email role state address phone');
        return users;
    }

    async getUser(userId: string): Promise<User> {
        const user = await this.userModel.findById(userId);
        return user;
    }

    async loginUser(userDTO: LoginUserDTO): Promise<User> {

        const user = await this.userModel.findOne({ email: userDTO.email });

        if (!user) return null;

        if (!bcrypt.compareSync(userDTO.password, user.password) ) {

            return null;
        }
        
        return user;

    }

    async createUser(userDTO: CreateUserDTO): Promise<User> {
        let hash = bcrypt.hashSync(userDTO.password, 10);
        let body = { ...userDTO, password: hash };

        const user = await new this.userModel(body);

        return await user.save();
    }

    async updateUser(userId: string, newUser: User): Promise<User> {
        const userUpdated = await this.userModel.findByIdAndUpdate(userId, newUser, { new: true });
        return userUpdated;
    }

}