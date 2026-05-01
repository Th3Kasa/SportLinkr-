import { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HelmetProvider, Helmet } from 'react-helmet-async'
import Home from './pages/Home'
import Results from './pages/Results'
import { SITE } from './utils/seo'

const Privacy = lazy(() => import('./pages/Privacy'))
const Terms = lazy(() => import('./pages/Terms'))
const RequestVenue = lazy(() => import('./pages/RequestVenue'))
const RequestSport = lazy(() => import('./pages/RequestSport'))

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: SITE.name,
  url: SITE.url,
  description: SITE.description,
  applicationCategory: 'SportsApplication',
  operatingSystem: 'Any',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
}

function PageFallback() {
  return (
    <div className="min-h-screen bg-[#0A0A0F] flex items-center justify-center">
      <div className="w-6 h-6 rounded-full border-2 border-violet-400/30 border-t-violet-400 animate-spin" />
    </div>
  )
}

export default function App() {
  return (
    <HelmetProvider>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/results" element={<Results />} />
          <Route
            path="/privacy"
            element={
              <Suspense fallback={<PageFallback />}>
                <Privacy />
              </Suspense>
            }
          />
          <Route
            path="/terms"
            element={
              <Suspense fallback={<PageFallback />}>
                <Terms />
              </Suspense>
            }
          />
          <Route
            path="/request-venue"
            element={
              <Suspense fallback={<PageFallback />}>
                <RequestVenue />
              </Suspense>
            }
          />
          <Route
            path="/request-sport"
            element={
              <Suspense fallback={<PageFallback />}>
                <RequestSport />
              </Suspense>
            }
          />
          {/* Catch-all redirects to home */}
          <Route path="*" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  )
}
