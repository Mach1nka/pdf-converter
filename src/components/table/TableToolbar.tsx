import PropTypes from 'prop-types';
import { alpha, IconButton, Toolbar, Tooltip, Typography } from '@mui/material';
import { Delete, FileDownload, Refresh } from '@mui/icons-material';

import { ConvertedFile } from '../../services/resources/models/document.model';
import { Nullable } from '../../types/types';
import { downloadDocument } from '../../services/resources/requests/document';

interface Props {
  selectedFile: Nullable<ConvertedFile>;
  handleDelete: () => Promise<void>;
  handleRefresh: () => void;
}

const EnhancedTableToolbar: React.FC<Props> = ({ selectedFile, handleDelete, handleRefresh }) => {
  const downloadHandler = async () => {
    console.log(selectedFile);
    const resp: any = await downloadDocument(selectedFile?.id as string);

    const url = URL.createObjectURL(new Blob([resp], { type: 'application/pdf' }));
    const link = document.createElement('a');
    link.href = url;
    link.target = '_blank';
    link.download = selectedFile?.convertedFileName as string;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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
        <Tooltip title="Refresh">
          <IconButton onClick={handleRefresh} color="info">
            <Refresh />
          </IconButton>
        </Tooltip>
        <Tooltip title="Download">
          <IconButton onClick={downloadHandler} color="info" disabled={!selectedFile}>
            <FileDownload />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton onClick={handleDelete} color="secondary" disabled={!selectedFile}>
            <Delete />
          </IconButton>
        </Tooltip>
      </>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  selectedFile: PropTypes.any,
  handleDelete: PropTypes.func.isRequired,
  handleRefresh: PropTypes.func.isRequired,
};

EnhancedTableToolbar.defaultProps = {
  selectedFile: null,
};

export default EnhancedTableToolbar;
