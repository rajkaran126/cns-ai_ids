# AI-Based Intrusion Detection System (AI-IDS) for Network Traffic

A modern, high-performance cybersecurity SaaS web application and analytics dashboard designed for an **AI-Based Intrusion Detection System (AI-IDS)**.

Built with **React, TypeScript, Vite, Tailwind CSS, Lucide React icons, and Recharts**.

---

## 🛡️ Overview

AI-IDS bridges advanced machine learning intrusion detection models with a SaaS cybersecurity monitoring interface. Using flow statistics extracted from the benchmark **CICIDS2017** dataset, the system classifies bi-directional network conversations into benign or attack vectors in real-time.

```text
Network Traffic
      ↓
Pre-processing
      ↓
Feature Extraction
      ↓
Random Forest Classifier
      ↓
Prediction (BENIGN / ATTACK)
      ↓
Security Alert & Audit Logging
```

---

## 🚀 Key Features

- **Cybersecurity SaaS Dashboard**: Real-time traffic volume telemetry (Normal vs. Suspicious flows), threat category distribution donut chart, live monitoring panel with status beacon, and recent alert feed.
- **Interactive Traffic Predictor**: 8-feature flow classification form (*Flow Duration, Packet counts, Flow Bytes/s, Packet Length Statistics, Destination Port*) with one-click normal and attack sample presets.
- **Dynamic Security Alerting**: Immediate incident alert cards for high-confidence attacks (*DoS Volumetric Floods, Port Scanning, SSH Brute Force*) with recommended containment actions.
- **Model Performance Analytics**: Complete classification metrics (Accuracy: 96.4%, Precision: 95.5%, Recall: 96.1%, F1: 95.8%), interactive 2×2 Confusion Matrix, and Gini Feature Importance rankings.
- **Comprehensive Detection Logs**: Searchable, filterable audit log table with masked source IPs (`192.168.1.x`), packet inspection modal, and JSON export.
- **Academic Demonstration Figures**: Dedicated views and high-resolution DOM figures (Figure 1 through Figure 6) matching academic reporting specifications.

---

## 📊 Academic Figures

| Figure | Description |
|---|---|
| **Figure 1** | Network traffic dataset loading and preprocessing stage |
| **Figure 2** | Training execution of the Random Forest intrusion detection model |
| **Figure 3** | Performance evaluation metrics and classification matrix |
| **Figure 4** | Detection of normal network traffic (`✓ BENIGN`) |
| **Figure 5** | Detection of suspicious network traffic (`⚠ ATTACK`) |
| **Figure 6** | AI-based intrusion detection dashboard with threat metrics |

All figures are located in `public/figures/` and viewable under the **Report Figures** tab.

---

## 💻 Tech Stack

- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS
- **Icons & Charts**: Lucide React, Recharts
- **Machine Learning Core**: Python, Scikit-learn (Random Forest Classifier, 100 Estimators), Pandas
- **Benchmark Dataset**: CICIDS2017

---

## 🛠️ Getting Started

### Prerequisites

- Node.js (v18+)
- npm or yarn

### Installation & Run

1. Clone the repository:
   ```bash
   git clone https://github.com/rajkaran126/cns-ai_ids.git
   cd cns-ai_ids
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

---

## 🔌 Backend API Integration

The frontend architecture in `src/services/api.ts` is ready to connect to a live Python / FastAPI / Flask backend:
- `POST /predict`: Real-time feature classification
- `GET /metrics`: Model evaluation and confusion matrix
- `GET /stats`: Telemetry and volume counters
- `GET /logs`: Historical detection records

Set `VITE_API_BASE_URL=http://localhost:8000` in `.env` to switch from local simulation to your live ML server.

---

## 📄 License

Academic / Educational Prototype. All rights reserved.
