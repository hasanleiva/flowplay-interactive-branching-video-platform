import { create } from 'zustand';
import type { Branch, Scenario } from '@/lib/types';
import { scenarios, initialScenarioId } from '@/data/scenarios';
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
  startExperience: () => void;
  loadScenario: (scenarioId: string) => void;
  togglePlay: () => void;
  toggleMute: () => void;
  setCurrentTime: (time: number) => void;
  setDuration: (duration: number) => void;
  setLoading: (loading: boolean) => void;
  play: () => void;
  pause: () => void;
}
export const usePlayerStore = create<PlayerState & PlayerActions>((set) => ({
  currentScenarioId: null,
  videoSrc: null,
  branches: [],
  isPlaying: false,
  isMuted: false,
  isStarted: false,
  isLoading: true,
  currentTime: 0,
  duration: 0,
  startExperience: () => {
    const initialScenario = scenarios[initialScenarioId];
    if (initialScenario) {
      set({
        isStarted: true,
        isLoading: true,
        isPlaying: false,
        currentTime: 0,
        videoSrc: initialScenario.mainVideoUrl,
        branches: initialScenario.branches,
        currentScenarioId: initialScenario.id,
        isPlaying: true,
      });
    } else {
      console.error('Initial scenario not found!');
      set({ isStarted: false, isLoading: false });
    }
  },
  loadScenario: (scenarioId: string) => {
    const scenario = scenarios[scenarioId];
    if (scenario) {
      set({
        isLoading: true,
        isPlaying: false,
        currentTime: 0,
        branches: [], // Clear old branches immediately
        videoSrc: scenario.mainVideoUrl,
        branches: scenario.branches,
        currentScenarioId: scenario.id,
        isPlaying: true,
      });
    } else {
      console.error(`Scenario with id "${scenarioId}" not found!`);
      // Fallback or error state
      set({ isPlaying: false, isLoading: false });
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