# FlowPlay - Interactive Branching Video Platform

[![[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/hasanleiva/flowplay-interactive-branching-video-platform)]](https://deploy.workers.cloudflare.com/?url=${repositoryUrl})

A minimalist, mobile-first interactive video player that enables seamless storytelling through timed, branching choices overlaid on HLS streams.

FlowPlay is a high-performance HLS video player wrapped in a sleek, minimalist UI that mimics the immersive nature of apps like TikTok or Instagram Reels. The key differentiator is its **branching engine**: a logic layer that monitors video playback in real-time and renders interactive overlays (decision points) at specific timestamps. Built as a Progressive Web App (PWA), it delivers a native-like experience across devices with full-screen vertical layout and smooth transitions.

## ✨ Key Features

- **Full-Screen Vertical Video Player**: Mobile-first design with centered 420px container on desktop (black bars simulation).
- **HLS Streaming Support**: Powered by `hls.js` for Bunny.net streams and broad browser compatibility (native HLS on Safari).
- **Interactive Branching**: Timed choice buttons appear at specified seconds, enabling story branching without page reloads.
- **JSON-Driven Logic**: Scenario data from `/public/data/*.json` defines video URLs, branch timings, positions, and targets.
- **Immersive UX**: Glassmorphic overlays, micro-interactions, autoplay (post-user gesture), mute toggle, and smooth source switching.
- **PWA-Ready**: Installable, offline-capable app shell with responsive mobile-frame layout.
- **Zero Backend**: Pure frontend MVP with hardcoded sample data for rapid testing.

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite, TypeScript
- **Styling**: Tailwind CSS 3, shadcn/ui, Lucide React icons
- **State & Animations**: Zustand, Framer Motion
- **Video**: hls.js (HLS streaming)
- **Routing & Utils**: React Router DOM, clsx, tailwind-merge
- **Deployment**: Cloudflare Workers/Pages, Wrangler
- **Dev Tools**: Bun, ESLint, TanStack Query (optional caching)

## 🚀 Quick Start

### Prerequisites

- [Bun](https://bun.sh/) v1.0+ (recommended package manager)
- [Cloudflare Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/install-and-update/)

### Installation

```bash
# Clone/Fork the repo
git clone <your-repo-url>
cd flowplay

# Install dependencies
bun install

# Generate Cloudflare types (if deploying)
bun run cf-typegen
```

### Development

```bash
# Start dev server (with hot reload)
bun run dev

# Open http://localhost:3000 (or $PORT)
```

The app auto-reloads on changes. Test branching with sample JSONs in `/public/data/`.

### Build for Production

```bash
bun run build
bun run preview  # Local preview of build
```

## 📱 Usage

1. **Load the App**: Full-screen video player starts with landing overlay (tap to begin).
2. **Play Video**: Autoplay begins on user interaction (handles browser policies).
3. **Branching**: At `appearAtSecond` (e.g., 10s), glassmorphic buttons animate in at `position x/y` (% coords).
4. **Choose Path**: Click a button → Video src swaps seamlessly, new JSON loads, player resets/plays.
5. **Controls**: Mute/unmute toggle; infinite loop optional via JSON.

**Sample JSON Structure** (`/public/data/video1.json`):
```json
{
  "mainVideoUrl": "https://example.bunnycdn.net/play/playlist.m3u8",
  "branches": [
    {
      "appearAtSecond": 10,
      "label": "Option 1",
      "positionX": 60,
      "positionY": 40,
      "targetVideoUrl": "https://branch.bunnycdn.net/playlist.m3u8",
      "targetJson": "/data/video2.json"
    }
  ]
}
```

Replace Bunny URLs with your streams (ensure CORS-enabled).

## 🔧 Development Guide

- **Custom Scenarios**: Add JSON files to `/public/data/`; update root store for entry point.
- **Styling**: Edit `src/index.css` or Tailwind config; uses shadcn primitives.
- **Player Logic**: `src/stores/usePlayerStore.ts` (Zustand); `HLSPlayer` component handles time monitoring.
- **PWA Enhancements**: Service worker auto-generated; customize `public/manifest.json` and icons.
- **Linting**: `bun run lint`
- **Testing**: Branching tested via dev tools Network throttling; mobile via browser dev tools.

**File Structure**:
```
src/
├── pages/HomePage.tsx      # Main app (rewrite this)
├── stores/usePlayerStore.ts # Global branching state
├── components/HLSPlayer.tsx # Core video component
└── hooks/useVideoTime.ts    # Time tracking
public/data/                 # JSON scenarios (*.json)
```

## ☁️ Deployment

Deploy to Cloudflare Workers/Pages for global CDN + free tier.

1. **Login & Link Account**:
   ```bash
   wrangler login
   wrangler whoami
   ```

2. **Configure** (auto via `wrangler.jsonc`):
   - Set `wrangler.toml` bindings if needed (KV/DO optional).

3. **Deploy**:
   ```bash
   bun run deploy  # Builds + deploys
   ```
   Or:
   ```bash
   bun run build
   wrangler deploy
   ```

**Production URL**: `https://flowplay-<hash>.workers.dev`

**[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/hasanleiva/flowplay-interactive-branching-video-platform)**: One-click deploy via button above (auto-configures).

**PWA on Deploy**: Served as SPA; add to homescreen via browser prompt.

## 🤝 Contributing

1. Fork & PR.
2. Follow TypeScript/Tailwind conventions.
3. Test branching flows.
4. Update `README.md` for new features.

## 📄 License

MIT License. See [LICENSE](LICENSE) for details.

## 🚀 Next Steps

- Integrate real API for dynamic scenarios.
- Add analytics/user sessions via Cloudflare KV.
- Extend with multi-video queues or social sharing.

Built with ❤️ for interactive storytelling. Questions? Open an issue!