import httpService from '../../httpService';
import { ConvertedFile } from '../models/document.model';

const getDocuments = () => {
  return httpService.get<ConvertedFile[]>('/api/documents');
};

const downloadDocument = () => {
  return httpService.get<any>('/api/documents/download');
};

const uploadDocument = (file: FormData) => {
  return httpService.post<string, FormData>('/api/documents/upload', {}, file, {
    'Content-Type': 'multipart/form-data',
  });
};

export { getDocuments, downloadDocument, uploadDocument };
