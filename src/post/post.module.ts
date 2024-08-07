import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController, PostsController } from './post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { User } from 'src/user/entities/user.entity';

@Module({
  controllers: [PostController, PostsController],
  providers: [PostService],
  imports: [TypeOrmModule.forFeature([Post, User])],
})
export class PostModule {}
