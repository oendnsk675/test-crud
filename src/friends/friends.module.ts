import { Module } from '@nestjs/common';
import { FriendsService } from './friends.service';
import { FriendsController } from './friends.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Friend } from './entities/friend.entity';
import { UserService } from 'src/user/user.service';
import { UserRepository } from 'src/user/user.repository';
import { FriendRepository } from './user.repository';

@Module({
  controllers: [FriendsController],
  providers: [FriendsService, UserService, UserRepository, FriendRepository],
  imports: [TypeOrmModule.forFeature([User, Friend])],
  exports: [FriendRepository],
})
export class FriendsModule {}
