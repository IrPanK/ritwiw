import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IsNotEmpty, IsString } from 'class-validator';

export const GetUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);

export class GetUserDTO {
  @IsNotEmpty()
  @IsString()
  googleId: string;

  @IsNotEmpty()
  @IsString()
  picture: string;
}
