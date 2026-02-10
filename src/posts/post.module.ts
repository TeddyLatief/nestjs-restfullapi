import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { PostsService } from './post.service';
import { PostsController } from './post.controller';
import { User } from '../users/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Post, User])],
  providers: [PostsService],
  controllers: [PostsController],
})
export class PostsModule {}
