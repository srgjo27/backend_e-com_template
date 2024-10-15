import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt/jwt.strategy';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    PassportModule,
    JwtModule.register({
      privateKey: process.env.JWT_PRIVATE_KEY.replace(/\\n/gm, '\n'),
      publicKey: process.env.JWT_PUBLIC_KEY.replace(/\\n/gm, '\n'),
      signOptions: { expiresIn: '60m' },
    }),
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
