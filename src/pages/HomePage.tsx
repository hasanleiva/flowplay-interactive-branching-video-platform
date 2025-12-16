import { PlayCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { MobileContainer } from '@/components/layout/MobileContainer';
import { SwipeFeed } from '@/components/layout/SwipeFeed';
import { HLSPlayer } from '@/components/player/HLSPlayer';
import { ControlsOverlay } from '@/components/player/ControlsOverlay';
import { InteractionLayer } from '@/components/player/InteractionLayer';
import { usePlayerStore } from '@/stores/playerStore';
import { Button } from '@/components/ui/button';
function InteractivePlayer() {
  return (
    <div className="w-full h-full bg-black">
      <HLSPlayer />
      <ControlsOverlay />
      <InteractionLayer />
    </div>
  );
}
function StartOverlay() {
  const loadVideo = usePlayerStore(state => state.loadVideo);
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-black to-neutral-800 flex flex-col items-center justify-center text-white p-8 text-center"
    >
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <h1 className="text-5xl font-bold text-balance" style={{ fontFamily: 'Inter, sans-serif' }}>
          FlowPlay
        </h1>
        <p className="text-lg text-muted-foreground mt-2 max-w-xs mx-auto">
          An interactive branching video experience.
        </p>
      </motion.div>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="mt-8"
      >
        <Button
          onClick={() => loadVideo('video1')}
          className="bg-orange-500 text-white hover:bg-orange-600 h-16 w-16 rounded-full p-0 flex items-center justify-center shadow-lg shadow-orange-500/30 transition-all duration-300 hover:scale-110 active:scale-95"
          aria-label="Start Experience"
        >
          <PlayCircle size={32} />
        </Button>
      </motion.div>
      <footer className="absolute bottom-6 text-xs text-muted-foreground/50">
        Built with ❤️ at Cloudflare
      </footer>
    </motion.div>
  );
}
export function HomePage() {
  const isStarted = usePlayerStore(state => state.isStarted);
  const nextVideo = usePlayerStore(state => state.nextVideo);
  const prevVideo = usePlayerStore(state => state.prevVideo);
  return (
    <MobileContainer>
      <AnimatePresence mode="wait">
        {isStarted ? (
          <motion.div
            key="player"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full h-full"
          >
            <SwipeFeed nextVideo={nextVideo} prevVideo={prevVideo}>
              <InteractivePlayer />
            </SwipeFeed>
          </motion.div>
        ) : (
          <StartOverlay key="start" />
        )}
      </AnimatePresence>
    </MobileContainer>
  );
}