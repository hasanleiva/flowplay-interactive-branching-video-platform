import { create } from 'zustand';
import type { Branch, Scenario } from '@/lib/types';
import { scenarios } from '@/data/scenarios';
interface PlayerState {
  currentScenarioId: string | null;
  videoSrc: string | null;
  branches: Branch[];
  isPlaying: boolean;
  isMuted: boolean;
  isStarted: boolean;
  isLoading: boolean;
  currentTime: number;
  duration: number;
}
interface PlayerActions {
  startExperience: (scenarioId: string) => void;
  loadScenario: (scenarioId: string) => void;
  togglePlay: () => void;
  toggleMute: () => void;
  setCurrentTime: (time: number) => void;
  setDuration: (duration: number) => void;
  setLoading: (loading: boolean) => void;
  play: () => void;
  pause: () => void;
}
export const usePlayerStore = create<PlayerState & PlayerActions>((set, get) => ({
  currentScenarioId: null,
  videoSrc: null,
  branches: [],
  isPlaying: false,
  isMuted: false,
  isStarted: false,
  isLoading: true,
  currentTime: 0,
  duration: 0,
  startExperience: (scenarioId: string) => {
    const scenario = scenarios[scenarioId];
    if (scenario) {
      set({
        isStarted: true,
        isPlaying: true,
        isMuted: false,
        isLoading: true,
        currentScenarioId: scenario.id,
        videoSrc: scenario.mainVideoUrl,
        branches: scenario.branches,
        currentTime: 0,
      });
    }
  },
  loadScenario: (scenarioId: string) => {
    const scenario = scenarios[scenarioId];
    if (scenario) {
      set({
        isLoading: true,
        isPlaying: false, // Will be set to true by player once ready
        currentScenarioId: scenario.id,
        videoSrc: scenario.mainVideoUrl,
        branches: scenario.branches,
        currentTime: 0,
      });
      // Delay play to allow video to load
      setTimeout(() => set({ isPlaying: true }), 100);
    }
  },
  togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
  play: () => set({ isPlaying: true }),
  pause: () => set({ isPlaying: false }),
  toggleMute: () => set((state) => ({ isMuted: !state.isMuted })),
  setCurrentTime: (time) => set({ currentTime: time }),
  setDuration: (duration) => set({ duration: duration }),
  setLoading: (loading) => set({ isLoading: loading }),
}));