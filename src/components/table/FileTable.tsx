import { useState, MouseEvent, useEffect, useCallback } from 'react';
import { Box, Paper, Table, TableBody, TableContainer } from '@mui/material';

import { ColumnNames, SortingOrder } from './constants';
import { getComparator } from './utils';
import { Nullable } from '../../types/types';
import EnhancedTableHead from './TableHead';
import EnhancedTableToolbar from './TableToolbar';
import EnhancedTableRow from './TableRow';
import { ConvertedFile } from '../../services/resources/models/document.model';
import { useApi } from '../../hooks';
import { getDocuments, deleteDocument } from '../../services/resources/requests/document';

const FileTable: React.FC = () => {
  const [order, setOrder] = useState<SortingOrder>(SortingOrder.ASC);
  const [orderBy, setOrderBy] = useState<keyof ColumnNames>('convertedFileName');
  const [selected, setSelected] = useState<Nullable<ConvertedFile>>(null);
  const [rows, setRows] = useState<ConvertedFile[]>([]);

  const fetchDocuments = useApi<ConvertedFile[], null>(getDocuments);

  const handleRequestSort = (_: MouseEvent<unknown>, property: keyof ColumnNames) => {
    const isAsc = orderBy === property && order === SortingOrder.ASC;
    setOrder(isAsc ? SortingOrder.DESC : SortingOrder.ASC);
    setOrderBy(property);
  };

  const handleClick = useCallback(
    (row: ConvertedFile) => {
      if (row.id === selected?.id) {
        return setSelected(null);
      }
      setSelected(row);
    },
    [selected?.id],
  );

  const handleDelete = async () => {
    if (selected?.id) {
      setSelected(null);
      await deleteDocument(selected?.id);
      const { data } = await fetchDocuments(null);
      setRows(data);
    }
  };

  useEffect(() => {
    const fetch = async () => {
      const { data } = await fetchDocuments(null);
      setRows(data);
    };

    fetch();
  }, []);

  // useEffect(() => {
  //   const cancelToken = axios.CancelToken.source();
  //   if (shouldRefresh) {
  //     const fetch = async () => {
  //       const { data } = await fetchDocuments(null);
  //       setRows(data);
  //     };

  //     fetch();
  //   }

  //   return () => {
  //     cancelToken.cancel();
  //   };
  // }, [shouldRefresh]);

  return (
    <Box sx={{ width: '100%', mb: 3 }}>
      <Paper sx={{ width: '100%' }}>
        <EnhancedTableToolbar handleDelete={handleDelete} selectedFile={selected} />
        <TableContainer sx={{ height: 500 }}>
          <Table stickyHeader aria-labelledby="tableTitle" size="medium">
            <EnhancedTableHead order={order} orderBy={orderBy} onRequestSort={handleRequestSort} />
            <TableBody>
              {rows
                .slice()
                .sort(getComparator(order, orderBy))
                .map((row) => {
                  const isRowSelected = row.id === selected?.id;

                  return (
                    <EnhancedTableRow
                      key={row.id}
                      row={row}
                      isRowSelected={isRowSelected}
                      handleClick={handleClick}
                    />
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default FileTable;
