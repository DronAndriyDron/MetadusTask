import {
    Body,
    Controller,
    Get,
    Post,
    UseGuards,
    Request, HttpException, HttpStatus,
} from '@nestjs/common';

import * as bcrypt from 'bcrypt';
import {AuthenticatedGuard} from 'src/auth/guard/authenticated.guard';
import {LocalAuthGuard} from 'src/auth/guard/local.auth.guard';
import {UsersService} from './users.service';
import {ReGisterDto} from "./DTO/user.dto";
import {ChangePasswordDto} from "./DTO/user.dto";

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {
    }

    @Post('/register')
    async сreateUser(
        @Body() dto: ReGisterDto
    ) {

        const result = await this.usersService.insertUser(
            dto.username,
            dto.password,
        );
        return {
            message: 'User successfully registered',
            userId: result.id,
            userName: result.username
        };
    }


    @UseGuards(LocalAuthGuard)
    @Post('/login')
    login(@Request() req): any {
        return {
            User: req.user,
            msg: 'User logged in'
        };
    };


    @UseGuards(AuthenticatedGuard)
    @Post('/change-password')
    async changePassword(@Request() req,@Body() changePasswordDto: ChangePasswordDto){

        const response = await this.usersService.changeUserPassword(changePasswordDto)

        return response;
    };


    @Get('/logout')
    logout(@Request() req): any {
        req.session.destroy()
        return {message: 'Logout user'}
    }
}