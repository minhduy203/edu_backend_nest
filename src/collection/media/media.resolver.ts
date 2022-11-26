import { UseInterceptors, UploadedFile } from '@nestjs/common';
import { Mutation, Resolver } from '@nestjs/graphql';
import { FileInterceptor } from '@nestjs/platform-express';
import { MediaService } from './media.service';
import { MediaType } from './media.type';

@Resolver((_of) => MediaType)
export class MediaResolver {
  constructor(private mediaService: MediaService) {}

  @Mutation((_returns) => MediaType)
  @UseInterceptors(FileInterceptor('file'))
  upload(@UploadedFile() file) {
    return this.mediaService.upload(file);
  }
}
