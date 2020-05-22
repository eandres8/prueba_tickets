import { Controller, Get, Post, Res, HttpStatus, Body, Req, Put } from '@nestjs/common';
import { Request, Response } from 'express';

import * as jwt from "jsonwebtoken";

// Models
import { CreateTicketDTO, UpdateTicketDTO } from '../dto/tickets.dto';

// Services
import { TicketsService } from './tickets.service';

// Interface
import { Payload } from 'src/interfaces/payload.interface';

@Controller('tickets')
export class TicketsController{

    constructor(
        private ticketService: TicketsService
    ){}

    @Get('/list')
    async listTickets(@Req() req: Request, @Res() res: Response) {

        const token = req.headers.authorization;

        if (!token) {
            return res.status(HttpStatus.UNAUTHORIZED).json({ message: 'No tienes acceso a este recurso' });
        }

        const tickets = await this.ticketService.getTickets();

        return res.status(HttpStatus.OK).json({
            data: tickets,
        });
    }
    
    @Get('/filter')
    async filterTickets(@Req() req: Request, @Res() res: Response) {

        const token = req.headers.authorization;

        if (!token) {
            return res.status(HttpStatus.UNAUTHORIZED).json({ message: 'No tienes acceso a este recurso' });
        }

        const payload: any = jwt.decode(token);

        const tickets = await this.ticketService.getTicketsByUser(payload);

        return res.status(HttpStatus.OK).json({
            data: tickets,
        });
    }

    @Post('/create')
    async createTicket(@Req() req: Request, @Res() res: Response, @Body() createTicketDTO: CreateTicketDTO ) {
        
        const token = req.headers.authorization;

        if ( !token ) {
            return res.status(HttpStatus.UNAUTHORIZED).json({message: 'No tienes acceso a este recurso'});
        }

        const payload: any | Payload = jwt.decode(token);
        createTicketDTO.client = payload.user_id;

        try {
            const ticket = await this.ticketService.createTicket(createTicketDTO);

            return res.status(HttpStatus.CREATED).json({
                data: ticket,
                message: 'Se creó el ticket de servicio correctamente'
            });
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                message: error.message
            });
        }
    }

    @Put('/update/:id')
    async updateTicket(@Req() req: Request, @Res() res: Response, @Body() updateTicketDTO: UpdateTicketDTO ) {
        const token = req.headers.authorization;
        const id = req.param('id');


        if (!token) {
            return res.status(HttpStatus.UNAUTHORIZED).json({ message: 'No tienes acceso a este recurso' });
        }

        const payload: any | Payload = jwt.decode(token);
        
        try {
            const ticket = await this.ticketService.updateTicket(id, updateTicketDTO);

            return res.status(HttpStatus.OK).json({
                data: ticket,
                message: 'Se actualizó correctamente el ticket'
            });

        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                message: error.message
            });
        }

    }

}