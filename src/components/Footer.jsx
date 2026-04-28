import { FiGithub, FiInstagram, FiMail, FiLinkedin } from 'react-icons/fi'

function Footer() {
  return (
    <footer className="border-t border-slate-100 px-6 py-12 dark:border-slate-800 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          <div>
            <a href="#home" className="text-xl font-black tracking-tighter text-slate-900 dark:text-white">
              JOHAN<span className="text-cyan-500">.</span>
            </a>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Building cool things since 2020.
            </p>
          </div>

          <div className="flex gap-6">
            <a href="https://github.com/rdp12356" target="_blank" rel="noreferrer" className="text-2xl text-slate-400 transition hover:text-slate-900 dark:hover:text-white" aria-label="GitHub">
              <FiGithub />
            </a>
            <a href="https://www.linkedin.com/in/johanmanoj2009" target="_blank" rel="noreferrer" className="text-2xl text-slate-400 transition hover:text-slate-900 dark:hover:text-white" aria-label="LinkedIn">
              <FiLinkedin />
            </a>
            <a href="https://instagram.com/johanmanoj01" target="_blank" rel="noreferrer" className="text-2xl text-slate-400 transition hover:text-slate-900 dark:hover:text-white" aria-label="Instagram">
              <FiInstagram />
            </a>
            <a href="mailto:johanmanoj2009@gmail.com" className="text-2xl text-slate-400 transition hover:text-slate-900 dark:hover:text-white" aria-label="Email">
              <FiMail />
            </a>
          </div>

          <p className="text-sm text-slate-500 dark:text-slate-400">
            © {new Date().getFullYear()} Johan Manoj. Built with React & ☕
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
