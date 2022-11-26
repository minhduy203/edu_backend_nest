import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { User } from '../user/user.entity';
import { Tag } from './tag.entity';
import { CreateTagInput } from './tag.input';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag) private tagRepository: Repository<Tag>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async getTagById(id): Promise<Tag> {
    const tag = await this.tagRepository.findOneBy({ id });

    return tag;
  }

  async getTabByIdUser(userId): Promise<Tag[]> {
    const tags = await this.tagRepository.find({
      where: { user_id: userId },
    });

    return tags;
  }

  async createTag(
    createUserInput: CreateTagInput,
    user_id: string,
  ): Promise<Tag> {
    const { color, name } = createUserInput;

    const newTag = this.tagRepository.create({
      color,
      name,
      user_id,
      id: uuid(),
    });

    await this.tagRepository.save(newTag);
    return newTag;
  }

  async deleteTag(id): Promise<boolean> {
    const tag = this.tagRepository.delete({ id });

    return true;
  }
}
