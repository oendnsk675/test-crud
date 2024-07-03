import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';
import { UnauthorizedException, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { ChatGuard } from './chat.guard';
import { CreateMessageDto } from './dto/create.dto';

@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(
    private readonly chatService: ChatService,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  private activeUsers: Map<string, number> = new Map();

  async handleConnection(@ConnectedSocket() client: Socket) {
    try {
      // const token = client.handshake.headers.authorization;

      const actualToken = client.handshake.auth.token;

      if (!actualToken) {
        throw new UnauthorizedException('Token not provided');
      }

      const jwtPayload = this.jwtService.verify(actualToken, {
        secret: 'test-crud',
      });

      const user = await this.userService.findOne(jwtPayload.user_id);

      if (!user) {
        throw new UnauthorizedException('Invalid token');
      }

      this.activeUsers.set(client.id, user.data.user_id);
      console.log(`Client connect: ${client.id}:${user.data.user_id}`);
    } catch (error) {
      console.error('Connection error:', error.message);
      client.disconnect();
    }
  }

  handleDisconnect(@ConnectedSocket() client: Socket) {
    // console.log(`Client disconnected: ${client.id}`);
    this.activeUsers.delete(client.id);
  }

  @UseGuards(ChatGuard)
  @SubscribeMessage('message')
  async handleMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: CreateMessageDto,
  ) {
    payload['user_id'] = client.data.user.user_id;
    // console.log(payload);

    // // Save message to the database
    await this.chatService.saveMessage(payload);

    const recipientSocketId = [...this.activeUsers.entries()].find(
      ([socketId, user_id]) => user_id === payload.recipientId,
    )?.[0];

    if (recipientSocketId) {
      this.server.to(recipientSocketId).emit('message', {
        message: payload.message,
        from: this.activeUsers.get(client.id),
      });
    }
  }
}
