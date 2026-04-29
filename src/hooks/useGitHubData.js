import { useState, useEffect } from 'react'

export function useGitHubData(username) {
  const [data, setData] = useState({
    repos: [],
    languages: {},
    topics: [],
    loading: true,
    error: null
  })

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`)
        if (!response.ok) throw new Error('Failed to fetch repos')
        
        const repos = await response.json()
        
        // Aggregate languages
        const langMap = {}
        const topicSet = new Set()
        
        repos.forEach(repo => {
          if (repo.language) {
            langMap[repo.language] = (langMap[repo.language] || 0) + 1
          }
          if (repo.topics) {
            repo.topics.forEach(topic => topicSet.add(topic))
          }
        })

        // Sort languages by count
        const sortedLangs = Object.entries(langMap)
          .sort(([, a], [, b]) => b - a)
          .reduce((obj, [key, val]) => ({ ...obj, [key]: val }), {})

        // Sort topics by frequency
        const topicFreq = {}
        repos.forEach(repo => {
          if (repo.topics) {
            repo.topics.forEach(t => topicFreq[t] = (topicFreq[t] || 0) + 1)
          }
        })
        const sortedTopics = Object.entries(topicFreq)
          .sort(([, a], [, b]) => b - a)
          .map(([t]) => t)

        setData({
          repos: repos.sort((a, b) => b.stargazers_count - a.stargazers_count),
          languages: sortedLangs,
          topics: sortedTopics,
          topTopic: sortedTopics[0] || 'Automation',
          loading: false,
          error: null
        })
      } catch (err) {
        setData(prev => ({ ...prev, loading: false, error: err.message }))
      }
    }

    if (username) fetchData()
  }, [username])

  return data
}
