import {
  IsEmail,
  IsStrongPassword,
  IsNotEmpty,
  MinLength,
  MaxLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum Role {
  Student = 'Student',
  Admin = 'Admin',
  Institute = 'Institute',
  Ngo = 'Ngo',
  Faculty = 'Faculty',
}

export default class RegisterDto {
  @ApiProperty({
    example: 'Dheeraj Patel',
    description: 'Full name of the user',
  })
  @IsNotEmpty()
  fullName: string;

  @ApiProperty({
    example: '9876543230',
    description: 'mobile number',
  })
  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(10)
  phone: string;
  @ApiProperty({
    example: 'Student',
    description:
      'Student,Faculty,Ngo,Institute,Admin  are roles which is given by user',
  })
  role?: Role;

  @ApiProperty({
    example: 'pateldheeraj8345@gmail.com',
    description: 'User email address',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'Dheeraj@123',
    description: 'User password (min 6 characters)',
  })
  @IsStrongPassword()
  @MinLength(6)
  password: string;
}
