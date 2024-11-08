import { IsEmail, IsNotEmpty, IsOptional, MinLength, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { IsStrongPassword } from 'src/helper/custom_validator_password';
import { Profile } from '../entity/profile.entity';
import { Role } from 'src/enums/roles.enum';

export class CreateUserDto {
  @IsNotEmpty()
  username: string;
  
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  @IsStrongPassword()
  password: string;
  
  @IsOptional()
  role?: Role;

  @IsOptional()
  @ValidateNested()
  @Type(() => Profile)
  profile?: Profile;
}