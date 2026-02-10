import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';

import { PostsService } from './post.service';
import { jwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { CurrentUser } from 'src/auth/decorator/current-user.decorator';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @UseGuards(jwtAuthGuard)
  @Post()
  async create(
    @CurrentUser() user: { userId: number },
    @Body()
    body: {
      title: string;
      content: string;
    },
  ) {
    return this.postsService.createPosts({
      title: body.title,
      content: body.content,
      user: user.userId,
    });
  }

  @UseGuards(jwtAuthGuard)
  @Get()
  async findAll() {
    return this.postsService.findAllPosts();
  }

  @UseGuards(jwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.postsService.findPostOneBy(id);
  }

  @UseGuards(jwtAuthGuard)
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: any,
    @CurrentUser() user: { userId: number },
  ) {
    return this.postsService.updatePostById(id, user.userId, body);
  }

  @UseGuards(jwtAuthGuard)
  @Delete(':id')
  async remove(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: { userId: number },
  ) {
    return this.postsService.remove(id, user.userId);
  }
}
