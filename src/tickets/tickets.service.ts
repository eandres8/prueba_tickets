import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { Ticket } from 'src/interfaces/ticket.interface';
import { CreateTicketDTO, UpdateTicketDTO } from 'src/dto/tickets.dto';
import { User } from 'src/interfaces/user.interface';
import { Payload } from 'src/interfaces/payload.interface';

@Injectable()
export class TicketsService {

    constructor(
        @InjectModel('Ticket') private ticketModel: Model<Ticket>,
        @InjectModel('User') private userModel: Model<User>
    ){}

    async getTickets(): Promise<Ticket[]> {

        const tickets = await this.ticketModel.find();
        
        return tickets;
    }

    async getTicketsByUser(payload: Payload): Promise<Ticket[]> {

        let tickets = [];

        if(payload.role == 'expert') {
            tickets = await this.ticketModel.find({expert: payload.user_id});
        }else {
            tickets = await this.ticketModel.find({client: payload.user_id});
        }
        
        return tickets;
    }

    async getTicket(ticketId: string): Promise<Ticket> {
        const ticket = await this.ticketModel.findById(ticketId);
        return ticket;
    }

    async createTicket(ticketDTO: CreateTicketDTO): Promise<Ticket> {

        const counter = await this.userModel.countDocuments({role: 'expert'});

        const random = Math.floor(Math.random() * counter);
        const expert = await this.userModel.findOne({role: 'expert'}).skip(random);
        
        const ticket = await new this.ticketModel({ ...ticketDTO, expert: expert._id});
        return await ticket.save();
    }

    async updateTicket(ticketId: string, newTicket: UpdateTicketDTO): Promise<Ticket> {
        const ticketUpdated = await this.ticketModel.findByIdAndUpdate(ticketId, { ...newTicket, updated_at: new Date() }, {new: true});
        return ticketUpdated;
    }

}