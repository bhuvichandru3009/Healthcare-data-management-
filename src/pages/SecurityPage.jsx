import MainLayout from '../layouts/MainLayout';
import SecurityStatusCards from '../components/SecurityStatusCards';

export default function SecurityPage() {
  return (
    <MainLayout>
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="mb-8 text-center sm:text-left">
          <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">Security overview</h1>
          <p className="mt-2 max-w-2xl text-slate-600">
            Simulated security pipeline for your final-year project demo. All indicators below are
            visual only.
          </p>
        </div>
        <SecurityStatusCards />
      </div>
    </MainLayout>
  );
}
