import { User as UserEntity } from '../../users/entities/User';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

const User = createParamDecorator(
  (data: unknown, context: ExecutionContext): Partial<UserEntity> => {
    const req = context.switchToHttp().getRequest();
    return data ? req.user[data as string] : req.user;
  },
);

export default User;
