import { Nullable } from '../types/types';

export type FileForm = {
  file: Nullable<File>;
};

const initialValues: FileForm = { file: null };

export { initialValues };
