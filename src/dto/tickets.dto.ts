
export class CreateTicketDTO {
    address: string;
    date_programing: Date;
    type: 'instalation' | 'maintenance';
    description: string;
}