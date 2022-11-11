import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserInput, UpdateUserInput } from './user.input';
import { In, Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { User } from './user.entity';
import * as argon2 from 'argon2';
import { Class } from '../class/class.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Class) private classRepository: Repository<Class>,
  ) {}

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  async getUserById(id: string): Promise<User> {
    return this.userRepository.findOneBy({ id });
  }

  async createUser(createUserInput: CreateUserInput): Promise<User> {
    const { email, password, role, firstName, lastName, address, phoneNumber, classes } =
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
      classes
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

  async getManyUsers(userIds: string[]): Promise<User[]> {
    const studentsList = await this.userRepository.find({
      where: {
        id: {
          $in: userIds,
        } as any,
      },
    });

    return studentsList;
  }

  async getManyClasses(classIds: string[]): Promise<Class[]> {
    const classList = await this.classRepository.find({
      where: {
        id: {
          $in: classIds,
        } as any,
      },
    });
    console.log(classList);
    

    return classList;
  }
}
