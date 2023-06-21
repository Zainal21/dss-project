import { Controller, Post, Body, HttpStatus, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { ApiResponse } from 'src/shared/utils/api-response.interface';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('register')
  create(@Body() RegisterDto: RegisterDto) {
    return this.authService.signUp(RegisterDto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body() LoginDto: LoginDto) {
    return this.authService.login(LoginDto);
  }
}
