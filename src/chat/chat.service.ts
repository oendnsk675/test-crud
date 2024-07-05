import { Injectable } from '@nestjs/common';
import { Chat } from './entities/chat.entity';
import { Repository } from 'typeorm';
import { CreateMessageDto } from './dto/create.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';

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

  async findMessage(user_id: number, friend_id: number) {
    const data = await this.chatRepository.find({
      where: [{ user_id }, { recipientId: user_id }],
      relations: ['user', 'reply_to'],
    });

    return {
      message: 'Successfull retrieve message',
      data,
    };
  }

  async findAllMessage(user_id: number) {
    const data = await this.chatRepository
      .createQueryBuilder('chat')
      .select([
        'chat.chat_id',
        'chat.user_id',
        'chat.recipientId',
        'chat.message',
        'chat.reply_to',
        'chat.created_at',
        'CASE WHEN chat.user_id = :user_id THEN recipient.username ELSE sender.username END AS recipientUsername',
        'CASE WHEN chat.user_id = :user_id THEN recipient.email ELSE sender.email END AS recipientEmail',
        'CASE WHEN chat.user_id = :user_id THEN recipient.fullname ELSE sender.fullname END AS recipientFullname',
      ])
      .distinctOn([
        'LEAST(chat.user_id, chat.recipientId)',
        'GREATEST(chat.user_id, chat.recipientId)',
      ])
      .leftJoin(User, 'sender', 'sender.user_id = chat.user_id')
      .leftJoin(User, 'recipient', 'recipient.user_id = chat.recipientId')
      .where('chat.user_id = :user_id OR chat.recipientId = :user_id', {
        user_id,
      })
      .orderBy('LEAST(chat.user_id, chat.recipientId)')
      .addOrderBy('GREATEST(chat.user_id, chat.recipientId)')
      .addOrderBy('chat.created_at', 'DESC')
      .getRawMany();

    return {
      message: 'Successfull retrieve all message',
      data,
    };
  }
}
