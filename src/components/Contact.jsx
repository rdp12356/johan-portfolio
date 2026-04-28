import { motion as Motion } from 'framer-motion'
import { personalInfo } from '../data/content'
import { FiGithub, FiInstagram, FiLinkedin, FiMail, FiSend } from 'react-icons/fi'
import SectionTitle from './SectionTitle'

function Contact() {
  return (
    <section id="contact" className="px-6 py-24 sm:px-8 bg-white dark:bg-black relative transition-colors">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_bottom_center,rgba(6,182,212,0.1),transparent_70%)] dark:bg-[radial-gradient(circle_at_bottom_center,rgba(6,182,212,0.05),transparent_70%)]" />
      
      <div className="mx-auto max-w-6xl">
        <SectionTitle
          title="Connect"
          subtitle="If you want to build something cool or automate something, feel free to reach out 🙂"
        />

        <div className="mt-20 grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Social Links */}
          <Motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col justify-center"
          >
            <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter">Let’s chat.</h3>
            <p className="mt-4 text-slate-500 dark:text-slate-400 max-w-md leading-relaxed">
              Whether you have a question about automation, a project idea, or just want to say hi, my inbox is always open.
            </p>

            <div className="mt-12 space-y-6">
              <a href={`mailto:${personalInfo.email}`} className="group flex items-center gap-6">
                <div className="h-14 w-14 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-400 group-hover:border-cyan-500/50 group-hover:text-cyan-500 transition-all">
                  <FiMail size={24} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Email Me</p>
                  <p className="text-lg font-black text-slate-900 dark:text-white group-hover:text-cyan-500 transition-colors">{personalInfo.email}</p>
                </div>
              </a>

              <div className="flex gap-4 mt-8">
                {[
                  { icon: FiGithub, url: personalInfo.github, label: 'GitHub' },
                  { icon: FiLinkedin, url: personalInfo.linkedin, label: 'LinkedIn' },
                  { icon: FiInstagram, url: personalInfo.instagram, label: 'Instagram' },
                ].map((social, i) => (
                  <a 
                    key={i} 
                    href={social.url} 
                    target="_blank" 
                    className="h-12 w-12 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-500 hover:border-cyan-500/50 hover:text-cyan-500 transition-all"
                    title={social.label}
                  >
                    <social.icon size={20} />
                  </a>
                ))}
              </div>
            </div>
          </Motion.div>

          {/* Contact Form */}
          <Motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative rounded-[2.5rem] border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 p-10 backdrop-blur-xl"
          >
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Name</label>
                  <input
                    type="text"
                    required
                    className="mt-2 w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-black/50 px-5 py-4 outline-none focus:border-cyan-500/50 transition-colors text-slate-900 dark:text-white"
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Email</label>
                  <input
                    type="email"
                    required
                    className="mt-2 w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-black/50 px-5 py-4 outline-none focus:border-cyan-500/50 transition-colors text-slate-900 dark:text-white"
                    placeholder="Enter your email"
                  />
                </div>
              </div>
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Message</label>
                <textarea
                  rows={4}
                  required
                  className="mt-2 w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-black/50 px-5 py-4 outline-none focus:border-cyan-500/50 transition-colors text-slate-900 dark:text-white"
                  placeholder="Tell me about your cool project..."
                />
              </div>
              <button
                type="submit"
                className="group flex w-full items-center justify-center gap-3 rounded-2xl bg-slate-950 dark:bg-white py-4 text-sm font-black text-white dark:text-slate-950 transition-transform hover:scale-[1.02] active:scale-[0.98]"
              >
                SEND MESSAGE <FiSend className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </button>
            </form>
          </Motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact
