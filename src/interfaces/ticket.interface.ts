import { Document } from 'mongoose';

export interface Ticket extends Document {
    date_programing: Date;
    address: string;
    type: 'instalation' | 'maintenance';
    description?: string,
    client?: string;
    expert?: string;
    state: "pending" | "done" | "canceled" | "rejected";
    created_at?: Date,
    updated_at?: Date,
}

