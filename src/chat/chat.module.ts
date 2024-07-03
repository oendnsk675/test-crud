import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { UserRepository } from 'src/user/user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Chat } from './entities/chat.entity';
import { ChatController } from './chat.controller';

@Module({
  providers: [
    ChatService,
    ChatGateway,
    JwtService,
    UserService,
    UserRepository,
  ],
  imports: [
    JwtModule.register({
      secret: 'test-crud',
      signOptions: { expiresIn: '1d' },
    }),
    TypeOrmModule.forFeature([User, Chat]),
  ],
  controllers: [ChatController],
})
export class ChatModule {}
