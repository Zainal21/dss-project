import {
  Controller,
  Post,
  Body,
  HttpStatus,
  HttpCode,
  UsePipes,
  ValidationPipe,
  BadRequestException,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('register')
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(@Body() RegisterDto: RegisterDto, @Res() res: Response) {
    const register = await this.authService.signUp(RegisterDto);

    if (!register)
      throw new BadRequestException('Invalid Parameter when register user');

    res.status(HttpStatus.OK).json({
      statusCode: register.statusCode,
      message: register.message,
      data: register.data,
    });
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe({ transform: true }))
  async login(@Body() LoginDto: LoginDto, @Res() res: Response) {
    const authenticated = await this.authService.login(LoginDto);

    if (!authenticated || authenticated?.statusCode > 200)
      throw new BadRequestException('Invalid login, please try again');

    res.status(HttpStatus.OK).json({
      statusCode: authenticated.statusCode,
      message: authenticated.message,
      data: authenticated.data,
    });
  }
}
