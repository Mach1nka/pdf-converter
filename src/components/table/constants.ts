import { ConvertedFile } from '../../services/resources/models/document.model';

export enum SortingOrder {
  ASC = 'asc',
  DESC = 'desc',
}

export type ColumnNames = Pick<
  ConvertedFile,
  'convertedFileName' | 'description' | 'fileType' | 'timestamp'
>;

interface HeadCell {
  id: keyof ColumnNames;
  label: string;
}

const headCells: readonly HeadCell[] = [
  {
    id: 'convertedFileName',
    label: 'Name',
  },
  {
    id: 'description',
    label: 'Description',
  },
  {
    id: 'fileType',
    label: 'Type',
  },
  {
    id: 'timestamp',
    label: 'Uploaded at',
  },
];

export { headCells };
