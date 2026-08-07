import { IconDocument, IconDownload } from './Icons';

function formatDate(iso) {
  try {
    return new Date(iso).toLocaleString(undefined, {
      dateStyle: 'medium',
      timeStyle: 'short',
    });
  } catch {
    return iso;
  }
}

/**
 * Table of medical records with optional download action.
 */
export default function MedicalRecordsTable({
  records,
  showPatientColumn = true,
  showDownload = false,
  emptyMessage = 'No records found.',
}) {
  if (!records.length) {
    return (
      <div className="card py-12 text-center text-sm text-slate-500">
        <IconDocument className="mx-auto mb-2 h-10 w-10 text-slate-300" />
        {emptyMessage}
      </div>
    );
  }

  const handleDownload = (record) => {
    const content = `Healthcare Demo Record\nFile: ${record.fileName}\nPatient: ${record.patientName}\nUploaded: ${record.uploadedAt}\n(Simulated download — no real file stored on server.)`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${record.fileName.replace(/\.[^.]+$/, '')}_demo.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="card overflow-hidden p-0">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="border-b border-slate-100 bg-slate-50/80">
            <tr>
              <th className="px-4 py-3 font-semibold text-slate-700">File</th>
              <th className="px-4 py-3 font-semibold text-slate-700">Type</th>
              {showPatientColumn && (
                <th className="px-4 py-3 font-semibold text-slate-700">Patient</th>
              )}
              <th className="px-4 py-3 font-semibold text-slate-700">Uploaded by</th>
              <th className="px-4 py-3 font-semibold text-slate-700">Date</th>
              {showDownload && <th className="px-4 py-3 font-semibold text-slate-700">Action</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {records.map((r) => (
              <tr key={r.id} className="transition hover:bg-healthcare-light/40">
                <td className="px-4 py-3 font-medium text-slate-800">{r.fileName}</td>
                <td className="px-4 py-3">
                  <span className="rounded-full bg-sky-100 px-2.5 py-0.5 text-xs font-medium text-sky-800">
                    {r.type}
                  </span>
                </td>
                {showPatientColumn && (
                  <td className="px-4 py-3 text-slate-600">{r.patientName}</td>
                )}
                <td className="px-4 py-3 text-slate-600">{r.uploadedBy}</td>
                <td className="px-4 py-3 text-slate-500">{formatDate(r.uploadedAt)}</td>
                {showDownload && (
                  <td className="px-4 py-3">
                    <button
                      type="button"
                      onClick={() => handleDownload(r)}
                      className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-healthcare-green hover:bg-emerald-50"
                    >
                      <IconDownload className="w-4 h-4" />
                      Download
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
