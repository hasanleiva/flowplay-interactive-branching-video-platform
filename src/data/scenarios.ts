import type { Scenario } from '@/lib/types';
export const initialScenarioId = 'start';
export const scenarios: Record<string, Scenario> = {
  start: {
    id: 'start',
    mainVideoUrl: 'https://stream.mux.com/x36xhzz0262501I021g02dc47w01kn527J/low.m3u8', // Mux test stream
    branches: [
      {
        appearAtSecond: 5,
        label: 'City',
        position: { x: 50, y: 40 },
        targetVideoUrl: 'https://devstreaming-cdn.apple.com/videos/streaming/examples/bipbop_4x3/bipbop_4x3_variant.m3u8', // Apple test stream
        targetScenarioId: 'city',
      },
      {
        appearAtSecond: 5,
        label: 'Nature',
        position: { x: 50, y: 60 },
        targetVideoUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8', // Mux test stream (alternative)
        targetScenarioId: 'nature',
      },
    ],
  },
  city: {
    id: 'city',
    mainVideoUrl: 'https://devstreaming-cdn.apple.com/videos/streaming/examples/bipbop_4x3/bipbop_4x3_variant.m3u8',
    branches: [
      {
        appearAtSecond: 8,
        label: 'Go Back',
        position: { x: 50, y: 50 },
        targetVideoUrl: 'https://stream.mux.com/x36xhzz0262501I021g02dc47w01kn527J/low.m3u8',
        targetScenarioId: 'start',
      },
    ],
  },
  nature: {
    id: 'nature',
    mainVideoUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
    branches: [
      {
        appearAtSecond: 8,
        label: 'Restart',
        position: { x: 50, y: 50 },
        targetVideoUrl: 'https://stream.mux.com/x36xhzz0262501I021g02dc47w01kn527J/low.m3u8',
        targetScenarioId: 'start',
      },
    ],
  },
};