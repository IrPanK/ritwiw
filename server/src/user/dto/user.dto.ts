import { IsArray, IsString } from 'class-validator';

export class UserDTO {
  @IsString()
  username: string;

  @IsString()
  photo: string;

  @IsString()
  bio: string;

  @IsArray()
  closefriends: string[];
}
