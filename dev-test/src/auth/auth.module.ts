import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';


@Module({
  imports: [UsersModule, PassportModule.register({ session: true })],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
