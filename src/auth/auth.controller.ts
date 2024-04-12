//#region IMPORTS
import { Body, Controller, Get, Inject, Post, UseGuards } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';

import { NATS_CLIENT } from 'src/config';
import { LoginUserDto, RegisterUserDto } from './dto';
import { AuthGuard } from './guards';
import { Token, User } from './decorators';
import { CurrentUser } from './interfaces';

@Controller('auth')
export class AuthController {
  constructor(@Inject(NATS_CLIENT) private readonly client: ClientProxy) {}

  @Post('register')
  async registerUser(@Body() data: RegisterUserDto) {
    return this.client.send('auth.register.user', data).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }

  @Post('login')
  async loginUser(@Body() data: LoginUserDto) {
    return this.client.send('auth.login.user', data).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }

  //#region VERIFY TOKEN
  @UseGuards(AuthGuard)
  @Get('verify')
  async verifyTokenUser(@User() user: CurrentUser, @Token() token: string) {
    return {
      user,
      token,
    };
  }
}
