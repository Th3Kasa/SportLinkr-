export default function SkeletonCard() {
  return (
    <div
      className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 space-y-4"
      aria-hidden="true"
    >
      {/* Top row: badge + chip */}
      <div className="flex items-center justify-between">
        <div className="w-24 h-6 rounded-full skeleton-shimmer" />
        <div className="w-20 h-6 rounded-full skeleton-shimmer" />
      </div>
      {/* Name */}
      <div className="w-3/4 h-6 rounded-xl skeleton-shimmer" />
      {/* Address */}
      <div className="space-y-2">
        <div className="w-full h-4 rounded-lg skeleton-shimmer" />
        <div className="w-2/3 h-4 rounded-lg skeleton-shimmer" />
      </div>
      {/* Actions */}
      <div className="border-t border-white/[0.06] pt-4 flex gap-3">
        <div className="flex-1 h-10 rounded-full skeleton-shimmer" />
        <div className="w-28 h-10 rounded-full skeleton-shimmer" />
      </div>
    </div>
  )
}
