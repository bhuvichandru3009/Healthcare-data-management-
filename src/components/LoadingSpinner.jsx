/**
 * Full-screen loading overlay with spinner (used during simulated upload).
 */
export default function LoadingSpinner({ message = 'Uploading...' }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm">
      <div className="card flex flex-col items-center gap-4 px-10 py-8 animate-fade-in">
        <div
          className="h-12 w-12 animate-spin rounded-full border-4 border-healthcare-mint border-t-healthcare-blue"
          role="status"
          aria-label="Loading"
        />
        <p className="text-sm font-medium text-slate-600">{message}</p>
      </div>
    </div>
  );
}
