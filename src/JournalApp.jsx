import { AppRouter } from './router/AppRouter';
import { AppTheme } from './theme';

export const JournalApp = () => {
  return (
    // Configuración para los temas de la aplicación
    <AppTheme>
      <AppRouter />
    </AppTheme>
  );
};
