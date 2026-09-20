import React, { useState } from 'react';
import { 
  Activity, 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle, 
  RefreshCw, 
  ShieldCheck, 
  ShieldAlert, 
  Sliders, 
  FileText,
  HelpCircle
} from 'lucide-react';
import { NetworkTrafficFeatures, PredictionResult, DetectionLog } from '../types/ids';
import { sampleNormalTraffic, sampleAttackTraffic } from '../data/mockData';
import { idsApi } from '../services/api';

interface TrafficAnalysisProps {
  onNavigate: (tab: string) => void;
  onAddLogEntry?: (newLog: DetectionLog) => void;
  initialMode?: 'normal' | 'attack';
}

export const TrafficAnalysis: React.FC<TrafficAnalysisProps> = ({ 
  onNavigate,
  onAddLogEntry,
  initialMode
}) => {
  const [formData, setFormData] = useState<NetworkTrafficFeatures>(
    initialMode === 'attack' ? sampleAttackTraffic : sampleNormalTraffic
  );
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(
    initialMode === 'attack'
      ? {
          prediction: 'ATTACK',
          status: 'SUSPICIOUS',
          confidence: 0.947,
          timestamp: '13:44:08',
          attack_type: 'DoS / Volumetric Flood',
          recommendedAction: 'Review the source traffic and inspect network activity logs.'
        }
      : initialMode === 'normal'
      ? {
          prediction: 'BENIGN',
          status: 'NORMAL',
          confidence: 0.982,
          timestamp: '13:45:22',
        }
      : null
  );
  const [hasRun, setHasRun] = useState(Boolean(initialMode));

  const handleInputChange = (field: keyof NetworkTrafficFeatures, value: string) => {
    const numVal = parseFloat(value);
    setFormData((prev) => ({
      ...prev,
      [field]: isNaN(numVal) ? 0 : numVal,
    }));
  };

  const handleLoadNormalSample = () => {
    setFormData(sampleNormalTraffic);
    setResult(null);
    setHasRun(false);
  };

  const handleLoadAttackSample = () => {
    setFormData(sampleAttackTraffic);
    setResult(null);
    setHasRun(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const pred = await idsApi.predict(formData);
      setResult(pred);
      setHasRun(true);

      // Append to live logs if callback provided
      if (onAddLogEntry) {
        const newLog: DetectionLog = {
          id: `log-${Date.now()}`,
          time: new Date().toLocaleTimeString(),
          prediction: pred.prediction,
          status: pred.status,
          confidence: pred.confidence,
          source: pred.prediction === 'ATTACK' ? '192.168.1.189' : '192.168.1.104',
          destination: '10.0.0.1',
          port: formData.destination_port,
          protocol: 'TCP',
          flowDurationMs: formData.flow_duration,
          attackType: pred.attack_type,
          features: formData
        };
        onAddLogEntry(newLog);
      }
    } catch (err) {
      console.error('Classification error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Page Heading */}
      <div>
        <div className="inline-flex items-center space-x-2 text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">
          <Activity className="w-3.5 h-3.5" />
          <span>Interactive Machine Learning Inference</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          NETWORK TRAFFIC ANALYSER
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Enter network traffic features to classify the connection.
        </p>
      </div>

      {/* Caption Banner */}
      <div className="bg-slate-100 text-slate-700 text-xs font-semibold px-4 py-2 rounded-xl border border-slate-200">
        {result?.prediction === 'ATTACK'
          ? 'Figure 5: Detection of suspicious network traffic'
          : 'Figure 4: Detection of normal network traffic'}
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Form & Preset Controls */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/80 shadow-card p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-slate-100 gap-3">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Network Flow Parameters
              </h2>
              <p className="text-xs text-slate-500">
                Features extracted according to CICIDS2017 flow specification
              </p>
            </div>

            {/* Sample Buttons */}
            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={handleLoadNormalSample}
                className="px-3 py-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-lg border border-emerald-200/80 transition-colors"
              >
                Load Normal Sample
              </button>
              <button
                type="button"
                onClick={handleLoadAttackSample}
                className="px-3 py-1.5 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-lg border border-rose-200/80 transition-colors"
              >
                Load Attack Sample
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Field 1: Flow Duration */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Flow Duration (ms)
                </label>
                <input
                  type="number"
                  step="any"
                  value={formData.flow_duration}
                  onChange={(e) => handleInputChange('flow_duration', e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50/70 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-mono"
                  required
                />
                <span className="text-[10px] text-slate-400 mt-1 block">Total duration of packet stream</span>
              </div>

              {/* Field 2: Total Forward Packets */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Total Forward Packets
                </label>
                <input
                  type="number"
                  step="any"
                  value={formData.total_fwd_packets}
                  onChange={(e) => handleInputChange('total_fwd_packets', e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50/70 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-mono"
                  required
                />
                <span className="text-[10px] text-slate-400 mt-1 block">Source-to-destination packet count</span>
              </div>

              {/* Field 3: Total Backward Packets */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Total Backward Packets
                </label>
                <input
                  type="number"
                  step="any"
                  value={formData.total_backward_packets}
                  onChange={(e) => handleInputChange('total_backward_packets', e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50/70 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-mono"
                  required
                />
                <span className="text-[10px] text-slate-400 mt-1 block">Destination-to-source responses</span>
              </div>

              {/* Field 4: Flow Bytes/s */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Flow Bytes/s
                </label>
                <input
                  type="number"
                  step="any"
                  value={formData.flow_bytes_per_sec}
                  onChange={(e) => handleInputChange('flow_bytes_per_sec', e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50/70 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-mono"
                  required
                />
                <span className="text-[10px] text-slate-400 mt-1 block">Payload transmission rate</span>
              </div>

              {/* Field 5: Flow Packets/s */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Flow Packets/s
                </label>
                <input
                  type="number"
                  step="any"
                  value={formData.flow_packets_per_sec}
                  onChange={(e) => handleInputChange('flow_packets_per_sec', e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50/70 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-mono"
                  required
                />
                <span className="text-[10px] text-slate-400 mt-1 block">Frequency of packets per second</span>
              </div>

              {/* Field 6: Packet Length Mean */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Packet Length Mean (bytes)
                </label>
                <input
                  type="number"
                  step="any"
                  value={formData.packet_length_mean}
                  onChange={(e) => handleInputChange('packet_length_mean', e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50/70 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-mono"
                  required
                />
                <span className="text-[10px] text-slate-400 mt-1 block">Average packet payload dimension</span>
              </div>

              {/* Field 7: Packet Length Std */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Packet Length Std Dev
                </label>
                <input
                  type="number"
                  step="any"
                  value={formData.packet_length_std}
                  onChange={(e) => handleInputChange('packet_length_std', e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50/70 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-mono"
                  required
                />
                <span className="text-[10px] text-slate-400 mt-1 block">Variance in packet size</span>
              </div>

              {/* Field 8: Destination Port */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Destination Port
                </label>
                <input
                  type="number"
                  step="1"
                  value={formData.destination_port}
                  onChange={(e) => handleInputChange('destination_port', e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50/70 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-mono"
                  required
                />
                <span className="text-[10px] text-slate-400 mt-1 block">e.g. 80 (HTTP), 443 (HTTPS), 22 (SSH)</span>
              </div>

            </div>

            {/* Submit Button */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-400">
                Inference powered by Random Forest ensemble
              </span>
              <button
                type="submit"
                disabled={isLoading}
                className="inline-flex items-center space-x-2 px-6 py-3 text-sm font-semibold rounded-xl text-white bg-blue-600 hover:bg-blue-700 shadow-sm hover:shadow transition-all active:scale-95 disabled:opacity-60"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Evaluating Features...</span>
                  </>
                ) : (
                  <>
                    <span>Analyse Traffic</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Right Column: Prediction Result & Security Alert */}
        <div className="lg:col-span-5 space-y-6">
          {!hasRun || !result ? (
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-card p-8 text-center flex flex-col items-center justify-center min-h-[360px]">
              <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-400 mb-4">
                <Sliders className="w-7 h-7" />
              </div>
              <h3 className="text-base font-bold text-slate-800">
                Ready for Traffic Analysis
              </h3>
              <p className="text-xs text-slate-500 max-w-xs mt-2 leading-relaxed">
                Click &quot;Analyse Traffic&quot; or choose a preset (Normal or Attack Sample) to trigger the classification model.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-2">
                <button
                  onClick={handleLoadNormalSample}
                  className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                >
                  Quick Normal Test
                </button>
                <button
                  onClick={handleLoadAttackSample}
                  className="px-3 py-1.5 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-lg transition-colors"
                >
                  Quick Attack Test
                </button>
              </div>
            </div>
          ) : result.prediction === 'BENIGN' ? (
            /* Benign Result Card (Green styling) */
            <div className="bg-white rounded-2xl border border-emerald-200 shadow-card p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-emerald-100">
                <div className="flex items-center space-x-2">
                  <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-lg">
                    ✓
                  </div>
                  <div>
                    <h3 className="text-xl font-extrabold text-emerald-800 tracking-tight">
                      BENIGN
                    </h3>
                    <span className="text-xs font-bold text-emerald-600 tracking-wider">
                      NORMAL TRAFFIC
                    </span>
                  </div>
                </div>
                <span className="text-xs font-mono font-bold bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full border border-emerald-200">
                  {result.timestamp}
                </span>
              </div>

              <div className="bg-emerald-50/70 rounded-xl p-4 border border-emerald-100">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-semibold text-emerald-800">
                    Model Confidence
                  </span>
                  <span className="text-sm font-bold font-mono text-emerald-800">
                    {(result.confidence * 100).toFixed(2)}%
                  </span>
                </div>
                <div className="w-full bg-emerald-200/60 rounded-full h-2.5 overflow-hidden">
                  <div
                    className="bg-emerald-600 h-2.5 rounded-full transition-all duration-500"
                    style={{ width: `${result.confidence * 100}%` }}
                  />
                </div>
              </div>

              <div className="space-y-2 text-xs text-slate-600">
                <div className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <p className="font-medium text-slate-700">
                    No suspicious behaviour detected.
                  </p>
                </div>
                <p className="text-slate-500 pl-6 leading-relaxed">
                  Traffic characteristics conform within standard deviation parameters for legitimate client-server conversations.
                </p>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-400">Status: Verified Safe</span>
                <button
                  onClick={() => onNavigate('logs')}
                  className="text-blue-600 font-semibold hover:underline flex items-center space-x-1"
                >
                  <span>View in Logs</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ) : (
            /* Attack Result Card (Red styling + Section 16 Alert UI) */
            <div className="space-y-4">
              {/* Primary Attack Card */}
              <div className="bg-white rounded-2xl border border-rose-200 shadow-card p-6 sm:p-8 space-y-5">
                <div className="flex items-center justify-between pb-4 border-b border-rose-100">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-rose-600 text-white flex items-center justify-center font-bold text-xl shadow-xs">
                      !
                    </div>
                    <div>
                      <h3 className="text-xl font-extrabold text-rose-700 tracking-tight">
                        ATTACK
                      </h3>
                      <span className="text-xs font-bold text-rose-600 tracking-wider">
                        SUSPICIOUS TRAFFIC DETECTED
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold bg-rose-50 text-rose-700 px-3 py-1 rounded-full border border-rose-200">
                    {result.timestamp}
                  </span>
                </div>

                <div className="bg-rose-50/70 rounded-xl p-4 border border-rose-100">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-semibold text-rose-900">
                      Model Confidence
                    </span>
                    <span className="text-sm font-bold font-mono text-rose-800">
                      {(result.confidence * 100).toFixed(2)}%
                    </span>
                  </div>
                  <div className="w-full bg-rose-200/60 rounded-full h-2.5 overflow-hidden">
                    <div
                      className="bg-rose-600 h-2.5 rounded-full transition-all duration-500"
                      style={{ width: `${result.confidence * 100}%` }}
                    />
                  </div>
                  {result.attack_type && (
                    <div className="mt-3 pt-2 border-t border-rose-200/60 flex items-center justify-between text-xs">
                      <span className="text-rose-700 font-medium">Signature Match:</span>
                      <span className="font-bold text-rose-900">{result.attack_type}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-2 text-xs text-slate-700">
                  <div className="flex items-start space-x-2">
                    <AlertTriangle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
                    <p className="font-medium text-rose-950">
                      Potential malicious activity detected.
                    </p>
                  </div>
                  <p className="text-slate-500 pl-6 leading-relaxed">
                    Flow characteristics indicate volumetric flood, anomalous packet size variance, or reconnaissance scanning.
                  </p>
                </div>
              </div>

              {/* Section 16: SECURITY ALERT UI */}
              <div className="bg-gradient-to-br from-rose-900 via-rose-850 to-slate-900 text-white rounded-2xl p-6 shadow-card-hover border border-rose-700/60 space-y-4">
                <div className="flex items-center space-x-2 pb-3 border-b border-rose-700/50">
                  <ShieldAlert className="w-5 h-5 text-rose-400 animate-pulse" />
                  <span className="text-xs font-extrabold tracking-wider text-rose-300 uppercase">
                    Security Alert
                  </span>
                </div>

                <p className="text-sm font-medium text-rose-100">
                  Potential malicious network activity detected.
                </p>

                <div className="grid grid-cols-2 gap-3 text-xs bg-black/20 p-3 rounded-xl border border-rose-800/60">
                  <div>
                    <span className="text-rose-300 block text-[10px] uppercase font-semibold">Classification</span>
                    <span className="font-bold text-white text-sm">ATTACK</span>
                  </div>
                  <div>
                    <span className="text-rose-300 block text-[10px] uppercase font-semibold">Status</span>
                    <span className="font-bold text-amber-300 text-sm">SUSPICIOUS</span>
                  </div>
                </div>

                <div>
                  <span className="text-[11px] font-semibold text-rose-300 uppercase tracking-wider block mb-1">
                    Recommended Action
                  </span>
                  <p className="text-xs text-rose-100/90 leading-relaxed">
                    Review the source traffic and inspect network activity logs.
                  </p>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => onNavigate('logs')}
                    className="w-full py-2.5 px-4 bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold rounded-xl transition-colors flex items-center justify-center space-x-2 shadow-sm"
                  >
                    <span>View Detection Log</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Feature Guide Tip */}
          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200/80 text-xs text-slate-600 space-y-2">
            <div className="flex items-center space-x-2 font-bold text-slate-800">
              <HelpCircle className="w-4 h-4 text-blue-600" />
              <span>Feature Diagnostic Note</span>
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              When hooked to a live Python backend, confidence is calculated directly via <code className="bg-slate-200 px-1 py-0.5 rounded font-mono text-slate-800">predict_proba()</code> on the trained Random Forest model.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
