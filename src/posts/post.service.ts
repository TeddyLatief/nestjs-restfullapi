import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Post } from './post.entity';
import { User } from '../users/user.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createPosts(data: {
    title: string;
    content: string;
    user: number;
  }): Promise<Post> {
    const user = await this.userRepository.findOneBy({ id: data.user });

    if (!user) throw new NotFoundException('User not found');

    const post = new Post();
    post.title = data.title;
    post.content = data.content;
    post.user = user;

    return this.postRepository.save(post);
  }

  async findAllPosts(): Promise<Post[]> {
    return this.postRepository.find({
      relations: ['user'],
    });
  }

  async findPostOneBy(id: number): Promise<Post> {
    const post = await this.postRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!post) throw new NotFoundException('Post not found');

    return post;
  }

  async updatePostById(
    id: number,
    userId: number,
    data: Partial<Post>,
  ): Promise<Post> {
    const post = await this.findPostOneBy(id);

    if (post.user.id !== userId) {
      throw new ForbiddenException('Not your post');
    }

    Object.assign(post, data);
    return this.postRepository.save(post);
  }

  async remove(id: number, userId: number) {
    const post = await this.findPostOneBy(id);

    if (post.user.id !== userId) {
      throw new ForbiddenException('Not your post');
    }

    await this.postRepository.remove(post);

    return { message: 'Post deleted successfully' };
  }
}
