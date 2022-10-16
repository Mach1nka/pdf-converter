import { useState, MouseEvent, useEffect, useCallback } from 'react';
import { Box, Paper, Table, TableBody, TableContainer } from '@mui/material';
import axios, { CancelToken } from 'axios';

import { ColumnNames, SortingOrder } from './constants';
import { getComparator } from './utils';
import { Maybe, Nullable } from '../../types/types';
import EnhancedTableHead from './TableHead';
import EnhancedTableToolbar from './TableToolbar';
import EnhancedTableRow from './TableRow';
import { ConvertedFile } from '../../services/resources/models/document.model';
import { useApi } from '../../hooks';
import { getDocuments, deleteDocument } from '../../services/resources/requests/document';

const FileTable: React.FC = () => {
  const [shouldRefresh, setRefresh] = useState(false);
  const [order, setOrder] = useState<SortingOrder>(SortingOrder.ASC);
  const [orderBy, setOrderBy] = useState<keyof ColumnNames>('convertedFileName');
  const [selected, setSelected] = useState<Nullable<ConvertedFile>>(null);
  const [rows, setRows] = useState<ConvertedFile[]>([]);

  const fetchDocuments = useApi<ConvertedFile[], Maybe<CancelToken>>(getDocuments);

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

  const handleRefresh = useCallback(() => {
    setRefresh(true);
  }, []);

  const handleDelete = async () => {
    if (selected?.id) {
      setSelected(null);
      await deleteDocument(selected?.id);
      const { data } = await fetchDocuments(undefined);
      setRows(data);
    }
  };

  useEffect(() => {
    const fetch = async () => {
      const { data } = await fetchDocuments(undefined);
      setRows(data);
    };

    fetch();
  }, []);

  useEffect(() => {
    const cancelToken = axios.CancelToken.source();
    const fetch = async () => {
      try {
        const { data } = await fetchDocuments(cancelToken.token);
        setRows(data);
      } finally {
        setRefresh(false);
      }
    };

    if (shouldRefresh) {
      fetch();
    }

    return () => {
      cancelToken.cancel();
    };
  }, [shouldRefresh]); // NOTE: doesn't work at the moment. Request aborting should be investigated.

  return (
    <Box sx={{ width: '100%', mb: 3 }}>
      <Paper sx={{ width: '100%' }}>
        <EnhancedTableToolbar
          handleDelete={handleDelete}
          handleRefresh={handleRefresh}
          selectedFile={selected}
        />
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
