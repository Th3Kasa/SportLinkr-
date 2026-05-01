import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import PageLayout from '../components/PageLayout'
import { fadeUp, staggerContainer } from '../utils/motion'

// TODO: Replace legal@sportlinkr.app with the operator's real legal contact email

const SECTIONS = [
  { id: 'acceptance', title: '1. Acceptance' },
  { id: 'description', title: '2. Description of Service' },
  { id: 'conduct', title: '3. User Conduct' },
  { id: 'accuracy', title: '4. Venue Data Accuracy Disclaimer' },
  { id: 'directions', title: '5. Directions Disclaimer' },
  { id: 'ip', title: '6. Intellectual Property' },
  { id: 'liability', title: '7. Limitation of Liability' },
  { id: 'indemnification', title: '8. Indemnification' },
  { id: 'governing-law', title: '9. Governing Law' },
  { id: 'changes', title: '10. Changes' },
  { id: 'contact', title: '11. Contact' },
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

export default function Terms() {
  const [activeSection, setActiveSection] = useState('')

  const handleNavClick = (id) => {
    setActiveSection(id)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <PageLayout>
      <Helmet>
        <title>Terms of Service — SportLinkr</title>
        <meta name="description" content="SportLinkr Terms of Service — your rights and obligations when using the service." />
      </Helmet>

      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="show"
        className="mb-10"
      >
        <p className="text-xs font-semibold uppercase tracking-widest text-violet-400 mb-2">Legal</p>
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-white mb-2">
          Terms of Service
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
            aria-label="Terms of service sections"
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
            <SectionHeading id="acceptance">1. Acceptance</SectionHeading>
            <Prose>
              <p>
                By accessing or using SportLinkr (the "Service"), you agree to be bound by these Terms of
                Service ("Terms"). If you do not agree to these Terms, please do not use the Service.
                These Terms apply to all visitors, users, and others who access or use the Service.
              </p>
            </Prose>
          </motion.div>

          <motion.div variants={fadeUp}>
            <SectionHeading id="description">2. Description of Service</SectionHeading>
            <Prose>
              <p>
                SportLinkr is a free, browser-based venue discovery tool that helps users locate nearby
                sports facilities and courts. Venue data is sourced from{' '}
                <a href="https://www.openstreetmap.org" target="_blank" rel="noopener noreferrer" className="text-violet-400 hover:text-violet-300 underline underline-offset-2">OpenStreetMap</a>,
                a publicly available, community-edited geographic database.
              </p>
              <p>
                The Service is provided on an "as is" and "as available" basis. SportLinkr makes no
                warranty that the Service will be uninterrupted, error-free, or that venue data is
                accurate, up-to-date, or complete. <strong className="text-white/80">You should always verify venue
                information directly with the venue before visiting.</strong>
              </p>
            </Prose>
          </motion.div>

          <motion.div variants={fadeUp}>
            <SectionHeading id="conduct">3. User Conduct</SectionHeading>
            <Prose>
              <p>By using the Service, you agree not to:</p>
              <ul className="space-y-2 pl-4 border-l border-white/10">
                <li>Use automated scripts, bots, scrapers, or crawlers to harvest data from the Service.</li>
                <li>Misuse the Service to send an excessive volume of requests to the OpenStreetMap Overpass API, in violation of that service's usage policy.</li>
                <li>Attempt to circumvent or bypass any rate-limiting, access controls, or technical measures implemented by SportLinkr or its data providers.</li>
                <li>Use the Service for any unlawful purpose or in violation of any applicable law or regulation.</li>
                <li>Interfere with or disrupt the integrity or performance of the Service or its underlying infrastructure.</li>
              </ul>
            </Prose>
          </motion.div>

          <motion.div variants={fadeUp}>
            <SectionHeading id="accuracy">4. Venue Data Accuracy Disclaimer</SectionHeading>
            <Prose>
              <p>
                Venue information displayed on SportLinkr — including but not limited to venue names,
                street addresses, phone numbers, email addresses, websites, and operating hours — is
                sourced from OpenStreetMap, a community-edited database that is maintained by volunteers
                worldwide. SportLinkr makes no representation, warranty, or guarantee that this data is
                accurate, current, or complete.
              </p>
              <p>
                <strong className="text-white/80">We strongly recommend verifying all contact details and operating
                hours directly with the venue before visiting.</strong> SportLinkr is not liable for any
                loss, inconvenience, injury, or other consequence arising from incorrect, outdated,
                missing, or misleading venue information.
              </p>
            </Prose>
          </motion.div>

          <motion.div variants={fadeUp}>
            <SectionHeading id="directions">5. Directions Disclaimer</SectionHeading>
            <Prose>
              <p>
                "Get Directions" links within the Service open Google Maps, a third-party mapping service
                operated by Google LLC. SportLinkr is not responsible for the accuracy, safety, or
                legality of routing information or directions provided by Google Maps. Use of Google Maps
                is subject to Google's own terms of service and privacy policy. SportLinkr accepts no
                liability for any accident, loss, or damage arising from reliance on directions provided
                through Google Maps.
              </p>
            </Prose>
          </motion.div>

          <motion.div variants={fadeUp}>
            <SectionHeading id="ip">6. Intellectual Property</SectionHeading>
            <Prose>
              <p>
                The SportLinkr name, logo, and branding are the property of the Service operator. All
                rights reserved.
              </p>
              <p>
                Map and venue data is sourced from OpenStreetMap and is made available under the Open
                Database Licence (ODbL). See{' '}
                <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer" className="text-violet-400 hover:text-violet-300 underline underline-offset-2">openstreetmap.org/copyright</a>{' '}
                for attribution requirements. Map tiles are provided by CARTO under their respective
                licence terms.
              </p>
              <p>
                The software underlying the Service is subject to the operator's copyright. You may not
                reproduce, modify, distribute, or create derivative works from any part of the Service
                without prior written permission.
              </p>
            </Prose>
          </motion.div>

          <motion.div variants={fadeUp}>
            <SectionHeading id="liability">7. Limitation of Liability</SectionHeading>
            <Prose>
              <p>
                To the maximum extent permitted by applicable law, SportLinkr and its operators, directors,
                employees, agents, and licensors shall not be liable for any direct, indirect, incidental,
                special, consequential, punitive, or exemplary damages, including but not limited to
                damages for loss of profits, goodwill, data, or other intangible losses, arising out of
                or in connection with:
              </p>
              <ul className="space-y-2 pl-4 border-l border-white/10">
                <li>your use of or inability to use the Service;</li>
                <li>any inaccurate, incomplete, or outdated venue data;</li>
                <li>any directions or routing information accessed via third-party services;</li>
                <li>any unauthorised access to or alteration of your data;</li>
                <li>any other matter relating to the Service.</li>
              </ul>
              <p>
                In jurisdictions that do not allow the exclusion or limitation of incidental or
                consequential damages, SportLinkr's liability is limited to the greatest extent permitted
                by law.
              </p>
            </Prose>
          </motion.div>

          <motion.div variants={fadeUp}>
            <SectionHeading id="indemnification">8. Indemnification</SectionHeading>
            <Prose>
              <p>
                You agree to indemnify, defend, and hold harmless SportLinkr and its operators, officers,
                employees, agents, and licensors from and against any and all claims, damages, losses,
                costs, and expenses (including reasonable legal fees) arising out of or relating to: (a)
                your use of the Service; (b) your violation of these Terms; (c) your violation of any
                third-party right, including any intellectual property, privacy, or contractual right; or
                (d) any claim that your use of the Service caused damage to a third party.
              </p>
            </Prose>
          </motion.div>

          <motion.div variants={fadeUp}>
            <SectionHeading id="governing-law">9. Governing Law</SectionHeading>
            <Prose>
              {/* TODO: Operator should verify jurisdiction — currently set to NSW, Australia */}
              <p>
                These Terms shall be governed by and construed in accordance with the laws of the State
                of New South Wales, Australia, without regard to its conflict of law provisions. Any
                dispute arising out of or in connection with these Terms shall be subject to the exclusive
                jurisdiction of the courts of New South Wales, Australia.
              </p>
            </Prose>
          </motion.div>

          <motion.div variants={fadeUp}>
            <SectionHeading id="changes">10. Changes</SectionHeading>
            <Prose>
              <p>
                SportLinkr reserves the right to modify or replace these Terms at any time at its sole
                discretion. When we make changes, we will update the Effective Date at the top of this
                document. Your continued use of the Service after any changes are posted constitutes your
                acceptance of the revised Terms. If you do not agree to the revised Terms, you must stop
                using the Service.
              </p>
            </Prose>
          </motion.div>

          <motion.div variants={fadeUp}>
            <SectionHeading id="contact">11. Contact</SectionHeading>
            <Prose>
              {/* TODO: Replace legal@sportlinkr.app with the operator's real legal contact email */}
              <p>
                For any questions about these Terms, please contact us at{' '}
                <a href="mailto:legal@sportlinkr.app" className="text-violet-400 hover:text-violet-300 underline underline-offset-2">legal@sportlinkr.app</a>.
              </p>
            </Prose>
          </motion.div>
        </motion.div>
      </div>
    </PageLayout>
  )
}
