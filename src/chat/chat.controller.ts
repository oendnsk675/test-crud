import { Controller, Get, Param, Request, UseGuards } from '@nestjs/common';
import { ChatService } from './chat.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get()
  async findAllMessage(@Request() req) {
    return this.chatService.findAllMessage(req.user.user_id);
  }

  @Get(':friend_id')
  async findMessage(@Param('friend_id') friend_id: number, @Request() req) {
    return this.chatService.findMessage(req.user.user_id, friend_id);
  }
}
