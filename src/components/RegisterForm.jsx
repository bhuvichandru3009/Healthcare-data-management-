import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../services/AuthContext';
import { ROLES } from '../services/dummyData';

/**
 * Registration form for doctors and patients.
 */
export default function RegisterForm() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState(ROLES.PATIENT);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    const result = register({ fullName, email, password, role });
    if (!result.ok) {
      setError(result.message);
      return;
    }
    navigate(role === ROLES.DOCTOR ? '/doctor' : '/patient');
  };

  return (
    <form onSubmit={handleSubmit} className="card mx-auto w-full max-w-md animate-slide-up space-y-4">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-slate-800">Create account</h1>
        <p className="mt-1 text-sm text-slate-500">Register as a doctor or patient</p>
      </div>

      {error && (
        <div className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
          {error}
        </div>
      )}

      <div>
        <label htmlFor="reg-name" className="mb-1 block text-sm font-medium text-slate-700">
          Full Name
        </label>
        <input
          id="reg-name"
          type="text"
          required
          className="input-field"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="Jane Doe"
        />
      </div>

      <div>
        <label htmlFor="reg-email" className="mb-1 block text-sm font-medium text-slate-700">
          Email
        </label>
        <input
          id="reg-email"
          type="email"
          required
          className="input-field"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
        />
      </div>

      <div>
        <label htmlFor="reg-password" className="mb-1 block text-sm font-medium text-slate-700">
          Password
        </label>
        <input
          id="reg-password"
          type="password"
          required
          className="input-field"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Min. 6 characters"
        />
      </div>

      <div>
        <label htmlFor="reg-confirm" className="mb-1 block text-sm font-medium text-slate-700">
          Confirm Password
        </label>
        <input
          id="reg-confirm"
          type="password"
          required
          className="input-field"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Repeat password"
        />
      </div>

      <fieldset>
        <legend className="mb-2 text-sm font-medium text-slate-700">Role</legend>
        <div className="flex gap-4">
          <label className="flex cursor-pointer items-center gap-2">
            <input
              type="radio"
              name="reg-role"
              value={ROLES.DOCTOR}
              checked={role === ROLES.DOCTOR}
              onChange={() => setRole(ROLES.DOCTOR)}
            />
            <span className="text-sm">Doctor</span>
          </label>
          <label className="flex cursor-pointer items-center gap-2">
            <input
              type="radio"
              name="reg-role"
              value={ROLES.PATIENT}
              checked={role === ROLES.PATIENT}
              onChange={() => setRole(ROLES.PATIENT)}
            />
            <span className="text-sm">Patient</span>
          </label>
        </div>
      </fieldset>

      <button type="submit" className="btn-primary w-full">
        Register
      </button>

      <p className="text-center text-sm text-slate-600">
        Already registered?{' '}
        <Link to="/login" className="font-semibold text-healthcare-blue hover:underline">
          Login
        </Link>
      </p>
    </form>
  );
}
