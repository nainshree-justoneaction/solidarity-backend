import { IsEmail, IsStrongPassword } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export default class LoginDto {
  @IsEmail()
  @ApiProperty({ example: 'pateldheeraj8345@gmail.com' })
  email: string;

  @IsStrongPassword()
  @ApiProperty({ example: 'Dheeraj@123' })
  password: string;
}
