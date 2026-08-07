import { Navigate } from 'react-router-dom';
import { useAuth } from '../services/AuthContext';
import { ROLES } from '../services/dummyData';

/**
 * Protects routes — redirects to login if not authenticated or wrong role.
 */
export default function ProtectedRoute({ children, allowedRole }) {
  const { user, ready } = useAuth();

  if (!ready) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-healthcare-mint border-t-healthcare-blue" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRole && user.role !== allowedRole) {
    return <Navigate to={user.role === ROLES.DOCTOR ? '/doctor' : '/patient'} replace />;
  }

  return children;
}
