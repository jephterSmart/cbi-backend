import { ApiProperty, IntersectionType } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

class CreateUserDto {
  @ApiProperty({ description: 'A valid email of the user being created' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: 'The default password to be used by user' })
  @IsNotEmpty()
  password: string;

  @ApiProperty({ description: 'First Name of user' })
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ description: 'Middle Name of user', required: false })
  middleName?: string;

  @ApiProperty({ description: 'Last Name of user' })
  @IsNotEmpty()
  lastName: string;
}

class UserId {
  @ApiProperty({
    description: 'The Id of user',
  })
  id: number;
}
export class CreatedUserDto extends IntersectionType(CreateUserDto, UserId) {}

export default CreateUserDto;
