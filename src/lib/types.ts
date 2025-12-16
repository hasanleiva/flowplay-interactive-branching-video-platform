export interface Position {
  x: number; // Percentage from left (0-100)
  y: number; // Percentage from top (0-100)
}
export interface Branch {
  appearAtSecond: number;
  label: string;
  position: Position;
  targetVideoUrl: string;
  targetScenarioId: string;
}
export interface Scenario {
  id: string;
  mainVideoUrl: string;
  branches: Branch[];
}