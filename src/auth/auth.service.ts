import { Injectable } from '@nestjs/common';
import StudentRegisterDto from './dto/register.dto.js';
import { UserService } from '../user/user.service.js';

@Injectable()
export class AuthService {
  constructor(private readonly userservice: UserService) {}
  async register(studentRegisterDto: StudentRegisterDto) {
    const user = await this.userservice.create(studentRegisterDto);
    if (!user) {
      throw new Error('User not created');
    }
    console.log(user);
    return user;
  }
}
