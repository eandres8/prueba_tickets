import { Module } from "@nestjs/common";
import { MongooseModule } from '@nestjs/mongoose';

// Controllers
import { UsersController } from "./users.controller";

// Services
import { UsersService } from "./users.service";

// Schemas
import { userSchema } from './schemas/user.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'User', schema: userSchema },
        ]),
    ],
    controllers: [
        UsersController
    ],
    providers: [
        UsersService
    ]
})
export class UsersModule { }