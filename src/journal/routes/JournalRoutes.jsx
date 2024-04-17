import { Navigate, Route, Routes } from 'react-router-dom';
import { JournalPage } from '../pages/JournalPage';

export const JournalRoutes = () => {
  // Rutas para el Journal
  return (
    <Routes>
      <Route path='/' element={<JournalPage />} />

      {/* En cualquier otro caso, redirigir al usuario a '/' */}
      <Route path='/*' element={<Navigate to='/' />} />
    </Routes>
  );
};
