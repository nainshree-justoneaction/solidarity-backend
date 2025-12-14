/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import RegisterDto from '../auth/dto/register.dto.js';
import { PrismaService } from '../prisma.service.js';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(RegisterDto: RegisterDto) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access

    return await this.prisma.user.create({
      data: {
        fullname: RegisterDto.fullName,
        phone: RegisterDto.phone,
        email: RegisterDto.email,
        password: RegisterDto.password,
        role: RegisterDto.role,
      },
    });
  }
  async findByEmail(email: string) {
    return await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });
  }
  async findById(id: string) {
    return await this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });
  }
  async updateRefreshToken(userId: string, refreshToken: string) {
    return await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        refreshToken: refreshToken,
      },
    });
  }
}
