import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDTO {
    @ApiProperty()
    first_name: string;
    @ApiProperty()
    last_name: string;
    @ApiProperty()
    email: string;
    @ApiProperty()
    address: string;
    @ApiProperty()
    phone: string;
    @ApiProperty()
    password: string;
    @ApiProperty()
    role: "client" | "expert";
    @ApiProperty()
    state: "active" | "inactive";
}

export class LoginUserDTO {
    @ApiProperty()
    email: string;
    @ApiProperty()
    password: string;
}