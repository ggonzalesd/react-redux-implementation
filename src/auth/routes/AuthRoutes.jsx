import { Navigate, Route, Routes } from 'react-router-dom';
import { LoginPage, RegisterPage } from '../pages';

export const AuthRoutes = () => {
  // Rutas para el login y register
  return (
    <Routes>
      <Route path='/login' element={<LoginPage />} />
      <Route path='/register' element={<RegisterPage />} />

      {/* Redirigir hacia el 'login' al usuario en cualquier otro caso */}
      <Route path='/*' element={<Navigate to='/auth/login' />} />
    </Routes>
  );
};
