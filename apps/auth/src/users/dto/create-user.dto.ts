import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsStrongPassword,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { RoleDto } from './roles.dto';
import { Type } from 'class-transformer';
// import { Type } from 'class-transformer';

export class CreateUserDto {
  @ApiProperty({
    description: 'The email of the user',
    type: String,
    format: 'email',
    example: 'abc@domain.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsStrongPassword()
  password: string;

  @ApiProperty()
  @IsOptional()
  @IsArray()
  @Type(() => RoleDto)
  roles?: RoleDto[];
}
