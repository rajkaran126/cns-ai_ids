import React, { useState } from 'react';
import { Image as ImageIcon, Download, ExternalLink, Check, ZoomIn } from 'lucide-react';

interface FigureItem {
  id: string;
  figureNum: string;
  title: string;
  caption: string;
  imageSrc: string;
  description: string;
  keyElements: string[];
}

const reportFigures: FigureItem[] = [
  {
    id: 'fig-1',
    figureNum: 'Figure 1',
    title: 'Dataset and Pre-processing',
    caption: 'Figure 1: Network traffic dataset loading and preprocessing stage',
    imageSrc: '/figures/figure_1_dataset_preprocessing.png',
    description: 'Displays raw and preprocessed CICIDS2017 network traffic structure, record distribution, and feature normalization pipeline logs.',
    keyElements: [
      'Loaded dataset structure (Dst Port, Flow Duration, Packet counts, Flow rate, etc.)',
      'Total record count summary (17,670 instances | 14,136 Benign vs 3,534 Attack)',
      'Selected 8-feature matrix normalized via StandardScaler',
      'Execution log output capturing clean imputation and label encoding'
    ]
  },
  {
    id: 'fig-2',
    figureNum: 'Figure 2',
    title: 'Model Training',
    caption: 'Figure 2: Training execution of the Random Forest intrusion detection model',
    imageSrc: '/figures/figure_2_model_training.png',
    description: 'Jupyter Notebook & terminal execution trace showing model instantiation, training sample partitioning, and ensemble tree convergence.',
    keyElements: [
      'Jupyter cell: RandomForestClassifier(n_estimators=100, criterion="gini")',
      'Dataset loaded successfully confirmation',
      'Training samples: 14136 partition verification',
      'Testing samples: 3534 partition verification',
      'Random Forest model trained successfully status'
    ]
  },
  {
    id: 'fig-3',
    figureNum: 'Figure 3',
    title: 'Model Performance',
    caption: 'Figure 3: Performance evaluation metrics and classification matrix',
    imageSrc: '/figures/figure_3_model_performance.png',
    description: 'Statistical validation scores and 2x2 confusion matrix with true/false positive breakdown evaluated on test traffic.',
    keyElements: [
      'Accuracy Score: 96.4%',
      'Precision Rating: 95.5%',
      'Recall Rate: 96.1%',
      'F1-Score Metric: 95.8%',
      'Confusion matrix: TN (9,420), FP (356), FN (280), TP (7,614)'
    ]
  },
  {
    id: 'fig-4',
    figureNum: 'Figure 4',
    title: 'Normal Traffic Detection',
    caption: 'Figure 4: Detection of normal network traffic',
    imageSrc: '/figures/figure_4_normal_traffic.png',
    description: 'Streamlit-style network traffic analyzer classifying legitimate TLS/HTTPS traffic.',
    keyElements: [
      'NETWORK TRAFFIC ANALYSER header',
      'Flow input: 1200ms duration, 443 destination port, 15,200 Bytes/s',
      'Prediction: ✓ BENIGN',
      'Status: NORMAL TRAFFIC',
      'Model Confidence: 98.24%'
    ]
  },
  {
    id: 'fig-5',
    figureNum: 'Figure 5',
    title: 'Attack Detection',
    caption: 'Figure 5: Detection of suspicious network traffic',
    imageSrc: '/figures/figure_5_attack_detection.png',
    description: 'Streamlit-style network traffic analyzer triggering high-priority security alert for volumetric flood.',
    keyElements: [
      'NETWORK TRAFFIC ANALYSER header',
      'Flow input: 380ms duration, port 80 HTTP, 84,200 Bytes/s flood rate',
      'Prediction: ⚠ ATTACK',
      'Status: SUSPICIOUS TRAFFIC DETECTED',
      'Model Confidence: 94.70%'
    ]
  },
  {
    id: 'fig-6',
    figureNum: 'Figure 6',
    title: 'Security Dashboard',
    caption: 'Figure 6: AI-based intrusion detection dashboard',
    imageSrc: '/figures/figure_6_security_dashboard.png',
    description: 'Aggregated threat surveillance view tracking overall throughput and recent incident events.',
    keyElements: [
      'Total Requests: 1000',
      'Normal Traffic: 842',
      'Suspicious Traffic: 158',
      'Attack Rate: 15.8%',
      'Recent Alerts: ATTACK HIGH, ATTACK HIGH, BENIGN NORMAL, ATTACK HIGH'
    ]
  }
];

export const ReportFigures: React.FC = () => {
  const [selectedFigure, setSelectedFigure] = useState<FigureItem | null>(null);

  const handleDownload = (imgUrl: string, filename: string) => {
    const a = document.createElement('a');
    a.href = imgUrl;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-2 gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Academic Demonstration Figures</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Report & Presentation Screenshots
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Publication-ready figures (Figures 1 through 6) generated with exact specifications, captions, and metrics.
          </p>
        </div>

        <button
          onClick={() => {
            reportFigures.forEach((f) => {
              handleDownload(f.imageSrc, `${f.figureNum.toLowerCase().replace(' ', '_')}.png`);
            });
          }}
          className="inline-flex items-center space-x-2 px-4 py-2 text-xs font-semibold rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition-colors"
        >
          <Download className="w-4 h-4" />
          <span>Download All 6 Figures</span>
        </button>
      </div>

      {/* Grid of 6 Figures */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {reportFigures.map((fig) => (
          <div
            key={fig.id}
            className="bg-white rounded-2xl border border-slate-200 shadow-card hover:shadow-card-hover transition-all flex flex-col overflow-hidden group"
          >
            {/* Header */}
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div>
                <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200/60 font-mono">
                  {fig.figureNum}
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-1">
                  {fig.title}
                </h3>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setSelectedFigure(fig)}
                  className="p-2 text-slate-500 hover:text-blue-600 hover:bg-white rounded-lg border border-transparent hover:border-slate-200 transition-colors"
                  title="Expand preview"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDownload(fig.imageSrc, `${fig.figureNum.toLowerCase().replace(' ', '_')}.png`)}
                  className="p-2 text-slate-500 hover:text-blue-600 hover:bg-white rounded-lg border border-transparent hover:border-slate-200 transition-colors"
                  title="Download figure image"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Image Preview */}
            <div
              onClick={() => setSelectedFigure(fig)}
              className="relative p-4 bg-slate-100/60 flex items-center justify-center cursor-pointer overflow-hidden group"
            >
              <img
                src={fig.imageSrc}
                alt={fig.caption}
                className="rounded-xl shadow-xs border border-slate-200/80 max-h-72 w-auto object-contain transition-transform group-hover:scale-[1.01]"
              />
              <div className="absolute inset-0 bg-slate-900/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                <span className="bg-white/95 text-slate-900 text-xs font-bold px-3 py-1.5 rounded-lg shadow-md flex items-center space-x-1.5">
                  <ZoomIn className="w-3.5 h-3.5" />
                  <span>Click to Expand</span>
                </span>
              </div>
            </div>

            {/* Caption & Key Elements */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <p className="text-xs font-semibold text-slate-800 italic bg-slate-50 p-2.5 rounded-lg border border-slate-200/60">
                  {fig.caption}
                </p>
                <p className="text-xs text-slate-600 mt-2.5 leading-relaxed">
                  {fig.description}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-100">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
                  Verified Visual Content
                </span>
                <ul className="space-y-1">
                  {fig.keyElements.map((elem, idx) => (
                    <li key={idx} className="text-xs text-slate-600 flex items-start space-x-1.5">
                      <span className="text-emerald-500 font-bold mt-0.5">•</span>
                      <span>{elem}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Expanded Modal */}
      {selectedFigure && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs"
          onClick={() => setSelectedFigure(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-5xl w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-in fade-in zoom-in duration-150 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div>
                <span className="text-xs font-bold text-blue-600 uppercase font-mono">
                  {selectedFigure.figureNum}
                </span>
                <h3 className="text-lg font-bold text-slate-900">
                  {selectedFigure.title}
                </h3>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleDownload(selectedFigure.imageSrc, `${selectedFigure.figureNum.toLowerCase().replace(' ', '_')}.png`)}
                  className="inline-flex items-center space-x-1.5 px-3 py-1.5 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg border border-blue-200 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download PNG</span>
                </button>
                <button
                  onClick={() => setSelectedFigure(null)}
                  className="px-3 py-1.5 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                >
                  Close
                </button>
              </div>
            </div>

            <div className="flex justify-center bg-slate-100 p-2 rounded-xl">
              <img
                src={selectedFigure.imageSrc}
                alt={selectedFigure.caption}
                className="max-h-[60vh] w-auto object-contain rounded-lg shadow-sm"
              />
            </div>

            <div className="text-center">
              <p className="text-sm font-bold text-slate-800 italic">
                {selectedFigure.caption}
              </p>
              <p className="text-xs text-slate-500 mt-1">
                {selectedFigure.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
