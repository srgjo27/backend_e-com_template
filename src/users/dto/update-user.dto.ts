import { IsOptional, IsString, MinLength, ValidateNested } from 'class-validator';
import { IsStrongPassword } from 'src/helper/custom_validator_password';
import { Profile } from '../entity/profile.entity';
import { Type } from 'class-transformer';
import { Role } from 'src/enums/roles.enum';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  username?: string;

  @IsOptional()
  @IsString()
  @MinLength(6)
  @IsStrongPassword()
  password?: string;

  @IsOptional()
  role?: Role;

  @IsOptional()
  @ValidateNested()
  @Type(() => Profile)
  profile?: Partial<Profile>;
}
