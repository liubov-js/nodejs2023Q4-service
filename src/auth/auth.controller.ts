import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  login(@Body() userDto: CreateUserDto) {
    return this.authService.login(userDto);
  }

  @Post('signup')
  signup(@Body() userDto: CreateUserDto) {
    return this.authService.signup(userDto);
  }

  @Post('refresh')
  async refresh(@Body() refreshDto: { refreshToken: string }) {
    return await this.authService.refresh(refreshDto.refreshToken);
  }
}
