import { Schema } from 'mongoose';

export const userSchema = new Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true },
    address: String,
    phone: String,
    password: String,
    role: { type: String, enum: ["client", "expert"] },
    state: { type: String, enum: ["active", "inactive"], default: 'active' },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: Date,
});