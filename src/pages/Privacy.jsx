import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import PageLayout from '../components/PageLayout'
import { fadeUp, staggerContainer } from '../utils/motion'

// TODO: Replace privacy@sportlinkr.app with the operator's real privacy contact email

const SECTIONS = [
  { id: 'who-we-are', title: '1. Who We Are' },
  { id: 'information-we-collect', title: '2. Information We Collect' },
  { id: 'how-we-use', title: '3. How We Use Your Information' },
  { id: 'third-party', title: '4. Third-Party Services' },
  { id: 'cookies', title: '5. Cookies & Local Storage' },
  { id: 'your-rights', title: '6. Your Rights' },
  { id: 'data-retention', title: '7. Data Retention' },
  { id: 'children', title: '8. Children\'s Privacy' },
  { id: 'changes', title: '9. Changes to This Policy' },
  { id: 'contact', title: '10. Contact' },
]

function SectionHeading({ id, children }) {
  return (
    <h2
      id={id}
      className="text-xl font-semibold text-white mb-4 scroll-mt-24"
    >
      {children}
    </h2>
  )
}

function Prose({ children }) {
  return (
    <div className="text-[15px] text-white/60 leading-relaxed space-y-3 mb-10">
      {children}
    </div>
  )
}

export default function Privacy() {
  const [activeSection, setActiveSection] = useState('')

  const handleNavClick = (id) => {
    setActiveSection(id)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <PageLayout>
      <Helmet>
        <title>Privacy Policy — SportLinkr</title>
        <meta name="description" content="SportLinkr Privacy Policy — how we handle your data." />
      </Helmet>

      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="show"
        className="mb-10"
      >
        <p className="text-xs font-semibold uppercase tracking-widest text-violet-400 mb-2">Legal</p>
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-white mb-2">
          Privacy Policy
        </h1>
        <p className="text-sm text-white/40">Effective Date: 1 May 2026</p>
      </motion.div>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* Sticky sidebar */}
        <motion.aside
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="lg:w-56 shrink-0"
        >
          <nav
            className="lg:sticky lg:top-24 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4"
            aria-label="Privacy policy sections"
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-3">Contents</p>
            <ul className="space-y-1">
              {SECTIONS.map((s) => (
                <li key={s.id}>
                  <button
                    onClick={() => handleNavClick(s.id)}
                    className={`w-full text-left text-xs py-1.5 px-2 rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/50 ${
                      activeSection === s.id
                        ? 'text-violet-300 bg-violet-500/10'
                        : 'text-white/50 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {s.title}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </motion.aside>

        {/* Content */}
        <motion.div
          variants={staggerContainer(0.06, 0.1)}
          initial="hidden"
          animate="show"
          className="flex-1 min-w-0"
        >
          <motion.div variants={fadeUp}>
            <SectionHeading id="who-we-are">1. Who We Are</SectionHeading>
            <Prose>
              <p>
                SportLinkr is a free sports venue discovery service that helps users find nearby sports courts
                and facilities using publicly available geographic data. We do not require account registration
                and do not store personal information on our servers.
              </p>
              {/* TODO: Replace privacy@sportlinkr.app with the operator's verified privacy contact */}
              <p>
                For privacy-related enquiries, please contact us at{' '}
                <a
                  href="mailto:privacy@sportlinkr.app"
                  className="text-violet-400 hover:text-violet-300 underline underline-offset-2"
                >
                  privacy@sportlinkr.app
                </a>
                .
              </p>
            </Prose>
          </motion.div>

          <motion.div variants={fadeUp}>
            <SectionHeading id="information-we-collect">2. Information We Collect</SectionHeading>
            <Prose>
              <p className="font-medium text-white/80">Geolocation Data</p>
              <p>
                When you tap "Detect my location", your browser requests your geographic coordinates
                (latitude and longitude) via the standard browser Geolocation API. This data is stored
                exclusively in your browser's <code className="text-violet-300 bg-violet-500/10 px-1 rounded text-xs">localStorage</code> for
                up to 30 minutes so that repeated page visits within the same session do not prompt you
                again. Your coordinates are never transmitted to or stored on SportLinkr's servers.
              </p>
              <p className="font-medium text-white/80">Usage Data</p>
              <p>
                We do not operate our own analytics server. Third-party advertising networks — specifically
                Google AdSense — may collect anonymised usage data (such as pages visited, device type,
                and approximate location derived from IP address) in accordance with their own privacy
                policies. Please refer to Google's Privacy Policy for details.
              </p>
              <p className="font-medium text-white/80">No Account Data</p>
              <p>
                SportLinkr does not require or collect any name, email address, password, or other
                personally identifying information. No user accounts exist on this platform.
              </p>
            </Prose>
          </motion.div>

          <motion.div variants={fadeUp}>
            <SectionHeading id="how-we-use">3. How We Use Your Information</SectionHeading>
            <Prose>
              <p>
                Your location coordinates are used exclusively to query the OpenStreetMap Overpass API — a
                publicly accessible, third-party geographic data service — to return a list of nearby sports
                venues. This query is made directly from your browser to the Overpass API; SportLinkr does
                not act as a proxy for this request and does not log or receive your coordinates on any
                SportLinkr-operated server.
              </p>
              <p>
                We do not sell, rent, trade, or otherwise share your location data with advertisers,
                data brokers, or any other third parties. Your location is used only for the single purpose
                described above.
              </p>
            </Prose>
          </motion.div>

          <motion.div variants={fadeUp}>
            <SectionHeading id="third-party">4. Third-Party Services</SectionHeading>
            <Prose>
              <p>SportLinkr integrates the following third-party services. Each service operates under its own privacy policy:</p>
              <ul className="space-y-3 pl-4 border-l border-white/10">
                <li>
                  <span className="text-white/80 font-medium">OpenStreetMap / Overpass API</span> — venue and geographic data provider.
                  See{' '}
                  <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer" className="text-violet-400 hover:text-violet-300 underline underline-offset-2">openstreetmap.org/copyright</a>.
                </li>
                <li>
                  <span className="text-white/80 font-medium">CartoDB (CARTO)</span> — map tile provider used to render the interactive
                  map. See{' '}
                  <a href="https://carto.com/legal" target="_blank" rel="noopener noreferrer" className="text-violet-400 hover:text-violet-300 underline underline-offset-2">carto.com/legal</a>.
                </li>
                <li>
                  <span className="text-white/80 font-medium">Google AdSense</span> — advertising platform that may display
                  personalised or contextual advertisements. Google may set cookies and collect usage data. See{' '}
                  <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-violet-400 hover:text-violet-300 underline underline-offset-2">policies.google.com/privacy</a>.
                  You may opt out of personalised advertising via{' '}
                  <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="text-violet-400 hover:text-violet-300 underline underline-offset-2">Google Ad Settings</a>.
                </li>
                <li>
                  <span className="text-white/80 font-medium">Nominatim</span> — reverse geocoding service (converts coordinates to
                  a human-readable place name) operated by the OpenStreetMap Foundation. Queries are sent
                  directly from your browser. See{' '}
                  <a href="https://nominatim.org/release-docs/latest/api/Reverse/" target="_blank" rel="noopener noreferrer" className="text-violet-400 hover:text-violet-300 underline underline-offset-2">Nominatim documentation</a>.
                </li>
              </ul>
            </Prose>
          </motion.div>

          <motion.div variants={fadeUp}>
            <SectionHeading id="cookies">5. Cookies &amp; Local Storage</SectionHeading>
            <Prose>
              <p>
                SportLinkr itself does not set any tracking cookies. We use the browser's{' '}
                <code className="text-violet-300 bg-violet-500/10 px-1 rounded text-xs">localStorage</code> API for two purposes only:
              </p>
              <ul className="space-y-2 pl-4 border-l border-white/10">
                <li><span className="text-white/80">Location cache</span> — your coordinates, stored with a 30-minute expiry to avoid repeated permission prompts within the same session.</li>
                <li><span className="text-white/80">Last-selected sport</span> — the sport you last searched for, so your preference persists across page refreshes.</li>
              </ul>
              <p>
                You can remove all SportLinkr-stored data at any time by clearing your browser's site data
                for this domain (Settings → Privacy → Clear browsing data, or equivalent in your browser).
              </p>
              <p>
                Google AdSense may set its own cookies on this domain as part of its advertising delivery
                and measurement functions. Please refer to{' '}
                <a href="https://policies.google.com/technologies/cookies" target="_blank" rel="noopener noreferrer" className="text-violet-400 hover:text-violet-300 underline underline-offset-2">Google's cookie policy</a>{' '}
                for details.
              </p>
            </Prose>
          </motion.div>

          <motion.div variants={fadeUp}>
            <SectionHeading id="your-rights">6. Your Rights (GDPR / Australian Privacy Act / CCPA)</SectionHeading>
            <Prose>
              <p>
                Depending on your jurisdiction, you may have the following rights regarding your personal data:
              </p>
              <ul className="space-y-2 pl-4 border-l border-white/10">
                <li><span className="text-white/80">Right of access</span> — the right to know what data is held about you.</li>
                <li><span className="text-white/80">Right to rectification</span> — the right to correct inaccurate data.</li>
                <li><span className="text-white/80">Right to erasure</span> — the right to have your data deleted.</li>
                <li><span className="text-white/80">Right to restriction of processing</span> — the right to limit how your data is used.</li>
                <li><span className="text-white/80">Right to data portability</span> — the right to receive your data in a portable format.</li>
              </ul>
              <p>
                Because SportLinkr stores no personal data on its servers, the only data that exists about
                you is held locally in your own browser. You can exercise your right to erasure simply by
                clearing your browser's site data for this domain — no request to us is necessary.
              </p>
              <p>
                For data held by Google AdSense, please use{' '}
                <a href="https://myaccount.google.com/data-and-privacy" target="_blank" rel="noopener noreferrer" className="text-violet-400 hover:text-violet-300 underline underline-offset-2">Google's data and privacy tools</a>.
              </p>
              <p>
                If you have any privacy concerns or requests, contact us at{' '}
                {/* TODO: Replace with verified operator email */}
                <a href="mailto:privacy@sportlinkr.app" className="text-violet-400 hover:text-violet-300 underline underline-offset-2">privacy@sportlinkr.app</a>.
              </p>
            </Prose>
          </motion.div>

          <motion.div variants={fadeUp}>
            <SectionHeading id="data-retention">7. Data Retention</SectionHeading>
            <Prose>
              <p>
                <span className="text-white/80">Location data:</span> retained in your browser's localStorage for 30 minutes, after which it expires automatically. There is no server-side retention of location data.
              </p>
              <p>
                <span className="text-white/80">Sport preference:</span> retained in localStorage indefinitely until you clear your browser data or change your selection.
              </p>
              <p>
                SportLinkr operates no databases or server-side storage of user personal data.
              </p>
            </Prose>
          </motion.div>

          <motion.div variants={fadeUp}>
            <SectionHeading id="children">8. Children's Privacy</SectionHeading>
            <Prose>
              <p>
                SportLinkr is not directed at children under the age of 13. We do not knowingly collect
                personal information from children. If you believe a child under 13 has provided personal
                information through this service, please contact us at{' '}
                {/* TODO: Replace with verified operator email */}
                <a href="mailto:privacy@sportlinkr.app" className="text-violet-400 hover:text-violet-300 underline underline-offset-2">privacy@sportlinkr.app</a>{' '}
                and we will take appropriate steps to remove that information.
              </p>
            </Prose>
          </motion.div>

          <motion.div variants={fadeUp}>
            <SectionHeading id="changes">9. Changes to This Policy</SectionHeading>
            <Prose>
              <p>
                We may update this Privacy Policy from time to time to reflect changes in our practices,
                technology, legal requirements, or for other operational reasons. When we make material
                changes, we will update the Effective Date at the top of this document. We encourage you
                to review this page periodically. Continued use of SportLinkr following the posting of
                changes constitutes your acceptance of those changes.
              </p>
            </Prose>
          </motion.div>

          <motion.div variants={fadeUp}>
            <SectionHeading id="contact">10. Contact</SectionHeading>
            <Prose>
              {/* TODO: Replace with the operator's verified privacy contact email */}
              <p>
                For any privacy-related questions, requests, or complaints, please email us at{' '}
                <a href="mailto:privacy@sportlinkr.app" className="text-violet-400 hover:text-violet-300 underline underline-offset-2">privacy@sportlinkr.app</a>.
              </p>
            </Prose>
          </motion.div>
        </motion.div>
      </div>
    </PageLayout>
  )
}
