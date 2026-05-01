import { Link } from 'react-router-dom'
import { MapPin, ExternalLink } from 'lucide-react'

export default function Footer() {
  return (
    <footer
      className="border-t border-white/5 bg-white/[0.02]"
      role="contentinfo"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #A78BFA, #F472B6)' }}
                aria-hidden="true"
              >
                <MapPin className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold text-white tracking-tight">
                Sport<span
                  className="bg-clip-text text-transparent"
                  style={{ backgroundImage: 'linear-gradient(135deg, #A78BFA, #F472B6)' }}
                >Linkr</span>
              </span>
            </div>
            <p className="text-sm text-white/40 leading-relaxed">
              Find courts near you
            </p>
          </div>

          {/* Navigation links */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-4">
              Navigate
            </p>
            <ul className="space-y-2.5">
              <li>
                <Link
                  to="/"
                  className="text-sm text-white/50 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/50 rounded"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="text-sm text-white/50 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/50 rounded"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="text-sm text-white/50 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/50 rounded"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  to="/request-venue"
                  className="text-sm text-white/50 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/50 rounded"
                >
                  Request a Venue
                </Link>
              </li>
              <li>
                <Link
                  to="/request-sport"
                  className="text-sm text-white/50 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/50 rounded"
                >
                  Request a Sport
                </Link>
              </li>
            </ul>
          </div>

          {/* Data attribution */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-4">
              Data
            </p>
            <a
              href="https://www.openstreetmap.org"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-white/50 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/50 rounded"
            >
              Powered by OpenStreetMap
              <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/[0.06] pt-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/25">
            &copy; 2026 SportLinkr. All rights reserved.
          </p>
          <p className="text-xs text-white/25">
            Venue data &copy;{' '}
            <a
              href="https://www.openstreetmap.org/copyright"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white/50 underline underline-offset-2"
            >
              OpenStreetMap
            </a>{' '}
            contributors (ODbL)
          </p>
        </div>
      </div>
    </footer>
  )
}
