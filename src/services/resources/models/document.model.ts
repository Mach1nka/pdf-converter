import { Params } from '../../httpService/types';

export interface ConvertedFile {
  convertedFileName: string;
  description: string;
  fileType: string;
  id: string;
  originalFileName: string;
  path: string;
  timestamp: string;
}

export interface UploadFileParams extends Params {
  convertedFileName: string;
  description: string;
}
