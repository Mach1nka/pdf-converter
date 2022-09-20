import { useCallback, useRef, useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { Button, Input, InputLabel, Typography, Box, Theme, useTheme } from '@mui/material';

import { Nullable, StylesOverride } from '../../types/types';
import { initialValues } from '../../schemas/file';
import { acceptableFileExtensions } from './constant';

const useStyles = (theme: Theme): StylesOverride => ({
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
  Typography: {
    fontWeight: 600,
  },
  DropZone: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: '1rem',
    inset: 0,
  },
});

const DnDFile: React.FC = () => {
  const formik = useFormik({
    initialValues,
    onSubmit: (values, { resetForm }) => {
      resetForm();
    },
  });
  const theme = useTheme();
  const styles = useStyles(theme);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragActive, setDragState] = useState(false);
  console.log(formik.values);

  const onInputChange = (e: any) => {
    if (e.target.files && e.target.files[0]) {
      formik.setFieldValue('file', e.target.files[0]);
    }
  };

  const onDragEnter = useCallback(
    (e: any) => {
      e.preventDefault();
      e.stopPropagation();
      setDragState(true);
    },
    [setDragState],
  );

  const onDragLeave = useCallback(
    (e: any) => {
      e.preventDefault();
      e.stopPropagation();
      setDragState(false);
    },
    [setDragState],
  );

  const onDragOver = useCallback((e: any) => {
    e.preventDefault();
  }, []);

  const onDrop = useCallback(
    (e: any) => {
      e.preventDefault();
      e.stopPropagation();

      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        formik.setFieldValue('file', e.dataTransfer.files[0]);
      }
      setDragState(false);
    },
    [formik, setDragState],
  );

  const onUploadClick = () => {
    inputRef.current?.click();
  };

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
            <Typography sx={styles.Typography} gutterBottom>
              {formik.values.file
                ? `Chosen file: ${formik.values.file.name}`
                : 'Drag and drop your file here or'}
            </Typography>
            {formik.values.file ? (
              <>
                <Button onClick={() => formik.submitForm()} color="success" variant="outlined">
                  send
                </Button>
                <Button onClick={onUploadClick} color="info" variant="outlined">
                  choose another one
                </Button>
              </>
            ) : (
              <Button onClick={onUploadClick} variant="outlined">
                upload a document
              </Button>
            )}
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
