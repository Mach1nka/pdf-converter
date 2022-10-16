import { CancelToken } from 'axios';

import httpService from '../../httpService';
import { ConvertedFile } from '../models/document.model';

const getDocuments = (cancelToken?: CancelToken) => {
  return httpService.get<ConvertedFile[]>('/api/documents', {}, cancelToken);
};

const downloadDocument = (id: string) => {
  return httpService.get<any>(`/api/documents/download/${id}`, {}, undefined, 'blob');
};

const uploadDocument = (file: FormData) => {
  return httpService.post<string, FormData>('/api/documents/upload', {}, file, {
    'Content-Type': 'multipart/form-data',
  });
};

const deleteDocument = (id: string) => {
  return httpService.delete<string>(`/api/documents/${id}`);
};

export { getDocuments, downloadDocument, uploadDocument, deleteDocument };
