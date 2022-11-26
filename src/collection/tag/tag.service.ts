import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tag } from './tag.entity';
import { TagType } from './tag.type.';
import { v4 as uuid } from 'uuid';
import { CreateMyTagInput } from './tag.input';
import { User } from '../user/user.entity';

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

  async createMyTag(
    createUserInput: CreateMyTagInput,
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
