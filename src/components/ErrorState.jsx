import { motion } from 'framer-motion'
import { AlertCircle, ArrowRight } from 'lucide-react'
import { fadeUp, staggerContainer } from '../utils/motion'

export default function ErrorState({ message, onRetry }) {
  return (
    <motion.div
      variants={staggerContainer(0.08)}
      initial="hidden"
      animate="show"
      className="flex flex-col items-center justify-center py-24 px-6 text-center"
    >
      <motion.div
        variants={fadeUp}
        className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-6"
      >
        <AlertCircle className="w-7 h-7 text-red-400" aria-hidden="true" />
      </motion.div>

      <motion.h3
        variants={fadeUp}
        className="text-2xl font-semibold tracking-tight text-white mb-3"
      >
        Something went wrong
      </motion.h3>

      <motion.p variants={fadeUp} className="text-[15px] text-white/40 max-w-xs mb-8 leading-relaxed">
        {message || 'Failed to load venues. Please check your connection and try again.'}
      </motion.p>

      {onRetry && (
        <motion.button
          variants={fadeUp}
          onClick={onRetry}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/[0.04] border border-white/[0.06] text-white/70 text-sm font-medium hover:text-white hover:bg-white/[0.07] hover:border-white/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/50"
        >
          Try again
          <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </motion.button>
      )}
    </motion.div>
  )
}
