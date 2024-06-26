import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }

  async findAll(): Promise<any> {
    const users = await this.userRepository.find();
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
