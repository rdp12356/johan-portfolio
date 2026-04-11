# Johan Manoj Portfolio

Modern personal portfolio website built with React 19, Tailwind CSS, and Framer Motion.

## Stack

- React 19 + Vite
- Tailwind CSS
- Framer Motion
- React Icons
- Optional Supabase dynamic content integration

## Features

- Premium glassmorphism UI with soft gradients
- Fully responsive mobile-first layout
- Dark mode enabled by default with theme toggle
- Sticky blur navbar with active section highlight
- Animated hero, cards, scroll reveals, and timeline
- Contact form with email CTA
- SEO and social meta tags configured in HTML
- Optional Supabase-driven project content

## Local Development

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
npm run preview
```

## Optional Supabase Setup

If you want project cards to be loaded dynamically, add these env vars:

```bash
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Create a `projects` table with these columns:

- `id` (text or uuid)
- `title` (text)
- `description` (text)
- `image` (text)
- `live_url` (text)
- `github_url` (text)
- `created_at` (timestamp)

If env variables or data are missing, the app automatically falls back to static project data.

## GitHub Auto-Sync Projects

The Projects section can auto-load repositories from your GitHub profile.

Frontend environment variable (optional):

```bash
VITE_GITHUB_USERNAME=rdp12356
```

Vercel serverless API environment variables (recommended for higher rate limits):

```bash
GITHUB_USERNAME=rdp12356
GITHUB_TOKEN=your_github_personal_access_token
```

Behavior order:

1. Tries `/api/github-projects` (best for Vercel with token)
2. Falls back to direct GitHub API fetch in browser
3. Falls back to Supabase projects
4. Falls back to static `defaultProjects`

Live Demo button appears only for repos that have a `homepage` URL.

## Deploy on Vercel

1. Push this project to a GitHub repository.
2. Go to Vercel and click New Project.
3. Import the repository.
4. Framework preset: `Vite`.
5. Build command: `npm run build`.
6. Output directory: `dist`.
7. Add environment variables (if using Supabase).
8. Deploy.

For future changes, push to the main branch and Vercel will auto-deploy.
