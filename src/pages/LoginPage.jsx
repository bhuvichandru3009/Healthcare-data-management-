import MainLayout from '../layouts/MainLayout';
import LoginForm from '../components/LoginForm';

export default function LoginPage() {
  return (
    <MainLayout>
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <LoginForm />
      </div>
    </MainLayout>
  );
}
