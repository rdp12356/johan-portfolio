import { FiGithub } from 'react-icons/fi'

function Footer() {
  return (
    <footer className="border-t border-slate-300/80 px-6 py-8 dark:border-white/10 sm:px-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 text-sm text-slate-600 dark:text-slate-400 sm:flex-row">
        <p>© {new Date().getFullYear()} Johan Manoj. All rights reserved.</p>
        <div className="flex items-center gap-3">
          <a
            href="https://github.com/rdp12356"
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-slate-300 p-2 text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 dark:border-white/20 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white"
            aria-label="Johan GitHub"
          >
            <FiGithub />
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
