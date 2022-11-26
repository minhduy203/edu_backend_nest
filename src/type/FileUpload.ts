import { Stream } from 'stream';

export interface FileUpload {
  fileName: string;
  mimeType: string;
  encoding: string;
  createReadStream: () => Stream;
}
