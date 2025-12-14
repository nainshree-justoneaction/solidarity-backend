/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { ConflictException, Injectable } from '@nestjs/common';
import StudentRegisterDto, { Role } from './dto/register.dto.js';
import { UserService } from '../user/user.service.js';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    private readonly userservice: UserService,
    private readonly jwtservice: JwtService,
  ) {}
  async register(studentRegisterDto: StudentRegisterDto) {
    const user = await this.userservice.create(studentRegisterDto);
    if (!user) {
      throw new ConflictException('User not created');
    }
    console.log(user);
    return user;
  }
  async hashPassword(password: string) {
    const saltRounds = 10; // industry standard
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    return await bcrypt.hash(password, saltRounds);
  }
  async comparePassword(password: string, email: string) {
    const user = await this.userservice.findByEmail(email);
    if (!user) {
      throw new ConflictException('User not found');
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-assignment
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new ConflictException('Invalid password');
    }
    return user;
  }
  async generateAccessToken(user: { id: string; email: string; role: Role }) {
    return this.jwtservice.signAsync(
      {
        sub: user.id,
        email: user.email,
        role: user.role,
      },
      {
        secret: process.env.JWT_ACCESS_SECRET,
        expiresIn: '1d',
      },
    );
  }
  async generateRefreshToken(user: { id: string; email: string; role: Role }) {
    return this.jwtservice.signAsync(
      {
        sub: user.id,
        email: user.email,
        role: user.role,
      },
      {
        secret: process.env.JWT_REFRESH_SECRET,
        expiresIn: '7d',
      },
    );
  }
  async saveRefreshToken(userId: string, token: string) {
    const hash = await bcrypt.hash(token, 10);

    return await this.userservice.updateRefreshToken(userId, hash);
  }
}
