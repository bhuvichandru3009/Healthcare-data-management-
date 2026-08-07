import { useState } from 'react';
import { DUMMY_PATIENTS } from '../services/dummyData';
import { IconUpload } from './Icons';

const ACCEPT = '.pdf,.png,.jpg,.jpeg,image/*,application/pdf';

/**
 * Upload medical records (PDF/Image) — simulates encrypt + blockchain store.
 */
export default function UploadForm({ onUpload, uploadedByName }) {
  const [patientId, setPatientId] = useState(DUMMY_PATIENTS[0]?.id || '');
  const [file, setFile] = useState(null);
  const [localError, setLocalError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setLocalError('');
    if (!file) {
      setLocalError('Please select a PDF or image file.');
      return;
    }
    const patient = DUMMY_PATIENTS.find((p) => p.id === patientId);
    if (!patient) {
      setLocalError('Select a valid patient.');
      return;
    }
    const isPdf = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
    const isImage = file.type.startsWith('image/');
    if (!isPdf && !isImage) {
      setLocalError('Only PDF and image files are allowed.');
      return;
    }
    onUpload({
      patient,
      file,
      type: isPdf ? 'PDF' : 'Image',
      uploadedBy: uploadedByName || 'Doctor',
    });
    setFile(null);
    e.target.reset();
  };

  return (
    <form onSubmit={handleSubmit} className="card space-y-4">
      <div className="flex items-center gap-2">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-healthcare-light text-healthcare-blue">
          <IconUpload />
        </span>
        <div>
          <h2 className="font-semibold text-slate-800">Upload medical record</h2>
          <p className="text-xs text-slate-500">PDF or image — encrypted & stored (simulated)</p>
        </div>
      </div>

      {localError && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{localError}</p>
      )}

      <div>
        <label htmlFor="upload-patient" className="mb-1 block text-sm font-medium text-slate-700">
          Patient
        </label>
        <select
          id="upload-patient"
          className="input-field"
          value={patientId}
          onChange={(e) => setPatientId(e.target.value)}
        >
          {DUMMY_PATIENTS.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="upload-file" className="mb-1 block text-sm font-medium text-slate-700">
          File (PDF / Image)
        </label>
        <input
          id="upload-file"
          type="file"
          accept={ACCEPT}
          className="input-field file:mr-3 file:rounded-lg file:border-0 file:bg-healthcare-light file:px-3 file:py-1 file:text-sm file:font-medium file:text-healthcare-dark"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />
      </div>

      <button type="submit" className="btn-primary w-full sm:w-auto">
        Upload record
      </button>
    </form>
  );
}
