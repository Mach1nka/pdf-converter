import DnDFile from '../../components/file-dnd/DnDFile';
import { useStyles } from '../../hooks';

const Home: React.FC = () => {
  const styles = useStyles(
    {
      Wrapper: {
        display: 'flex',
        height: '50vh',
        justifyContent: 'center',
        alignItems: 'center',
      },
      Form: {
        padding: '1rem',
        boxSizing: 'content-box',
        width: '400px',
      },
    },
    [],
  );

  return <DnDFile />;
};

export default Home;
