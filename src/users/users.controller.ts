import { Controller, Get, Post, Res, HttpStatus, Body } from '@nestjs/common';

import * as jwt from "jsonwebtoken";

// Models
import { CreateUserDTO, LoginUserDTO } from 'src/dto/users.dto';

// Service
import { UsersService } from './users.service';

// Constants
import { SEED } from 'src/constants/config';

@Controller('users')
export class UsersController {

    constructor(
        private userService: UsersService,
    ){}


    @Get('/list')
    async listUsers(@Res() res) {
        const users = await this.userService.getUsers();

        return res.status(HttpStatus.OK).json({
            data: users,
        });
    }


    @Post('/create')
    async createUser(@Res() res, @Body() createUserDTO: CreateUserDTO) {

        const user = await this.userService.createUser(createUserDTO);
        
        const newUser = {
            id: user._id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            role: user.role,
            state: user.state,
            address: user.address,
            phone: user.phone,
        }

        return res.status(HttpStatus.CREATED).json({ 
            data: newUser,
            message: 'Se creó el usuario correctamente'
        });
    }


    @Post('/login')
    async loginUser(@Res() res, @Body() loginUserDTO: LoginUserDTO) {
        const user = await this.userService.loginUser(loginUserDTO);

        console.log("user", user);

        if( !user ) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                message: 'No ha sido posible loguear la cuenta'
            });
        }

        const newUser = {
            id: user._id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            role: user.role,
            state: user.state,
            address: user.address,
            phone: user.phone,
        }

        const token = jwt.sign({ user_id: user._id, email: user.email, role: user.role }, SEED, { expiresIn: 14400 });

        return res.status(HttpStatus.OK).json({
            data: newUser,
            token,
            message: 'OK'
        });
    }

}
