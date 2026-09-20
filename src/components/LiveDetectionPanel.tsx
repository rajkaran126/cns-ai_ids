import React, { useState, useEffect } from 'react';
import { ShieldCheck, Radio, RefreshCw, Cpu, Activity } from 'lucide-react';

interface LiveDetectionPanelProps {
  totalAnalyzed?: number;
  onScanNow?: () => void;
}

export const LiveDetectionPanel: React.FC<LiveDetectionPanelProps> = ({
  totalAnalyzed = 1284,
  onScanNow
}) => {
  const [lastScanSeconds, setLastScanSeconds] = useState(2);
  const [isScanning, setIsScanning] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setLastScanSeconds((prev) => (prev >= 60 ? 1 : prev + 1));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleManualScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setLastScanSeconds(0);
      if (onScanNow) onScanNow();
    }, 700);
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-850 to-slate-900 text-white rounded-2xl p-6 shadow-card-hover relative overflow-hidden border border-slate-800">
      {/* Decorative subtle radar grid background */}
      <div className="absolute top-0 right-0 -mt-8 -mr-8 w-48 h-48 bg-blue-500/10 rounded-full blur-2xl pointer-events-none"></div>
      
      <div className="flex items-center justify-between pb-4 border-b border-slate-800/80">
        <div className="flex items-center space-x-2.5">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-80"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </span>
          <span className="text-xs font-bold tracking-wider text-emerald-400 uppercase">
            Live Detection
          </span>
        </div>
        <button
          onClick={handleManualScan}
          disabled={isScanning}
          className="flex items-center space-x-1.5 text-xs text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700/80 px-2.5 py-1 rounded-lg border border-slate-700 transition-colors"
          title="Trigger quick live sweep"
        >
          <RefreshCw className={`w-3 h-3 ${isScanning ? 'animate-spin text-blue-400' : ''}`} />
          <span>{isScanning ? 'Scanning...' : 'Scan Now'}</span>
        </button>
      </div>

      <div className="mt-4">
        <div className="flex items-center space-x-2 text-slate-300 text-sm font-medium">
          <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
          <span>System is monitoring</span>
        </div>
        <p className="text-xs text-slate-400 mt-0.5">
          Actively inspecting ingress/egress network flows for anomalous payload signatures.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-6">
        <div className="bg-slate-800/50 rounded-xl p-3 border border-slate-700/60">
          <div className="text-[11px] text-slate-400 uppercase font-semibold">
            Traffic Analysed
          </div>
          <div className="text-xl font-bold text-white mt-1">
            {totalAnalyzed.toLocaleString()}
          </div>
          <div className="text-[10px] text-slate-400 mt-0.5 flex items-center space-x-1">
            <Activity className="w-3 h-3 text-blue-400" />
            <span>Packets & flows</span>
          </div>
        </div>

        <div className="bg-slate-800/50 rounded-xl p-3 border border-slate-700/60">
          <div className="text-[11px] text-slate-400 uppercase font-semibold">
            Last Scan
          </div>
          <div className="text-xl font-bold text-white mt-1">
            {lastScanSeconds}s ago
          </div>
          <div className="text-[10px] text-slate-400 mt-0.5">
            Real-time inference buffer
          </div>
        </div>
      </div>

      <div className="mt-5 pt-4 border-t border-slate-800 flex items-center justify-between">
        <div>
          <span className="text-xs text-slate-400">Security Status</span>
          <div className="text-sm font-bold text-emerald-400 tracking-wide flex items-center space-x-1.5 mt-0.5">
            <ShieldCheck className="w-4 h-4" />
            <span>PROTECTED</span>
          </div>
        </div>
        <div className="text-right">
          <span className="text-[11px] text-slate-400 block">Classifier Engine</span>
          <span className="text-xs font-semibold text-blue-300">Random Forest</span>
        </div>
      </div>

      <div className="mt-3 text-[11px] text-slate-400/80 bg-slate-800/30 p-2 rounded-lg border border-slate-800 text-center">
        Prototype mode &bull; Ready for Python backend integration
      </div>
    </div>
  );
};
