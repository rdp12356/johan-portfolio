const fallbackImages = [
  'https://images.unsplash.com/photo-1529078155058-5d716f45d604?auto=format&fit=crop&w=1400&q=80',
  'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1400&q=80',
  'https://images.unsplash.com/photo-1510511459019-5dda7724fd87?auto=format&fit=crop&w=1400&q=80',
  'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1400&q=80',
  'https://images.unsplash.com/photo-1518773553398-650c184e0bb3?auto=format&fit=crop&w=1400&q=80',
  'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1400&q=80',
]

function normalizeRepo(repo, index) {
  const liveUrl = repo.homepage || ''
  let image = fallbackImages[index % fallbackImages.length]

  if (liveUrl) {
    image = `https://api.microlink.io?url=${encodeURIComponent(liveUrl)}&screenshot=true&meta=false&embed=screenshot.url`
  }

  return {
    id: repo.name.toLowerCase().replace(/[^a-z0-9-]/g, '-'),
    title: repo.name,
    description: repo.description || 'Project repository by Johan Manoj.',
    image,
    liveUrl,
    githubUrl: repo.html_url,
    updatedAt: repo.updated_at,
    stars: repo.stargazers_count || 0,
  }
}

export default async function handler(req, res) {
  const env = globalThis.process?.env || {}
  const username = (req.query.username || env.GITHUB_USERNAME || 'rdp12356').trim()
  const limit = Number(req.query.limit || 6)
  const selectedRepos = req.query.repos ? req.query.repos.split(',').map(s => s.trim().toLowerCase()) : []
  const token = env.GITHUB_TOKEN

  if (!username) {
    return res.status(400).json({ error: 'Missing GitHub username.' })
  }

  const headers = {
    'User-Agent': 'johan-portfolio',
    Accept: 'application/vnd.github+json',
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  try {
    const response = await fetch(
      `https://api.github.com/users/${encodeURIComponent(username)}/repos?sort=updated&per_page=100`,
      { headers },
    )

    if (!response.ok) {
      const errorBody = await response.text()
      return res.status(response.status).json({
        error: 'Failed to fetch repositories from GitHub.',
        details: errorBody,
      })
    }

    const repos = await response.json()
    const filtered = repos
      .filter((repo) => {
        const isSelected = selectedRepos.includes(repo.name.toLowerCase())
        if (selectedRepos.length > 0) {
          return isSelected
        }
        return !repo.fork && typeof repo.homepage === 'string' && repo.homepage.trim().length > 0
      })
      .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
      .slice(0, Math.max(1, Math.min(limit, 20)))
      .map(normalizeRepo)

    return res.status(200).json({ projects: filtered })
  } catch (error) {
    return res.status(500).json({
      error: 'Unexpected error while fetching GitHub repositories.',
      details: error instanceof Error ? error.message : String(error),
    })
  }
}
