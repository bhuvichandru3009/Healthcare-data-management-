import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DoctorDashboard from './pages/DoctorDashboard';
import PatientDashboard from './pages/PatientDashboard';
import SecurityPage from './pages/SecurityPage';
import ProtectedRoute from './components/ProtectedRoute';
import { ROLES } from './services/dummyData';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/security" element={<SecurityPage />} />
      <Route
        path="/doctor"
        element={
          <ProtectedRoute allowedRole={ROLES.DOCTOR}>
            <DoctorDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/patient"
        element={
          <ProtectedRoute allowedRole={ROLES.PATIENT}>
            <PatientDashboard />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
