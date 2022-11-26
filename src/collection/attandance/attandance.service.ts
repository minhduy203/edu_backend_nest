import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { User } from '../user/user.entity';
import { Attandance } from './attandance.entity';
import { CreateAttandanceInput } from './attandance.input';

@Injectable()
export class AttandanceService {
  constructor(
    @InjectRepository(Attandance)
    private attandanceRepository: Repository<Attandance>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async createAttandance(createAttandanceInput: CreateAttandanceInput, userId) {
    const { class_id, content, is_learn_date, learn_date } =
      createAttandanceInput;
    const newAttandance = await this.attandanceRepository.create({
      id: uuid(),
      class_id,
      content,
      is_learn_date,
      learn_date,
    });

    await this.attandanceRepository.save(newAttandance);

    return newAttandance;
  }
  // async getTagById(id): Promise<Attandance> {
  //   const tag = await this.attandanceRepository.findOneBy({ id });

  //   return tag;
  // }

  // async getTabByIdUser(userId): Promise<Attandance[]> {
  //   const tags = await this.attandanceRepository.find({
  //     where: { user_id: userId },
  //   });

  //   return tags;
  // }

  // async createTag(
  //   createUserInput: CreateTagInput,
  //   user_id: string,
  // ): Promise<Tag> {
  //   const { color, name } = createUserInput;

  //   const newTag = this.attandanceRepository.create({
  //     color,
  //     name,
  //     user_id,
  //     id: uuid(),
  //   });

  //   await this.attandanceRepository.save(newTag);
  //   return newTag;
  // }

  // async deleteTag(id): Promise<boolean> {
  //   const tag = this.attandanceRepository.delete({ id });

  //   return true;
  // }
}
