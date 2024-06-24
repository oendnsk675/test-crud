import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsOptional, Length } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @Length(1, 255)
  @ApiProperty({
    example: 'Osyi',
  })
  username?: string;

  @IsOptional()
  @IsEmail()
  @Length(1, 255)
  @ApiProperty({
    example: 'osyi@email.com',
  })
  email?: string;

  @IsOptional()
  @IsString()
  @Length(1, 255)
  password?: string;

  @IsOptional()
  @IsString()
  @Length(1, 255)
  @ApiProperty({
    example: 'Osyicozy',
  })
  fullname?: string;
}
