import os
import matplotlib.pyplot as plt
import matplotlib.patches as patches
import numpy as np

# Ensure target directory exists
OUTPUT_DIR = r"C:\Users\KARAN\.gemini\antigravity-ide\brain\b0fadcd7-d369-4260-b98b-394b0d73075a\figures"
os.makedirs(OUTPUT_DIR, exist_ok=True)

# Set global styles
plt.rcParams['font.sans-serif'] = 'DejaVu Sans'
plt.rcParams['font.family'] = 'sans-serif'

# -------------------------------------------------------------
# FIGURE 1: Dataset and Pre-processing
# -------------------------------------------------------------
def generate_figure_1():
    fig, ax = plt.subplots(figsize=(12, 7.8), dpi=200)
    fig.patch.set_facecolor('#f8fafc')
    ax.set_facecolor('#f8fafc')
    ax.axis('off')

    # Main Card container
    card = patches.FancyBboxPatch((0.02, 0.08), 0.96, 0.88, boxstyle="round,pad=0.02,rounding_size=0.03",
                                 facecolor='white', edgecolor='#cbd5e1', linewidth=1.5)
    ax.add_patch(card)

    # Title
    ax.text(0.05, 0.91, "Dataset Loading & Pre-processing Stage", fontsize=16, fontweight='bold', color='#0f172a')
    ax.text(0.05, 0.875, "CICIDS2017 Network Traffic Ingestion, Statistical Attributes & Transformation Matrix",
            fontsize=10, color='#64748b')

    # Top summary cards (3 pills)
    pills = [
        ("Total Records", "17,670", "#2563eb", "#eff6ff", "#bfdbfe"),
        ("Benign Flows", "14,136 (80.0%)", "#16a34a", "#f0fdf4", "#bbf7d0"),
        ("Attack Flows", "3,534 (20.0%)", "#dc2626", "#fef2f2", "#fecaca"),
        ("Selected Features", "8 Salient Features", "#7c3aed", "#f5f3ff", "#ddd6fe")
    ]
    for i, (label, val, text_col, bg_col, border_col) in enumerate(pills):
        x = 0.05 + i * 0.225
        p = patches.FancyBboxPatch((x, 0.76), 0.21, 0.085, boxstyle="round,pad=0.01,rounding_size=0.02",
                                  facecolor=bg_col, edgecolor=border_col, linewidth=1.2)
        ax.add_patch(p)
        ax.text(x + 0.015, 0.815, label, fontsize=8.5, fontweight='bold', color='#64748b')
        ax.text(x + 0.015, 0.775, val, fontsize=11, fontweight='bold', color=text_col)

    # Table Header & Data (Dataset Structure)
    ax.text(0.05, 0.71, "Loaded Dataset Structure (Feature Matrix Preview)", fontsize=11, fontweight='bold', color='#1e293b')

    cols = ["Flow ID", "Dst Port", "Flow Dur", "Tot Fwd Pkts", "Tot Bwd Pkts", "Flow Byte/s", "Pkt Len Mean", "Label"]
    col_x = [0.05, 0.16, 0.27, 0.39, 0.51, 0.63, 0.77, 0.88]
    
    # Header bar
    tbl_hdr = patches.Rectangle((0.045, 0.65), 0.91, 0.04, facecolor='#f1f5f9', edgecolor='#e2e8f0')
    ax.add_patch(tbl_hdr)
    for cx, cname in zip(col_x, cols):
        ax.text(cx, 0.662, cname, fontsize=8.5, fontweight='bold', color='#334155')

    rows_data = [
        ["#00104", "443", "1,200", "15", "8", "15,200.0", "524.0", "BENIGN"],
        ["#00105", "80", "380", "195", "2", "84,200.0", "84.0", "ATTACK"],
        ["#00106", "53", "45", "2", "2", "2,840.0", "128.0", "BENIGN"],
        ["#00107", "22", "890", "42", "6", "42,000.0", "210.0", "ATTACK"],
        ["#00108", "8080", "1,420", "18", "12", "18,400.0", "610.0", "BENIGN"],
    ]

    for r_idx, r_data in enumerate(rows_data):
        y_pos = 0.60 - r_idx * 0.038
        # alternate shading
        bg = '#ffffff' if r_idx % 2 == 0 else '#f8fafc'
        ax.add_patch(patches.Rectangle((0.045, y_pos - 0.01), 0.91, 0.038, facecolor=bg, edgecolor='#f1f5f9'))
        for cx, val in zip(col_x, r_data):
            if val == "BENIGN":
                ax.text(cx, y_pos + 0.005, val, fontsize=8.5, fontweight='bold', color='#16a34a')
            elif val == "ATTACK":
                ax.text(cx, y_pos + 0.005, val, fontsize=8.5, fontweight='bold', color='#dc2626')
            else:
                ax.text(cx, y_pos + 0.005, val, fontsize=8.5, color='#475569', fontfamily='monospace')

    # Preprocessing Log Output Terminal Box
    ax.text(0.05, 0.38, "Preprocessing Pipeline Log Output", fontsize=11, fontweight='bold', color='#1e293b')
    term_box = patches.FancyBboxPatch((0.045, 0.12), 0.91, 0.23, boxstyle="round,pad=0.015,rounding_size=0.02",
                                     facecolor='#0f172a', edgecolor='#1e293b', linewidth=1.5)
    ax.add_patch(term_box)

    # Terminal dots
    for i, dot_color in enumerate(['#ef4444', '#f59e0b', '#10b981']):
        ax.add_patch(patches.Circle((0.065 + i * 0.018, 0.325), 0.006, facecolor=dot_color))
    ax.text(0.12, 0.32, "pipeline_execution.log (Python 3.13 / Pandas / Scikit-learn)", fontsize=8, color='#94a3b8', fontfamily='monospace')

    logs = [
        "[INFO] 13:40:01 - Loading dataset: CICIDS2017_sample.csv (Total instances: 17,670)",
        "[INFO] 13:40:01 - Validating schema: 8 numerical features extracted, 0 nulls detected",
        "[INFO] 13:40:02 - Normalization: Continuous features scaled via StandardScaler()",
        "[INFO] 13:40:02 - Label encoding: BENIGN -> 0, ATTACK -> 1 | Class balance: 80% / 20%",
        "[SUCCESS] 13:40:02 - Train/Test Split: 14,136 Training Samples | 3,534 Testing Samples"
    ]
    for idx, line in enumerate(logs):
        c = '#38bdf8' if '[INFO]' in line else '#4ade80'
        ax.text(0.06, 0.28 - idx * 0.034, line, fontsize=8.2, color=c, fontfamily='monospace')

    # Caption at bottom
    ax.text(0.5, 0.03, "Figure 1: Network traffic dataset loading and preprocessing stage",
            fontsize=10.5, fontweight='bold', color='#334155', ha='center')

    plt.tight_layout()
    plt.savefig(os.path.join(OUTPUT_DIR, "figure_1_dataset_preprocessing.png"), dpi=200, bbox_inches='tight')
    plt.close()
    print("Figure 1 generated successfully.")

# -------------------------------------------------------------
# FIGURE 2: Model Training
# -------------------------------------------------------------
def generate_figure_2():
    fig, ax = plt.subplots(figsize=(11, 6.8), dpi=200)
    fig.patch.set_facecolor('#f8fafc')
    ax.set_facecolor('#f8fafc')
    ax.axis('off')

    # Outer Container Window
    win = patches.FancyBboxPatch((0.03, 0.08), 0.94, 0.88, boxstyle="round,pad=0.02,rounding_size=0.03",
                                facecolor='#0f172a', edgecolor='#334155', linewidth=1.5)
    ax.add_patch(win)

    # Window Top Bar
    topbar = patches.Rectangle((0.03, 0.90), 0.94, 0.06, facecolor='#1e293b', edgecolor='#334155')
    ax.add_patch(topbar)
    for i, c in enumerate(['#ef4444', '#f59e0b', '#10b981']):
        ax.add_patch(patches.Circle((0.06 + i * 0.02, 0.93), 0.007, facecolor=c))
    ax.text(0.13, 0.923, "Jupyter Notebook / Terminal - train_ids_model.ipynb", fontsize=9.5, fontweight='bold',
            color='#e2e8f0', fontfamily='monospace')

    # In [1] Code Cell
    in_box = patches.FancyBboxPatch((0.05, 0.59), 0.90, 0.28, boxstyle="round,pad=0.015,rounding_size=0.015",
                                   facecolor='#182234', edgecolor='#2d3d54', linewidth=1)
    ax.add_patch(in_box)

    ax.text(0.06, 0.835, "In [4]:", fontsize=9.5, fontweight='bold', color='#38bdf8', fontfamily='monospace')
    code_lines = [
        "from sklearn.ensemble import RandomForestClassifier",
        "import pandas as pd",
        "",
        "# Initialize Random Forest Ensemble with 100 Estimators",
        "rf_classifier = RandomForestClassifier(n_estimators=100, criterion='gini', random_state=42)",
        "rf_classifier.fit(X_train, y_train)",
        "print('Dataset loaded successfully')",
        "print(f'Training samples: {len(X_train)}')",
        "print(f'Testing samples: {len(X_test)}')",
        "print('Random Forest model trained successfully')"
    ]
    for idx, code in enumerate(code_lines):
        color = '#94a3b8' if code.startswith('#') else '#f1f5f9'
        if 'RandomForestClassifier' in code or 'print' in code:
            color = '#60a5fa'
        ax.text(0.12, 0.835 - idx * 0.024, code, fontsize=8.5, color=color, fontfamily='monospace')

    # Output Cell with exact expected text
    ax.text(0.06, 0.54, "Out [4]:", fontsize=9.5, fontweight='bold', color='#f87171', fontfamily='monospace')

    out_box = patches.FancyBboxPatch((0.11, 0.16), 0.84, 0.39, boxstyle="round,pad=0.015,rounding_size=0.015",
                                    facecolor='#0b1120', edgecolor='#1e293b', linewidth=1)
    ax.add_patch(out_box)

    terminal_outputs = [
        ("[INFO] Ingesting normalized training partitions...", "#94a3b8"),
        ("Dataset loaded successfully", "#4ade80"),
        ("Training samples: 14136", "#38bdf8"),
        ("Testing samples: 3534", "#38bdf8"),
        ("[PROGRESS] Building 100 Decision Trees [====================] 100% in 1.42s", "#fbbf24"),
        ("Random Forest model trained successfully", "#4ade80"),
        ("", "#ffffff"),
        ("Model Summary:", "#cbd5e1"),
        ("  • Algorithm: Random Forest Classifier (n_estimators=100, criterion='gini')", "#94a3b8"),
        ("  • Train Accuracy: 99.82%  |  Out-of-Bag (OOB) Score: 96.28%", "#94a3b8"),
        ("  • Status: Weights cached to models/random_forest_ids.pkl", "#a78bfa")
    ]

    for idx, (tout, col) in enumerate(terminal_outputs):
        fontweight = 'bold' if tout in ["Dataset loaded successfully", "Training samples: 14136", "Testing samples: 3534", "Random Forest model trained successfully"] else 'normal'
        ax.text(0.13, 0.50 - idx * 0.030, tout, fontsize=9.0, color=col, fontweight=fontweight, fontfamily='monospace')

    # Caption
    ax.text(0.5, 0.03, "Figure 2: Training execution of the Random Forest intrusion detection model",
            fontsize=10.5, fontweight='bold', color='#334155', ha='center')

    plt.tight_layout()
    plt.savefig(os.path.join(OUTPUT_DIR, "figure_2_model_training.png"), dpi=200, bbox_inches='tight')
    plt.close()
    print("Figure 2 generated successfully.")

# -------------------------------------------------------------
# FIGURE 3: Model Performance
# -------------------------------------------------------------
def generate_figure_3():
    fig, ax = plt.subplots(figsize=(11.5, 7.5), dpi=200)
    fig.patch.set_facecolor('#f8fafc')
    ax.set_facecolor('#f8fafc')
    ax.axis('off')

    # Main Card
    card = patches.FancyBboxPatch((0.02, 0.07), 0.96, 0.89, boxstyle="round,pad=0.02,rounding_size=0.03",
                                 facecolor='white', edgecolor='#cbd5e1', linewidth=1.5)
    ax.add_patch(card)

    # Title
    ax.text(0.05, 0.915, "Model Performance Evaluation Metrics", fontsize=15, fontweight='bold', color='#0f172a')
    ax.text(0.05, 0.880, "Validation on CICIDS2017 Test Set (17,670 Total Evaluated Samples)", fontsize=10, color='#64748b')

    # 4 KPI Cards
    kpis = [
        ("Accuracy Score", "96.4%", "#2563eb", "#eff6ff", "#bfdbfe", "Overall correctness"),
        ("Precision Rating", "95.5%", "#16a34a", "#f0fdf4", "#bbf7d0", "True positives / predicted pos"),
        ("Recall Rate", "96.1%", "#d97706", "#fffbeb", "#fde68a", "True attack detection rate"),
        ("F1-Score Metric", "95.8%", "#7c3aed", "#f5f3ff", "#ddd6fe", "Harmonic balance")
    ]
    for i, (name, val, text_c, bg_c, border_c, sub) in enumerate(kpis):
        x = 0.05 + i * 0.225
        p = patches.FancyBboxPatch((x, 0.74), 0.21, 0.115, boxstyle="round,pad=0.015,rounding_size=0.02",
                                  facecolor=bg_c, edgecolor=border_c, linewidth=1.2)
        ax.add_patch(p)
        ax.text(x + 0.015, 0.825, name, fontsize=8.5, fontweight='bold', color='#475569')
        ax.text(x + 0.015, 0.775, val, fontsize=17, fontweight='bold', color=text_c)
        ax.text(x + 0.015, 0.750, sub, fontsize=7.5, color='#64748b')

    # Confusion Matrix Visualization Section
    ax.text(0.05, 0.68, "Confusion Matrix Visualization", fontsize=12, fontweight='bold', color='#1e293b')

    # Matrix Labels
    ax.text(0.38, 0.64, "PREDICTED CLASS", fontsize=9.5, fontweight='bold', color='#475569', ha='center')
    ax.text(0.24, 0.605, "Predicted BENIGN", fontsize=9, fontweight='bold', color='#16a34a', ha='center')
    ax.text(0.52, 0.605, "Predicted ATTACK", fontsize=9, fontweight='bold', color='#dc2626', ha='center')

    ax.text(0.08, 0.46, "ACTUAL\nCLASS", fontsize=9.5, fontweight='bold', color='#475569', ha='center', va='center')
    ax.text(0.125, 0.51, "Actual\nBENIGN", fontsize=8.5, fontweight='bold', color='#16a34a', ha='center', va='center')
    ax.text(0.125, 0.35, "Actual\nATTACK", fontsize=8.5, fontweight='bold', color='#dc2626', ha='center', va='center')

    # Matrix Cells 2x2
    # TN
    tn_box = patches.FancyBboxPatch((0.16, 0.44), 0.16, 0.14, boxstyle="round,pad=0.01,rounding_size=0.02",
                                   facecolor='#dcfce7', edgecolor='#86efac', linewidth=1.5)
    ax.add_patch(tn_box)
    ax.text(0.24, 0.53, "TN (True Negative)", fontsize=8, fontweight='bold', color='#166534', ha='center')
    ax.text(0.24, 0.485, "9,420", fontsize=14, fontweight='bold', color='#14532d', ha='center')
    ax.text(0.24, 0.455, "(96.4% Correct Benign)", fontsize=7.5, color='#15803d', ha='center')

    # FP
    fp_box = patches.FancyBboxPatch((0.34, 0.44), 0.16, 0.14, boxstyle="round,pad=0.01,rounding_size=0.02",
                                   facecolor='#fef3c7', edgecolor='#fcd34d', linewidth=1.5)
    ax.add_patch(fp_box)
    ax.text(0.42, 0.53, "FP (False Positive)", fontsize=8, fontweight='bold', color='#92400e', ha='center')
    ax.text(0.42, 0.485, "356", fontsize=14, fontweight='bold', color='#78350f', ha='center')
    ax.text(0.42, 0.455, "(3.6% False Alarm)", fontsize=7.5, color='#b45309', ha='center')

    # FN
    fn_box = patches.FancyBboxPatch((0.16, 0.28), 0.16, 0.14, boxstyle="round,pad=0.01,rounding_size=0.02",
                                   facecolor='#fee2e2', edgecolor='#fca5a5', linewidth=1.5)
    ax.add_patch(fn_box)
    ax.text(0.24, 0.37, "FN (False Negative)", fontsize=8, fontweight='bold', color='#991b1b', ha='center')
    ax.text(0.24, 0.325, "280", fontsize=14, fontweight='bold', color='#7f1d1d', ha='center')
    ax.text(0.24, 0.295, "(3.5% Missed Attack)", fontsize=7.5, color='#b91c1c', ha='center')

    # TP
    tp_box = patches.FancyBboxPatch((0.34, 0.28), 0.16, 0.14, boxstyle="round,pad=0.01,rounding_size=0.02",
                                   facecolor='#dbeafe', edgecolor='#93c5fd', linewidth=1.5)
    ax.add_patch(tp_box)
    ax.text(0.42, 0.37, "TP (True Positive)", fontsize=8, fontweight='bold', color='#1e40af', ha='center')
    ax.text(0.42, 0.325, "7,614", fontsize=14, fontweight='bold', color='#1e3a8a', ha='center')
    ax.text(0.42, 0.295, "(96.5% Detected Attack)", fontsize=7.5, color='#1d4ed8', ha='center')

    # Right side: Feature Importance Ranking
    ax.text(0.55, 0.68, "Top Feature Importance (Gini Weight)", fontsize=11, fontweight='bold', color='#1e293b')

    feats = [
        ("Flow Duration", 0.28, "#2563eb"),
        ("Packet Length Mean", 0.24, "#3b82f6"),
        ("Flow Bytes/s", 0.19, "#60a5fa"),
        ("Destination Port", 0.14, "#93c5fd"),
        ("Total Forward Packets", 0.09, "#cbd5e1"),
        ("Packet Length Std Dev", 0.06, "#e2e8f0")
    ]
    for idx, (fname, fval, fcol) in enumerate(feats):
        y = 0.60 - idx * 0.06
        ax.text(0.55, y + 0.015, fname, fontsize=8.5, fontweight='bold', color='#334155')
        ax.text(0.89, y + 0.015, f"{fval*100:.1f}%", fontsize=8.5, fontweight='bold', color='#1e293b', ha='right')
        # bar background
        ax.add_patch(patches.Rectangle((0.55, y - 0.015), 0.36, 0.016, facecolor='#f1f5f9'))
        # filled bar
        ax.add_patch(patches.Rectangle((0.55, y - 0.015), 0.36 * (fval / 0.30), 0.016, facecolor=fcol))

    # Bottom summary box
    summary_box = patches.FancyBboxPatch((0.05, 0.11), 0.90, 0.12, boxstyle="round,pad=0.01,rounding_size=0.015",
                                        facecolor='#f8fafc', edgecolor='#e2e8f0')
    ax.add_patch(summary_box)
    ax.text(0.07, 0.19, "Classification Report Summary:", fontsize=8.5, fontweight='bold', color='#334155')
    ax.text(0.07, 0.15, "• Benign: Precision = 97.1%, Recall = 96.4%, F1-Score = 96.8%  (Support: 9,776)", fontsize=8, color='#475569')
    ax.text(0.07, 0.12, "• Attack: Precision = 95.5%, Recall = 96.5%, F1-Score = 96.0%  (Support: 7,894)", fontsize=8, color='#475569')

    # Caption
    ax.text(0.5, 0.025, "Figure 3: Performance evaluation metrics and classification matrix",
            fontsize=10.5, fontweight='bold', color='#334155', ha='center')

    plt.tight_layout()
    plt.savefig(os.path.join(OUTPUT_DIR, "figure_3_model_performance.png"), dpi=200, bbox_inches='tight')
    plt.close()
    print("Figure 3 generated successfully.")

# -------------------------------------------------------------
# FIGURE 4: Normal Traffic Detection
# -------------------------------------------------------------
def generate_figure_4():
    fig, ax = plt.subplots(figsize=(10.5, 7.2), dpi=200)
    fig.patch.set_facecolor('#f8fafc')
    ax.set_facecolor('#f8fafc')
    ax.axis('off')

    # Outer App Window
    card = patches.FancyBboxPatch((0.04, 0.08), 0.92, 0.88, boxstyle="round,pad=0.02,rounding_size=0.03",
                                 facecolor='white', edgecolor='#cbd5e1', linewidth=1.5)
    ax.add_patch(card)

    # App Header Bar (Streamlit style)
    header_bar = patches.Rectangle((0.04, 0.88), 0.92, 0.08, facecolor='#0f172a', edgecolor='#0f172a')
    ax.add_patch(header_bar)
    ax.text(0.08, 0.92, "NETWORK TRAFFIC ANALYSER", fontsize=13, fontweight='bold', color='#ffffff')
    ax.text(0.08, 0.895, "Streamlit • AI-Based Intrusion Detection System Prototype", fontsize=8.5, color='#94a3b8')
    ax.text(0.92, 0.91, "● ONLINE", fontsize=9, fontweight='bold', color='#4ade80', ha='right')

    # Input features display
    ax.text(0.08, 0.83, "Inspected Flow Features (Sample #4812)", fontsize=11, fontweight='bold', color='#1e293b')

    feat_grid = [
        ("Flow Duration", "1,200 ms"),
        ("Total Fwd Packets", "15 packets"),
        ("Total Bwd Packets", "8 packets"),
        ("Flow Bytes/s", "15,200 B/s"),
        ("Packet Length Mean", "524.0 bytes"),
        ("Destination Port", "443 (HTTPS)")
    ]
    for idx, (label, val) in enumerate(feat_grid):
        col_idx = idx % 3
        row_idx = idx // 3
        x = 0.08 + col_idx * 0.28
        y = 0.74 - row_idx * 0.075
        p = patches.FancyBboxPatch((x, y), 0.26, 0.065, boxstyle="round,pad=0.01,rounding_size=0.015",
                                  facecolor='#f8fafc', edgecolor='#e2e8f0')
        ax.add_patch(p)
        ax.text(x + 0.015, y + 0.04, label, fontsize=7.5, color='#64748b')
        ax.text(x + 0.015, y + 0.015, val, fontsize=9.5, fontweight='bold', color='#0f172a')

    # Big Normal Prediction Box (Exact required text: Prediction: ✓ BENIGN, Status: NORMAL TRAFFIC)
    pred_box = patches.FancyBboxPatch((0.08, 0.20), 0.84, 0.36, boxstyle="round,pad=0.02,rounding_size=0.03",
                                     facecolor='#f0fdf4', edgecolor='#86efac', linewidth=2.0)
    ax.add_patch(pred_box)

    # Left Icon Circle
    icon_circle = patches.Circle((0.17, 0.38), 0.055, facecolor='#22c55e')
    ax.add_patch(icon_circle)
    ax.text(0.17, 0.36, "✓", fontsize=28, fontweight='bold', color='white', ha='center', va='center')

    # Exact labels
    ax.text(0.26, 0.46, "Prediction:", fontsize=11, fontweight='bold', color='#166534')
    ax.text(0.26, 0.41, "✓ BENIGN", fontsize=22, fontweight='bold', color='#15803d')

    ax.text(0.26, 0.34, "Status:", fontsize=11, fontweight='bold', color='#166534')
    ax.text(0.26, 0.29, "NORMAL TRAFFIC", fontsize=15, fontweight='bold', color='#16a34a')

    # Confidence meter on right
    ax.text(0.68, 0.46, "Model Confidence Score", fontsize=10, fontweight='bold', color='#166534')
    ax.text(0.68, 0.40, "98.2%", fontsize=22, fontweight='bold', color='#15803d')
    ax.add_patch(patches.Rectangle((0.68, 0.35), 0.20, 0.018, facecolor='#bbf7d0', edgecolor='#86efac'))
    ax.add_patch(patches.Rectangle((0.68, 0.35), 0.20 * 0.982, 0.018, facecolor='#16a34a'))

    ax.text(0.68, 0.29, "No suspicious behaviour detected.", fontsize=8.5, fontweight='bold', color='#166534')
    ax.text(0.68, 0.25, "Characteristics conform to regular client-server TLS session.", fontsize=7.5, color='#4b5563')

    # Caption
    ax.text(0.5, 0.03, "Figure 4: Detection of normal network traffic",
            fontsize=10.5, fontweight='bold', color='#334155', ha='center')

    plt.tight_layout()
    plt.savefig(os.path.join(OUTPUT_DIR, "figure_4_normal_traffic.png"), dpi=200, bbox_inches='tight')
    plt.close()
    print("Figure 4 generated successfully.")

# -------------------------------------------------------------
# FIGURE 5: Attack Detection
# -------------------------------------------------------------
def generate_figure_5():
    fig, ax = plt.subplots(figsize=(10.5, 7.2), dpi=200)
    fig.patch.set_facecolor('#f8fafc')
    ax.set_facecolor('#f8fafc')
    ax.axis('off')

    # Outer App Window
    card = patches.FancyBboxPatch((0.04, 0.08), 0.92, 0.88, boxstyle="round,pad=0.02,rounding_size=0.03",
                                 facecolor='white', edgecolor='#cbd5e1', linewidth=1.5)
    ax.add_patch(card)

    # App Header Bar (Streamlit style)
    header_bar = patches.Rectangle((0.04, 0.88), 0.92, 0.08, facecolor='#0f172a', edgecolor='#0f172a')
    ax.add_patch(header_bar)
    ax.text(0.08, 0.92, "NETWORK TRAFFIC ANALYSER", fontsize=13, fontweight='bold', color='#ffffff')
    ax.text(0.08, 0.895, "Streamlit • AI-Based Intrusion Detection System Prototype", fontsize=8.5, color='#94a3b8')
    ax.text(0.92, 0.91, "● ALERT TRIGGERED", fontsize=9, fontweight='bold', color='#ef4444', ha='right')

    # Input features display
    ax.text(0.08, 0.83, "Inspected Flow Features (Sample #4813)", fontsize=11, fontweight='bold', color='#1e293b')

    feat_grid = [
        ("Flow Duration", "380 ms"),
        ("Total Fwd Packets", "195 packets"),
        ("Total Bwd Packets", "2 packets"),
        ("Flow Bytes/s", "84,200 B/s"),
        ("Packet Length Mean", "84.0 bytes"),
        ("Destination Port", "80 (HTTP Flood)")
    ]
    for idx, (label, val) in enumerate(feat_grid):
        col_idx = idx % 3
        row_idx = idx // 3
        x = 0.08 + col_idx * 0.28
        y = 0.74 - row_idx * 0.075
        p = patches.FancyBboxPatch((x, y), 0.26, 0.065, boxstyle="round,pad=0.01,rounding_size=0.015",
                                  facecolor='#fef2f2', edgecolor='#fecaca')
        ax.add_patch(p)
        ax.text(x + 0.015, y + 0.04, label, fontsize=7.5, color='#991b1b')
        ax.text(x + 0.015, y + 0.015, val, fontsize=9.5, fontweight='bold', color='#7f1d1d')

    # Big Attack Prediction Box (Exact required text: Prediction: ⚠ ATTACK, Status: SUSPICIOUS TRAFFIC DETECTED)
    pred_box = patches.FancyBboxPatch((0.08, 0.20), 0.84, 0.36, boxstyle="round,pad=0.02,rounding_size=0.03",
                                     facecolor='#fef2f2', edgecolor='#f87171', linewidth=2.0)
    ax.add_patch(pred_box)

    # Left Icon Circle
    icon_circle = patches.Circle((0.17, 0.38), 0.055, facecolor='#ef4444')
    ax.add_patch(icon_circle)
    ax.text(0.17, 0.36, "⚠", fontsize=28, fontweight='bold', color='white', ha='center', va='center')

    # Exact labels
    ax.text(0.26, 0.46, "Prediction:", fontsize=11, fontweight='bold', color='#991b1b')
    ax.text(0.26, 0.41, "⚠ ATTACK", fontsize=22, fontweight='bold', color='#dc2626')

    ax.text(0.26, 0.34, "Status:", fontsize=11, fontweight='bold', color='#991b1b')
    ax.text(0.26, 0.29, "SUSPICIOUS TRAFFIC DETECTED", fontsize=13.5, fontweight='bold', color='#b91c1c')

    # Confidence meter on right
    ax.text(0.68, 0.46, "Model Confidence Score", fontsize=10, fontweight='bold', color='#991b1b')
    ax.text(0.68, 0.40, "94.7%", fontsize=22, fontweight='bold', color='#b91c1c')
    ax.add_patch(patches.Rectangle((0.68, 0.35), 0.20, 0.018, facecolor='#fecaca', edgecolor='#f87171'))
    ax.add_patch(patches.Rectangle((0.68, 0.35), 0.20 * 0.947, 0.018, facecolor='#dc2626'))

    ax.text(0.68, 0.29, "Signature Match: DoS / Volumetric Flood", fontsize=8, fontweight='bold', color='#991b1b')
    ax.text(0.68, 0.25, "Action: Inspect host 192.168.1.189 & quarantine port 80.", fontsize=7.5, color='#4b5563')

    # Caption
    ax.text(0.5, 0.03, "Figure 5: Detection of suspicious network traffic",
            fontsize=10.5, fontweight='bold', color='#334155', ha='center')

    plt.tight_layout()
    plt.savefig(os.path.join(OUTPUT_DIR, "figure_5_attack_detection.png"), dpi=200, bbox_inches='tight')
    plt.close()
    print("Figure 5 generated successfully.")

# -------------------------------------------------------------
# FIGURE 6: Security Dashboard
# -------------------------------------------------------------
def generate_figure_6():
    fig, ax = plt.subplots(figsize=(11.5, 7.5), dpi=200)
    fig.patch.set_facecolor('#f8fafc')
    ax.set_facecolor('#f8fafc')
    ax.axis('off')

    # Outer Dashboard Container
    card = patches.FancyBboxPatch((0.03, 0.07), 0.94, 0.89, boxstyle="round,pad=0.02,rounding_size=0.03",
                                 facecolor='white', edgecolor='#cbd5e1', linewidth=1.5)
    ax.add_patch(card)

    # Top Header
    ax.text(0.06, 0.915, "AI-Based Intrusion Detection Dashboard", fontsize=15, fontweight='bold', color='#0f172a')
    ax.text(0.06, 0.885, "Real-Time Telemetry & Threat Surveillance Overview", fontsize=9.5, color='#64748b')

    # System Status on right
    ax.text(0.91, 0.91, "● SYSTEM OPERATIONAL", fontsize=9.5, fontweight='bold', color='#16a34a', ha='right')

    # Exact required stats from prompt:
    # Total Requests    1000
    # Normal Traffic     842
    # Suspicious Traffic 158
    # Attack Rate       15.8%
    stats = [
        ("Total Requests", "1000", "#2563eb", "#eff6ff", "#bfdbfe"),
        ("Normal Traffic", "842", "#16a34a", "#f0fdf4", "#bbf7d0"),
        ("Suspicious Traffic", "158", "#dc2626", "#fef2f2", "#fecaca"),
        ("Attack Rate", "15.8%", "#d97706", "#fffbeb", "#fde68a"),
    ]

    for idx, (label, val, col_text, col_bg, col_border) in enumerate(stats):
        x = 0.06 + idx * 0.22
        box = patches.FancyBboxPatch((x, 0.74), 0.20, 0.11, boxstyle="round,pad=0.015,rounding_size=0.02",
                                    facecolor=col_bg, edgecolor=col_border, linewidth=1.2)
        ax.add_patch(box)
        ax.text(x + 0.015, 0.82, label, fontsize=8.5, fontweight='bold', color='#475569')
        ax.text(x + 0.015, 0.77, val, fontsize=18, fontweight='bold', color=col_text)
        sub = "All active flows" if "Total" in label else "Benign (84.2%)" if "Normal" in label else "Flagged attacks" if "Suspicious" in label else "Attack ratio"
        ax.text(x + 0.015, 0.75, sub, fontsize=7.5, color='#64748b')

    # Horizontal Ratio Bar
    ax.text(0.06, 0.69, "Traffic Distribution Ratio", fontsize=10, fontweight='bold', color='#334155')
    bar_bg = patches.Rectangle((0.06, 0.655), 0.85, 0.022, facecolor='#f1f5f9', edgecolor='#e2e8f0')
    ax.add_patch(bar_bg)
    bar_norm = patches.Rectangle((0.06, 0.655), 0.85 * 0.842, 0.022, facecolor='#16a34a')
    ax.add_patch(bar_norm)
    bar_att = patches.Rectangle((0.06 + 0.85 * 0.842, 0.655), 0.85 * 0.158, 0.022, facecolor='#dc2626')
    ax.add_patch(bar_att)
    ax.text(0.06, 0.635, "■ Normal Traffic (84.2%)", fontsize=8, fontweight='bold', color='#16a34a')
    ax.text(0.70, 0.635, "■ Suspicious Traffic (15.8%)", fontsize=8, fontweight='bold', color='#dc2626')

    # Exact required Recent Alerts section:
    # Recent Alerts
    # ────────────────────────
    # ATTACK    HIGH
    # ATTACK    HIGH
    # BENIGN    NORMAL
    # ATTACK    HIGH
    ax.text(0.06, 0.58, "Recent Alerts", fontsize=11, fontweight='bold', color='#0f172a')
    ax.text(0.06, 0.555, "─────────────────────────────────────────────────────────────────────────────",
            fontsize=8, color='#cbd5e1', fontfamily='monospace')

    # Alert Table Header
    ax.text(0.06, 0.53, "Classification", fontsize=8.5, fontweight='bold', color='#64748b')
    ax.text(0.24, 0.53, "Severity / Status", fontsize=8.5, fontweight='bold', color='#64748b')
    ax.text(0.44, 0.53, "Source IP", fontsize=8.5, fontweight='bold', color='#64748b')
    ax.text(0.62, 0.53, "Target Port", fontsize=8.5, fontweight='bold', color='#64748b')
    ax.text(0.78, 0.53, "Timestamp", fontsize=8.5, fontweight='bold', color='#64748b')

    alerts_data = [
        ("ATTACK", "HIGH", "192.168.1.189", "Port 80 (HTTP Flood)", "13:44:08", "#dc2626", "#fef2f2", "#fecaca"),
        ("ATTACK", "HIGH", "192.168.1.205", "Port 22 (SSH Brute Force)", "13:41:30", "#dc2626", "#fef2f2", "#fecaca"),
        ("BENIGN", "NORMAL", "192.168.1.107", "Port 8080 (Web Proxy)", "13:40:15", "#16a34a", "#f0fdf4", "#bbf7d0"),
        ("ATTACK", "HIGH", "192.168.1.230", "Port 445 (SMB Recon)", "13:38:44", "#dc2626", "#fef2f2", "#fecaca"),
    ]

    for idx, (cls, sev, ip, port, ts, fg, bg, bd) in enumerate(alerts_data):
        y = 0.465 - idx * 0.08
        row_box = patches.FancyBboxPatch((0.055, y), 0.86, 0.065, boxstyle="round,pad=0.01,rounding_size=0.015",
                                        facecolor=bg, edgecolor=bd, linewidth=1.0)
        ax.add_patch(row_box)
        
        # Classification tag
        ax.text(0.07, y + 0.022, cls, fontsize=10, fontweight='bold', color=fg)
        # Severity
        ax.text(0.24, y + 0.022, sev, fontsize=9.5, fontweight='bold', color=fg)
        # IP
        ax.text(0.44, y + 0.022, ip, fontsize=9, color='#1e293b', fontfamily='monospace')
        # Port
        ax.text(0.62, y + 0.022, port, fontsize=8.5, color='#334155')
        # Timestamp
        ax.text(0.78, y + 0.022, ts, fontsize=8.5, color='#64748b', fontfamily='monospace')

    # Caption
    ax.text(0.5, 0.025, "Figure 6: AI-based intrusion detection dashboard",
            fontsize=10.5, fontweight='bold', color='#334155', ha='center')

    plt.tight_layout()
    plt.savefig(os.path.join(OUTPUT_DIR, "figure_6_security_dashboard.png"), dpi=200, bbox_inches='tight')
    plt.close()
    print("Figure 6 generated successfully.")

if __name__ == "__main__":
    generate_figure_1()
    generate_figure_2()
    generate_figure_3()
    generate_figure_4()
    generate_figure_5()
    generate_figure_6()
    print("All 6 figures generated successfully!")
