import React, { useState, useMemo } from 'react';
import { 
  FileText, 
  Search, 
  Filter, 
  Download, 
  Eye, 
  X, 
  ShieldAlert, 
  ShieldCheck, 
  Clock, 
  ArrowUpDown,
  ExternalLink,
  CheckCircle2
} from 'lucide-react';
import { DetectionLog } from '../types/ids';
import { initialDetectionLogs } from '../data/mockData';

interface DetectionLogsProps {
  logs?: DetectionLog[];
}

export const DetectionLogs: React.FC<DetectionLogsProps> = ({ logs: customLogs }) => {
  const [logsList] = useState<DetectionLog[]>(customLogs || initialDetectionLogs);
  const [selectedFilter, setSelectedFilter] = useState<'ALL' | 'BENIGN' | 'ATTACK'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeLog, setActiveLog] = useState<DetectionLog | null>(null);

  const filteredLogs = useMemo(() => {
    return logsList.filter((log) => {
      const matchesFilter =
        selectedFilter === 'ALL' || log.prediction === selectedFilter;
      const matchesSearch =
        log.source.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.prediction.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (log.attackType && log.attackType.toLowerCase().includes(searchQuery.toLowerCase())) ||
        log.destination.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [logsList, selectedFilter, searchQuery]);

  return (
    <div className="space-y-6 pb-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-2 gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">
            <FileText className="w-3.5 h-3.5" />
            <span>Audit & Verification Trail</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Detection Logs
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Comprehensive history of analysed network flows, predictions, and threat alerts.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => {
              const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(logsList, null, 2));
              const downloadAnchor = document.createElement('a');
              downloadAnchor.setAttribute("href", dataStr);
              downloadAnchor.setAttribute("download", "ai_ids_detection_logs.json");
              document.body.appendChild(downloadAnchor);
              downloadAnchor.click();
              downloadAnchor.remove();
            }}
            className="inline-flex items-center space-x-2 px-3.5 py-2 text-xs font-semibold rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 shadow-xs transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Export JSON</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar Card */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-card p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by IP, port, or attack type..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center space-x-2 w-full sm:w-auto justify-start sm:justify-end">
          <span className="text-xs font-semibold text-slate-400 mr-1 flex items-center space-x-1">
            <Filter className="w-3.5 h-3.5" />
            <span>Filter:</span>
          </span>
          <button
            onClick={() => setSelectedFilter('ALL')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-colors ${
              selectedFilter === 'ALL'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            All ({logsList.length})
          </button>
          <button
            onClick={() => setSelectedFilter('BENIGN')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-colors ${
              selectedFilter === 'BENIGN'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
            }`}
          >
            Benign
          </button>
          <button
            onClick={() => setSelectedFilter('ATTACK')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-colors ${
              selectedFilter === 'ATTACK'
                ? 'bg-rose-600 text-white shadow-xs'
                : 'bg-rose-50 text-rose-700 hover:bg-rose-100'
            }`}
          >
            Attack
          </button>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50/80 text-[11px] font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-100">
              <tr>
                <th className="py-3.5 px-6">Time</th>
                <th className="py-3.5 px-6">Prediction</th>
                <th className="py-3.5 px-6">Status</th>
                <th className="py-3.5 px-6">Confidence</th>
                <th className="py-3.5 px-6">Source IP</th>
                <th className="py-3.5 px-6">Port / Protocol</th>
                <th className="py-3.5 px-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs font-medium text-slate-700">
              {filteredLogs.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    No matching log entries found.
                  </td>
                </tr>
              ) : (
                filteredLogs.map((log) => {
                  const isAttack = log.prediction === 'ATTACK';
                  return (
                    <tr
                      key={log.id}
                      className="hover:bg-slate-50/80 transition-colors group cursor-pointer"
                      onClick={() => setActiveLog(log)}
                    >
                      <td className="py-3.5 px-6 font-mono text-slate-500 whitespace-nowrap">
                        <div className="flex items-center space-x-1.5">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          <span>{log.time}</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-6 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-md font-bold text-[11px] ${
                            isAttack
                              ? 'bg-rose-50 text-rose-700 border border-rose-200'
                              : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          }`}
                        >
                          {log.prediction}
                        </span>
                        {log.attackType && (
                          <span className="block text-[10px] text-rose-500 mt-0.5 font-medium">
                            {log.attackType}
                          </span>
                        )}
                      </td>
                      <td className="py-3.5 px-6 whitespace-nowrap">
                        <span
                          className={`font-semibold ${
                            isAttack ? 'text-rose-600' : 'text-slate-600'
                          }`}
                        >
                          {log.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-6 font-mono whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <span className="font-semibold">
                            {(log.confidence * 100).toFixed(1)}%
                          </span>
                          <div className="w-12 bg-slate-100 rounded-full h-1.5 overflow-hidden">
                            <div
                              className={`h-1.5 rounded-full ${
                                isAttack ? 'bg-rose-500' : 'bg-emerald-500'
                              }`}
                              style={{ width: `${log.confidence * 100}%` }}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-6 font-mono text-slate-600 whitespace-nowrap">
                        {log.source}
                      </td>
                      <td className="py-3.5 px-6 font-mono text-slate-500 whitespace-nowrap">
                        {log.port} / {log.protocol}
                      </td>
                      <td className="py-3.5 px-6 text-right whitespace-nowrap">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveLog(log);
                          }}
                          className="inline-flex items-center space-x-1 px-2.5 py-1 text-xs font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>View</span>
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Details Inspection Modal */}
      {activeLog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-5 animate-in fade-in zoom-in duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center space-x-2.5">
                {activeLog.prediction === 'ATTACK' ? (
                  <ShieldAlert className="w-5 h-5 text-rose-600" />
                ) : (
                  <ShieldCheck className="w-5 h-5 text-emerald-600" />
                )}
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Flow Inspection: {activeLog.id}
                  </h3>
                  <p className="text-xs text-slate-500">Recorded at {activeLog.time}</p>
                </div>
              </div>
              <button
                onClick={() => setActiveLog(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="text-slate-400 block mb-0.5">Classification</span>
                <span
                  className={`font-bold ${
                    activeLog.prediction === 'ATTACK' ? 'text-rose-600' : 'text-emerald-600'
                  }`}
                >
                  {activeLog.prediction} ({activeLog.status})
                </span>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="text-slate-400 block mb-0.5">Model Confidence</span>
                <span className="font-bold text-slate-800 font-mono">
                  {(activeLog.confidence * 100).toFixed(2)}%
                </span>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="text-slate-400 block mb-0.5">Masked Source IP</span>
                <span className="font-bold text-slate-800 font-mono">{activeLog.source}</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="text-slate-400 block mb-0.5">Destination & Port</span>
                <span className="font-bold text-slate-800 font-mono">
                  {activeLog.destination}:{activeLog.port} ({activeLog.protocol})
                </span>
              </div>
            </div>

            {activeLog.attackType && (
              <div className="bg-rose-50 p-3 rounded-xl border border-rose-100 text-xs">
                <span className="font-bold text-rose-900 block mb-1">Threat Assessment</span>
                <p className="text-rose-700">
                  Signature matched: <strong>{activeLog.attackType}</strong>. Recommend verifying firewall ingress rules for {activeLog.source}.
                </p>
              </div>
            )}

            {activeLog.features && (
              <div className="border-t border-slate-100 pt-3">
                <span className="text-xs font-bold text-slate-800 block mb-2">
                  Sampled Flow Features
                </span>
                <div className="grid grid-cols-2 gap-2 text-[11px] font-mono bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <div>Flow Duration: {activeLog.flowDurationMs}ms</div>
                  <div>Dest Port: {activeLog.port}</div>
                  {activeLog.features.flow_bytes_per_sec && (
                    <div>Bytes/s: {activeLog.features.flow_bytes_per_sec}</div>
                  )}
                  {activeLog.features.total_fwd_packets && (
                    <div>Fwd Packets: {activeLog.features.total_fwd_packets}</div>
                  )}
                </div>
              </div>
            )}

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setActiveLog(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
              >
                Close Inspection
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
