import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import * as jwt from 'jsonwebtoken';
import { Socket } from 'socket.io';
import { UserService } from 'src/user/user.service';

@Injectable()
export class ChatGuard implements CanActivate {
  constructor(private readonly userService: UserService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const client = context.switchToWs().getClient();

    // const token = client.handshake.headers.authorization;
    const actualToken = client.handshake.auth.token;

    if (!actualToken) {
      return false;
    }

    try {
      const decoded = jwt.verify(actualToken, 'test-crud') as any;
      console.log('asd', decoded);

      return new Promise((resolve, reject) => {
        return this.userService.findOne(decoded.user_id).then((user) => {
          if (user) {
            client.data.user = user.data;
            resolve(true);
          } else {
            this.sendError(client, 'User not authenticated');
            reject(false);
          }
        });
      });
    } catch (ex) {
      console.log(ex);
      this.sendError(ex, 'Invalid or expired token');
      return false;
    }
  }
  private sendError(client: Socket, message: string): void {
    client.emit('error', { message });
    // client.disconnect();
  }
}
