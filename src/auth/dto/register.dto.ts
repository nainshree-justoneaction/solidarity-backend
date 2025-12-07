import { IsEmail, IsStrongPassword } from 'class-validator';

export default class StudentRegisterDto {
  fname: string;
  lname: string;

  @IsEmail()
  email: string;

  @IsStrongPassword()
  password: string;
}
