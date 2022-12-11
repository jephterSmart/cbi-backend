import { ApiProperty } from '@nestjs/swagger';

class UserDto {
  @ApiProperty({ description: 'A valid email of the user being created' })
  email: string;

  @ApiProperty({ description: 'The default password to be used by user' })
  @ApiProperty({ description: 'First Name of user' })
  firstName: string;

  @ApiProperty({ description: 'Middle Name of user', required: false })
  middleName?: string;

  @ApiProperty({ description: 'Last Name of user' })
  lastName: string;

  @ApiProperty({ readOnly: true, description: 'The unique Id of user' })
  id: number;
}

export default UserDto;
