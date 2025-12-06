import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateUserDto, UpdateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) { }

    async createUser(createUserDto: CreateUserDto) {
        return this.prisma.user.create({
            data: createUserDto,
        });
    }

    async getAllUsers() {
        return this.prisma.user.findMany({
            include: {
                profile: true,
            },
        });
    }

    async getUserById(id: string) {
        return this.prisma.user.findUnique({
            where: { id },
            include: {
                profile: true,
                assessments: true,
                roadmaps: true,
            },
        });
    }

    async updateUser(id: string, updateUserDto: UpdateUserDto) {
        return this.prisma.user.update({
            where: { id },
            data: updateUserDto,
        });
    }

    async deleteUser(id: string) {
        return this.prisma.user.delete({
            where: { id },
        });
    }
}
