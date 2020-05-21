import { Controller, Get, Post, Res, HttpStatus, Body } from '@nestjs/common';

import { CreateTicketDTO } from './dto/tickets.dto';

@Controller('tickets')
export class TicketsController{

    @Get()
    listTickets() {

    }

    @Post('/create')
    createTicket(@Res() res, @Body() createTicketDTO: CreateTicketDTO ) {
        console.log("product", createTicketDTO);

        return res.status(HttpStatus.OK).json({
            data: {},
            message: 'Se creó el ticket de servicio correctamente' 
        });
    }

}