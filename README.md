# SportLinkr

Discover nearby sports courts and venues — free, no sign-up, powered by OpenStreetMap.

## Features

- Find basketball, tennis, futsal, padel, pickleball, badminton, volleyball, squash, netball, and cricket venues near you
- Interactive map with clustering (CartoDB Dark Matter tiles)
- Adjustable search radius (1–25 km)
- Contact info, directions, and venue details
- Mobile-first responsive design
- Zero paid APIs

## Tech Stack

- React 18 + Vite 5
- Tailwind CSS 3
- Framer Motion (animations)
- Leaflet + React-Leaflet (maps)
- OpenStreetMap Overpass API (venue data)
- Nominatim (reverse geocoding)
- React Helmet Async (SEO)
- Lucide React (icons)

## Setup

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. Push to GitHub
2. Import repo in Vercel
3. Deploy — the `vercel.json` handles SPA routing automatically

## AdSense Activation

To monetize with Google AdSense:

1. Open `src/utils/ads.js` — replace `ca-pub-XXXXXXXXXXXXXXXX` with your publisher ID
2. Open `src/components/AdSlot.jsx` — replace `ca-pub-XXXXXXXXXXXXXXXX` and the slot ID
3. Ensure AdSense approval before enabling ads

## License

MIT
