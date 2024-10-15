import { IsOptional, IsString, MinLength } from 'class-validator';
import { IsStrongPassword } from 'src/helper/custom_validator_password';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @MinLength(6)
  @IsStrongPassword()
  password?: string;

  @IsOptional()
  @IsString()
  profile?: string;
}
