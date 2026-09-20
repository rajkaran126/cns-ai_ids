export interface NetworkTrafficFeatures {
  flow_duration: number;
  total_fwd_packets: number;
  total_backward_packets: number;
  flow_bytes_per_sec: number;
  flow_packets_per_sec: number;
  packet_length_mean: number;
  packet_length_std: number;
  destination_port: number;
}

export type ClassificationType = 'BENIGN' | 'ATTACK';
export type SecurityStatusType = 'NORMAL' | 'SUSPICIOUS';

export interface PredictionResult {
  prediction: ClassificationType;
  status: SecurityStatusType;
  confidence: number;
  attack_type?: string;
  timestamp: string;
  recommendedAction?: string;
}

export interface DetectionLog {
  id: string;
  time: string;
  prediction: ClassificationType;
  status: SecurityStatusType;
  confidence: number;
  source: string;
  destination: string;
  port: number;
  protocol: 'TCP' | 'UDP' | 'ICMP';
  flowDurationMs: number;
  attackType?: string;
  features?: Partial<NetworkTrafficFeatures>;
}

export interface DashboardStats {
  totalTraffic: number;
  totalTrafficChange: string;
  normalTraffic: number;
  normalTrafficPercent: string;
  threatsDetected: number;
  threatsDetectedChange: string;
  accuracy: number;
}

export interface TrafficDataPoint {
  time: string;
  normalTraffic: number;
  suspiciousTraffic: number;
}

export interface ThreatCategory {
  name: string;
  count: number;
  color: string;
  percentage: number;
}

export interface ConfusionMatrix {
  tn: number;
  fp: number;
  fn: number;
  tp: number;
}

export interface ModelMetrics {
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
  modelType: string;
  dataset: string;
  totalSamplesEvaluated: number;
  confusionMatrix: ConfusionMatrix;
}

export interface FeatureImportanceItem {
  feature: string;
  importance: number;
  readableName: string;
  category: 'Temporal' | 'Volume' | 'Packet Size' | 'Endpoint';
}
