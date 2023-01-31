import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  Res,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { RegisterDto } from './dto/user.dto';
import { ChangePasswordDto } from './dto/user.dto';
import { SessionAuthGuard } from '../auth/guard/session.guard';
import { FastifyReply, FastifyRequest } from 'fastify';
import { UserRequest } from '../auth/guard/expandedInterface.interface';
import { generateExpirationDate } from '../common/Util/util.coockie';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/register')
  async сreateUser(@Body() dto: RegisterDto) {
    const result = await this.usersService.insertUser(
      dto.username,
      dto.password,
    );
    return {
      message: 'User successfully registered',
      userId: result.id,
      userName: result.username,
    };
  }

  @Post('/login')
  async login(
    @Request() req: FastifyRequest,
    @Body() dto: RegisterDto,
    @Res() res: FastifyReply,
  ) {
    const user = await this.usersService.loginUser(dto);

    if (user) {
      res.setCookie('sessionId', user._id.toString(), {
        signed: true,
        httpOnly: true,
      });
      res.setCookie('CookieExpir', generateExpirationDate().toString(), {
        signed: true,
        httpOnly: true,
      });
    }
    res.send(user);
  }

  @UseGuards(SessionAuthGuard)
  @Post('/change-password')
  async changePassword(
    @Request() req: UserRequest,
    @Body() changePasswordDto: ChangePasswordDto,
  ) {
    const username = req.user.username;
    const response = await this.usersService.changeUserPassword(
      changePasswordDto,
      username,
    );
    return response;
  }

  @UseGuards(SessionAuthGuard)
  @Get('/logout')
  logout(@Request() req: FastifyRequest, @Res() res: FastifyReply) {
    res.setCookie('sessionId', 'null', {
      signed: true,
      httpOnly: true,
    });
    res.setCookie('CookieExpir', 'null', {
      signed: true,
      httpOnly: true,
    });
    res.send({ message: 'Logout user' });
  }
}
