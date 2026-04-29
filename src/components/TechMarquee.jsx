import { motion as Motion } from 'framer-motion'
import { 
  SiReact, SiTailwindcss, SiPython, SiN8N, 
  SiSupabase, SiDocker, SiVercel, SiGithub,
  SiJavascript, SiPostgresql, SiOpenai, SiTypescript
} from 'react-icons/si'

const technologies = [
  { icon: SiReact, name: 'React' },
  { icon: SiTailwindcss, name: 'Tailwind' },
  { icon: SiPython, name: 'Python' },
  { icon: SiN8N, name: 'n8n' },
  { icon: SiSupabase, name: 'Supabase' },
  { icon: SiDocker, name: 'Docker' },
  { icon: SiVercel, name: 'Vercel' },
  { icon: SiGithub, name: 'GitHub' },
  { icon: SiJavascript, name: 'JavaScript' },
  { icon: SiTypescript, name: 'TypeScript' },
  { icon: SiPostgresql, name: 'PostgreSQL' },
  { icon: SiOpenai, name: 'AI/ML' },
]

function TechMarquee() {
  return (
    <div className="relative flex overflow-x-hidden py-12">
      <div className="flex animate-marquee whitespace-nowrap">
        {[...technologies, ...technologies].map((tech, index) => (
          <div key={index} className="mx-8 flex items-center gap-3">
            <tech.icon className="text-3xl text-slate-400/50 transition-colors hover:text-cyan-500" />
            <span className="text-lg font-black uppercase tracking-widest text-slate-400/30">
              {tech.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TechMarquee
