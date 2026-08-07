import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import DashboardCard from '../components/DashboardCard';
import MedicalRecordsTable from '../components/MedicalRecordsTable';
import { IconDocument, IconDownload, IconLogout } from '../components/Icons';
import { useAuth } from '../services/AuthContext';
import { useRecords } from '../services/RecordsContext';
import { DUMMY_PATIENTS } from '../services/dummyData';

/**
 * Patient dashboard — shows records linked to demo patient Alice by default,
 * plus any uploads tagged with the logged-in patient's name.
 */
export default function PatientDashboard() {
  const { user, logout } = useAuth();
  const { records } = useRecords();
  const navigate = useNavigate();

  const patientDisplayName = user?.fullName || 'Patient';

  const myRecords = useMemo(() => {
    const demoAlice = DUMMY_PATIENTS[0];
    return records.filter(
      (r) =>
        r.patientName === patientDisplayName ||
        r.patientName === demoAlice.name ||
        r.patientId === user?.patientId
    );
  }, [records, patientDisplayName, user?.patientId]);

  const uploadHistory = useMemo(
    () => [...myRecords].sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt)),
    [myRecords]
  );

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <MainLayout>
      <div className="mx-auto max-w-6xl space-y-8 px-4 py-8 sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Welcome, {patientDisplayName}</h1>
            <p className="text-slate-600">View and download your medical records securely.</p>
          </div>
          <button type="button" onClick={handleLogout} className="btn-secondary flex gap-2 self-start">
            <IconLogout className="w-4 h-4" />
            Logout
          </button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <DashboardCard
            icon={IconDocument}
            title="My records"
            description="Documents shared with you"
            value={myRecords.length}
            accent="blue"
          />
          <DashboardCard
            icon={IconDownload}
            title="Downloads"
            description="Use Download in the table below"
            accent="green"
          />
        </div>

        <section>
          <h2 className="mb-4 text-lg font-semibold text-slate-800">Personal medical records</h2>
          <MedicalRecordsTable
            records={myRecords}
            showPatientColumn={false}
            showDownload
            emptyMessage="No medical records yet. Demo data appears for sample patient Alice Johnson."
          />
        </section>

        <section>
          <h2 className="mb-4 text-lg font-semibold text-slate-800">Record upload history</h2>
          <MedicalRecordsTable
            records={uploadHistory}
            showPatientColumn={false}
            showDownload={false}
            emptyMessage="No upload history available."
          />
        </section>
      </div>
    </MainLayout>
  );
}
