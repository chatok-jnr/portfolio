import React, { useEffect, useState } from 'react';

/**
 * StatsSection
 * Props:
 * - githubUser: string (GitHub username)
 * - codeforcesUser: string (Codeforces handle)
 */
export default function StatsSection({ githubUser, codeforcesUser }) {
  const [github, setGithub] = useState({ loading: true, error: null, data: null });
  const [cf, setCf] = useState({ loading: true, error: null, data: null });

  useEffect(() => {
    let alive = true;

    async function fetchGitHub(user) {
      if (!user) {
        setGithub({ loading: false, error: 'No GitHub user provided', data: null });
        return;
      }
      try {
        const res = await fetch(`https://api.github.com/users/${encodeURIComponent(user)}`);
        if (!res.ok) throw new Error(`GitHub: ${res.status}`);
        const json = await res.json();
        if (alive) setGithub({ loading: false, error: null, data: json });
      } catch (e) {
        if (alive) setGithub({ loading: false, error: e.message || 'Failed to fetch', data: null });
      }
    }

    async function fetchCF(handle) {
      if (!handle) {
        setCf({ loading: false, error: 'No Codeforces handle provided', data: null });
        return;
      }
      try {
        const res = await fetch(`https://codeforces.com/api/user.info?handles=${encodeURIComponent(handle)}`);
        if (!res.ok) throw new Error(`Codeforces: ${res.status}`);
        const json = await res.json();
        if (json.status !== 'OK') throw new Error('Codeforces API error');
        const data = json.result && json.result[0];
        if (alive) setCf({ loading: false, error: null, data });
      } catch (e) {
        if (alive) setCf({ loading: false, error: e.message || 'Failed to fetch', data: null });
      }
    }

    fetchGitHub(githubUser);
    fetchCF(codeforcesUser);

    return () => { alive = false; };
  }, [githubUser, codeforcesUser]);

  return (
    <section id="stats" className="px-4 sm:px-6 py-16 sm:py-20">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-5xl font-bold text-emerald-400 mb-8 sm:mb-12 text-center">
          Live Developer Stats
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {/* GitHub card */}
          <div className="glass glow p-6">
            <h3 className="text-xl font-semibold text-emerald-400 mb-4">GitHub</h3>
            {github.loading && <p className="text-gray-400">Loading stats…</p>}
            {!github.loading && github.error && (
              <p className="text-red-400">Unable to fetch data: {github.error}</p>
            )}
            {!github.loading && !github.error && github.data && (
              <div className="grid grid-cols-2 gap-4 text-center">
                <Stat label="Public Repos" value={github.data.public_repos} />
                <Stat label="Followers" value={github.data.followers} />
                <Stat label="Following" value={github.data.following} />
                <a
                  href={github.data.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-glass mt-2 text-emerald-300 border border-emerald-500/30 inline-block"
                >
                  View Profile
                </a>
              </div>
            )}
          </div>

          {/* Codeforces card */}
          <div className="glass glow p-6">
            <h3 className="text-xl font-semibold text-emerald-400 mb-4">Codeforces</h3>
            {cf.loading && <p className="text-gray-400">Loading stats…</p>}
            {!cf.loading && cf.error && (
              <p className="text-red-400">Unable to fetch data: {cf.error}</p>
            )}
            {!cf.loading && !cf.error && cf.data && (
              <div className="grid grid-cols-2 gap-4 text-center">
                <Stat label="Rating" value={cf.data.rating ?? '—'} />
                <Stat label="Max Rating" value={cf.data.maxRating ?? '—'} />
                <Stat label="Rank" value={cf.data.rank ?? '—'} />
                <a
                  href={`https://codeforces.com/profile/${cf.data.handle}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-glass mt-2 text-emerald-300 border border-emerald-500/30 inline-block"
                >
                  View Profile
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ label, value }) {
  return (
    <div className="glass p-4">
      <div className="text-2xl font-bold text-white">{value}</div>
      <div className="text-xs uppercase tracking-wide text-emerald-300/80 mt-1">{label}</div>
    </div>
  );
}
