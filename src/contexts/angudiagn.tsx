import {
  useState,
  Context,
  createContext,
  Dispatch,
  SetStateAction,
  PropsWithChildren,
} from 'react';
import PropTypes from 'prop-types';

interface LoaderContextValue {
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
}

export const LoaderContext: Context<LoaderContextValue> = createContext<LoaderContextValue>({
  loading: false,
  setLoading: () => {},
});

const LoaderProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [loading, setLoading] = useState(false);

  return (
    <LoaderContext.Provider value={{ loading, setLoading }}>{children}</LoaderContext.Provider>
  );
};

LoaderProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default LoaderProvider;
