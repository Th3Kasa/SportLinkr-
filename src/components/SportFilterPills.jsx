import { motion } from 'framer-motion'
import * as LucideIcons from 'lucide-react'
import { SPORTS } from '../utils/sports'

function SportIcon({ iconName, className }) {
  const Icon = LucideIcons[iconName]
  if (!Icon) return null
  return <Icon className={className} aria-hidden="true" />
}

export default function SportFilterPills({ activeSport, onChange }) {
  return (
    <div
      className="relative flex gap-2 overflow-x-auto scrollbar-hide pb-0.5"
      role="tablist"
      aria-label="Sport filter"
    >
      {SPORTS.map((sport) => {
        const isActive = activeSport === sport.id
        return (
          <motion.button
            key={sport.id}
            layout
            onClick={() => onChange(sport.id)}
            role="tab"
            aria-selected={isActive}
            className={`
              relative flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium
              transition-colors shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/50
              ${isActive
                ? 'text-white'
                : 'text-white/50 hover:text-white bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06] hover:border-white/10'
              }
            `}
          >
            {isActive && (
              <motion.span
                layoutId="activeSport"
                className="absolute inset-0 rounded-full border"
                style={{
                  background: 'linear-gradient(135deg, rgba(167,139,250,0.18), rgba(244,114,182,0.18))',
                  borderColor: 'rgba(167,139,250,0.35)',
                }}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-2">
              <SportIcon
                iconName={sport.icon}
                className="w-3.5 h-3.5"
              />
              {sport.label}
            </span>
          </motion.button>
        )
      })}
    </div>
  )
}
