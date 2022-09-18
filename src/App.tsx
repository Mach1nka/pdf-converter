import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';

import defaultTheme from './styles/default-theme';
import ErrorBoundary from './components/error-boundary';
import Layout from './components/layout';
import NotFound from './components/not-found';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <ErrorBoundary>
        <Router>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/404" element={<NotFound />}></Route>
              <Route path="*" element={<NotFound />}></Route>
            </Route>
          </Routes>
        </Router>
      </ErrorBoundary>
    </ThemeProvider>
  );
};

export default App;
