import { Injectable } from '@nestjs/common';
import { Chat } from './entities/chat.entity';
import { Repository } from 'typeorm';
import { CreateMessageDto } from './dto/create.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Chat)
    private chatRepository: Repository<Chat>,
  ) {}

  async saveMessage(payload: CreateMessageDto): Promise<Chat> {
    const message = this.chatRepository.create(payload);
    return await this.chatRepository.save(message);
  }

  async findAll(user_id: number, page: number, limit: number) {
    const data = await this.chatRepository.find({
      where: [{ user_id }, { recipientId: user_id }],
      relations: ['user', 'reply_to'],
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      message: 'Successfull retrieve data user',
      data,
    };
  }
}
