import { Route, Routes, Navigate } from 'react-router-dom'; // Version 6
import { AuthRoutes } from '../auth/routes/AuthRoutes';
import { JournalRoutes } from '../journal/routes/JournalRoutes';
import { CheckingAuth } from '../ui';
import { useCheckout } from '../hooks/useCheckout';

export const AppRouter = () => {
  // Rutas de la aplicación
  const { status } = useCheckout();

  if (status === 'checking') {
    return <CheckingAuth />;
  }

  return (
    <Routes>
      {status === 'authenticated' ? (
        /* JournalApp */
        <Route path='/*' element={<JournalRoutes />} />
      ) : (
        /* Login y Registro */
        <Route path='/auth/*' element={<AuthRoutes />} />
      )}

      <Route path='/*' element={<Navigate to='/auth/login' />} />
    </Routes>
  );
};
