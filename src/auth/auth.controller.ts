/* eslint-disable prettier/prettier */
import { Controller, Post, Body, Res } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import RegisterDto, { Role } from './dto/register.dto.js';
import LoginDto from './dto/login.dto.js';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import type { Response } from 'express';

@Controller('auth')
@ApiTags('Auth') 
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
    @ApiOperation({ summary: 'User Resgister' })
  @ApiResponse({ status: 200, description: 'Register successful' })
  async register(@Body() RegisterDto: RegisterDto , @Res() res: Response) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const pass = await this.authService.hashPassword(RegisterDto.password);
    RegisterDto.password = pass as string;
    const user = await this.authService.register(RegisterDto);
      const generateAccessToken = await this.authService.generateAccessToken({
      id: user.id,
      email: user.email,
      role: user.role as Role,
    });
    const generateRefreshToken = await this.authService.generateRefreshToken({
      id: user.id,
      email: user.email,
      role: user.role as Role,
    });
    const user2 = await this.authService.saveRefreshToken(user.id, generateRefreshToken);
    res.cookie('refreshToken', generateRefreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.cookie('accessToken', generateAccessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000,
    });
    return res.json({
      user:user2,
      accessToken: generateAccessToken,
      refreshToken: generateRefreshToken,
    });
  }



  
  @Post('login')
 @ApiOperation({ summary: 'User Login' })
  @ApiResponse({ status: 200, description: 'Login successful' })
  async login(@Body() LoginDto: LoginDto, @Res() res: Response) {
    const user = await this.authService.comparePassword(
      LoginDto.password,
      LoginDto.email,
    );
    const generateAccessToken = await this.authService.generateAccessToken({
      id: user.id,
      email: user.email,
      role: user.role as Role,
    });
    const generateRefreshToken = await this.authService.generateRefreshToken({
      id: user.id,
      email: user.email,
      role: user.role as Role,
    });
        const user2 = await this.authService.saveRefreshToken(user.id, generateRefreshToken);
    res.cookie('refreshToken', generateRefreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.cookie('accessToken', generateAccessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000,
    });
    return res.json({
      user:user2,
      accessToken: generateAccessToken,
      refreshToken: generateRefreshToken,
    });
  }
}
