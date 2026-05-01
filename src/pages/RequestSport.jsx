import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { CheckCircle, Loader2, Zap } from 'lucide-react'
import PageLayout from '../components/PageLayout'
import { fadeUp, staggerContainer } from '../utils/motion'

// TODO: Replace YYYYYYYY with your Formspree form ID for the sport request form (free at formspree.io)
const FORMSPREE_URL = 'https://formspree.io/f/YYYYYYYY'

// TODO: Replace sports@sportlinkr.app with the operator's real contact email for fallback errors
const FALLBACK_EMAIL = 'sports@sportlinkr.app'

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

export default function RequestSport() {
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
          <title>Request a Sport — SportLinkr</title>
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
            <p className="text-white/60 mb-8">We'll review your suggestion and consider adding the sport.</p>
            <button
              onClick={() => setStatus('idle')}
              className="px-6 py-3 rounded-full text-sm font-medium border border-white/10 bg-white/[0.04] hover:bg-white/[0.07] text-white/80 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/50"
            >
              Submit another request
            </button>
          </motion.div>
        </div>
      </PageLayout>
    )
  }

  return (
    <PageLayout>
      <Helmet>
        <title>Request a Sport — SportLinkr</title>
        <meta name="description" content="Request a new sport to be added to SportLinkr." />
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
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-violet-400 mb-0.5">Community</p>
              <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-white">
                Request a Sport
              </h1>
            </div>
          </div>
          <p className="text-[15px] text-white/50 leading-relaxed">
            Don't see your sport on SportLinkr? Tell us what you'd like added and we'll look into supporting it.
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
          <motion.div variants={fadeUp}>
            <Field label="Sport Name" required>
              <input
                type="text"
                name="sport_name"
                required
                placeholder="e.g. Padel, Touch Football, Archery…"
                className={inputClass}
              />
            </Field>
          </motion.div>

          <motion.div variants={fadeUp}>
            <Field label="Why should this sport be added?" required>
              <textarea
                name="reason"
                rows={4}
                required
                placeholder="Tell us why this sport would be valuable on SportLinkr. How popular is it? Where is it played?"
                className={`${inputClass} resize-none`}
              />
            </Field>
          </motion.div>

          <motion.div variants={fadeUp}>
            <Field
              label="OpenStreetMap tag (if known)"
              hint='e.g. sport=padel — helps us query the Overpass API correctly'
            >
              <input
                type="text"
                name="osm_tag"
                placeholder="e.g. sport=padel"
                className={inputClass}
              />
            </Field>
          </motion.div>

          <motion.div variants={fadeUp}>
            <Field label="Example venue name">
              <input
                type="text"
                name="example_venue"
                placeholder="e.g. Sydney Padel Club, Moore Park"
                className={inputClass}
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
                    placeholder="e.g. Jordan"
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
                'Submit Request'
              )}
            </button>
          </motion.div>
        </motion.form>
      </div>
    </PageLayout>
  )
}
