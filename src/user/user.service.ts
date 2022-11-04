import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserInput } from 'src/type/CreateUserInput';
import { Repository, ObjectID } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { User } from './user.entity';
import * as argon2 from 'argon2';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async getUserById(id: string): Promise<User> {
    return this.userRepository.findOneBy({ id });
  }

  async createUser(createUserInput: CreateUserInput): Promise<User> {
    const { email, username, password } = createUserInput;
    const hashedPassword = await argon2.hash(password);
    const user = this.userRepository.create({
      id: uuid(),
      email,
      username,
      password: hashedPassword,
    });

    return this.userRepository.save(user);
  }
}
