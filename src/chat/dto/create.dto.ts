import { IsNotEmpty, IsOptional, IsString, IsNumber } from 'class-validator';

export class CreateMessageDto {
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsNotEmpty()
  @IsNumber()
  recipientId: number;

  @IsNotEmpty()
  @IsString()
  message: string;

  @IsOptional()
  @IsNumber()
  replyToId?: number;
}
