import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

class LoginDto {
  @ApiProperty({ description: 'A valid email', example: 'john@gm.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'A valid password',
    example: 'K@skid',
    minLength: 5,
  })
  @IsNotEmpty()
  @MinLength(5)
  password: string;
}

export class UnauthorizedLogin {
  @ApiProperty()
  statusCode: number;

  @ApiProperty()
  message: string;
}

export class SuccessfullyLoggedIn {
  @ApiProperty()
  access_token: string;
  @ApiProperty({ readOnly: true })
  id: number;
  @ApiProperty()
  firstName: string;
  @ApiProperty()
  lastName: string;
  @ApiProperty({ required: false })
  middleName?: string;
  @ApiProperty()
  email: string;
}

export default LoginDto;
