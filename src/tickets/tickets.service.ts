import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { Ticket } from '../interfaces/ticket.interface';
import { CreateTicketDTO } from '../dto/tickets.dto';

@Injectable()
export class TicketsService {

    constructor(
        @InjectModel('Ticket') private ticketModel: Model<Ticket>
    ){}

    async getTickets(): Promise<Ticket[]> {
        const tickets = await this.ticketModel.find();
        return tickets;
    }
    
    async getTicketsByClient(userId: string): Promise<Ticket[]>{
        const tickets = await this.ticketModel.find({client:userId});
        return tickets;
    }

    async getTicketsByExpert(userId: string): Promise<Ticket[]>{
        const tickets = await this.ticketModel.find({expert:userId});
        return tickets;
    }

    async getTicket(ticketId: string): Promise<Ticket> {
        const ticket = await this.ticketModel.findById(ticketId);
        return ticket;
    }

    async createTicket(ticketDTO: CreateTicketDTO): Promise<Ticket> {
        const ticket = await new this.ticketModel(ticketDTO);
        return await ticket.save();
    }

    async updateTicket(ticketId: string, newTicket: Ticket): Promise<Ticket> {
        const ticketUpdated = await this.ticketModel.findByIdAndUpdate(ticketId, newTicket, {new: true});
        return ticketUpdated;
    }

}