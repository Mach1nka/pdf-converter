import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';

import defaultTheme from './styles/default-theme';
import ErrorBoundary from './components/error-boundary';
import Layout from './components/layout';
import NotFound from './pages/not-found';
import Login from './pages/login';
import Registration from './pages/registration';
import AuthProvider from './contexts/Auth';
import AuthProtection from './router/AuthProtection';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <ErrorBoundary>
        <AuthProvider>
          <Router>
            <Routes>
              <Route element={<Layout />}>
                <Route element={<AuthProtection />}></Route>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Registration />} />
                <Route path="/404" element={<NotFound />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </Router>
        </AuthProvider>
      </ErrorBoundary>
    </ThemeProvider>
  );
};

export default App;
