import { IsArray, IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class TwitDTO {
  @IsString()
  id: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsBoolean()
  isPublic: boolean;
}
