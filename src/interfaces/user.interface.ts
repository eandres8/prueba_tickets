import { Document } from 'mongoose';

export interface User extends Document {
    first_name: string;
    last_name: string;
    email: string;
    address?: string;
    phone?: string;
    password: string;
    role?: "client" | "expert";
    state?: "active" | "inactive";
    created_at?: Date,
    updated_at?: Date,
}