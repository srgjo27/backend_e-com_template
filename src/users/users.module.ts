import { forwardRef, Module } from '@nestjs/common';
import { User } from './entity/user.entity';
import { AuthModule } from '../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './controller/users.controller';
import { UsersService } from './service/users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]), 
    forwardRef(() => AuthModule), 
  ],
  controllers: [UsersController], 
  providers: [UsersService], 
  exports: [UsersService], 
})
export class UsersModule {}
