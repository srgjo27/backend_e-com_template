import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { IsStrongPassword } from 'src/helper/custom_validator_password';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  @IsStrongPassword()
  password: string;

  @IsNotEmpty()
  role: string; 
}