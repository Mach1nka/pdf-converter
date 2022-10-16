import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';

import defaultTheme from './styles/default-theme';
import ErrorBoundary from './components/error-boundary';
import Layout from './components/layout';
import NotFound from './pages/not-found';
import Login from './pages/login';
import Registration from './pages/registration';
import Home from './pages/home';
import AuthProvider from './contexts/Auth';
import AlertProvider from './contexts/Alert';
import LoaderProvider from './contexts/Loader';
import AuthProtection from './router/AuthProtection';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <ErrorBoundary>
        <LoaderProvider>
          <AlertProvider>
            <AuthProvider>
              <Router>
                <Routes>
                  <Route element={<Layout />}>
                    <Route path="/" element={<Navigate to="/home" />} />
                    <Route element={<AuthProtection />}>
                      <Route path="/home" element={<Home />} />
                    </Route>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Registration />} />
                    <Route path="/404" element={<NotFound />} />
                    <Route path="*" element={<NotFound />} />
                  </Route>
                </Routes>
              </Router>
            </AuthProvider>
          </AlertProvider>
        </LoaderProvider>
      </ErrorBoundary>
    </ThemeProvider>
  );
};

export default App;
