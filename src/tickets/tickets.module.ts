import { Module } from "@nestjs/common";
import { MongooseModule } from '@nestjs/mongoose';

// Controllers
import { TicketsController } from "./tickets.controller";

// Services
import { TicketsService } from "./tickets.service";

// Schemas
import { ticketSchema } from './schemas/ticket.schema';
import { userSchema } from "src/users/schemas/user.schema";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'Ticket', schema: ticketSchema},
            { name: 'User', schema: userSchema},
        ]),
    ],
    controllers: [
        TicketsController
    ],
    providers: [
        TicketsService
    ]
})
export class TicketsModule{}
