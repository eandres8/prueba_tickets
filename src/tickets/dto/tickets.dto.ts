

export class CreateTicketDTO {
    address: string;
    type: 'Instalation' | 'Maintenance';
    description: string;
}