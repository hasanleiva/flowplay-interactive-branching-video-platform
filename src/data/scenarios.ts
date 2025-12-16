import type { Scenario } from '@/lib/types';
export const scenarios: Record<string, Scenario> = {
  'start': {
    id: 'start',
    mainVideoUrl: 'https://vz-a7f3d33c-748.b-cdn.net/2c6d7f96-96a5-4db4-81cb-7b5354a1d5c5/playlist.m3u8',
    branches: [
      {
        appearAtSecond: 5,
        label: 'Explore the City',
        position: { x: 50, y: 45 },
        targetVideoUrl: 'https://vz-a7f3d33c-748.b-cdn.net/0e9d1dfd-445c-4f10-9b63-10761a221087/playlist.m3u8',
        targetScenarioId: 'city',
      },
      {
        appearAtSecond: 5,
        label: 'Head to Nature',
        position: { x: 50, y: 55 },
        targetVideoUrl: 'https://vz-a7f3d33c-748.b-cdn.net/51a86673-81f1-4d8b-ab83-060a12b326d6/playlist.m3u8',
        targetScenarioId: 'nature',
      },
    ],
  },
  'city': {
    id: 'city',
    mainVideoUrl: 'https://vz-a7f3d33c-748.b-cdn.net/0e9d1dfd-445c-4f10-9b63-10761a221087/playlist.m3u8',
    branches: [
      {
        appearAtSecond: 8,
        label: 'Restart',
        position: { x: 50, y: 50 },
        targetVideoUrl: 'https://vz-a7f3d33c-748.b-cdn.net/2c6d7f96-96a5-4db4-81cb-7b5354a1d5c5/playlist.m3u8',
        targetScenarioId: 'start',
      },
    ],
  },
  'nature': {
    id: 'nature',
    mainVideoUrl: 'https://vz-a7f3d33c-748.b-cdn.net/51a86673-81f1-4d8b-ab83-060a12b326d6/playlist.m3u8',
    branches: [
      {
        appearAtSecond: 8,
        label: 'Restart',
        position: { x: 50, y: 50 },
        targetVideoUrl: 'https://vz-a7f3d33c-748.b-cdn.net/2c6d7f96-96a5-4db4-81cb-7b5354a1d5c5/playlist.m3u8',
        targetScenarioId: 'start',
      },
    ],
  },
};
export const initialScenarioId = 'start';