import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import CreateUserDto from '../auth/dtos/CreateUser.dto';
import { User } from './entities/User';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async findOne(email: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: {
        email,
      },
    });
  }
  async createUser(body: CreateUserDto): Promise<User | null> {
    const existingUser = await this.findOne(body.email);
    if (existingUser) throw new BadRequestException('User already exists');
    const newUser = this.userRepository.create(body);
    return this.userRepository.save(newUser);
  }

  async getAllUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }
  async deleteUser(id: number) {
    await this.userRepository.delete(id);
  }
  async updatePassowrd(password: string, userId: number) {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) throw new UnauthorizedException('User does not exist');
    user.password = password;
    user.isConfirmed = true;
    return await this.userRepository.save(user);
    //  await this.userRepository.update(
    //   { id: userId },
    //   { password, isConfirmed: true },
    // );
  }
}
