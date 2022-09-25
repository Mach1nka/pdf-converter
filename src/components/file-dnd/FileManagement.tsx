import PropTypes from 'prop-types';
import { Typography, Button, Box } from '@mui/material';

import { Nullable } from '../../types/types';
import { useStyles } from '../../hooks';

type Props = {
  file: Nullable<File>;
  onUploadClick: () => void;
  submitForm: () => void;
};

const FileManagement: React.FC<Props> = ({ file, onUploadClick, submitForm }) => {
  const styles = useStyles(
    {
      ControlsWrapper: {
        display: 'flex',
        gap: '20px',
        justifyContent: 'center',
        flexWrap: 'wrap',
      },
    },
    [],
  );

  return (
    <>
      <Typography sx={{ fontWeight: 600 }} gutterBottom>
        {file ? `Chosen file: ${file.name}` : 'Drag and drop your file here or'}
      </Typography>
      {file ? (
        <Box sx={styles.ControlsWrapper}>
          <Button onClick={submitForm} color="success" variant="outlined">
            send
          </Button>
          <Button onClick={onUploadClick} color="info" variant="outlined">
            choose another one
          </Button>
        </Box>
      ) : (
        <Button onClick={onUploadClick} variant="outlined">
          upload a document
        </Button>
      )}
    </>
  );
};

FileManagement.propTypes = {
  file: PropTypes.instanceOf(File),
  onUploadClick: PropTypes.func.isRequired,
  submitForm: PropTypes.func.isRequired,
};

FileManagement.defaultProps = {
  file: null,
};

export default FileManagement;
