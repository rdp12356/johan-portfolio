import { useState, useEffect } from 'react';

const GITHUB_USERNAME = 'rdp12356';

export function useGitHub() {
  const [data, setData] = useState({
    projects: [],
    activity: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const [reposRes, eventsRes] = await Promise.all([
          fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=30`),
          fetch(`https://api.github.com/users/${GITHUB_USERNAME}/events/public?per_page=30`)
        ]);

        const allRepos = await reposRes.json();
        const allEvents = await eventsRes.json();

        if (!Array.isArray(allRepos) || !Array.isArray(allEvents)) {
          const msg = (allRepos && allRepos.message) || (allEvents && allEvents.message) || 'GitHub API error';
          throw new Error(msg);
        }

        // 1. Filter Repos: Remove anything containing 'portfolio' or 'johan-portfolio'
        const filteredRepos = allRepos.filter(repo => {
          if (!repo || repo.fork) return false;
          const name = repo.name.toLowerCase();
          return !name.includes('portfolio') && name !== 'rdp12356';
        });

        // 2. Process Projects (Orbit)
        const processedProjects = filteredRepos.slice(0, 8).map(repo => {
          const targetUrl = repo.homepage || repo.html_url;
          // Using a faster and more reliable screenshot service
          const screenshot = `https://image.thum.io/get/width/600/crop/800/noanimate/${targetUrl}`;
          
          return {
            id: repo.id,
            title: repo.name.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
            problem: repo.description || 'Live development project and software solution.',
            solution: `Built with ${repo.language || 'Modern Stack'}`,
            result: `Stars: ${repo.stargazers_count || 0} | Last Updated: ${new Date(repo.updated_at).toLocaleDateString()}`,
            tech: [repo.language || 'Code'],
            image: screenshot,
            liveUrl: targetUrl,
            githubUrl: repo.html_url,
          };
        });

        // 3. Process Activity (Commits across multiple repos)
        // We'll use the public events but extract individual commits more reliably
        const commitList = [];
        const seenCommits = new Set();

        allEvents.forEach(event => {
          if (event.type === 'PushEvent' && event.payload?.commits) {
            const repoName = event.repo.name.split('/')[1] || event.repo.name;
            // Only add if not a portfolio repo
            if (!repoName.toLowerCase().includes('portfolio')) {
              event.payload.commits.forEach(commit => {
                if (commitList.length < 5 && !seenCommits.has(commit.sha)) {
                  seenCommits.add(commit.sha);
                  commitList.push({
                    id: commit.sha,
                    repo: repoName,
                    message: commit.message,
                    date: new Date(event.created_at).toLocaleDateString(),
                  });
                }
              });
            }
          }
        });

        setData({
          projects: processedProjects,
          activity: {
            recentCommits: commitList,
            stats: {
              repositories: allRepos.length,
              currentProject: (filteredRepos[0]?.name) || (allRepos[0]?.name) || 'Portfolio',
            }
          },
          loading: false,
          error: null,
        });

      } catch (err) {
        console.error('GitHub Data Hook Error:', err);
        setData(prev => ({ ...prev, loading: false, error: err.message }));
      }
    }

    fetchData();
  }, []);

  return data;
}
