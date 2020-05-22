import { ApiProperty } from '@nestjs/swagger';

export class CreateTicketDTO {
    @ApiProperty()
    address: string;
    @ApiProperty({ description: 'Fecha de programación del ticket', type: Date})
    date_programing: Date;
    @ApiProperty()
    type: 'instalation' | 'maintenance';
    @ApiProperty()
    description: string;
    @ApiProperty()
    client: string;
}

export class UpdateTicketDTO {
    @ApiProperty()
    state: "pending" | "done" | "canceled" | "rejected";
    @ApiProperty()
    expert_comment: string;
}