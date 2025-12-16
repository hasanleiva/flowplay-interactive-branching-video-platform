import { motion, AnimatePresence } from 'framer-motion';
import { usePlayerStore } from '@/stores/playerStore';
import { Button } from '@/components/ui/button';
export function InteractionLayer() {
  const branches = usePlayerStore(state => state.branches);
  const currentTime = usePlayerStore(state => state.currentTime);
  const loadScenario = usePlayerStore(state => state.loadScenario);
  const visibleBranches = branches.filter(
    (branch) => currentTime >= branch.appearAtSecond
  );
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none">
      <AnimatePresence>
        {visibleBranches.map((branch) => (
          <motion.div
            key={branch.label}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="absolute pointer-events-auto"
            style={{
              top: `${branch.position.y}%`,
              left: `${branch.position.x}%`,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <Button
              onClick={() => loadScenario(branch.targetScenarioId)}
              className="bg-white/20 text-white backdrop-blur-md border border-white/30 hover:bg-white/30 shadow-lg px-6 py-3 text-base font-semibold"
            >
              {branch.label}
            </Button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}