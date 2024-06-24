import { Controller, Post, Body, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { ResponseInterceptor } from 'src/common/response/response.interceptor';
import { SignInDto } from './dto/signin.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
@UseInterceptors(ResponseInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Signup' })
  @Post('sign-up')
  async signUp(@Body() createAuthDto: CreateUserDto) {
    return await this.authService.signUp(createAuthDto);
  }

  @ApiOperation({ summary: 'Signin' })
  @Post('sign-in')
  async signIn(@Body() data: SignInDto) {
    return await this.authService.signIn(data);
  }
}
