import PropTypes from 'prop-types';
import { TableRow as Row, TableCell as Cell, useTheme } from '@mui/material';

import { ConvertedFile } from '../../services/resources/models/document.model';
import { useStyles } from '../../hooks';

interface Props {
  row: ConvertedFile;
  handleClick: (row: ConvertedFile) => void;
  isRowSelected: boolean;
}

const EnhancedTableRow: React.FC<Props> = ({ row, isRowSelected, handleClick }) => {
  const theme = useTheme();
  const styles = useStyles(
    {
      Row: {
        cursor: 'pointer',
      },
    },
    [theme],
  );

  const date = new Date(row.timestamp);

  return (
    <Row
      hover
      onClick={() => handleClick(row)}
      aria-checked={isRowSelected}
      key={row.id}
      selected={isRowSelected}
      sx={styles.Row}
    >
      <Cell component="th" scope="row">
        {row.convertedFileName}
      </Cell>
      {/* <Cell align="right">{row.description}</Cell> */}
      <Cell align="right">{row.fileType}</Cell>
      <Cell align="right">{date.toLocaleString(undefined, { hour12: false })}</Cell>
    </Row>
  );
};

EnhancedTableRow.propTypes = {
  row: PropTypes.any,
  handleClick: PropTypes.func.isRequired,
  isRowSelected: PropTypes.bool.isRequired,
};

export default EnhancedTableRow;
