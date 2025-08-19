import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, Box } from '@mui/material';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Toaster } from 'react-hot-toast';
import { HelmetProvider } from 'react-helmet-async';
import { ErrorBoundary } from 'react-error-boundary';

// Components
import Layout from './components/Layout/Layout';
import LoadingSpinner from './components/Common/LoadingSpinner';
import ErrorFallback from './components/Common/ErrorFallback';
import AuthGuard from './components/Auth/AuthGuard';

// Pages (Lazy loaded)
const Dashboard = React.lazy(() => import('./pages/Dashboard/Dashboard'));
const ClimateRisk = React.lazy(() => import('./pages/ClimateRisk/ClimateRisk'));
const Infrastructure = React.lazy(() => import('./pages/Infrastructure/Infrastructure'));
const Operations = React.lazy(() => import('./pages/Operations/Operations'));
const Finance = React.lazy(() => import('./pages/Finance/Finance'));
const Energy = React.lazy(() => import('./pages/Energy/Energy'));
const LandStewardship = React.lazy(() => import('./pages/LandStewardship/LandStewardship'));
const PublicSafety = React.lazy(() => import('./pages/PublicSafety/PublicSafety'));
const DataQuality = React.lazy(() => import('./pages/DataQuality/DataQuality'));
const PowerBI = React.lazy(() => import('./pages/PowerBI/PowerBI'));
const ArcGIS = React.lazy(() => import('./pages/ArcGIS/ArcGIS'));
const Login = React.lazy(() => import('./pages/Auth/Login'));
const Profile = React.lazy(() => import('./pages/Profile/Profile'));
const Settings = React.lazy(() => import('./pages/Settings/Settings'));

// Create theme
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
      light: '#42a5f5',
      dark: '#1565c0',
    },
    secondary: {
      main: '#dc004e',
      light: '#ff5983',
      dark: '#9a0036',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
    success: {
      main: '#2e7d32',
      light: '#4caf50',
      dark: '#1b5e20',
    },
    warning: {
      main: '#ed6c02',
      light: '#ff9800',
      dark: '#e65100',
    },
    error: {
      main: '#d32f2f',
      light: '#ef5350',
      dark: '#c62828',
    },
    info: {
      main: '#0288d1',
      light: '#03a9f4',
      dark: '#01579b',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '2.5rem',
    },
    h2: {
      fontWeight: 600,
      fontSize: '2rem',
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.75rem',
    },
    h4: {
      fontWeight: 500,
      fontSize: '1.5rem',
    },
    h5: {
      fontWeight: 500,
      fontSize: '1.25rem',
    },
    h6: {
      fontWeight: 500,
      fontSize: '1rem',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          borderRadius: 12,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
  },
});

// Create React Query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
              <Box sx={{ display: 'flex', minHeight: '100vh' }}>
                <Routes>
                  {/* Public routes */}
                  <Route path="/login" element={
                    <Suspense fallback={<LoadingSpinner />}>
                      <Login />
                    </Suspense>
                  } />
                  
                  {/* Protected routes */}
                  <Route path="/" element={
                    <AuthGuard>
                      <Layout />
                    </AuthGuard>
                  }>
                    <Route index element={<Navigate to="/dashboard" replace />} />
                    <Route path="dashboard" element={
                      <Suspense fallback={<LoadingSpinner />}>
                        <Dashboard />
                      </Suspense>
                    } />
                    <Route path="climate-risk" element={
                      <Suspense fallback={<LoadingSpinner />}>
                        <ClimateRisk />
                      </Suspense>
                    } />
                    <Route path="infrastructure" element={
                      <Suspense fallback={<LoadingSpinner />}>
                        <Infrastructure />
                      </Suspense>
                    } />
                    <Route path="operations" element={
                      <Suspense fallback={<LoadingSpinner />}>
                        <Operations />
                      </Suspense>
                    } />
                    <Route path="finance" element={
                      <Suspense fallback={<LoadingSpinner />}>
                        <Finance />
                      </Suspense>
                    } />
                    <Route path="energy" element={
                      <Suspense fallback={<LoadingSpinner />}>
                        <Energy />
                      </Suspense>
                    } />
                    <Route path="land-stewardship" element={
                      <Suspense fallback={<LoadingSpinner />}>
                        <LandStewardship />
                      </Suspense>
                    } />
                    <Route path="public-safety" element={
                      <Suspense fallback={<LoadingSpinner />}>
                        <PublicSafety />
                      </Suspense>
                    } />
                    <Route path="data-quality" element={
                      <Suspense fallback={<LoadingSpinner />}>
                        <DataQuality />
                      </Suspense>
                    } />
                    <Route path="powerbi" element={
                      <Suspense fallback={<LoadingSpinner />}>
                        <PowerBI />
                      </Suspense>
                    } />
                    <Route path="arcgis" element={
                      <Suspense fallback={<LoadingSpinner />}>
                        <ArcGIS />
                      </Suspense>
                    } />
                    <Route path="profile" element={
                      <Suspense fallback={<LoadingSpinner />}>
                        <Profile />
                      </Suspense>
                    } />
                    <Route path="settings" element={
                      <Suspense fallback={<LoadingSpinner />}>
                        <Settings />
                      </Suspense>
                    } />
                  </Route>
                  
                  {/* Catch all route */}
                  <Route path="*" element={<Navigate to="/dashboard" replace />} />
                </Routes>
              </Box>
            
            {/* Toast notifications */}
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: '#363636',
                  color: '#fff',
                },
                success: {
                  duration: 3000,
                  iconTheme: {
                    primary: '#4caf50',
                    secondary: '#fff',
                  },
                },
                error: {
                  duration: 5000,
                  iconTheme: {
                    primary: '#f44336',
                    secondary: '#fff',
                  },
                },
              }}
            />
          </ThemeProvider>
        </QueryClientProvider>
      </HelmetProvider>
    </ErrorBoundary>
  );
}

export default App;
