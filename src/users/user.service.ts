import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// user entity import
import { User } from './user.entity';

// hash password
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: { email },
    });
  }

  async createUsers(email: string, password: string): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = this.userRepository.create({
      email,
      password: hashedPassword,
    });
    return await this.userRepository.save(newUser);
  }

  async findAllUsers() {
    return await this.userRepository.find();
  }

  async findUserBy(id: number): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  async updateUserBy(id: number, data: Partial<User>): Promise<User> {
    const user = await this.findUserBy(id);

    // ✅ kalau ada password baru → hash dulu
    if (data.password) {
      const salt = await bcrypt.genSalt(10);
      data.password = await bcrypt.hash(data.password, salt);
    }

    Object.assign(user, data);

    return await this.userRepository.save(user);
  }

  async deleteUserBy(id: number): Promise<{ message: string }> {
    const user = await this.findUserBy(id);

    await this.userRepository.remove(user);

    return { message: 'User deleted Successfully' };
  }
}
