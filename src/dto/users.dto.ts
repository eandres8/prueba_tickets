
export class CreateUserDTO {
    first_name: string;
    last_name: string;
    email: string;
    address: string;
    phone: string;
    password: string;
    role: "client" | "expert";
    state: "active" | "inactive";
}

export class LoginUserDTO {
    email: string;
    password: string;
}