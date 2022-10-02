import PropTypes from 'prop-types';
import { alpha, IconButton, Toolbar, Tooltip, Typography } from '@mui/material';
import { Delete, FileDownload } from '@mui/icons-material';

import { ConvertedFile } from '../../services/resources/models/document.model';
import { Nullable } from '../../types/types';

interface Props {
  selectedFile: Nullable<ConvertedFile>;
}

const EnhancedTableToolbar: React.FC<Props> = ({ selectedFile }) => {
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(selectedFile && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      <Typography sx={{ flex: '1 1 100%' }} color="inherit" variant="subtitle1">
        {selectedFile ? selectedFile.convertedFileName : ''}
      </Typography>
      <>
        <Tooltip title="Download">
          <IconButton color="info" disabled={!selectedFile}>
            <FileDownload />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton color="secondary" disabled={!selectedFile}>
            <Delete />
          </IconButton>
        </Tooltip>
      </>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  selectedFile: PropTypes.any,
};

EnhancedTableToolbar.defaultProps = {
  selectedFile: null,
};

export default EnhancedTableToolbar;
