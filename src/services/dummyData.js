/**
 * Dummy patient list for doctor dashboard (demo data).
 */
export const DUMMY_PATIENTS = [
  { id: 'p1', name: 'Alice Johnson', email: 'alice@example.com', age: 34 },
  { id: 'p2', name: 'Bob Smith', email: 'bob@example.com', age: 45 },
  { id: 'p3', name: 'Carol Williams', email: 'carol@example.com', age: 28 },
  { id: 'p4', name: 'David Brown', email: 'david@example.com', age: 52 },
  { id: 'p5', name: 'Emma Davis', email: 'emma@example.com', age: 39 },
];

/**
 * Initial medical records (stored in context; extended on upload).
 */
export const INITIAL_RECORDS = [
  {
    id: 'r1',
    patientId: 'p1',
    patientName: 'Alice Johnson',
    fileName: 'blood_test_report.pdf',
    type: 'PDF',
    uploadedBy: 'Dr. Smith',
    uploadedAt: '2026-03-15T10:30:00',
    doctorId: 'demo-doctor',
  },
  {
    id: 'r2',
    patientId: 'p2',
    patientName: 'Bob Smith',
    fileName: 'xray_chest.png',
    type: 'Image',
    uploadedBy: 'Dr. Smith',
    uploadedAt: '2026-03-18T14:00:00',
    doctorId: 'demo-doctor',
  },
  {
    id: 'r3',
    patientId: 'p1',
    patientName: 'Alice Johnson',
    fileName: 'prescription_march.pdf',
    type: 'PDF',
    uploadedBy: 'Dr. Smith',
    uploadedAt: '2026-03-20T09:15:00',
    doctorId: 'demo-doctor',
  },
];

export const ROLES = {
  DOCTOR: 'doctor',
  PATIENT: 'patient',
};
