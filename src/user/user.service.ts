import { Injectable } from '@nestjs/common';
import StudentRegisterDto from '../auth/dto/register.dto.js';
import { PrismaService } from '../prisma.service.js';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(studentRegisterDto: StudentRegisterDto) {
    return await this.prisma.user.create({
      data: {
        fname: studentRegisterDto.fname,
        lname: studentRegisterDto.lname,
        email: studentRegisterDto.email,
        password: studentRegisterDto.password,
      },
    });
  }
}
