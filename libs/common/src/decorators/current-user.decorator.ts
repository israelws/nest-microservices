import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserDocument } from '../../../apps/auth/src/users/models/user.schema';

const getCurrentUserByContext = (context: ExecutionContext): UserDocument => {
  const request = context.switchToHttp().getRequest();
  console.log('request', request);
  
  return request.user;
};

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) =>
    getCurrentUserByContext(context),
);
