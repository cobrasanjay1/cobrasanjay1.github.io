'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Github, Star, GitFork, Loader2 } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

interface Repo {
    id: number;
    name: string;
    description: string | null;
    html_url: string;
    homepage: string | null;
    stargazers_count: number;
    forks_count: number;
    topics: string[];
    language: string | null;
    fork: boolean;
}

const LANG_COLORS: Record<string, string> = {
    TypeScript: '#3178c6',
    JavaScript: '#f7df1e',
    Python: '#3776ab',
    Dart: '#0175c2',
    HTML: '#e34f26',
    CSS: '#563d7c',
    Java: '#b07219',
    C: '#555555',
};

export default function Projects() {
    const [repos, setRepos] = useState<Repo[]>([]);
    const [loading, setLoading] = useState(true);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        fetch('https://api.github.com/users/cobrasanjay1/repos?sort=updated&per_page=20')
            .then(res => res.json())
            .then((data: Repo[]) => {
                // Filter out forked repos and the portfolio itself
                const filtered = data.filter(r => !r.fork && r.name !== 'cobrasanjay1.github.io');
                setRepos(filtered);
            })
            .catch(() => setRepos([]))
            .finally(() => setLoading(false));
    }, []);

    const scroll = (dir: 'left' | 'right') => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: dir === 'right' ? 360 : -360, behavior: 'smooth' });
        }
    };

    return (
        <section id="projects" className="py-24 relative z-10 w-full">
            <div className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto mb-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="flex items-end justify-between"
                >
                    <div>
                        <h2 className="text-4xl md:text-5xl font-bold text-gradient inline-block">Featured Projects</h2>
                        <p className="text-gray-400 mt-2 text-sm">Auto-synced from GitHub</p>
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={() => scroll('left')}
                            className="w-10 h-10 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 flex items-center justify-center text-white transition-colors"
                            aria-label="Scroll left"
                        >
                            ‹
                        </button>
                        <button
                            onClick={() => scroll('right')}
                            className="w-10 h-10 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 flex items-center justify-center text-white transition-colors"
                            aria-label="Scroll right"
                        >
                            ›
                        </button>
                    </div>
                </motion.div>
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-48">
                    <Loader2 className="w-8 h-8 text-primary animate-spin" />
                </div>
            ) : repos.length === 0 ? (
                <div className="text-center text-gray-500 h-48 flex items-center justify-center">No public repositories found.</div>
            ) : (
                <div
                    ref={scrollRef}
                    className="flex gap-6 overflow-x-auto pb-6 px-4 sm:px-6 lg:px-8 snap-x snap-mandatory scroll-smooth"
                    style={{ scrollbarWidth: 'none' }}
                >
                    {repos.map((repo, index) => (
                        <motion.div
                            key={repo.id}
                            initial={{ opacity: 0, x: 40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05, duration: 0.5 }}
                            className="glass-card p-6 flex flex-col shrink-0 w-72 snap-start group"
                        >
                            {/* Title */}
                            <h3 className="text-lg font-bold text-white mb-2 group-hover:text-primary transition-colors truncate">
                                {repo.name.replace(/-/g, ' ').replace(/_/g, ' ')}
                            </h3>

                            {/* Description */}
                            <p className="text-gray-400 text-sm mb-4 flex-grow line-clamp-3">
                                {repo.description || 'No description provided.'}
                            </p>

                            {/* Topics / Tags */}
                            {repo.topics.length > 0 && (
                                <div className="flex flex-wrap gap-1 mb-4">
                                    {repo.topics.slice(0, 4).map(topic => (
                                        <span key={topic} className="text-xs font-mono bg-white/5 px-2 py-0.5 rounded text-secondary border border-white/5">
                                            {topic}
                                        </span>
                                    ))}
                                </div>
                            )}

                            {/* Stats + Language */}
                            <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                                <div className="flex items-center gap-3">
                                    <span className="flex items-center gap-1">
                                        <Star className="w-3 h-3" /> {repo.stargazers_count}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <GitFork className="w-3 h-3" /> {repo.forks_count}
                                    </span>
                                </div>
                                {repo.language && (
                                    <span className="flex items-center gap-1">
                                        <span
                                            className="inline-block w-2.5 h-2.5 rounded-full"
                                            style={{ backgroundColor: LANG_COLORS[repo.language] || '#888' }}
                                        />
                                        {repo.language}
                                    </span>
                                )}
                            </div>

                            {/* Links */}
                            <div className="flex items-center gap-4 mt-auto pt-2 border-t border-white/5">
                                <a href={repo.html_url} target="_blank" rel="noopener noreferrer"
                                    className="flex items-center gap-1.5 text-sm font-semibold text-white hover:text-primary transition-colors">
                                    <Github className="w-4 h-4" /> Code
                                </a>
                                {repo.homepage && (
                                    <a href={repo.homepage} target="_blank" rel="noopener noreferrer"
                                        className="flex items-center gap-1.5 text-sm font-semibold text-white hover:text-secondary transition-colors">
                                        <ExternalLink className="w-4 h-4" /> Live
                                    </a>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </section>
    );
}

