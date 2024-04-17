import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { purpleTheme } from './purpleTheme';

export const AppTheme = ({ children }) => {
  return (
    <ThemeProvider theme={purpleTheme}>
      {/* Configuración de css para la consistencia entre navegadores */}
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
