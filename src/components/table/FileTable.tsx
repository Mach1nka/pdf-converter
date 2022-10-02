import React from 'react';
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';

import { ColumnNames, SortingOrder } from './constants';
import { getComparator } from './utils';
import { Nullable } from '../../types/types';
import EnhancedTableHead from './TableHead';
import EnhancedTableToolbar from './TableToolbar';
import { ConvertedFile } from '../../services/resources/models/document.model';

const rows: any[] = [
  // createData('Cupcake', 305, 3.7, 67, 4.3),
  // createData('Donut', 452, 25.0, 51, 4.9),
  // createData('Eclair', 262, 16.0, 24, 6.0),
  // createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  // createData('Gingerbread', 356, 16.0, 49, 3.9),
  // createData('Honeycomb', 408, 3.2, 87, 6.5),
  // createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  // createData('Jelly Bean', 375, 0.0, 94, 0.0),
  // createData('KitKat', 518, 26.0, 65, 7.0),
  // createData('Lollipop', 392, 0.2, 98, 0.0),
  // createData('Marshmallow', 318, 0, 81, 2.0),
  // createData('Nougat', 360, 19.0, 9, 37.0),
  // createData('Oreo', 437, 18.0, 63, 4.0),
];

const FileTable: React.FC = () => {
  const [order, setOrder] = React.useState<SortingOrder>(SortingOrder.ASC);
  const [orderBy, setOrderBy] = React.useState<keyof ColumnNames>('convertedFileName');
  const [selected, setSelected] = React.useState<Nullable<ConvertedFile>>(null);

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof ColumnNames) => {
    const isAsc = orderBy === property && order === SortingOrder.ASC;
    setOrder(isAsc ? SortingOrder.DESC : SortingOrder.ASC);
    setOrderBy(property);
  };

  const handleClick = (_: React.MouseEvent<unknown>, row: ConvertedFile) => {
    if (row.id === selected?.id) {
      setSelected(null);
    }
    setSelected(row);
  };

  return (
    <Box sx={{ width: '100%', mb: 3 }}>
      <Paper sx={{ width: '100%' }}>
        <EnhancedTableToolbar selectedFile={selected} />
        <TableContainer sx={{ height: 500 }}>
          <Table stickyHeader aria-labelledby="tableTitle" size="medium">
            <EnhancedTableHead order={order} orderBy={orderBy} onRequestSort={handleRequestSort} />
            <TableBody>
              {rows
                .slice()
                .sort(getComparator(order, orderBy))
                .map((row, index) => {
                  const isItemSelected = row.id === selected?.id;
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.name}
                      selected={isItemSelected}
                    >
                      <TableCell component="th" id={labelId} scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell align="right">{row.calories}</TableCell>
                      <TableCell align="right">{row.fat}</TableCell>
                      <TableCell align="right">{row.carbs}</TableCell>
                      <TableCell align="right">{row.protein}</TableCell>
                    </TableRow>
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
