import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import StudentRegisterDto from './dto/register.dto.js';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() studentRegisterDto: StudentRegisterDto) {
    return this.authService.register(studentRegisterDto);
  }
}
