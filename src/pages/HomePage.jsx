import { Link } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import { IconShield, IconHeartPulse } from '../components/Icons';

export default function HomePage() {
  return (
    <MainLayout>
      <section className="relative overflow-hidden bg-gradient-to-br from-healthcare-light via-white to-emerald-50">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <div className="mx-auto max-w-3xl text-center animate-fade-in">
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-xs font-medium text-healthcare-dark shadow-card">
              <IconShield className="w-4 h-4 text-healthcare-green" />
              Secure healthcare data platform (demo)
            </span>
            <h1 className="mt-6 text-3xl font-bold leading-tight text-slate-900 sm:text-4xl md:text-5xl">
              Secure Healthcare Data Management Using Dynamic Key-Based Encryption, QKD Simulation
              and Blockchain Storage
            </h1>
            <p className="mt-6 text-base leading-relaxed text-slate-600 sm:text-lg">
              A beginner-friendly web system for managing medical records with role-based access for
              doctors and patients. Upload PDFs and images, view records in a clean dashboard, and
              explore simulated security layers including dynamic encryption keys, quantum key
              distribution status, and blockchain-backed integrity checks.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link to="/login" className="btn-primary w-full sm:w-auto min-w-[140px]">
                Login
              </Link>
              <Link to="/register" className="btn-secondary w-full sm:w-auto min-w-[140px]">
                Register
              </Link>
            </div>
          </div>

          <div className="mx-auto mt-16 grid max-w-4xl gap-6 sm:grid-cols-3">
            {[
              { title: 'Doctors', text: 'Manage patients, upload records, and search by name.' },
              { title: 'Patients', text: 'View personal records, download copies, and see upload history.' },
              { title: 'Security sim', text: 'Visual status for encryption, QKD, and blockchain storage.' },
            ].map((item) => (
              <div key={item.title} className="card text-center">
                <span className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-healthcare-green/10 text-healthcare-green">
                  <IconHeartPulse className="w-5 h-5" />
                </span>
                <h2 className="mt-3 font-semibold text-slate-800">{item.title}</h2>
                <p className="mt-1 text-sm text-slate-500">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
