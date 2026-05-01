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
      className="flex gap-2 overflow-x-auto pb-1 scrollbar-none"
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
              transition-colors shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent
              ${isActive
                ? 'text-bg'
                : 'text-white/60 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10'
              }
            `}
            style={isActive ? {} : {}}
          >
            {isActive && (
              <motion.span
                layoutId="active-pill-bg"
                className="absolute inset-0 rounded-full"
                style={{
                  background: `linear-gradient(135deg, #A78BFA, #F472B6)`,
                }}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-2">
              <SportIcon
                iconName={sport.icon}
                className={`w-4 h-4 ${isActive ? 'text-bg' : ''}`}
              />
              {sport.label}
            </span>
          </motion.button>
        )
      })}
    </div>
  )
}
