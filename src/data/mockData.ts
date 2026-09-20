import {
  DashboardStats,
  TrafficDataPoint,
  ThreatCategory,
  ModelMetrics,
  FeatureImportanceItem,
  DetectionLog,
  NetworkTrafficFeatures
} from '../types/ids';

export const dashboardStats: DashboardStats = {
  totalTraffic: 1284,
  totalTrafficChange: '+12.4%',
  normalTraffic: 1126,
  normalTrafficPercent: '87.7%',
  threatsDetected: 158,
  threatsDetectedChange: '+8.2%',
  accuracy: 96.4,
};

export const trafficTimelineData: TrafficDataPoint[] = [
  { time: '10 AM', normalTraffic: 142, suspiciousTraffic: 14 },
  { time: '11 AM', normalTraffic: 188, suspiciousTraffic: 22 },
  { time: '12 PM', normalTraffic: 215, suspiciousTraffic: 39 },
  { time: '1 PM', normalTraffic: 176, suspiciousTraffic: 18 },
  { time: '2 PM', normalTraffic: 242, suspiciousTraffic: 41 },
  { time: '3 PM', normalTraffic: 198, suspiciousTraffic: 15 },
  { time: '4 PM', normalTraffic: 165, suspiciousTraffic: 9 },
];

export const threatDistributionData: ThreatCategory[] = [
  { name: 'Benign', count: 1126, color: '#10b981', percentage: 87.7 },
  { name: 'DoS', count: 68, color: '#ef4444', percentage: 5.3 },
  { name: 'DDoS', count: 42, color: '#f97316', percentage: 3.3 },
  { name: 'Port Scan', count: 26, color: '#8b5cf6', percentage: 2.0 },
  { name: 'Brute Force', count: 15, color: '#ec4899', percentage: 1.2 },
  { name: 'Other', count: 7, color: '#64748b', percentage: 0.5 },
];

export const modelPerformanceMetrics: ModelMetrics = {
  accuracy: 96.4,
  precision: 95.5,
  recall: 96.1,
  f1Score: 95.8,
  modelType: 'Random Forest (100 Estimators)',
  dataset: 'CICIDS2017 Benchmark Dataset',
  totalSamplesEvaluated: 17670,
  confusionMatrix: {
    tn: 9420, // True Negative (Benign correctly identified)
    fp: 356,  // False Positive (Benign classified as Attack)
    fn: 280,  // False Negative (Attack classified as Benign)
    tp: 7614  // True Positive (Attack correctly identified)
  }
};

export const featureImportanceData: FeatureImportanceItem[] = [
  { feature: 'Flow Duration', readableName: 'Flow Duration', importance: 0.28, category: 'Temporal' },
  { feature: 'Packet Length Mean', readableName: 'Packet Length Mean', importance: 0.24, category: 'Packet Size' },
  { feature: 'Flow Bytes/s', readableName: 'Flow Bytes/s', importance: 0.19, category: 'Volume' },
  { feature: 'Destination Port', readableName: 'Destination Port', importance: 0.14, category: 'Endpoint' },
  { feature: 'Total Fwd Packets', readableName: 'Packet Count (Fwd)', importance: 0.09, category: 'Volume' },
  { feature: 'Packet Length Std', readableName: 'Packet Length Std Dev', importance: 0.06, category: 'Packet Size' },
];

export const sampleNormalTraffic: NetworkTrafficFeatures = {
  flow_duration: 1200,
  total_fwd_packets: 15,
  total_backward_packets: 8,
  flow_bytes_per_sec: 15200,
  flow_packets_per_sec: 19.2,
  packet_length_mean: 524,
  packet_length_std: 120,
  destination_port: 443
};

export const sampleAttackTraffic: NetworkTrafficFeatures = {
  flow_duration: 380,
  total_fwd_packets: 195,
  total_backward_packets: 2,
  flow_bytes_per_sec: 84200,
  flow_packets_per_sec: 518.4,
  packet_length_mean: 84,
  packet_length_std: 16,
  destination_port: 80
};

export const initialDetectionLogs: DetectionLog[] = [
  {
    id: 'log-101',
    time: '13:45:22',
    prediction: 'BENIGN',
    status: 'NORMAL',
    confidence: 0.982,
    source: '192.168.1.104',
    destination: '10.0.0.15',
    port: 443,
    protocol: 'TCP',
    flowDurationMs: 1140,
    features: {
      destination_port: 443,
      flow_duration: 1140,
      packet_length_mean: 490
    }
  },
  {
    id: 'log-102',
    time: '13:44:08',
    prediction: 'ATTACK',
    status: 'SUSPICIOUS',
    confidence: 0.947,
    source: '192.168.1.189',
    destination: '10.0.0.8',
    port: 80,
    protocol: 'TCP',
    flowDurationMs: 320,
    attackType: 'SYN Flood (DoS)',
    features: {
      destination_port: 80,
      flow_duration: 320,
      total_fwd_packets: 210,
      packet_length_mean: 64
    }
  },
  {
    id: 'log-103',
    time: '13:42:55',
    prediction: 'BENIGN',
    status: 'NORMAL',
    confidence: 0.991,
    source: '192.168.1.112',
    destination: '10.0.0.22',
    port: 53,
    protocol: 'UDP',
    flowDurationMs: 45,
    features: {
      destination_port: 53,
      flow_duration: 45,
      packet_length_mean: 128
    }
  },
  {
    id: 'log-104',
    time: '13:41:30',
    prediction: 'ATTACK',
    status: 'SUSPICIOUS',
    confidence: 0.923,
    source: '192.168.1.205',
    destination: '10.0.0.12',
    port: 22,
    protocol: 'TCP',
    flowDurationMs: 890,
    attackType: 'SSH Brute Force',
    features: {
      destination_port: 22,
      flow_duration: 890,
      flow_bytes_per_sec: 42000
    }
  },
  {
    id: 'log-105',
    time: '13:40:15',
    prediction: 'BENIGN',
    status: 'NORMAL',
    confidence: 0.976,
    source: '192.168.1.107',
    destination: '10.0.0.15',
    port: 8080,
    protocol: 'TCP',
    flowDurationMs: 1420,
    features: {
      destination_port: 8080,
      flow_duration: 1420,
      packet_length_mean: 610
    }
  },
  {
    id: 'log-106',
    time: '13:38:44',
    prediction: 'ATTACK',
    status: 'SUSPICIOUS',
    confidence: 0.965,
    source: '192.168.1.230',
    destination: '10.0.0.1',
    port: 445,
    protocol: 'TCP',
    flowDurationMs: 210,
    attackType: 'Port Scan Reconnaissance',
    features: {
      destination_port: 445,
      flow_duration: 210,
      packet_length_mean: 40
    }
  },
  {
    id: 'log-107',
    time: '13:36:19',
    prediction: 'BENIGN',
    status: 'NORMAL',
    confidence: 0.988,
    source: '192.168.1.115',
    destination: '10.0.0.30',
    port: 443,
    protocol: 'TCP',
    flowDurationMs: 1850,
    features: {
      destination_port: 443,
      flow_duration: 1850,
      packet_length_mean: 720
    }
  },
  {
    id: 'log-108',
    time: '13:33:02',
    prediction: 'BENIGN',
    status: 'NORMAL',
    confidence: 0.969,
    source: '192.168.1.121',
    destination: '10.0.0.14',
    port: 443,
    protocol: 'TCP',
    flowDurationMs: 980,
    features: {
      destination_port: 443,
      flow_duration: 980,
      packet_length_mean: 512
    }
  }
];
