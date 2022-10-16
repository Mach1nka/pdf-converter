import { Box } from '@mui/material';

import FileTable from '../../components/table/FileTable';
import DnDFile from '../../components/upload-file';
import { useStyles } from '../../hooks';

const Home: React.FC = () => {
  const styles = useStyles(
    {
      Wrapper: {
        display: 'flex',
        minHeight: '50vh',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        padding: '0 1rem',
        gap: '3rem',
      },
    },
    [],
  );

  return (
    <Box sx={styles.Wrapper}>
      <DnDFile />
      <FileTable />
    </Box>
  );
};

export default Home;
