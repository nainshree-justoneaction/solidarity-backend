export class CreateUserDto {
    email: string;
    password: string;
    name?: string;
    role?: string;
}

export class UpdateUserDto {
    email?: string;
    password?: string;
    name?: string;
    role?: string;
}
