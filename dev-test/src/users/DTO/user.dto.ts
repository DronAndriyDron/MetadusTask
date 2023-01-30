import {
  IsEmail,
  Matches,
  MaxLength,
  IsString,
  MinLength,
} from 'class-validator';
import {
  VALIDATE_PASSWORD,
  VALIDATE_USER_NAME,
  ADDITIONAL_VALIDATE_USER_NAME,
} from '../../common/Constants/constants';

export class RegisterDto {
  @IsEmail()
  @Matches(VALIDATE_USER_NAME)
  @Matches(ADDITIONAL_VALIDATE_USER_NAME)
  @MaxLength(64)
  username: string;

  @IsString()
  @MinLength(8)
  @MaxLength(64)
  @Matches(VALIDATE_PASSWORD)
  password: string;
}

export class ChangePasswordDto {
  @IsString()
  @MinLength(8)
  @MaxLength(64)
  @Matches(VALIDATE_PASSWORD)
  currentPassword: string;

  @IsString()
  @MinLength(8)
  @MaxLength(64)
  @Matches(VALIDATE_PASSWORD)
  newPassword: string;

  @IsString()
  @MinLength(8)
  @MaxLength(64)
  @Matches(VALIDATE_PASSWORD)
  confirmPassword: string;
}
