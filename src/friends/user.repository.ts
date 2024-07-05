import { Repository } from 'typeorm';
import { Friend } from './entities/friend.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class FriendRepository extends Repository<Friend> {
  constructor(
    @InjectRepository(Friend)
    private friendRepository: Repository<Friend>,
  ) {
    super(
      friendRepository.target,
      friendRepository.manager,
      friendRepository.queryRunner,
    );
  }
}
