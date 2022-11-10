import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserInput } from '../../type/CreateUserInput';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { User } from './user.entity';
import * as argon2 from 'argon2';
import { UpdateUserInput } from '../../type/UpdateUserInput';
import { LoginInput } from './user.input';
import { UserMutationResponse } from '../../type/UserMutationResponse';
import { createToken, sendRefreshToken } from '../../utils/auth';
import { Response } from 'express';

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
    const { email, password, role, firstName, lastName, address, phoneNumber } =
      createUserInput;
    const hashedPassword = await argon2.hash(password);
    const user = this.userRepository.create({
      id: uuid(),
      email,
      password: hashedPassword,
      role,
      firstName,
      lastName,
      address,
      phoneNumber,
    });

    await this.userRepository.save(user);
    return user;
  }

  async updateUser(
    updateUserInput: UpdateUserInput,
    id: string,
  ): Promise<User> {
    const { email, role, firstName, lastName, address, phoneNumber } =
      updateUserInput;
    const user = await this.userRepository.findOneBy({ id });

    user.email = email;
    user.role = role;
    user.firstName = firstName;
    user.lastName = lastName;
    user.address = address;
    user.phoneNumber = phoneNumber;

    return this.userRepository.save(user);
  }

  async deleteUser(id: string): Promise<boolean> {
    const existingUser = await this.userRepository.findOneBy({ id });
    if (!existingUser) {
      return false;
    }
    await this.userRepository.delete({ id });

    return true;
  }

  async login(
    loginInput: LoginInput,
    res: Response,
  ): Promise<UserMutationResponse> {
    const { email, password } = loginInput;
    const existingUser = await this.userRepository.findOneBy({ email });

    if (!existingUser) {
      return {
        messageError: 'User not found',
      };
    }

    const isPasswordValid = await argon2.verify(
      existingUser.password,
      password,
    );

    if (!isPasswordValid) {
      return {
        messageError: 'Incorrect password',
      };
    }

    sendRefreshToken(res, existingUser);

    return {
      accessToken: createToken('accessToken', existingUser),
    };
  }
}
