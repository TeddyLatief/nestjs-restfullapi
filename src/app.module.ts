import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { Post } from './posts/post.entity';
import { UsersModule } from './users/user.module';
import { PostsModule } from './posts/post.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'test_db',
      entities: [User, Post],
      synchronize: false,
    }),
    UsersModule,
    PostsModule,
    AuthModule,
  ],
})
export class AppModule {}
