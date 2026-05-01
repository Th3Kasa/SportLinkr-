export default function SkeletonCard() {
  return (
    <div
      className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-3 animate-pulse"
      aria-hidden="true"
    >
      {/* Sport badge */}
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rounded-full bg-white/10" />
        <div className="w-24 h-3 rounded-full bg-white/10" />
      </div>
      {/* Name */}
      <div className="w-3/4 h-5 rounded-full bg-white/10" />
      {/* Address */}
      <div className="space-y-2">
        <div className="w-full h-3 rounded-full bg-white/10" />
        <div className="w-2/3 h-3 rounded-full bg-white/10" />
      </div>
      {/* Divider */}
      <div className="border-t border-white/5 pt-3 flex gap-3">
        <div className="w-1/2 h-9 rounded-xl bg-white/10" />
        <div className="w-1/2 h-9 rounded-xl bg-white/5" />
      </div>
    </div>
  )
}
