export default function RadiusSlider({ value, onChange, className = '' }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <span className="text-xs text-white/40 shrink-0">1 km</span>
      <div className="relative flex-1 flex items-center">
        <input
          type="range"
          min={1}
          max={25}
          step={1}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full h-1.5 appearance-none rounded-full cursor-pointer
            bg-white/10
            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:w-4
            [&::-webkit-slider-thumb]:h-4
            [&::-webkit-slider-thumb]:rounded-full
            [&::-webkit-slider-thumb]:bg-accent
            [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(167,139,250,0.5)]
            [&::-webkit-slider-thumb]:cursor-pointer
            [&::-moz-range-thumb]:w-4
            [&::-moz-range-thumb]:h-4
            [&::-moz-range-thumb]:rounded-full
            [&::-moz-range-thumb]:bg-accent
            [&::-moz-range-thumb]:border-0
            [&::-moz-range-thumb]:cursor-pointer
            focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
          aria-label={`Search radius: ${value} kilometres`}
          style={{
            background: `linear-gradient(to right, #A78BFA ${((value - 1) / 24) * 100}%, rgba(255,255,255,0.1) ${((value - 1) / 24) * 100}%)`,
          }}
        />
      </div>
      <span className="text-xs text-white/40 shrink-0">25 km</span>
      <span className="text-sm font-semibold text-accent shrink-0 w-12 text-right">
        {value} km
      </span>
    </div>
  )
}
