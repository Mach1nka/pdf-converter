import { ChangeEvent, DragEvent, useCallback, useRef, useState } from 'react';
import { useFormik } from 'formik';
import { Input, InputLabel, Box, useTheme } from '@mui/material';

import FileManagement from './FileManagement';
import { initialValues } from '../../schemas/file';
import { acceptableFileExtensions } from './constant';
import { useStyles } from '../../hooks';

const DnDFile: React.FC = () => {
  const formik = useFormik({
    initialValues,
    onSubmit: (values, { resetForm }) => {
      console.log(values);
      resetForm();
    },
  });
  const theme = useTheme();
  const styles = useStyles(
    {
      Wrapper: {
        width: '100%',
        padding: '0 1rem',
      },
      FormControl: {
        position: 'relative',
        height: '12rem',
        width: '100%',
      },
      Input: {
        display: 'none',
      },
      Label: {
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: '2px',
        borderRadius: '1rem',
        borderStyle: 'dashed',
        borderColor: '',
        backgroundColor: '#f8fafc',
      },
      ActiveZone: {
        borderColor: theme.palette.info.main,
      },
      DropZone: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        borderRadius: '1rem',
        inset: 0,
      },
    },
    [theme],
  );
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragActive, setDragState] = useState(false);

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      formik.setFieldValue('file', e.target.files[0]);
    }
  };

  const onDragEnter = (e: DragEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragState(true);
  };

  const onDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragState(false);
  };

  const onDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.dataTransfer?.files && e.dataTransfer?.files[0]) {
      formik.setFieldValue('file', e.dataTransfer.files[0]);
    }
    setDragState(false);
  };

  const onUploadClick = useCallback(() => {
    inputRef.current?.click();
  }, []);

  const submitForm = useCallback(() => {
    formik.submitForm();
  }, []);

  return (
    <Box sx={styles.Wrapper}>
      <form onDragEnter={onDragEnter} style={{ width: '100%' }}>
        <Box sx={styles.FormControl}>
          <Input
            inputProps={{
              accept: acceptableFileExtensions.join(','),
              multiple: true,
            }}
            onChange={onInputChange}
            inputRef={inputRef}
            sx={styles.Input}
            type="file"
            name="input-file-upload"
            id="input-file-upload"
          />
          <InputLabel
            onClick={(e) => e.preventDefault()}
            sx={{
              ...styles.Label,
              borderColor: isDragActive ? theme.palette.info.main : '#cbd5e1',
            }}
            id="label-file"
            htmlFor="input-file-upload"
          >
            <FileManagement
              onUploadClick={onUploadClick}
              file={formik.values.file}
              submitForm={submitForm}
            />
          </InputLabel>
          {isDragActive ? (
            <Box
              onDragLeave={onDragLeave}
              onDragOver={onDragOver}
              onDrop={onDrop}
              sx={styles.DropZone}
            />
          ) : null}
        </Box>
      </form>
    </Box>
  );
};

export default DnDFile;
