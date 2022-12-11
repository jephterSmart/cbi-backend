import {
  SuccessfullyLoggedIn,
  UnauthorizedLogin,
} from '../auth/dtos/Login.dto';
import { UsersService } from './users.service';
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseInterceptors,
} from '@nestjs/common';
import CreateUserDto from '../auth/dtos/CreateUser.dto';
import { User } from './entities/User';
import {
  ApiBearerAuth,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import UserDto from './dtos/User.dto';
import { Request } from 'express';

@ApiBearerAuth()
@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOkResponse({
    description: 'Users available in the system',
    type: [UserDto],
  })
  @ApiUnauthorizedResponse({
    description: 'Provide a valid bearer token ',
    type: UnauthorizedLogin,
  })
  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async getAllUsers(@Req() req): Promise<User[]> {
    return this.usersService.getAllUsers();
  }
  @ApiNoContentResponse({
    description: 'User successfully deleted from the system',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.deleteUser(id);
  }
}
