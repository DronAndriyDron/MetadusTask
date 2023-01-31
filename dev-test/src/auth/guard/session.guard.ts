import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { Request } from 'express';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {User} from "../../users/models/users.model";
import {UserRequest} from "./expandedInterface.interface";

@Injectable()
export class SessionAuthGuard implements CanActivate {
    constructor(@InjectModel('user') private readonly userModel: Model<User>)
    {

    }
    async canActivate(context: ExecutionContext):Promise<boolean>  {
        const request = context.switchToHttp().getRequest<UserRequest>();
        const sessionId = request.cookies.sessionId.split('.')[0];
        const checkExpireDate = request.cookies.CookieExpir.split('.')[0];

        const isExpired= checkExpireDate < new Date().getTime();

        const user = sessionId === "null" ?await this.userModel.findById(null):await this.userModel.findById(sessionId);

        if (user===null||!user||isExpired) {
            throw new HttpException('Unauthorized access', HttpStatus.UNAUTHORIZED);
        }
        request.user={
            _id:user._id,
            username:user.username
        };
        return true;
    }
}