import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Activity, 
  CheckCircle, 
  AlertTriangle, 
  ArrowUpRight, 
  Eye, 
  SlidersHorizontal,
  RefreshCw,
  Cpu
} from 'lucide-react';
import { StatCard } from '../components/StatCard';
import { TrafficChart } from '../components/TrafficChart';
import { ThreatDonutChart } from '../components/ThreatDonutChart';
import { LiveDetectionPanel } from '../components/LiveDetectionPanel';
import { 
  dashboardStats, 
  trafficTimelineData, 
  threatDistributionData, 
  initialDetectionLogs 
} from '../data/mockData';

interface DashboardProps {
  onNavigate: (tab: string) => void;
  onInspectLog?: (logId: string) => void;
  mode?: 'standard' | 'fig6';
}

export const Dashboard: React.FC<DashboardProps> = ({ onNavigate, onInspectLog, mode = 'standard' }) => {
  const [stats, setStats] = useState(
    mode === 'fig6'
      ? {
          totalTraffic: 1000,
          totalTrafficChange: '1000 Total',
          normalTraffic: 842,
          normalTrafficPercent: '84.2%',
          threatsDetected: 158,
          threatsDetectedChange: '158 Blocked',
          accuracy: 15.8, // Used for Attack Rate
        }
      : dashboardStats
  );
  const [logs] = useState(
    mode === 'fig6'
      ? [
          { id: 'al-1', time: '13:44:08', prediction: 'ATTACK' as const, status: 'HIGH' as any, confidence: 0.947, source: '192.168.1.189', destination: '10.0.0.1', port: 80, protocol: 'TCP' as const, flowDurationMs: 380, attackType: 'HIGH Severity' },
          { id: 'al-2', time: '13:41:30', prediction: 'ATTACK' as const, status: 'HIGH' as any, confidence: 0.923, source: '192.168.1.205', destination: '10.0.0.1', port: 22, protocol: 'TCP' as const, flowDurationMs: 890, attackType: 'HIGH Severity' },
          { id: 'al-3', time: '13:40:15', prediction: 'BENIGN' as const, status: 'NORMAL' as any, confidence: 0.982, source: '192.168.1.107', destination: '10.0.0.1', port: 8080, protocol: 'TCP' as const, flowDurationMs: 1420, attackType: 'NORMAL Baseline' },
          { id: 'al-4', time: '13:38:44', prediction: 'ATTACK' as const, status: 'HIGH' as any, confidence: 0.965, source: '192.168.1.230', destination: '10.0.0.1', port: 445, protocol: 'TCP' as const, flowDurationMs: 210, attackType: 'HIGH Severity' },
        ]
      : initialDetectionLogs.slice(0, 5)
  );
  const [refreshKey, setRefreshKey] = useState(0);

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Caption Banner */}
      <div className="bg-slate-100 text-slate-700 text-xs font-semibold px-4 py-2 rounded-xl border border-slate-200">
        Figure 6: AI-based intrusion detection dashboard
      </div>

      {/* Dashboard Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-2 gap-4">
        <div>
          <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
            Good afternoon
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-0.5">
            Network Security Overview
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Monitor network traffic and identify suspicious activity in real-time.
          </p>
        </div>

        {/* Right System Status Indicator */}
        <div className="flex items-center space-x-3">
          <div className="bg-white px-4 py-2 rounded-xl border border-slate-200/80 shadow-xs flex items-center space-x-3">
            <span className="text-xs font-semibold text-slate-500">System Status</span>
            <div className="flex items-center space-x-1.5 text-xs font-bold text-emerald-600">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>Operational</span>
            </div>
          </div>

          <button
            onClick={handleRefresh}
            className="p-2.5 rounded-xl bg-white border border-slate-200/80 text-slate-600 hover:text-blue-600 hover:border-slate-300 shadow-xs transition-colors"
            title="Refresh dashboard metrics"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          title={mode === 'fig6' ? "Total Requests" : "Total Traffic"}
          value={stats.totalTraffic.toLocaleString()}
          change={mode === 'fig6' ? "1000" : stats.totalTrafficChange}
          changeType="positive"
          subtitle="Packets & network flows logged"
          icon={Activity}
          iconBgColor="bg-blue-50"
          iconColor="text-blue-600"
        />

        <StatCard
          title="Normal Traffic"
          value={stats.normalTraffic.toLocaleString()}
          change={stats.normalTrafficPercent}
          changeType="positive"
          subtitle="Classified as BENIGN activity"
          icon={CheckCircle}
          iconBgColor="bg-emerald-50"
          iconColor="text-emerald-600"
        />

        <StatCard
          title={mode === 'fig6' ? "Suspicious Traffic" : "Threats Detected"}
          value={stats.threatsDetected.toLocaleString()}
          change={mode === 'fig6' ? "158" : stats.threatsDetectedChange}
          changeType="negative"
          subtitle="Flagged by Random Forest model"
          icon={ShieldAlert}
          iconBgColor="bg-rose-50"
          iconColor="text-rose-600"
        />

        <StatCard
          title={mode === 'fig6' ? "Attack Rate" : "Model Accuracy"}
          value={mode === 'fig6' ? "15.8%" : `${stats.accuracy}%`}
          change={mode === 'fig6' ? "15.8%" : "Validated"}
          changeType={mode === 'fig6' ? "negative" : "positive"}
          subtitle={mode === 'fig6' ? "Suspicious / Total ratio" : "Cross-validated on CICIDS2017"}
          icon={Cpu}
          iconBgColor="bg-indigo-50"
          iconColor="text-indigo-600"
        />
      </div>

      {/* When in Figure 6 Mode, show the exact Recent Alerts Table right here */}
      {mode === 'fig6' && (
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-card p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Recent Alerts
              </h3>
              <p className="text-xs text-slate-500">
                Prioritized security alerts generated by Random Forest inference
              </p>
            </div>
            <span className="text-xs font-semibold text-rose-600 bg-rose-50 px-2.5 py-1 rounded-md border border-rose-200">
              Active Triage
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                <tr>
                  <th className="py-2.5 px-4">Event</th>
                  <th className="py-2.5 px-4">Severity</th>
                  <th className="py-2.5 px-4">Source IP</th>
                  <th className="py-2.5 px-4">Target Vector</th>
                  <th className="py-2.5 px-4">Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {logs.map((log) => {
                  const isAttack = log.prediction === 'ATTACK';
                  return (
                    <tr key={log.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3 px-4">
                        <span className={`inline-flex px-2 py-0.5 rounded font-bold ${isAttack ? 'bg-rose-50 text-rose-700 border border-rose-200' : 'bg-emerald-50 text-emerald-700 border border-emerald-200'}`}>
                          {log.prediction}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-bold">
                        <span className={isAttack ? 'text-rose-600' : 'text-slate-600'}>
                          {log.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-slate-700">{log.source}</td>
                      <td className="py-3 px-4 text-slate-600">{log.attackType}</td>
                      <td className="py-3 px-4 text-slate-400">{log.time}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Main Charts & Live Panel Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Traffic Activity Graph */}
        <div className="lg:col-span-8 space-y-6">
          <TrafficChart data={trafficTimelineData} />

          {/* Quick Actions & Live Detection Banner */}
          <div className="bg-blue-50/60 border border-blue-200/70 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start space-x-3.5">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center flex-shrink-0 shadow-sm">
                <SlidersHorizontal className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">
                  Analyze Custom Flow Parameters
                </h4>
                <p className="text-xs text-slate-600 mt-0.5">
                  Test custom packet size, duration, and port features against the Random Forest classifier.
                </p>
              </div>
            </div>
            <button
              onClick={() => onNavigate('traffic-analysis')}
              className="inline-flex items-center space-x-2 px-4 py-2 text-xs font-semibold rounded-xl bg-blue-600 text-white hover:bg-blue-700 shadow-xs transition-colors flex-shrink-0"
            >
              <span>Test Classifier</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Right Column: Threat Distribution & Live Panel */}
        <div className="lg:col-span-4 space-y-6">
          <LiveDetectionPanel 
            totalAnalyzed={stats.totalTraffic} 
            onScanNow={handleRefresh}
          />
          <ThreatDonutChart data={threatDistributionData} />
        </div>
      </div>

      {/* Recent Detections Table Widget */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-card overflow-hidden">
        <div className="p-6 pb-4 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Recent Detection Feed
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Latest classified connection flows from local network interfaces
            </p>
          </div>
          <button
            onClick={() => onNavigate('logs')}
            className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center space-x-1"
          >
            <span>View All Logs</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50/80 text-[11px] font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-100">
              <tr>
                <th className="py-3 px-6">Time</th>
                <th className="py-3 px-6">Prediction</th>
                <th className="py-3 px-6">Status</th>
                <th className="py-3 px-6">Confidence</th>
                <th className="py-3 px-6">Source IP</th>
                <th className="py-3 px-6">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs font-medium text-slate-700">
              {logs.map((log) => {
                const isAttack = log.prediction === 'ATTACK';
                return (
                  <tr key={log.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 px-6 font-mono text-slate-500">{log.time}</td>
                    <td className="py-3.5 px-6">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-md font-bold text-[11px] ${
                          isAttack
                            ? 'bg-rose-50 text-rose-700 border border-rose-200'
                            : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        }`}
                      >
                        {log.prediction}
                      </span>
                    </td>
                    <td className="py-3.5 px-6">
                      <span
                        className={`font-semibold ${
                          isAttack ? 'text-rose-600' : 'text-slate-600'
                        }`}
                      >
                        {log.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-6 font-mono">
                      {(log.confidence * 100).toFixed(1)}%
                    </td>
                    <td className="py-3.5 px-6 font-mono text-slate-600">
                      {log.source}
                    </td>
                    <td className="py-3.5 px-6">
                      <button
                        onClick={() => onNavigate('logs')}
                        className="text-blue-600 hover:text-blue-800 font-semibold inline-flex items-center space-x-1"
                      >
                        <span>View</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
