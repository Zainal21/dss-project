import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entities/users.entity';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { ApiResponse } from 'src/shared/utils/api-response.interface';
const id: string = uuid();

const saltOrRounds = 10;

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users)
    private UserRepository: Repository<Users>,
    private jwtService: JwtService,
  ) {}

  /**
   * [signUp]
   *
   * @param   {RegisterDto<ApiResponse>}  RegisterDto  [RegisterDto]
   *
   * @return  {Promise<ApiResponse>}                   [return]
   */
  async signUp(RegisterDto: RegisterDto): Promise<ApiResponse> {
    const user = await this.UserRepository.findOneBy({
      email: RegisterDto.email,
    });

    if (user) throw new BadRequestException('User already exist');

    const passwordhash = await bcrypt.hash(RegisterDto.password, saltOrRounds);
    RegisterDto.password = passwordhash;
    const register = await this.UserRepository.save({
      id: id,
      ...RegisterDto,
    });

    if (!register) throw new BadRequestException('Register Data Invalid value');

    return {
      statusCode: 200,
      message: 'user register successfully',
      data: register,
    };
  }

  /**
   * [login]
   *
   * @param   {LoginDto<ApiResponse>}  LoginDto  [LoginDto]
   *
   * @return  {Promise<ApiResponse>}             [return]
   */
  async login(LoginDto: LoginDto): Promise<ApiResponse> {
    const user = await this.UserRepository.findOneBy({
      email: LoginDto.email,
    });

    if (!user) throw new NotFoundException('User not found');

    const isPasswordMatch = await bcrypt.compare(
      LoginDto.password,
      user?.password,
    );

    if (!isPasswordMatch) throw new BadRequestException('password not match');

    const payload = { sub: user.id, username: user.email };

    return {
      statusCode: 200,
      message: 'Login successfully',
      data: {
        access_token: await this.jwtService.signAsync(payload),
      },
    };
  }
}
