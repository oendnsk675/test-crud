import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private postRepository: Repository<Post>,
  ) {}

  async create({ filename }: any, { content }: any) {
    try {
      const payload = {
        content,
        image: filename,
      };
      const post = this.postRepository.create(payload);
      await this.postRepository.save(post);
      return {
        message: 'Successfully create post',
      };
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async findAll() {
    const data = await this.postRepository.find();
    return {
      message: 'Successfull retrieve data post',
      data,
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
