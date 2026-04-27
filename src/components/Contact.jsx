import { motion as Motion } from 'framer-motion'
import { FiGithub, FiMail, FiInstagram } from 'react-icons/fi'
import SectionTitle from './SectionTitle'
import TiltCard from './TiltCard'

function Contact() {
  const handleSubmit = (event) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const name = formData.get('name')
    const email = formData.get('email')
    const message = formData.get('message')

    const mailto = `mailto:johanmanoj2009@gmail.com?subject=Portfolio Contact from ${encodeURIComponent(
      String(name),
    )}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)}`

    window.location.href = mailto
    event.currentTarget.reset()
  }

  return (
    <section id="contact" className="px-6 pb-24 pt-24 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionTitle
          eyebrow="Contact"
          title="Let Us Build Something Useful"
          description="Open to collaboration, internships, student projects, and product-focused conversations."
        />

        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <TiltCard className="futuristic-card hover-glow">
            <Motion.form
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55 }}
            onSubmit={handleSubmit}
            className="glass-card space-y-5 p-6 sm:p-8"
          >
            <div>
              <label htmlFor="name" className="text-sm text-slate-600 dark:text-slate-300">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-cyan-300 dark:border-white/15 dark:bg-white/5 dark:text-white"
                placeholder="Your name"
              />
            </div>

            <div>
              <label htmlFor="email" className="text-sm text-slate-600 dark:text-slate-300">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-cyan-300 dark:border-white/15 dark:bg-white/5 dark:text-white"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label htmlFor="message" className="text-sm text-slate-600 dark:text-slate-300">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                className="mt-2 w-full resize-none rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-cyan-300 dark:border-white/15 dark:bg-white/5 dark:text-white"
                placeholder="Tell me about your idea"
              />
            </div>

            <button
              type="submit"
              className="glow-button hover-glow rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-1 dark:bg-white dark:text-slate-900"
            >
              Send Message
            </button>
          </Motion.form>
          </TiltCard>

          <TiltCard className="futuristic-card hover-glow">
            <Motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="glass-card flex flex-col justify-between p-6 sm:p-8"
          >
            <div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Connect</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                Reach out directly on email or find me on developer communities.
              </p>
            </div>

            <div className="mt-8 space-y-3">
              <a
                href="mailto:johanmanoj2009@gmail.com"
                className="glow-button hover-glow inline-flex w-full items-center justify-center gap-2 rounded-full border border-slate-300 bg-white/80 px-4 py-3 text-sm text-slate-900 transition hover:-translate-y-1 hover:bg-white dark:border-white/20 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
              >
                <FiMail /> Email Johan
              </a>
              <a
                href="https://github.com/rdp12356"
                target="_blank"
                rel="noreferrer"
                className="glow-button hover-glow inline-flex w-full items-center justify-center gap-2 rounded-full border border-slate-300 bg-white/80 px-4 py-3 text-sm text-slate-900 transition hover:-translate-y-1 hover:bg-white dark:border-white/20 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
              >
                <FiGithub /> GitHub
              </a>
              <a
                href="https://instagram.com/johanmanoj01"
                target="_blank"
                rel="noreferrer"
                className="glow-button hover-glow inline-flex w-full items-center justify-center gap-2 rounded-full border border-slate-300 bg-white/80 px-4 py-3 text-sm text-slate-900 transition hover:-translate-y-1 hover:bg-white dark:border-white/20 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
              >
                <FiInstagram /> Instagram
              </a>
            </div>
          </Motion.div>
          </TiltCard>
        </div>
      </div>
    </section>
  )
}

export default Contact

