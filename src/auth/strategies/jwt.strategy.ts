import { UsersService } from '../../users/users.service';
import { AuthService } from '../auth.service';
import { ConfigService } from '@nestjs/config';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private readonly configService;
  private readonly usersService;
  constructor(configService: ConfigService, usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
      passReqToCallback: true,
    });
    this.configService = configService;
    this.usersService = usersService;
  }

  async validate(req: Request, payload: any) {
    const fullUser = await this.usersService.findOne(payload.email);
    if (!fullUser) throw new UnauthorizedException();
    return { userId: payload.sub, ...fullUser };
  }
}
