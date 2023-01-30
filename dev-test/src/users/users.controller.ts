import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthenticatedGuard } from 'src/auth/guard/authenticated.guard';
import { LocalAuthGuard } from 'src/auth/guard/local.auth.guard';
import { UsersService } from './users.service';
import { RegisterDto } from './dto/user.dto';
import { ChangePasswordDto } from './dto/user.dto';

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

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  login(@Request() req): any {
    return {
      User: req.user,
      msg: 'You logged in',
    };
  }

  @UseGuards(AuthenticatedGuard)
  @Post('/change-password')
  async changePassword(
    @Request() req,
    @Body() changePasswordDto: ChangePasswordDto,
  ) {
    const username = req.user.userName;
    const response = await this.usersService.changeUserPassword(
      changePasswordDto,
      username,
    );
    return response;
  }

  @UseGuards(AuthenticatedGuard)
  @Get('/logout')
  logout(@Request() req): any {
    req.session.destroy();
    return { message: 'Logout user' };
  }
}
