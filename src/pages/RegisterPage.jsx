import MainLayout from '../layouts/MainLayout';
import RegisterForm from '../components/RegisterForm';

export default function RegisterPage() {
  return (
    <MainLayout>
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <RegisterForm />
      </div>
    </MainLayout>
  );
}
