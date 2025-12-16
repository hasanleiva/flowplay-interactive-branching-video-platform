import { Volume2, VolumeX, Play, Pause, Loader } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePlayerStore } from '@/stores/playerStore';
import { Progress } from '@/components/ui/progress';
export function ControlsOverlay() {
  const isPlaying = usePlayerStore(state => state.isPlaying);
  const isMuted = usePlayerStore(state => state.isMuted);
  const isLoading = usePlayerStore(state => state.isLoading);
  const currentTime = usePlayerStore(state => state.currentTime);
  const duration = usePlayerStore(state => state.duration);
  const currentVideoId = usePlayerStore(state => state.currentVideoId);
  const togglePlay = usePlayerStore(state => state.togglePlay);
  const toggleMute = usePlayerStore(state => state.toggleMute);
  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none">
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 flex items-center justify-center"
          >
            <Loader className="w-12 h-12 text-white animate-spin" />
          </motion.div>
        )}
      </AnimatePresence>
      <div className="absolute top-4 right-4 pointer-events-auto">
        <button
          onClick={toggleMute}
          className="p-2 rounded-full bg-black/30 backdrop-blur-sm text-white hover:bg-white/20 transition-colors"
          aria-label={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </button>
      </div>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-auto" onClick={togglePlay}>
        <AnimatePresence>
          {!isPlaying && !isLoading && (
            <motion.div
              initial={{ scale: 1.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.5, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Play size={64} className="text-white/80 drop-shadow-lg" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <AnimatePresence>
        {currentVideoId && (
           <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-black/30 backdrop-blur text-white px-4 py-2 rounded-full text-sm font-semibold pointer-events-auto"
            >
            {currentVideoId.replace('video', 'Scenario ')}
          </motion.div>
        )}
      </AnimatePresence>
      <div className="absolute bottom-4 left-4 right-4 pointer-events-auto">
        <Progress value={progress} className="h-1 bg-white/20 [&>div]:bg-white" />
      </div>
    </div>
  );
}