import { AlertCircle, Activity } from 'lucide-react'

export default function ErrorState({ message, onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
      <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-6">
        <AlertCircle className="w-7 h-7 text-red-400" aria-hidden="true" />
      </div>
      <h3 className="text-lg font-semibold text-white mb-2">
        Something went wrong
      </h3>
      <p className="text-white/50 text-sm max-w-xs mb-6">
        {message || 'Failed to load venues. Please check your connection and try again.'}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent/20 border border-accent/30 text-accent text-sm font-medium hover:bg-accent/30 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          <Activity className="w-4 h-4" aria-hidden="true" />
          Try again
        </button>
      )}
    </div>
  )
}
