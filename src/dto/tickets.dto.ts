
export class CreateTicketDTO {
    address: string;
    date_programing: Date;
    type: 'instalation' | 'maintenance';
    description: string;
    client: string;
}

export class UpdateTicketDTO {
    state: "pending" | "done" | "canceled" | "rejected";
    expert_comment: string;
}