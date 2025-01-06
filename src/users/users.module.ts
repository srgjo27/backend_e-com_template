import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { AuthModule } from '../auth/auth.module';
import { UsersController } from './controller/users.controller';
import { UsersService } from './service/users.service';
import { Profile } from './entity/profile.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User, 
      Profile
    ]), 
    forwardRef(() => AuthModule), 
  ],
  controllers: [UsersController], 
  providers: [UsersService], 
  exports: [UsersService], 
})
export class UsersModule {}
