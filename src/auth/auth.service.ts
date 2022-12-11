import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import CreateUserDto from './dtos/CreateUser.dto';

@Injectable()
export class AuthService {
  private readonly salt;
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {
    this.salt = bcrypt.genSaltSync();
  }

  async loginUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(email);
    if (user && this.isDataMatch(pass, user.password)) {
      const { password, ...result } = user;
      const token = await this.getToken(result);
      return { ...result, ...token };
    }
    throw new UnauthorizedException();
  }

  async createUser(body: CreateUserDto) {
    const { password, ...rest } = body;
    const hashedPass = await this.hashData(password);
    return this.usersService.createUser({ password: hashedPass, ...rest });
  }

  async updatePassword(newPassword: string, userId: number) {
    const hashedPass = await this.hashData(newPassword);
    return this.usersService.updatePassowrd(hashedPass, userId);
  }
  private async getToken(user: any) {
    const payload = { email: user.email, sub: user.id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
  private async hashData(data: string): Promise<string> {
    const hash = await bcrypt.hash(data, this.salt);
    return hash;
  }
  private async isDataMatch(rawData: string, hashedData: string) {
    await bcrypt.compare(rawData, hashedData);
  }
}
