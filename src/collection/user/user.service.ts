import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserInput } from '../../type/CreateUserInput';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { User } from './user.entity';
import * as argon2 from 'argon2';
import { UpdateUserInput } from '../../type/UpdateUserInput';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  async getUserById(id: string): Promise<User> {
    return this.userRepository.findOneBy({ id });
  }

  async createUser(createUserInput: CreateUserInput): Promise<User> {
    const { email, password, role, firstName, lastName } = createUserInput;
    const hashedPassword = await argon2.hash(password);
    const user = this.userRepository.create({
      id: uuid(),
      email,
      password: hashedPassword,
      role,
      firstName,
      lastName,
    });

    return this.userRepository.save(user);
  }

  async updateUser(
    updateUserInput: UpdateUserInput,
    id: string,
  ): Promise<User> {
    const { email, role, firstName, lastName } = updateUserInput;
    const post = await this.userRepository.findOneBy({ id });

    post.email = email;
    post.role = role;
    post.firstName = firstName;
    post.lastName = lastName;

    return this.userRepository.save(post);
  }

  async deleteUser(id: string): Promise<boolean> {
    const post = await this.userRepository.findOneBy({ id });
    if (!post) {
      return false;
    }
    await this.userRepository.delete({ id });

    return true;
  }
}
