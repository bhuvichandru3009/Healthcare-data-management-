import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import DashboardCard from '../components/DashboardCard';
import UploadForm from '../components/UploadForm';
import MedicalRecordsTable from '../components/MedicalRecordsTable';
import SecurityStatusCards from '../components/SecurityStatusCards';
import LoadingSpinner from '../components/LoadingSpinner';
import Toast from '../components/Toast';
import { IconUsers, IconDocument, IconSearch, IconLogout } from '../components/Icons';
import { useAuth } from '../services/AuthContext';
import { useRecords } from '../services/RecordsContext';
import { DUMMY_PATIENTS } from '../services/dummyData';

export default function DoctorDashboard() {
  const { user, logout } = useAuth();
  const { records, addRecord } = useRecords();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const filteredPatients = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return DUMMY_PATIENTS;
    return DUMMY_PATIENTS.filter((p) => p.name.toLowerCase().includes(q));
  }, [search]);

  const handleUpload = ({ patient, file, type, uploadedBy }) => {
    setLoading(true);
    setTimeout(() => {
      addRecord({
        id: `r_${Date.now()}`,
        patientId: patient.id,
        patientName: patient.name,
        fileName: file.name,
        type,
        uploadedBy,
        uploadedAt: new Date().toISOString(),
        doctorId: user?.id,
      });
      setLoading(false);
      setToast({ type: 'success', message: 'Record uploaded and secured (simulated) successfully!' });
    }, 1800);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <MainLayout>
      {loading && <LoadingSpinner message="Encrypting and storing on blockchain (simulated)..." />}
      {toast && (
        <Toast type={toast.type} message={toast.message} onClose={() => setToast(null)} />
      )}

      <div className="mx-auto max-w-6xl space-y-8 px-4 py-8 sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Welcome, Dr. {user?.fullName?.split(' ')[0] || 'Doctor'}
            </h1>
            <p className="text-slate-600">Manage patient records and uploads from one place.</p>
          </div>
          <button type="button" onClick={handleLogout} className="btn-secondary flex gap-2 self-start">
            <IconLogout className="w-4 h-4" />
            Logout
          </button>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <DashboardCard
            icon={IconUsers}
            title="Patients"
            description="Registered demo patients"
            value={DUMMY_PATIENTS.length}
            accent="green"
          />
          <DashboardCard
            icon={IconDocument}
            title="Records"
            description="Total uploaded files"
            value={records.length}
            accent="blue"
          />
          <DashboardCard
            icon={IconSearch}
            title="Search"
            description="Find patients by name below"
          />
        </div>

        <section className="card">
          <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-slate-800">
            <IconSearch className="text-healthcare-blue" />
            Search patient by name
          </h2>
          <input
            type="search"
            className="input-field max-w-md"
            placeholder="Type patient name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <ul className="mt-4 divide-y divide-slate-100 rounded-xl border border-slate-100">
            {filteredPatients.map((p) => (
              <li key={p.id} className="flex flex-wrap items-center justify-between gap-2 px-4 py-3 text-sm">
                <span className="font-medium text-slate-800">{p.name}</span>
                <span className="text-slate-500">{p.email}</span>
              </li>
            ))}
            {!filteredPatients.length && (
              <li className="px-4 py-6 text-center text-slate-500">No patients match your search.</li>
            )}
          </ul>
        </section>

        <UploadForm onUpload={handleUpload} uploadedByName={user?.fullName || 'Doctor'} />

        <section>
          <h2 className="mb-4 text-lg font-semibold text-slate-800">Uploaded medical records</h2>
          <MedicalRecordsTable records={records} showPatientColumn showDownload={false} />
        </section>

        <section>
          <h2 className="mb-4 text-lg font-semibold text-slate-800">Security status</h2>
          <SecurityStatusCards />
        </section>
      </div>
    </MainLayout>
  );
}
