import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from '../users/user.entity';
import { Post } from '../posts/post.entity';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'test_db',
  entities: [User, Post],
  migrations: ['src/database/migrations/*.ts'],
  synchronize: false,
});
