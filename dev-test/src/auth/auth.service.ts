import { UsersService } from '../users/users.service';
import { Injectable, NotAcceptableException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.getUser(username);

    const passwordValid = await bcrypt.compare(password, user.password);

    if (!user) {
      throw new NotAcceptableException('could not find the user');
    }

    if (user && passwordValid) {
      return {
        userId: user.id,
        userName: user.username,
      };
    }

    return null;
  }
}
