import React from 'react';
import { 
  Shield, 
  ArrowRight, 
  Activity, 
  Cpu, 
  AlertTriangle, 
  FileText, 
  CheckCircle2, 
  Server, 
  Filter, 
  Database,
  BarChart3,
  Lock,
  Layers,
  Zap
} from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';

interface LandingPageProps {
  onNavigate: (tab: string) => void;
}

const miniHeroGraphData = [
  { val: 20 },
  { val: 35 },
  { val: 28 },
  { val: 45 },
  { val: 30 },
  { val: 55 },
  { val: 40 },
  { val: 65 },
  { val: 50 },
  { val: 75 },
];

export const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  const techBadges = [
    { name: 'Python', role: 'Backend ML Core' },
    { name: 'Scikit-learn', role: 'Ensemble Learning' },
    { name: 'Random Forest', role: 'Classifier Model' },
    { name: 'Streamlit / API', role: 'Inference Bridge' },
    { name: 'Pandas', role: 'Data Manipulation' },
    { name: 'Machine Learning', role: 'Network Heuristics' },
  ];

  const features = [
    {
      title: 'Real-Time Traffic Analysis',
      description: 'Analyse network traffic features and identify suspicious patterns across flow characteristics.',
      icon: Activity,
      tag: 'Flow Analytics'
    },
    {
      title: 'AI-Based Detection',
      description: 'Random Forest classification identifies potential attacks based on learned traffic patterns from CICIDS2017.',
      icon: Cpu,
      tag: 'Supervised ML'
    },
    {
      title: 'Security Alerts',
      description: 'Automatically highlight potentially malicious traffic with actionable recommended incident responses.',
      icon: AlertTriangle,
      tag: 'Instant Triaging'
    },
    {
      title: 'Detection Logs',
      description: 'Maintain an immutable record of analysed traffic, confidence ratings, and detected threat vectors.',
      icon: FileText,
      tag: 'Audit Trail'
    }
  ];

  const processSteps = [
    {
      step: '01',
      title: 'Network Traffic',
      desc: 'Raw packet capture and packet flow aggregation',
      icon: Server
    },
    {
      step: '02',
      title: 'Pre-processing',
      desc: 'Data normalization and noise sanitization',
      icon: Filter
    },
    {
      step: '03',
      title: 'Feature Extraction',
      desc: 'Flow duration, packet length, and volumetric metrics',
      icon: Database
    },
    {
      step: '04',
      title: 'Random Forest',
      desc: 'Multi-tree decision ensemble evaluating patterns',
      icon: Cpu
    },
    {
      step: '05',
      title: 'Prediction',
      desc: 'Statistical classification into BENIGN vs ATTACK',
      icon: BarChart3
    },
    {
      step: '06',
      title: 'Security Alert',
      desc: 'Immediate incident triage and log generation',
      icon: Lock
    },
  ];

  return (
    <div className="bg-[#f8fafc] text-slate-900 selection:bg-blue-100 selection:text-blue-900">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28 border-b border-slate-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Hero Left Content */}
            <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                <span>Next-Gen Network Intrusion Detection</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
                Detect suspicious network traffic <span className="text-blue-600">with AI</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
                An AI-powered intrusion detection system that analyses network traffic, identifies suspicious behaviour, and generates security alerts using machine learning.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
                <button
                  onClick={() => onNavigate('dashboard')}
                  className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3.5 text-sm font-semibold rounded-xl text-white bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg transition-all active:scale-95"
                >
                  <span>Open Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onNavigate('traffic-analysis')}
                  className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3.5 text-sm font-semibold rounded-xl text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 shadow-xs hover:border-slate-300 transition-all active:scale-95"
                >
                  <span>Explore Detection</span>
                  <Activity className="w-4 h-4 text-blue-600" />
                </button>
              </div>

              {/* Quick stats banner */}
              <div className="pt-6 border-t border-slate-200/70 grid grid-cols-3 gap-4 max-w-md mx-auto lg:mx-0">
                <div>
                  <div className="text-2xl font-bold text-slate-900">96.4%</div>
                  <div className="text-xs text-slate-500 font-medium">Model Accuracy</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-900">&lt;10ms</div>
                  <div className="text-xs text-slate-500 font-medium">Inference Latency</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-900">100%</div>
                  <div className="text-xs text-slate-500 font-medium">Automated Triaging</div>
                </div>
              </div>
            </div>

            {/* Hero Right Visual Preview with Floating Cards */}
            <div className="lg:col-span-6 relative flex justify-center">
              {/* Outer decorative ambient glow */}
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-3xl blur-2xl opacity-60 pointer-events-none"></div>

              {/* Main Dashboard Preview Card */}
              <div className="relative w-full max-w-lg bg-white rounded-2xl border border-slate-200 shadow-card-floating p-6 z-10 transition-all hover:border-slate-300">
                
                {/* Window header */}
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
                  <div className="flex items-center space-x-2">
                    <span className="w-3 h-3 rounded-full bg-slate-200"></span>
                    <span className="w-3 h-3 rounded-full bg-slate-200"></span>
                    <span className="w-3 h-3 rounded-full bg-slate-200"></span>
                    <span className="text-xs font-bold text-slate-800 ml-2">Network Security Overview</span>
                  </div>
                  <span className="inline-flex items-center text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/70">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5 animate-pulse"></span>
                    Operational
                  </span>
                </div>

                {/* 3 Metric Pills */}
                <div className="grid grid-cols-3 gap-3 mb-5">
                  <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                    <span className="text-[11px] font-medium text-slate-500 block">Threats Detected</span>
                    <span className="text-xl font-bold text-rose-600">24</span>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                    <span className="text-[11px] font-medium text-slate-500 block">Normal Traffic</span>
                    <span className="text-xl font-bold text-slate-800">976</span>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                    <span className="text-[11px] font-medium text-slate-500 block">Detection Accuracy</span>
                    <span className="text-xl font-bold text-blue-600">96.4%</span>
                  </div>
                </div>

                {/* Traffic Activity Graph */}
                <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-100 mb-4">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-2">
                    <span>Traffic Activity</span>
                    <span className="text-[10px] text-slate-400 font-mono">Live Volumetric Stream</span>
                  </div>
                  <div className="h-20 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={miniHeroGraphData}>
                        <defs>
                          <linearGradient id="heroGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#2563eb" stopOpacity={0.4} />
                            <stop offset="95%" stopColor="#2563eb" stopOpacity={0.0} />
                          </linearGradient>
                        </defs>
                        <Area
                          type="monotone"
                          dataKey="val"
                          stroke="#2563eb"
                          strokeWidth={2}
                          fill="url(#heroGradient)"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Recent Detection Strip */}
                <div className="bg-rose-50/70 border border-rose-200/80 rounded-xl p-3 flex items-center justify-between">
                  <div className="flex items-center space-x-2.5">
                    <div className="w-8 h-8 rounded-lg bg-rose-600 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                      !
                    </div>
                    <div>
                      <div className="text-xs font-bold text-rose-900 flex items-center space-x-2">
                        <span>Recent Detection</span>
                        <span className="bg-rose-600 text-white text-[10px] px-1.5 py-0.2 rounded font-bold uppercase">
                          ATTACK
                        </span>
                      </div>
                      <p className="text-[11px] text-rose-700 font-medium">
                        High volumetric flow on port 80 &bull; 94.7% confidence
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-rose-800 bg-rose-100 px-2 py-1 rounded-md">
                    SUSPICIOUS
                  </span>
                </div>
              </div>

              {/* Floating Badge 1: Top Left */}
              <div className="hidden sm:flex absolute -top-4 -left-6 bg-white/95 backdrop-blur px-3.5 py-2 rounded-xl shadow-lg border border-slate-200 items-center space-x-2 z-20 animate-float">
                <Shield className="w-4 h-4 text-emerald-600" />
                <span className="text-xs font-bold text-slate-800">Random Forest Active</span>
              </div>

              {/* Floating Badge 2: Bottom Right */}
              <div className="hidden sm:flex absolute -bottom-4 -right-4 bg-white/95 backdrop-blur px-3.5 py-2.5 rounded-xl shadow-lg border border-slate-200 items-center space-x-2 z-20">
                <CheckCircle2 className="w-4 h-4 text-blue-600" />
                <span className="text-xs font-bold text-slate-800">CICIDS2017 Calibrated</span>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* TRUST / TECHNOLOGY STRIP */}
      <section className="py-10 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Powered by Core Scientific & Machine Learning Technologies
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {techBadges.map((tech) => (
              <div
                key={tech.name}
                className="bg-slate-50 rounded-xl p-3 border border-slate-200/80 text-center hover:border-slate-300 hover:bg-slate-100/70 transition-all group"
              >
                <div className="text-sm font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                  {tech.name}
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5 font-medium">
                  {tech.role}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="py-20 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider bg-blue-50 px-3 py-1 rounded-full border border-blue-200/60">
              System Capabilities
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-3">
              Intelligent protection through machine learning
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Engineered with specialized multi-feature inspection to catch stealthy scans, volumetric flooding, and protocol anomalies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-card hover:shadow-card-hover transition-all duration-200 flex flex-col justify-between group"
                >
                  <div>
                    <div className="w-11 h-11 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wide">
                      {item.tag}
                    </span>
                    <h3 className="text-base font-bold text-slate-900 mt-1">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-600 mt-2 leading-relaxed font-normal">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section className="py-20 bg-white border-t border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Architecture & Execution
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-2">
              End-to-End Detection Pipeline
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              How high-throughput network packets are ingested, processed, and classified into actionable security intelligence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 relative">
            {processSteps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.step}
                  className="bg-slate-50 rounded-2xl p-4 border border-slate-200/90 hover:border-blue-400 hover:bg-blue-50/20 transition-all flex flex-col justify-between relative group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-mono font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200/60">
                        {step.step}
                      </span>
                      <div className="w-7 h-7 rounded-lg bg-white shadow-xs border border-slate-200 flex items-center justify-center text-slate-700 group-hover:text-blue-600">
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                    </div>
                    <h3 className="text-sm font-bold text-slate-900">
                      {step.title}
                    </h3>
                    <p className="text-[11px] text-slate-500 mt-1.5 leading-normal">
                      {step.desc}
                    </p>
                  </div>

                  {idx < processSteps.length - 1 && (
                    <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-slate-300 pointer-events-none">
                      &rarr;
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-16 bg-slate-900 text-white relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-blue-400 text-xs font-semibold mb-4">
            <Zap className="w-3.5 h-3.5" />
            <span>Interactive Demonstration</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Ready to inspect network traffic flows?
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto mt-3">
            Open the full security dashboard to view telemetry, test custom feature parameters, or review confusion matrices and feature importance.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
            <button
              onClick={() => onNavigate('dashboard')}
              className="px-6 py-3 text-sm font-semibold rounded-xl text-slate-900 bg-white hover:bg-slate-100 transition-all shadow-md active:scale-95 flex items-center space-x-2"
            >
              <span>Launch Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigate('traffic-analysis')}
              className="px-6 py-3 text-sm font-semibold rounded-xl text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-all active:scale-95 flex items-center space-x-2"
            >
              <span>Test Traffic Classifier</span>
              <Activity className="w-4 h-4 text-blue-400" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
