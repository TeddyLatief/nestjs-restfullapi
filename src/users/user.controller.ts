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
import { UserService } from './user.service';

// public view decorator
import { Public } from 'src/auth/decorator/public.decorator';

// strict auth guard
import { jwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Post()
  async createUser(@Body() body: Partial<any>) {
    return await this.userService.createUsers(body.email, body.password);
  }

  @UseGuards(jwtAuthGuard)
  @Get()
  async getAllUsers() {
    return await this.userService.findAllUsers();
  }

  @UseGuards(jwtAuthGuard)
  @Get(':id')
  async getUserById(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.findUserBy(id);
  }

  @UseGuards(jwtAuthGuard)
  @Patch(':id')
  async updateUserById(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: Partial<any>,
  ) {
    return await this.userService.updateUserBy(id, body);
  }

  @UseGuards(jwtAuthGuard)
  @Delete(':id')
  async deleteUserById(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.deleteUserBy(id);
  }
}
