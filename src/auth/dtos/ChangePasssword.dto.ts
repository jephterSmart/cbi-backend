import { ApiProperty } from '@nestjs/swagger';

class ChangePasswordDto {
  @ApiProperty({
    description: 'Secure password you can remember',
    example: 'K@askid',
  })
  newPassword: string;
}

export default ChangePasswordDto;
