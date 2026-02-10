import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

import { jwtAuthGuard } from './guard/jwt-auth.guard';
import { JwtStrategy } from './strategies/jwt.strategies';
import { UsersModule } from '../users/user.module';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: 'SECRET_KEY_DEV',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, jwtAuthGuard],
  exports: [jwtAuthGuard],
})
export class AuthModule {}
