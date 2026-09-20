import React from 'react';
import { Database, Filter, CheckCircle2, FileSpreadsheet, Server, Layers } from 'lucide-react';

export const DatasetPreprocessing: React.FC = () => {
  const sampleRows = [
    { id: '#00101', port: 443, duration: 1200, fwd: 15, bwd: 8, bytesSec: 15200, meanLen: 524, label: 'BENIGN' },
    { id: '#00102', port: 80, duration: 380, fwd: 195, bwd: 2, bytesSec: 84200, meanLen: 84, label: 'ATTACK' },
    { id: '#00103', port: 53, duration: 45, fwd: 2, bwd: 2, bytesSec: 2840, meanLen: 128, label: 'BENIGN' },
    { id: '#00104', port: 22, duration: 890, fwd: 42, bwd: 6, bytesSec: 42000, meanLen: 210, label: 'ATTACK' },
    { id: '#00105', port: 8080, duration: 1420, fwd: 18, bwd: 12, bytesSec: 18400, meanLen: 610, label: 'BENIGN' },
    { id: '#00106', port: 445, duration: 210, fwd: 35, bwd: 1, bytesSec: 19500, meanLen: 40, label: 'ATTACK' },
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-2 gap-2">
        <div>
          <div className="inline-flex items-center space-x-2 text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">
            <Database className="w-3.5 h-3.5" />
            <span>Dataset Pipeline</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Dataset & Pre-processing
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Network traffic dataset loading, schema validation, and feature scaling pipeline.
          </p>
        </div>
        <div className="bg-blue-50 text-blue-700 border border-blue-200 text-xs font-semibold px-3 py-1.5 rounded-xl">
          CICIDS2017 Cleaned Partition
        </div>
      </div>

      {/* Caption Banner */}
      <div className="bg-slate-100 text-slate-700 text-xs font-semibold px-4 py-2 rounded-xl border border-slate-200">
        Figure 1: Network traffic dataset loading and preprocessing stage
      </div>

      {/* 4 Summary Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-card">
          <span className="text-xs font-semibold text-slate-400 uppercase">Total Records</span>
          <div className="text-2xl font-bold text-slate-900 mt-1 font-mono">17,670</div>
          <p className="text-[11px] text-slate-500 mt-0.5">Ingested flow records</p>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-card">
          <span className="text-xs font-semibold text-slate-400 uppercase">Normal (Benign)</span>
          <div className="text-2xl font-bold text-emerald-600 mt-1 font-mono">14,136</div>
          <p className="text-[11px] text-emerald-700 font-medium mt-0.5">80.0% clean baseline</p>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-card">
          <span className="text-xs font-semibold text-slate-400 uppercase">Threats (Attack)</span>
          <div className="text-2xl font-bold text-rose-600 mt-1 font-mono">3,534</div>
          <p className="text-[11px] text-rose-700 font-medium mt-0.5">20.0% anomalous intrusions</p>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-card">
          <span className="text-xs font-semibold text-slate-400 uppercase">Feature Matrix</span>
          <div className="text-2xl font-bold text-blue-600 mt-1 font-mono">8 Salient</div>
          <p className="text-[11px] text-slate-500 mt-0.5">Normalized via StandardScaler</p>
        </div>
      </div>

      {/* Dataset Structure Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-card overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <FileSpreadsheet className="w-5 h-5 text-blue-600" />
            <h3 className="text-base font-bold text-slate-900">
              Loaded Dataset Structure (Feature Matrix Preview)
            </h3>
          </div>
          <span className="text-xs font-mono bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
            Shape: (17670, 8)
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-[11px] font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-100">
              <tr>
                <th className="py-3 px-5">Flow ID</th>
                <th className="py-3 px-5">Dst Port</th>
                <th className="py-3 px-5">Flow Duration (ms)</th>
                <th className="py-3 px-5">Total Fwd Pkts</th>
                <th className="py-3 px-5">Total Bwd Pkts</th>
                <th className="py-3 px-5">Flow Bytes/s</th>
                <th className="py-3 px-5">Pkt Len Mean</th>
                <th className="py-3 px-5">Label</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono text-slate-700">
              {sampleRows.map((row) => (
                <tr key={row.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-5 text-slate-400 font-medium">{row.id}</td>
                  <td className="py-3 px-5 font-bold text-slate-900">{row.port}</td>
                  <td className="py-3 px-5">{row.duration.toLocaleString()}</td>
                  <td className="py-3 px-5">{row.fwd}</td>
                  <td className="py-3 px-5">{row.bwd}</td>
                  <td className="py-3 px-5">{row.bytesSec.toLocaleString()}</td>
                  <td className="py-3 px-5">{row.meanLen}</td>
                  <td className="py-3 px-5">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded font-bold text-[10px] ${
                        row.label === 'BENIGN'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-rose-50 text-rose-700 border border-rose-200'
                      }`}
                    >
                      {row.label}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Preprocessing Log Output Terminal */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 border border-slate-800 shadow-card font-mono text-xs space-y-3">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 rounded-full bg-rose-500"></span>
            <span className="w-3 h-3 rounded-full bg-amber-500"></span>
            <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
            <span className="text-slate-400 ml-2 font-bold">preprocessing_pipeline.log</span>
          </div>
          <span className="text-[10px] text-emerald-400 font-semibold flex items-center space-x-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>COMPLETED</span>
          </span>
        </div>

        <div className="space-y-1.5 text-slate-300">
          <div className="text-slate-400">[INFO] Ingesting CICIDS2017 network traffic dataset from raw storage...</div>
          <div className="text-blue-400">[INFO] Loaded total records: 17,670 instances across 8 continuous feature dimensions</div>
          <div className="text-emerald-400">[INFO] Scanning for missing, NaN, and Infinite values: 0 invalid records detected</div>
          <div className="text-blue-400">[INFO] Applying StandardScaler normalization: continuous flow features zero-mean transformed</div>
          <div className="text-amber-300">[INFO] Target label encoding: BENIGN mapped to 0 (14,136), ATTACK mapped to 1 (3,534)</div>
          <div className="text-emerald-400 font-bold pt-1">
            [SUCCESS] Preprocessing completed. 80% train split (14,136 samples) & 20% test split (3,534 samples) prepared.
          </div>
        </div>
      </div>
    </div>
  );
};
