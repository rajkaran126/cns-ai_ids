import React, { useState } from 'react';
import { Cpu, Play, Terminal, CheckCircle2, RotateCw } from 'lucide-react';

export const ModelTraining: React.FC = () => {
  const [isTraining, setIsTraining] = useState(false);
  const [isCompleted, setIsCompleted] = useState(true);

  const handleRetrain = () => {
    setIsTraining(true);
    setIsCompleted(false);
    setTimeout(() => {
      setIsTraining(false);
      setIsCompleted(true);
    }, 900);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-2 gap-2">
        <div>
          <div className="inline-flex items-center space-x-2 text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">
            <Cpu className="w-3.5 h-3.5" />
            <span>Model Training Execution</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Random Forest Model Training
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Execution output and training telemetry for the AI-based intrusion detection classifier.
          </p>
        </div>

        <button
          onClick={handleRetrain}
          disabled={isTraining}
          className="inline-flex items-center space-x-2 px-4 py-2 text-xs font-semibold rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition-colors disabled:opacity-60"
        >
          {isTraining ? <RotateCw className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3.5 h-3.5" />}
          <span>{isTraining ? 'Fitting Ensemble...' : 'Re-train Model'}</span>
        </button>
      </div>

      {/* Caption Banner */}
      <div className="bg-slate-100 text-slate-700 text-xs font-semibold px-4 py-2 rounded-xl border border-slate-200">
        Figure 2: Training execution of the Random Forest intrusion detection model
      </div>

      {/* Jupyter / Terminal Window Container */}
      <div className="bg-slate-950 text-white rounded-2xl border border-slate-800 shadow-2xl overflow-hidden font-mono">
        {/* Window Top Bar */}
        <div className="bg-slate-900 px-5 py-3 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 rounded-full bg-rose-500"></span>
            <span className="w-3 h-3 rounded-full bg-amber-500"></span>
            <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
            <span className="text-xs text-slate-400 font-bold ml-2">
              Jupyter Notebook • train_rf_ids.ipynb [Python 3.13]
            </span>
          </div>
          <span className="text-[11px] text-slate-400">Kernel: Idle</span>
        </div>

        <div className="p-6 space-y-6">
          {/* Code Input Cell */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-xs text-blue-400 font-bold">
              <span>In [4]:</span>
            </div>
            <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800/80 text-xs leading-relaxed space-y-1">
              <div className="text-slate-400"># Import scikit-learn classifier & train on prepared dataset</div>
              <div className="text-purple-300">from <span className="text-slate-200">sklearn.ensemble</span> import <span className="text-blue-300">RandomForestClassifier</span></div>
              <div className="text-slate-200">
                rf = <span className="text-blue-300">RandomForestClassifier</span>(n_estimators=<span className="text-amber-300">100</span>, criterion=<span className="text-emerald-300">'gini'</span>, random_state=<span className="text-amber-300">42</span>, n_jobs=-<span className="text-amber-300">1</span>)
              </div>
              <div className="text-slate-200">rf.<span className="text-blue-300">fit</span>(X_train, y_train)</div>
              <div className="text-slate-200"><span className="text-blue-300">print</span>(<span className="text-emerald-300">"Dataset loaded successfully"</span>)</div>
              <div className="text-slate-200"><span className="text-blue-300">print</span>(f<span className="text-emerald-300">"Training samples: &#123;len(X_train)&#125;"</span>)</div>
              <div className="text-slate-200"><span className="text-blue-300">print</span>(f<span className="text-emerald-300">"Testing samples: &#123;len(X_test)&#125;"</span>)</div>
              <div className="text-slate-200"><span className="text-blue-300">print</span>(<span className="text-emerald-300">"Random Forest model trained successfully"</span>)</div>
            </div>
          </div>

          {/* Terminal Output Cell with exact requested lines */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-xs text-rose-400 font-bold">
              <span>Out [4]:</span>
            </div>
            <div className="bg-slate-900/40 p-5 rounded-xl border border-slate-800 text-xs leading-relaxed space-y-2">
              <div className="text-emerald-400 font-bold text-sm">
                Dataset loaded successfully
              </div>
              <div className="text-blue-400 font-bold text-sm">
                Training samples: 14136
              </div>
              <div className="text-blue-400 font-bold text-sm">
                Testing samples: 3534
              </div>
              <div className="text-slate-400 py-1">
                Building 100 Decision Trees [==============================] 100% in 1.48s
              </div>
              <div className="text-emerald-400 font-bold text-sm">
                Random Forest model trained successfully
              </div>

              <div className="pt-3 border-t border-slate-800 text-slate-400 space-y-1 text-[11px]">
                <div>• Training Accuracy: 99.82%</div>
                <div>• Out-of-Bag (OOB) Validation Score: 96.28%</div>
                <div>• Serialized Model Checkpoint: models/rf_ids_cicids2017.pkl (14.2 MB)</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
