import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '../interfaces/user.interface';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(userDto: CreateUserDto) {
    const user = await this.validateUser(userDto);
    return this.generateToken(user);
  }

  async signup(userDto: CreateUserDto) {
    const candidate = await this.userService.getUserByLogin(userDto.login);

    if (candidate) {
      throw new BadRequestException('User with this login already exists');
    }

    const hashPassword = await bcrypt.hash(
      userDto.password,
      process.env.CRYPT_SALT,
    );
    const user = await this.userService.create({
      ...userDto,
      password: hashPassword,
    });
    return this.generateToken(user);
  }

  private async generateToken(user: User) {
    const payload = { login: user.login, id: user.id };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  private async validateUser(userDto: CreateUserDto) {
    const user = await this.userService.getUserByLogin(userDto.login);
    const passwordEquals = await bcrypt.compare(
      userDto.password,
      user.password,
    );

    if (user && passwordEquals) {
      return user;
    }

    throw new UnauthorizedException('Incorrect login or password');
  }

  async refresh(refreshToken: string) {
    const { userId, login } = await this.jwtService.verify(refreshToken, {
      secret: process.env.JWT_SECRET_REFRESH_KEY,
    });
    const user = await this.userService.getUserByLogin(login);
    if (!user || user.id !== userId) {
      throw new ForbiddenException('User does not exist');
    }
    return this.generateToken(user);
  }
}
