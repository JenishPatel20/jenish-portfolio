export interface SnnNode {
  id: string;
  label: string;
  x: number;
  y: number;
  layer: "signal" | "features" | "spike" | "output";
}

export interface SnnStep {
  label: string;
  note: string;
  activeNodes: string[];
  activeEdges: string[];
}

export interface SnnDataset {
  id: string;
  title: string;
  summary: string;
  source: string;
  steps: SnnStep[];
}

export const snnNodes: SnnNode[] = [
  { id: "signal-1", label: "x1", x: 12, y: 18, layer: "signal" },
  { id: "signal-2", label: "x2", x: 12, y: 36, layer: "signal" },
  { id: "signal-3", label: "x3", x: 12, y: 54, layer: "signal" },
  { id: "signal-4", label: "x4", x: 12, y: 72, layer: "signal" },
  { id: "feature-1", label: "f1", x: 36, y: 24, layer: "features" },
  { id: "feature-2", label: "f2", x: 36, y: 48, layer: "features" },
  { id: "feature-3", label: "f3", x: 36, y: 72, layer: "features" },
  { id: "spike-1", label: "s1", x: 62, y: 18, layer: "spike" },
  { id: "spike-2", label: "s2", x: 62, y: 36, layer: "spike" },
  { id: "spike-3", label: "s3", x: 62, y: 54, layer: "spike" },
  { id: "spike-4", label: "s4", x: 62, y: 72, layer: "spike" },
  { id: "output-1", label: "y1", x: 86, y: 30, layer: "output" },
  { id: "output-2", label: "y2", x: 86, y: 60, layer: "output" },
];

export const snnEdges = [
  "signal-1:feature-1",
  "signal-2:feature-1",
  "signal-2:feature-2",
  "signal-3:feature-2",
  "signal-3:feature-3",
  "signal-4:feature-3",
  "feature-1:spike-1",
  "feature-1:spike-2",
  "feature-2:spike-2",
  "feature-2:spike-3",
  "feature-3:spike-3",
  "feature-3:spike-4",
  "spike-1:output-1",
  "spike-2:output-1",
  "spike-2:output-2",
  "spike-3:output-2",
  "spike-4:output-2",
] as const;

export const snnDatasets: SnnDataset[] = [
  {
    id: "cwru",
    title: "CWRU Bearing Fault Flow",
    summary: "A simplified view of vibration windows moving from CNN features into spike-driven anomaly signals.",
    source: "CWRU bearing vibration windows",
    steps: [
      {
        label: "Window Encode",
        note: "Raw vibration windows are segmented into compact patches for downstream processing.",
        activeNodes: ["signal-1", "signal-2", "signal-3", "signal-4"],
        activeEdges: ["signal-1:feature-1", "signal-2:feature-2", "signal-4:feature-3"],
      },
      {
        label: "Feature Lift",
        note: "CNN-style filters concentrate local frequency structure before transfer into spike space.",
        activeNodes: ["feature-1", "feature-2", "feature-3"],
        activeEdges: ["feature-1:spike-1", "feature-2:spike-2", "feature-3:spike-4"],
      },
      {
        label: "Spike Burst",
        note: "Surrogate-gradient SNN layers fire only on strong, fault-like activations.",
        activeNodes: ["spike-1", "spike-2", "spike-4"],
        activeEdges: ["spike-1:output-1", "spike-2:output-1", "spike-4:output-2"],
      },
      {
        label: "Fault Decision",
        note: "The output layer separates healthy patterns from fault signatures.",
        activeNodes: ["output-1"],
        activeEdges: [],
      },
    ],
  },
  {
    id: "ecg",
    title: "MIT-BIH ECG Flow",
    summary: "This replay shows cardiac heartbeat segments compressed into spikes for arrhythmia classification.",
    source: "MIT-BIH / PTBDB ECG heartbeat segments",
    steps: [
      {
        label: "Heartbeat Slice",
        note: "Heartbeat samples are normalized, padded, and reshaped into fixed-size inputs.",
        activeNodes: ["signal-1", "signal-2", "signal-3"],
        activeEdges: ["signal-2:feature-1", "signal-2:feature-2", "signal-3:feature-3"],
      },
      {
        label: "Shared Features",
        note: "Feature extractors identify QRS-style structure before the SNN stages react.",
        activeNodes: ["feature-1", "feature-2"],
        activeEdges: ["feature-1:spike-2", "feature-2:spike-3"],
      },
      {
        label: "Sparse Firing",
        note: "Only a small subset of neurons activate, keeping the representation energy-aware.",
        activeNodes: ["spike-2", "spike-3"],
        activeEdges: ["spike-2:output-1", "spike-3:output-2"],
      },
      {
        label: "Class Output",
        note: "Final activations map the beat into the predicted rhythm class.",
        activeNodes: ["output-2"],
        activeEdges: [],
      },
    ],
  },
];
