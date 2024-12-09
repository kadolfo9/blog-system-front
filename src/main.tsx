import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router'
import { Router } from './router.tsx'

import './assets/styles/index.css';
import { createTheme, StyledEngineProvider, ThemeProvider } from '@mui/material';
import { AuthProvider } from './context/auth.tsx';

const theme = createTheme({});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <RouterProvider router={Router} />
        </AuthProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  </StrictMode>,
)
