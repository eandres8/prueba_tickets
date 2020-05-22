import { Module } from "@nestjs/common";
import { MongooseModule } from '@nestjs/mongoose';

// Controllers
import { TicketsController } from "./tickets.controller";

// Services
import { TicketsService } from "./tickets.service";

// Schemas
import { ticketSchema } from './schemas/ticket.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'Ticket', schema: ticketSchema},
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
