import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateFriendDto {
  @IsNotEmpty()
  @IsNumber()
  friendId: number;

  @IsOptional()
  isAccepted: boolean;
}
