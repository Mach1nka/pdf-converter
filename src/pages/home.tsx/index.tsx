import DnDFile from '../../components/file-dnd/DnDFile';
import { StylesOverride } from '../../types/types';

const useStyles = (): StylesOverride => ({
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
});

const Home: React.FC = () => {
  return <DnDFile />;
};

export default Home;
