import { ChangeEvent, DragEvent, useCallback, useContext, useRef, useState } from 'react';
import { FormikHelpers, useFormik } from 'formik';
import { v4 as uuid } from 'uuid';
import { Input, InputLabel, Box, useTheme } from '@mui/material';

import FileManagement from './FileManagement';
import { FileForm, initialValues } from '../../schemas/file';
import { acceptableFileExtensions } from './constant';
import { useApi, useStyles } from '../../hooks';
import { uploadDocument } from '../../services/resources/requests/document';
import { error } from 'console';
import { AlertContext } from '../../contexts/Alert';
import { AlertActions, AlertSeverity } from '../../services/resources/models/alert.model';

const DnDFile: React.FC = () => {
  const theme = useTheme();
  const styles = useStyles(
    {
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

  const callback = useApi<string, FormData>(uploadDocument);
  const { dispatch } = useContext(AlertContext);

  const onSubmit = async ({ file }: FileForm, { resetForm }: FormikHelpers<FileForm>) => {
    const formData = new FormData();
    const convertibleFile = file as File;

    formData.append('file', convertibleFile);
    formData.append(
      'convertedFileName',
      convertibleFile.name.slice(0, convertibleFile.name.lastIndexOf('.')),
    );
    formData.append('description', '');
    callback(formData);
    resetForm();
  };

  const formik = useFormik({ initialValues, onSubmit });

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
      if (acceptableFileExtensions.includes(e.dataTransfer?.files[0].type)) {
        formik.setFieldValue('file', e.dataTransfer.files[0]);
      }

      dispatch({
        type: AlertActions.ADD,
        payload: {
          id: uuid(),
          severity: AlertSeverity.Warning,
          message:
            'Please choose file in one of the following extensions: .pdf, .xls .xslx, .doc .docx',
        },
      });
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
  );
};

export default DnDFile;
