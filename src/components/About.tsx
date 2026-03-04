'use client';

import { motion } from 'framer-motion';
import {
    Code2, Terminal, Database, Smartphone,
    Palette, ShieldAlert, Cpu
} from 'lucide-react';

const skills = [
    { name: 'Full-Stack Dev', icon: Code2 },
    { name: 'Ethical Hacking', icon: ShieldAlert },
    { name: 'Linux & OS', icon: Terminal },
    { name: 'Databases', icon: Database },
    { name: 'Mobile (Flutter)', icon: Smartphone },
    { name: 'AI & Vision', icon: Cpu },
    { name: 'Design (Ps/Ae)', icon: Palette },
];

export default function About() {
    return (
        <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10 w-full max-w-6xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="glass-card p-10 md:p-16"
            >
                <h2 className="text-4xl md:text-5xl font-bold mb-8 text-gradient inline-block">About Me</h2>
                <div className="grid md:grid-cols-2 gap-12">
                    <div className="space-y-6 text-lg text-gray-300 leading-relaxed">
                        <p>
                            I am a <strong className="text-white">Full Stack Web Developer</strong> with a strong foundation in ethical hacking and cybersecurity. My passion lies in creating secure, functional, and visually engaging digital solutions across web and mobile platforms.
                        </p>
                        <p>
                            Beyond coding, I have a deep interest in digital art, working extensively with Photoshop and After Effects to bring creative concepts to life.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-2xl font-semibold mb-6 text-white">Core Competencies</h3>
                        <div className="flex flex-wrap gap-4">
                            {skills.map((skill, index) => {
                                const Icon = skill.icon;
                                return (
                                    <motion.div
                                        key={skill.name}
                                        whileHover={{ scale: 1.05 }}
                                        className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-5 py-3 hover:bg-white/10 transition-colors cursor-default"
                                    >
                                        <Icon className="w-5 h-5 text-secondary" />
                                        <span className="text-sm font-medium">{skill.name}</span>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
