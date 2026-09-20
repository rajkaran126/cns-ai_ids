import React, { useState } from 'react';
import { 
  Cpu, 
  Target, 
  Zap, 
  BarChart2, 
  Layers, 
  Database, 
  CheckCircle,
  HelpCircle,
  TrendingUp,
  FileCheck
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell 
} from 'recharts';
import { modelPerformanceMetrics, featureImportanceData } from '../data/mockData';

export const ModelPerformance: React.FC = () => {
  const [metrics] = useState(modelPerformanceMetrics);
  const [featureData] = useState(featureImportanceData);
  const [selectedCell, setSelectedCell] = useState<string | null>(null);

  const cm = metrics.confusionMatrix;

  const kpis = [
    { label: 'Accuracy', value: `${metrics.accuracy}%`, desc: 'Overall classification correctness', color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Precision', value: `${metrics.precision}%`, desc: 'True attacks among predicted attacks', color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Recall', value: `${metrics.recall}%`, desc: 'Attack detection sensitivity', color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { label: 'F1 Score', value: `${metrics.f1Score}%`, desc: 'Harmonic mean of precision & recall', color: 'text-violet-600', bg: 'bg-violet-50' },
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Top Heading */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-2 gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">
            <Cpu className="w-3.5 h-3.5" />
            <span>Random Forest Model Evaluation</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Model Performance
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Statistical validation metrics evaluated against the CICIDS2017 benchmark dataset.
          </p>
        </div>

        <div className="flex items-center space-x-2 text-xs bg-white px-3.5 py-2 rounded-xl border border-slate-200 shadow-xs">
          <Database className="w-3.5 h-3.5 text-blue-600" />
          <span className="font-semibold text-slate-700">Dataset:</span>
          <span className="text-slate-500">CICIDS2017</span>
        </div>
      </div>

      {/* Caption Banner */}
      <div className="bg-slate-100 text-slate-700 text-xs font-semibold px-4 py-2 rounded-xl border border-slate-200">
        Figure 3: Performance evaluation metrics and classification matrix
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {kpis.map((kpi) => (
          <div
            key={kpi.label}
            className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-card hover:shadow-card-hover transition-all"
          >
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              {kpi.label}
            </span>
            <div className="mt-3 flex items-baseline justify-between">
              <span className={`text-3xl font-bold ${kpi.color} tracking-tight`}>
                {kpi.value}
              </span>
              <span className={`w-8 h-8 rounded-lg ${kpi.bg} flex items-center justify-center`}>
                <Target className={`w-4 h-4 ${kpi.color}`} />
              </span>
            </div>
            <p className="mt-2 text-xs text-slate-500 font-medium">
              {kpi.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Confusion Matrix & Feature Importance Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Visual Confusion Matrix */}
        <div className="lg:col-span-6 bg-white rounded-2xl border border-slate-200/80 shadow-card p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Confusion Matrix
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Evaluation on test partition ({metrics.totalSamplesEvaluated.toLocaleString()} total flow records)
              </p>
            </div>
            <span className="text-[11px] font-semibold bg-blue-50 text-blue-700 px-2.5 py-1 rounded-md border border-blue-100">
              Binary Classification
            </span>
          </div>

          {/* Matrix Diagram */}
          <div className="pt-2">
            {/* Predicted Header Label */}
            <div className="text-center font-bold text-xs text-slate-500 uppercase tracking-wider mb-2">
              Predicted Class
            </div>

            <div className="grid grid-cols-12 gap-2 items-center">
              {/* Actual Y-axis Label */}
              <div className="col-span-2 -rotate-90 text-center font-bold text-xs text-slate-500 uppercase tracking-wider whitespace-nowrap">
                Actual Class
              </div>

              {/* Matrix Grid 2x2 */}
              <div className="col-span-10 space-y-2">
                {/* Column Headers */}
                <div className="grid grid-cols-2 gap-2 text-center text-xs font-semibold text-slate-600">
                  <div className="bg-slate-50 py-1.5 rounded-lg border border-slate-100">
                    Predicted <span className="text-emerald-700 font-bold">Benign</span>
                  </div>
                  <div className="bg-slate-50 py-1.5 rounded-lg border border-slate-100">
                    Predicted <span className="text-rose-700 font-bold">Attack</span>
                  </div>
                </div>

                {/* Row 1: Actual Benign */}
                <div className="grid grid-cols-2 gap-2">
                  {/* True Negative */}
                  <div
                    onClick={() => setSelectedCell('TN')}
                    className={`cursor-pointer p-4 rounded-xl border transition-all text-center ${
                      selectedCell === 'TN'
                        ? 'border-emerald-500 bg-emerald-100/70 ring-2 ring-emerald-500/20'
                        : 'border-emerald-200 bg-emerald-50 hover:bg-emerald-100/50'
                    }`}
                  >
                    <div className="text-[10px] font-bold text-emerald-700 uppercase">
                      True Negative (TN)
                    </div>
                    <div className="text-2xl font-extrabold text-emerald-900 mt-1 font-mono">
                      {cm.tn.toLocaleString()}
                    </div>
                    <div className="text-[10px] text-emerald-600 mt-0.5">
                      Correctly identified normal flows
                    </div>
                  </div>

                  {/* False Positive */}
                  <div
                    onClick={() => setSelectedCell('FP')}
                    className={`cursor-pointer p-4 rounded-xl border transition-all text-center ${
                      selectedCell === 'FP'
                        ? 'border-amber-500 bg-amber-100/70 ring-2 ring-amber-500/20'
                        : 'border-amber-200 bg-amber-50 hover:bg-amber-100/50'
                    }`}
                  >
                    <div className="text-[10px] font-bold text-amber-700 uppercase">
                      False Positive (FP)
                    </div>
                    <div className="text-2xl font-extrabold text-amber-900 mt-1 font-mono">
                      {cm.fp.toLocaleString()}
                    </div>
                    <div className="text-[10px] text-amber-600 mt-0.5">
                      Normal misclassified as attack
                    </div>
                  </div>
                </div>

                {/* Row 2: Actual Attack */}
                <div className="grid grid-cols-2 gap-2">
                  {/* False Negative */}
                  <div
                    onClick={() => setSelectedCell('FN')}
                    className={`cursor-pointer p-4 rounded-xl border transition-all text-center ${
                      selectedCell === 'FN'
                        ? 'border-rose-500 bg-rose-100/70 ring-2 ring-rose-500/20'
                        : 'border-rose-200 bg-rose-50 hover:bg-rose-100/50'
                    }`}
                  >
                    <div className="text-[10px] font-bold text-rose-700 uppercase">
                      False Negative (FN)
                    </div>
                    <div className="text-2xl font-extrabold text-rose-900 mt-1 font-mono">
                      {cm.fn.toLocaleString()}
                    </div>
                    <div className="text-[10px] text-rose-600 mt-0.5">
                      Missed intrusions (critical)
                    </div>
                  </div>

                  {/* True Positive */}
                  <div
                    onClick={() => setSelectedCell('TP')}
                    className={`cursor-pointer p-4 rounded-xl border transition-all text-center ${
                      selectedCell === 'TP'
                        ? 'border-blue-500 bg-blue-100/70 ring-2 ring-blue-500/20'
                        : 'border-blue-200 bg-blue-50 hover:bg-blue-100/50'
                    }`}
                  >
                    <div className="text-[10px] font-bold text-blue-700 uppercase">
                      True Positive (TP)
                    </div>
                    <div className="text-2xl font-extrabold text-blue-900 mt-1 font-mono">
                      {cm.tp.toLocaleString()}
                    </div>
                    <div className="text-[10px] text-blue-600 mt-0.5">
                      Correctly flagged attacks
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

          <div className="text-xs text-slate-500 bg-slate-50 p-3 rounded-xl border border-slate-100 leading-relaxed">
            <span className="font-semibold text-slate-700">Prototype Note:</span> Confusion matrix counts represent standard k-fold validation splits on CICIDS2017 flow samples.
          </div>
        </div>

        {/* Right Column: Feature Importance */}
        <div className="lg:col-span-6 bg-white rounded-2xl border border-slate-200/80 shadow-card p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Important Network Features
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Gini importance metrics calculated across Random Forest decision trees
              </p>
            </div>
            <span className="text-[11px] font-semibold bg-slate-100 text-slate-600 px-2.5 py-1 rounded-md">
              Top 6 Drivers
            </span>
          </div>

          {/* Horizontal Bar Chart */}
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                layout="vertical"
                data={featureData}
                margin={{ top: 5, right: 20, left: 30, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                <XAxis
                  type="number"
                  domain={[0, 0.35]}
                  tickFormatter={(v) => `${(v * 100).toFixed(0)}%`}
                  fontSize={11}
                  stroke="#94a3b8"
                />
                <YAxis
                  type="category"
                  dataKey="readableName"
                  fontSize={11}
                  stroke="#475569"
                  width={110}
                  tickLine={false}
                />
                <Tooltip
                  formatter={(val: number) => [`${(val * 100).toFixed(1)}%`, 'Relative Weight']}
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    borderRadius: '10px',
                    border: '1px solid #e2e8f0',
                    fontSize: '12px',
                  }}
                />
                <Bar dataKey="importance" radius={[0, 6, 6, 0]} fill="#2563eb">
                  {featureData.map((entry, index) => (
                    <Cell
                      key={`bar-${index}`}
                      fill={index === 0 ? '#2563eb' : index === 1 ? '#3b82f6' : index === 2 ? '#60a5fa' : '#93c5fd'}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Feature List & Importance Breakdown */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            {featureData.map((item) => (
              <div key={item.feature} className="flex items-center justify-between text-xs py-1.5 px-2 rounded-lg hover:bg-slate-50">
                <div className="flex items-center space-x-2">
                  <span className="font-semibold text-slate-800">{item.feature}</span>
                  <span className="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded">
                    {item.category}
                  </span>
                </div>
                <span className="font-mono font-bold text-blue-600">
                  {(item.importance * 100).toFixed(1)}%
                </span>
              </div>
            ))}
          </div>

        </div>

      </div>

      {/* Model Architecture Specs */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-card p-6 sm:p-8">
        <h3 className="text-base font-bold text-slate-900 mb-4">
          Machine Learning Model Specifications
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
            <span className="text-slate-400 block mb-1">Algorithm</span>
            <span className="font-bold text-slate-800 text-sm">Random Forest Classifier</span>
            <p className="text-[11px] text-slate-500 mt-1">Ensemble of bootstrap-aggregated trees</p>
          </div>
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
            <span className="text-slate-400 block mb-1">Estimators</span>
            <span className="font-bold text-slate-800 text-sm">100 Decision Trees</span>
            <p className="text-[11px] text-slate-500 mt-1">Split criterion: Gini Impurity</p>
          </div>
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
            <span className="text-slate-400 block mb-1">Training Dataset</span>
            <span className="font-bold text-slate-800 text-sm">CICIDS2017</span>
            <p className="text-[11px] text-slate-500 mt-1">Canadian Institute for Cybersecurity</p>
          </div>
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
            <span className="text-slate-400 block mb-1">Inference Engine</span>
            <span className="font-bold text-slate-800 text-sm">Python / Scikit-Learn</span>
            <p className="text-[11px] text-slate-500 mt-1">Ready for FastAPI / Flask bridge</p>
          </div>
        </div>
      </div>
    </div>
  );
};
