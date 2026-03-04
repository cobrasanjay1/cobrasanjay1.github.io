'use client';

import { motion } from 'framer-motion';
import { GraduationCap, Award, Briefcase } from 'lucide-react';

export default function Experience() {
    return (
        <section id="experience" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10 w-full max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16">
                {/* Education & Experience */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-3xl font-bold mb-8 text-white flex items-center gap-3">
                        <GraduationCap className="text-primary" /> Journeys
                    </h2>
                    <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/20 before:to-transparent">

                        <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white/20 bg-black text-secondary shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow drop-shadow-lg z-10">
                                <Briefcase className="w-4 h-4" />
                            </div>
                            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] glass-card p-6">
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2">
                                    <h3 className="font-bold text-lg text-white">ICT Academy of Kerala</h3>
                                    <span className="text-xs font-mono text-gray-400 bg-white/5 px-2 py-1 rounded">2024</span>
                                </div>
                                <p className="text-gray-400 text-sm">Monsoon internship, Flutter app development.</p>
                            </div>
                        </div>

                        <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white/20 bg-black text-primary shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow drop-shadow-lg z-10">
                                <GraduationCap className="w-4 h-4" />
                            </div>
                            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] glass-card p-6">
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2">
                                    <h3 className="font-bold text-lg text-white">BTech in CSE (Cybersecurity)</h3>
                                    <span className="text-xs font-mono text-gray-400 bg-white/5 px-2 py-1 rounded">2023 - 2027</span>
                                </div>
                                <p className="text-gray-400 text-sm">KMCT Institute Of Emerging Technology</p>
                            </div>
                        </div>

                    </div>
                </motion.div>

                {/* Certifications */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-3xl font-bold mb-8 text-white flex items-center gap-3">
                        <Award className="text-secondary" /> Certifications
                    </h2>
                    <div className="grid gap-4">
                        {[
                            { title: 'Ethical Hacker', issuer: 'Cisco' },
                            { title: 'Networking Basics', issuer: 'Cisco' },
                            { title: 'Neo4j Certified Professional', issuer: 'Neo4j' },
                            { title: 'Data Structures in C', issuer: 'Great Learning' }
                        ].map((cert, i) => (
                            <motion.div
                                key={cert.title}
                                whileHover={{ scale: 1.02 }}
                                className="glass-card p-5 flex items-center justify-between cursor-default"
                            >
                                <div>
                                    <h4 className="font-bold text-white">{cert.title}</h4>
                                    <p className="text-sm text-gray-400">{cert.issuer}</p>
                                </div>
                                <Award className="w-6 h-6 text-white/20" />
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
