import { Controller, Get, Post, Res, HttpStatus, Body } from '@nestjs/common';

// Models
import { CreateTicketDTO } from '../dto/tickets.dto';

// Services
import { TicketsService } from './tickets.service';

@Controller('tickets')
export class TicketsController{

    constructor(
        private ticketService: TicketsService
    ){}

    @Get('/list')
    async listTickets(@Res() res) {
        const tickets = await this.ticketService.getTickets();

        return res.status(HttpStatus.OK).json({
            data: tickets,
        });
    }

    @Post('/create')
    async createTicket(@Res() res, @Body() createTicketDTO: CreateTicketDTO ) {
        const ticket = await this.ticketService.createTicket(createTicketDTO);

        return res.status(HttpStatus.CREATED).json({
            data: ticket,
            message: 'Se creó el ticket de servicio correctamente' 
        });
    }

}