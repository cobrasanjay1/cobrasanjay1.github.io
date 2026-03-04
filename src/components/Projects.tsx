'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';

const projects = [
    {
        title: 'Automated CCTV Monitoring',
        description: 'An AI-driven surveillance solution designed to automatically analyze real-time CCTV video streams and detect suspicious activities using computer vision techniques.',
        tags: ['Yolo AI', 'Python', 'Computer Vision'],
        link: '#',
    },
    {
        title: 'Electricity Billing System',
        description: 'A GUI application for managing billing operations. Users can register, add customers, process payments, and analyze consumption graphs.',
        tags: ['React', 'Node.js', 'MySQL', 'Full-Stack'],
        link: '#',
    },
    {
        title: 'BMI Calculator',
        description: 'A simple, intuitive Dart-based mobile application for calculating Body Mass Index seamlessly with a clean UI.',
        tags: ['Flutter', 'Dart', 'Android'],
        link: '#',
    }
];

export default function Projects() {
    return (
        <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10 w-full max-w-6xl mx-auto">
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <h2 className="text-4xl md:text-5xl font-bold mb-12 text-gradient inline-block">Featured Projects</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2, duration: 0.6 }}
                            className="glass-card p-8 flex flex-col h-full group"
                        >
                            <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-primary transition-colors">{project.title}</h3>
                            <p className="text-gray-400 mb-6 flex-grow">{project.description}</p>
                            <div className="flex flex-wrap gap-2 mb-6">
                                {project.tags.map(tag => (
                                    <span key={tag} className="text-xs font-mono bg-white/5 px-2 py-1 rounded text-secondary border border-white/5">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                            <div className="flex items-center gap-4 mt-auto">
                                <a href={project.link} className="flex items-center gap-2 text-sm font-semibold text-white hover:text-primary transition-colors">
                                    <Github className="w-4 h-4" /> Code
                                </a>
                                <a href={project.link} className="flex items-center gap-2 text-sm font-semibold text-white hover:text-secondary transition-colors">
                                    <ExternalLink className="w-4 h-4" /> Live Demo
                                </a>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
}
