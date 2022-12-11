import { User as UserEntity } from '../users/entities/User';

import { AuthService } from './auth.service';
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import LoginDto, {
  SuccessfullyLoggedIn,
  UnauthorizedLogin,
} from './dtos/Login.dto';
import { Request } from 'express';
import { Public } from './utils/isPublic.decorator';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import CreateUserDto, { CreatedUserDto } from './dtos/CreateUser.dto';
import User from './utils/user.decorator';
import ChangePasswordDto from './dtos/ChangePasssword.dto';

@ApiTags('Authentication')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiUnauthorizedResponse({
    description: 'Provide a valid email and password',
    type: UnauthorizedLogin,
  })
  @ApiOkResponse({
    description: 'Successfully LoggedIn',
    type: SuccessfullyLoggedIn,
  })
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @Public()
  async loginUser(@Body() body: LoginDto) {
    return await this.authService.loginUser(body.email, body.password);
  }

  @Post('create')
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({
    description: 'Provide a valid token',
    type: UnauthorizedLogin,
  })
  @ApiBadRequestResponse({
    description: 'Provide the complete data as specified by the schema',
    type: CreateUserDto,
  })
  @ApiCreatedResponse({
    description: 'User has been successfully created',
    type: CreatedUserDto,
  })
  async createUser(@Body() body: CreateUserDto) {
    return this.authService.createUser(body);
  }

  @ApiBearerAuth()
  @ApiUnauthorizedResponse({
    description: 'Provide a valid token',
    type: UnauthorizedLogin,
  })
  @ApiBadRequestResponse({
    description: 'Provide the complete data as specified by the schema',
    type: CreateUserDto,
  })
  @ApiOkResponse({
    description: 'User password has been successfully updated',
    type: CreatedUserDto,
  })
  @ApiBody({
    description: 'Change password to what you can remember',
    type: ChangePasswordDto,
  })
  @Patch('change-password')
  async changePassword(
    @Body('newPassword') newPassword: string,
    @User('id', ParseIntPipe) userId: number,
  ) {
    return this.authService.updatePassword(newPassword, userId);
  }
}
