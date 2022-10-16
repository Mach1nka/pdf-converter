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
  align?: 'right';
  label: string;
}

const headCells: readonly HeadCell[] = [
  {
    id: 'convertedFileName',
    label: 'Name',
  },
  // {
  //   id: 'description',
  //   label: 'Description',
  //   align: 'right',
  // },
  {
    id: 'fileType',
    label: 'Original Type',
    align: 'right',
  },
  {
    id: 'timestamp',
    label: 'Uploaded at',
    align: 'right',
  },
];

export { headCells };
