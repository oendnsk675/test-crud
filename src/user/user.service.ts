import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FriendRepository } from 'src/friends/user.repository';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly friendRepository: FriendRepository,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }

  async findAll(user_id: number): Promise<any> {
    const subQuery = this.friendRepository
      .createQueryBuilder('friend')
      .select('friend.friend_id')
      .where('friend.user_id = :user_id', { user_id });

    const users = await this.userRepository
      .createQueryBuilder('user')
      .where('user.user_id != :user_id', { user_id })
      .andWhere(`user.user_id NOT IN (${subQuery.getQuery()})`)
      .setParameters(subQuery.getParameters())
      .getMany();
    return {
      message: 'Successfull retrieve data users',
      data: users,
    };
  }

  async findOne(user_id: number) {
    const user = await this.userRepository.findOne({ where: { user_id } });
    return {
      message: 'Successfull retrieve data user',
      data: user,
    };
  }

  async findByUsername(username: string) {
    return await this.userRepository.findOne({ where: { username } });
  }

  async findByEmail(email: string) {
    return await this.userRepository.findOne({ where: { email } });
  }

  async update(user_id: number, updateUserDto: UpdateUserDto) {
    await this.userRepository.update({ user_id }, updateUserDto);
    return {
      message: 'Successfull update data user',
    };
  }

  async remove(id: number) {
    await this.userRepository.delete(id);
    return {
      message: 'Successfull delete data user',
    };
  }
}
