import { motion as Motion } from 'framer-motion'
import { blogPosts } from '../data/content'
import SectionTitle from './SectionTitle'

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

function Blog() {
  return (
    <section id="blog" className="px-6 py-24 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionTitle
          title="Latest Articles"
          subtitle="Insights into AI automation, cloud systems, and building digital income streams."
        />

        <Motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2"
        >
          {blogPosts.map((post) => (
            <Motion.div
              key={post.id}
              variants={itemVariants}
              className="group cursor-pointer overflow-hidden rounded-2xl bg-white shadow-sm transition-all hover:shadow-xl dark:bg-slate-900/50"
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="p-8">
                <span className="text-xs font-semibold uppercase tracking-wider text-cyan-500">
                  {post.date}
                </span>
                <h3 className="mt-3 text-2xl font-bold text-slate-900 transition-colors group-hover:text-cyan-500 dark:text-white">
                  {post.title}
                </h3>
                <p className="mt-4 leading-relaxed text-slate-600 dark:text-slate-400">
                  {post.excerpt}
                </p>
                <div className="mt-6 inline-flex items-center text-sm font-bold text-slate-900 dark:text-white">
                  Read More <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
                </div>
              </div>
            </Motion.div>
          ))}
        </Motion.div>
      </div>
    </section>
  )
}

export default Blog
