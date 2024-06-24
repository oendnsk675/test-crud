import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, Length } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Length(1, 255)
  @ApiProperty({
    example: 'Osi',
  })
  username: string;

  @IsEmail()
  @Length(1, 255)
  @ApiProperty({
    example: 'Osi@mail.com',
  })
  email: string;

  @IsString()
  @Length(8, 255)
  @ApiProperty({
    example: 'password123',
    minimum: 8,
  })
  password: string;

  @IsString()
  @Length(1, 255)
  @ApiProperty({
    example: 'Osi@mail.com',
    uniqueItems: true,
  })
  fullname: string;
}
