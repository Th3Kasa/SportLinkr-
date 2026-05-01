export const SPORTS = [
  { id: 'basketball', label: 'Basketball', icon: 'CircleDot', color: '#F97316' },
  { id: 'futsal', label: 'Indoor Futsal', icon: 'Circle', color: '#22C55E' },
  { id: 'netball', label: 'Netball', icon: 'Target', color: '#EC4899' },
  { id: 'tennis', label: 'Tennis', icon: 'Zap', color: '#EAB308' },
  { id: 'pickleball', label: 'Pickleball', icon: 'Activity', color: '#14B8A6' },
  { id: 'padel', label: 'Padel', icon: 'Square', color: '#8B5CF6' },
  { id: 'cricket', label: 'Indoor Cricket', icon: 'Minus', color: '#F59E0B' },
  { id: 'badminton', label: 'Badminton', icon: 'Feather', color: '#06B6D4' },
  { id: 'volleyball', label: 'Volleyball', icon: 'Circle', color: '#F472B6' },
  { id: 'squash', label: 'Squash', icon: 'Square', color: '#A78BFA' },
]

export const getSport = (id) => SPORTS.find((s) => s.id === id) || SPORTS[0]

// Alias for backwards compatibility
export const getSportById = getSport
