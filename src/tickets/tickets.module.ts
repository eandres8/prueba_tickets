import { Module } from "@nestjs/common";

// Controllers
import { TicketsController } from "./tickets.controller";

@Module({
    controllers: [
        TicketsController
    ],
})
export class TicketsModule{}
