import { IsString, IsNotEmpty } from 'class-validator';

export class GetUserDto {
  @IsString()
  @IsNotEmpty()
  readonly _id: string;
}
