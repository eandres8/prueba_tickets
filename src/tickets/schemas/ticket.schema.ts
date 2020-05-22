import { Schema } from 'mongoose';

export const ticketSchema = new Schema({
    date_programing: {type: Date, required: true},
    address: { type: String, required: true},
    type: { type: String, enum: ["instalation", "maintenance"]},
    description: String,
    expert_comment: String,
    client: { type: Schema.Types.ObjectId, ref: "User", required: true } ,
    expert: { type: Schema.Types.ObjectId, ref: "User" } ,
    state: { type: String, enum: ["pending", "done", "canceled", "rejected"], default: 'pending' },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: Date,
});