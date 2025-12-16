import type { Scenario } from '@/lib/types';
// Client-provided working HLS URLs
const START_VIDEO_URL = "https://vz-8d915ecf-df3.b-cdn.net/1748ca9b-24ed-4b76-acd6-4c3d183e4040/playlist.m3u8";
const BRANCH_VIDEO_URL = "https://vz-8d915ecf-df3.b-cdn.net/72ef6d8a-c162-4647-a9b2-0e298ea68c8e/playlist.m3u8";
export const scenarios: Record<string, Scenario> = {
  'start': {
    id: 'start',
    mainVideoUrl: START_VIDEO_URL,
    branches: [
      {
        appearAtSecond: 5,
        label: 'Explore the City',
        position: { x: 50, y: 45 },
        targetVideoUrl: BRANCH_VIDEO_URL,
        targetScenarioId: 'city',
      },
      {
        appearAtSecond: 5,
        label: 'Head to Nature',
        position: { x: 50, y: 55 },
        targetVideoUrl: BRANCH_VIDEO_URL, // Per client, nature and city use the same branch video
        targetScenarioId: 'nature',
      },
    ],
  },
  'city': {
    id: 'city',
    mainVideoUrl: BRANCH_VIDEO_URL,
    branches: [
      {
        appearAtSecond: 8,
        label: 'Restart',
        position: { x: 50, y: 50 },
        targetVideoUrl: START_VIDEO_URL,
        targetScenarioId: 'start',
      },
    ],
  },
  'nature': {
    id: 'nature',
    mainVideoUrl: BRANCH_VIDEO_URL, // Per client, nature and city use the same branch video
    branches: [
      {
        appearAtSecond: 8,
        label: 'Restart',
        position: { x: 50, y: 50 },
        targetVideoUrl: START_VIDEO_URL,
        targetScenarioId: 'start',
      },
    ],
  },
};
export const initialScenarioId = 'start';