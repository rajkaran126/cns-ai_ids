import React from 'react';
import { 
  Shield, 
  Info, 
  Database, 
  Cpu, 
  Code2, 
  LineChart, 
  Layers, 
  CheckCircle2, 
  Server,
  Lock
} from 'lucide-react';

export const About: React.FC = () => {
  const techStack = [
    { category: 'Machine Learning', value: 'Random Forest Classifier', icon: Cpu, detail: '100 Decision Trees with Gini Impurity split criteria' },
    { category: 'Benchmark Dataset', value: 'CICIDS2017', icon: Database, detail: 'Canadian Institute for Cybersecurity intrusion evaluation dataset' },
    { category: 'Backend Stack', value: 'Python (Scikit-Learn, Pandas)', icon: Server, detail: 'High-throughput feature transformation & inference pipeline' },
    { category: 'Frontend Architecture', value: 'React + TypeScript + Vite', icon: Code2, detail: 'Component-based responsive cybersecurity SaaS UI' },
    { category: 'Data Visualization', value: 'Recharts & Tailwind CSS', icon: LineChart, detail: 'Declarative, responsive analytics graphs and distribution matrices' },
  ];

  const pipelineHighlights = [
    { title: 'Packet Capture & Flow Aggregation', desc: 'Continuous network packet ingestion aggregated into bi-directional IP flows.' },
    { title: 'Feature Extraction & Normalization', desc: 'Calculates statistical attributes (flow duration, byte rate, packet length standard deviation).' },
    { title: 'Ensemble Tree Evaluation', desc: 'Evaluates multi-feature branches to generate class probability scores via predict_proba().' },
    { title: 'Automated Security Alerting', desc: 'Provides immediate high-confidence incident alerts and recommended remediation workflows.' },
  ];

  return (
    <div className="space-y-8 pb-12 max-w-5xl">
      {/* Top Header */}
      <div>
        <div className="inline-flex items-center space-x-2 text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">
          <Info className="w-3.5 h-3.5" />
          <span>System Architecture & Overview</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          About AI-IDS
        </h1>
        <p className="text-sm text-slate-600 mt-2 leading-relaxed">
          AI-IDS is an academic AI-based intrusion detection prototype designed to analyse network traffic and identify potentially malicious activity using machine learning.
        </p>
      </div>

      {/* Core Mission Banner */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-950 text-white rounded-2xl p-6 sm:p-8 shadow-card border border-blue-800">
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 rounded-xl bg-blue-600/30 border border-blue-400/40 flex items-center justify-center flex-shrink-0 text-blue-300">
            <Shield className="w-6 h-6" />
          </div>
          <div className="space-y-2">
            <h2 className="text-lg font-bold tracking-tight">
              Intelligent Network Intrusion Detection
            </h2>
            <p className="text-xs sm:text-sm text-blue-100/90 leading-relaxed font-normal">
              Traditional signature-based intrusion detection systems often fail against zero-day exploits and high-velocity polymorphic network payloads. By training robust Random Forest ensemble classifiers on realistic traffic distributions from the benchmark CICIDS2017 dataset, AI-IDS effectively categorizes complex temporal and volumetric patterns into benign vs. anomalous traffic streams.
            </p>
          </div>
        </div>
      </div>

      {/* Architecture Specifications */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-card p-6 sm:p-8 space-y-6">
        <div>
          <h3 className="text-base font-bold text-slate-900">
            System Specifications & Technology Stack
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Key software frameworks, machine learning models, and datasets underpinning the system.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {techStack.map((tech) => {
            const Icon = tech.icon;
            return (
              <div
                key={tech.category}
                className="bg-slate-50 rounded-xl p-4 border border-slate-200/80 flex items-start space-x-3.5 hover:bg-slate-100/50 transition-colors"
              >
                <div className="w-9 h-9 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 flex-shrink-0">
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                    {tech.category}
                  </span>
                  <span className="text-sm font-bold text-slate-800 block mt-0.5">
                    {tech.value}
                  </span>
                  <p className="text-xs text-slate-500 mt-1">
                    {tech.detail}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Detection Workflow Pipeline */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-card p-6 sm:p-8 space-y-6">
        <div>
          <h3 className="text-base font-bold text-slate-900">
            Intrusion Analysis Pipeline
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Structured workflow from raw transport layer data to threat classification.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          {pipelineHighlights.map((pipe, idx) => (
            <div key={pipe.title} className="p-4 rounded-xl border border-slate-100 bg-slate-50/60 space-y-1.5">
              <div className="flex items-center space-x-2 text-xs font-bold text-blue-600">
                <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-[10px]">
                  0{idx + 1}
                </span>
                <span>{pipe.title}</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed pl-7">
                {pipe.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Compliance & Academic Disclaimer */}
      <div className="bg-slate-100/70 border border-slate-200 rounded-2xl p-5 text-xs text-slate-500 space-y-1">
        <span className="font-bold text-slate-700 block">Academic Prototype Notice</span>
        <p className="leading-relaxed">
          This system is developed as an academic exploration of supervised learning algorithms applied to high-speed computer network traffic security. Telemetry metrics and traffic parameters are calibrated according to standard published benchmarks.
        </p>
      </div>
    </div>
  );
};
