import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  googleId: string;

  @IsNotEmpty()
  @IsString()
  googleName: string;

  @IsNotEmpty()
  @IsString()
  googlePicture: string;

  @IsNotEmpty()
  @IsString()
  photo: string;
}
