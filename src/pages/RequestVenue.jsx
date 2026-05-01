import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { CheckCircle, Loader2, MapPin } from 'lucide-react'
import PageLayout from '../components/PageLayout'
import { SPORTS } from '../utils/sports'
import { fadeUp, staggerContainer } from '../utils/motion'

// TODO: Replace XXXXXXXX with your Formspree form ID (free at formspree.io)
const FORMSPREE_URL = 'https://formspree.io/f/XXXXXXXX'

// TODO: Replace venues@sportlinkr.app with the operator's real contact email for fallback errors
const FALLBACK_EMAIL = 'venues@sportlinkr.app'

const inputClass =
  'bg-white/[0.05] border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:border-[#A78BFA] focus:outline-none focus:ring-1 focus:ring-[#A78BFA]/50 w-full text-sm transition-colors'

const labelClass = 'block text-sm text-white/60 mb-1.5 font-medium'

function Field({ label, required, children, hint }) {
  return (
    <div>
      <label className={labelClass}>
        {label}
        {required && <span className="text-[#A78BFA] ml-1" aria-hidden="true">*</span>}
      </label>
      {children}
      {hint && <p className="mt-1.5 text-xs text-white/30">{hint}</p>}
    </div>
  )
}

export default function RequestVenue() {
  const [status, setStatus] = useState('idle') // idle | loading | success | error

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch(FORMSPREE_URL, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(e.target),
      })
      setStatus(res.ok ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <PageLayout>
        <Helmet>
          <title>Request a Venue — SportLinkr</title>
        </Helmet>
        <div className="max-w-2xl mx-auto text-center py-16">
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 18 }}
            className="flex justify-center mb-6"
          >
            <CheckCircle className="w-16 h-16 text-[#A78BFA]" />
          </motion.div>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
          >
            <h1 className="text-2xl font-semibold text-white mb-3">Thank you!</h1>
            <p className="text-white/60 mb-8">We'll review your submission and get the venue added.</p>
            <button
              onClick={() => setStatus('idle')}
              className="px-6 py-3 rounded-full text-sm font-medium border border-white/10 bg-white/[0.04] hover:bg-white/[0.07] text-white/80 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/50"
            >
              Submit another venue
            </button>
          </motion.div>
        </div>
      </PageLayout>
    )
  }

  return (
    <PageLayout>
      <Helmet>
        <title>Request a Venue — SportLinkr</title>
        <meta name="description" content="Submit a sports venue to be added to SportLinkr." />
      </Helmet>

      <div className="max-w-2xl mx-auto">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="mb-10"
        >
          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: 'linear-gradient(135deg, #A78BFA, #F472B6)' }}
              aria-hidden="true"
            >
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-violet-400 mb-0.5">Community</p>
              <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-white">
                Request a Venue
              </h1>
            </div>
          </div>
          <p className="text-[15px] text-white/50 leading-relaxed">
            Know a sports venue that's missing from SportLinkr? Submit it below and we'll review it for inclusion.
          </p>
        </motion.div>

        {status === 'error' && (
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mb-6 p-4 rounded-2xl bg-red-500/10 border border-red-400/20 text-red-300 text-sm"
            role="alert"
          >
            Submission failed. Please email us at{' '}
            <a href={`mailto:${FALLBACK_EMAIL}`} className="underline underline-offset-2 hover:text-red-200">
              {FALLBACK_EMAIL}
            </a>
          </motion.div>
        )}

        <motion.form
          onSubmit={handleSubmit}
          variants={staggerContainer(0.05, 0.1)}
          initial="hidden"
          animate="show"
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8 space-y-5"
          noValidate
        >
          {/* Venue info */}
          <motion.div variants={fadeUp} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Field label="Venue Name" required>
              <input
                type="text"
                name="venue_name"
                required
                placeholder="e.g. Eastside Basketball Centre"
                className={inputClass}
              />
            </Field>
            <Field label="Sport Type" required>
              <select name="sport_type" required className={inputClass} defaultValue="">
                <option value="" disabled>Select a sport…</option>
                {SPORTS.map((s) => (
                  <option key={s.id} value={s.id}>{s.label}</option>
                ))}
              </select>
            </Field>
          </motion.div>

          <motion.div variants={fadeUp}>
            <Field label="Street Address" required>
              <input
                type="text"
                name="street_address"
                required
                placeholder="e.g. 42 Court Street"
                className={inputClass}
              />
            </Field>
          </motion.div>

          <motion.div variants={fadeUp} className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div className="sm:col-span-1">
              <Field label="Suburb / City" required>
                <input
                  type="text"
                  name="suburb"
                  required
                  placeholder="e.g. Parramatta"
                  className={inputClass}
                />
              </Field>
            </div>
            <div>
              <Field label="State" required>
                <select name="state" required className={inputClass} defaultValue="">
                  <option value="" disabled>State…</option>
                  {['NSW', 'VIC', 'QLD', 'WA', 'SA', 'TAS', 'ACT', 'NT'].map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </Field>
            </div>
            <div>
              <Field label="Postcode">
                <input
                  type="text"
                  name="postcode"
                  placeholder="e.g. 2150"
                  maxLength={10}
                  className={inputClass}
                />
              </Field>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Field label="Phone Number">
              <input
                type="tel"
                name="phone"
                placeholder="e.g. (02) 9000 0000"
                className={inputClass}
              />
            </Field>
            <Field label="Email Address">
              <input
                type="email"
                name="email"
                placeholder="e.g. info@venuename.com.au"
                className={inputClass}
              />
            </Field>
          </motion.div>

          <motion.div variants={fadeUp}>
            <Field label="Website URL">
              <input
                type="url"
                name="website"
                placeholder="e.g. https://www.venuename.com.au"
                className={inputClass}
              />
            </Field>
          </motion.div>

          <motion.div variants={fadeUp}>
            <Field label="Additional Notes">
              <textarea
                name="notes"
                rows={3}
                placeholder="Any other relevant details about the venue…"
                className={`${inputClass} resize-none`}
              />
            </Field>
          </motion.div>

          <motion.div variants={fadeUp}>
            <div className="border-t border-white/[0.06] pt-5">
              <p className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-4">About You (optional)</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field label="Your Name">
                  <input
                    type="text"
                    name="submitter_name"
                    placeholder="e.g. Alex"
                    className={inputClass}
                  />
                </Field>
                <Field label="Your Email" hint="So we can follow up if needed">
                  <input
                    type="email"
                    name="submitter_email"
                    placeholder="e.g. you@example.com"
                    className={inputClass}
                  />
                </Field>
              </div>
            </div>
          </motion.div>

          <motion.div variants={fadeUp}>
            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-semibold text-white text-sm transition-all hover:shadow-[0_0_40px_-8px_rgba(167,139,250,0.5)] hover:scale-[1.01] active:scale-[0.99] focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/50 disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100"
              style={{ background: 'linear-gradient(135deg, #A78BFA, #F472B6)' }}
            >
              {status === 'loading' ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                  Submitting…
                </>
              ) : (
                'Submit Venue'
              )}
            </button>
          </motion.div>
        </motion.form>
      </div>
    </PageLayout>
  )
}
