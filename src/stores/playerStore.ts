import { create } from 'zustand';
import type { Branch, Scenario } from '@/lib/types';
const feedVideos = ['video1', 'video2', 'video3'];
interface PlayerState {
  feedVideos: string[];
  currentFeedIndex: number;
  currentVideoId: string | null;
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
  loadVideo: (videoId: string) => Promise<void>;
  loadBranch: (targetVideoUrl: string, targetJson?: string) => Promise<void>;
  nextVideo: () => void;
  prevVideo: () => void;
  togglePlay: () => void;
  toggleMute: () => void;
  setCurrentTime: (time: number) => void;
  setDuration: (duration: number) => void;
  setLoading: (loading: boolean) => void;
  play: () => void;
  pause: () => void;
}
export const usePlayerStore = create<PlayerState & PlayerActions>((set, get) => ({
  feedVideos,
  currentFeedIndex: 0,
  currentVideoId: null,
  videoSrc: null,
  branches: [],
  isPlaying: false,
  isMuted: false,
  isStarted: false,
  isLoading: true,
  currentTime: 0,
  duration: 0,
  loadVideo: async (videoId: string) => {
    set({ isLoading: true, isPlaying: false, currentTime: 0, branches: [] });
    try {
      const response = await fetch(`/data/${videoId}.json`);
      if (!response.ok) throw new Error(`Failed to fetch scenario: ${videoId}`);
      const scenario: Scenario = await response.json();
      const newFeedIndex = get().feedVideos.findIndex(id => id === videoId);
      set({
        isStarted: true,
        videoSrc: scenario.mainVideoUrl,
        branches: scenario.branches,
        currentVideoId: videoId,
        currentFeedIndex: newFeedIndex !== -1 ? newFeedIndex : get().currentFeedIndex,
        isPlaying: true,
        isLoading: false,   // <-- clear loading flag
      });
    } catch (error) {
      console.error("Error loading scenario:", error);
      set({ isLoading: false, isStarted: false });
    }
  },
  loadBranch: async (targetVideoUrl: string, targetJson?: string) => {
    set({ isLoading: true, isPlaying: false, currentTime: 0, branches: [] });
    if (targetJson) {
      try {
        const response = await fetch(targetJson);
        if (!response.ok) throw new Error(`Failed to fetch branch JSON: ${targetJson}`);
        const scenario: Scenario = await response.json();
        set({ branches: scenario.branches });
        // Extract the video ID from the branch JSON path (e.g., "/data/video2.json")
        const newVideoId = targetJson.split('/').pop()?.replace('.json', '') ?? null;
        if (newVideoId && feedVideos.includes(newVideoId)) {
          const newFeedIndex = feedVideos.findIndex((id) => id === newVideoId);
          set({
            currentVideoId: newVideoId,
            currentFeedIndex: newFeedIndex,
          });
        }
      } catch (error) {
        console.error("Error loading branch scenario:", error);
        set({ branches: [] }); // Fallback to no branches on error
      }
    }
    set({
      videoSrc: targetVideoUrl,
      isPlaying: true,
      isLoading: false,   // <-- clear loading flag
    });
  },
  nextVideo: () => {
    const { feedVideos, currentFeedIndex } = get();
    const nextIndex = (currentFeedIndex + 1) % feedVideos.length;
    get().loadVideo(feedVideos[nextIndex]);
  },
  prevVideo: () => {
    const { feedVideos, currentFeedIndex } = get();
    const prevIndex = (currentFeedIndex - 1 + feedVideos.length) % feedVideos.length;
    get().loadVideo(feedVideos[prevIndex]);
  },
  togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
  play: () => set({ isPlaying: true }),
  pause: () => set({ isPlaying: false }),
  toggleMute: () => set((state) => ({ isMuted: !state.isMuted })),
  setCurrentTime: (time) => set({ currentTime: time }),
  setDuration: (duration) => set({ duration: duration }),
  setLoading: (loading) => set({ isLoading: loading }),
}));