import {
  MiddlewareConsumer,
  Module,
  Post,
  RequestMethod,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserController, UsersController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserRepository } from './user.repository';
import { AuthMiddleware } from 'src/auth/auth.middleware';
import { Friend } from 'src/friends/entities/friend.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Post, Friend])],
  controllers: [UserController, UsersController],
  providers: [UserService, UserRepository],
  exports: [UserRepository],
})
export class UserModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: 'user', method: RequestMethod.POST });
  }
}
