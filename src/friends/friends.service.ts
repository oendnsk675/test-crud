import { Injectable } from '@nestjs/common';
import { CreateFriendDto } from './dto/create-friend.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Friend } from './entities/friend.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FriendsService {
  constructor(
    @InjectRepository(Friend)
    private readonly friendRepository: Repository<Friend>,
  ) {}

  async create(createFriendDto: CreateFriendDto, _user_id: number) {
    const data = this.friendRepository.create({
      user: { user_id: _user_id },
      friend: { user_id: createFriendDto.friendId },
    });
    await this.friendRepository.save(data);

    const data2 = this.friendRepository.create({
      user: { user_id: createFriendDto.friendId },
      friend: { user_id: _user_id },
    });
    await this.friendRepository.save(data2);

    return {
      message: 'Successfully add friend',
    };
  }

  async findAll(_user_id: number): Promise<any> {
    // console.log(user_id);

    const data = await this.friendRepository.find({
      relations: ['user', 'friend'],
      where: { user: { user_id: _user_id } },
    });

    return {
      message: 'Succesfully retrieve data friends',
      data,
    };
  }

  remove(id: number) {
    return this.friendRepository.delete(id);
  }
}
