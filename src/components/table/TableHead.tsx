import PropTypes from 'prop-types';
import { TableHead, TableRow, TableCell, TableSortLabel, Box } from '@mui/material';
import { visuallyHidden } from '@mui/utils';

import { headCells, SortingOrder, ColumnNames } from './constants';

interface Props {
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof ColumnNames) => void;
  order: SortingOrder;
  orderBy: string;
}

const EnhancedTableHead: React.FC<Props> = ({ onRequestSort, order, orderBy }) => {
  const createSortHandler = (property: keyof ColumnNames) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align || 'left'}
            padding="normal"
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : SortingOrder.ASC}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === SortingOrder.DESC ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(Object.values(SortingOrder)).isRequired,
  orderBy: PropTypes.string.isRequired,
};

export default EnhancedTableHead;
