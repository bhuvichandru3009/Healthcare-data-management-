import { useEffect, useState } from 'react';
import { IconKey, IconShield, IconLink, IconCheck } from './Icons';

/**
 * Simulated security status cards (encryption, QKD, blockchain).
 */
function ProgressBar({ value, label }) {
  return (
    <div>
      <div className="mb-1 flex justify-between text-xs text-slate-600">
        <span>{label}</span>
        <span>{value}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full bg-gradient-to-r from-healthcare-blue to-healthcare-green transition-all duration-1000"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

function StatusBadge({ active, label }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${
        active ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
      }`}
    >
      {active && <IconCheck className="w-3.5 h-3.5" />}
      {label}
    </span>
  );
}

export default function SecurityStatusCards() {
  const [qkdProgress, setQkdProgress] = useState(72);
  const [chainProgress, setChainProgress] = useState(88);

  // Gentle animation for demo progress bars
  useEffect(() => {
    const t = setInterval(() => {
      setQkdProgress((p) => (p >= 98 ? 72 : p + 1));
      setChainProgress((p) => (p >= 100 ? 85 : p + 0.5));
    }, 2000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="card border border-sky-100">
          <div className="mb-3 flex items-center gap-2 text-healthcare-blue">
            <IconKey className="w-6 h-6" />
            <h3 className="font-semibold text-slate-800">Dynamic Key-Based Encryption</h3>
          </div>
          <p className="mb-4 text-sm text-slate-500">Simulated AES key rotation every session.</p>
          <ProgressBar value={94} label="Key strength" />
          <p className="mt-3 text-sm">
            Encryption Key Status:{' '}
            <span className="font-semibold text-healthcare-green">Active</span>
          </p>
        </div>

        <div className="card border border-emerald-100">
          <div className="mb-3 flex items-center gap-2 text-healthcare-green">
            <IconShield className="w-6 h-6" />
            <h3 className="font-semibold text-slate-800">QKD Key Generation</h3>
          </div>
          <p className="mb-4 text-sm text-slate-500">Quantum key distribution simulation (BB84).</p>
          <ProgressBar value={Math.round(qkdProgress)} label="Photon channel sync" />
          <p className="mt-3 flex flex-wrap items-center gap-2 text-sm">
            Status: <StatusBadge active label="Keys generated" />
          </p>
        </div>

        <div className="card border border-slate-200 sm:col-span-2 lg:col-span-1">
          <div className="mb-3 flex items-center gap-2 text-healthcare-dark">
            <IconLink className="w-6 h-6" />
            <h3 className="font-semibold text-slate-800">Blockchain Storage</h3>
          </div>
          <p className="mb-4 text-sm text-slate-500">Immutable ledger simulation for record hashes.</p>
          <ProgressBar value={Math.min(100, Math.round(chainProgress))} label="Block confirmation" />
          <p className="mt-3 text-sm">
            Latest block: <span className="font-mono text-xs text-slate-600">#0x7f3a…c21</span>
          </p>
        </div>
      </div>

      <div className="card flex flex-col items-start gap-3 border-2 border-emerald-200 bg-emerald-50/50 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500 text-white">
            <IconCheck className="w-7 h-7" />
          </span>
          <div>
            <p className="font-semibold text-slate-800">Data Integrity: Verified ✓</p>
            <p className="text-sm text-slate-600">Hash chain and signature checks passed (simulation).</p>
          </div>
        </div>
        <StatusBadge active label="Encryption Key Status: Active" />
      </div>

      <p className="text-center text-xs text-slate-400">
        Security features are for demonstration only. No real cryptography or blockchain network is connected.
      </p>
    </div>
  );
}
