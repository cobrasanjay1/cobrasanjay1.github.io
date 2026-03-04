'use client';

import { motion } from 'framer-motion';

export default function Hero() {
    return (
        <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-center z-10 glass-card p-8 md:p-12 max-w-4xl w-full"
            >
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className="text-secondary font-mono tracking-widest uppercase mb-4 text-sm font-semibold"
                >
                    Welcome to my digital space
                </motion.p>
                <motion.h1
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4, duration: 0.8, type: "spring" }}
                    className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 tracking-tighter"
                >
                    I'm <span className="text-gradient">Sanjay Vinod</span>
                </motion.h1>
                <motion.h2
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    className="text-xl md:text-2xl lg:text-3xl text-gray-300 font-medium mb-8 max-w-2xl mx-auto"
                >
                    Full Stack Developer & Security Enthusiast
                </motion.h2>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                >
                    <a
                        href="#projects"
                        className="px-8 py-4 rounded-full bg-white text-black font-bold hover:scale-105 transition-transform duration-300 w-full sm:w-auto text-center"
                    >
                        Explore My Work
                    </a>
                    <a
                        href="#contact"
                        className="px-8 py-4 rounded-full border border-gray-600 hover:border-white hover:bg-white/5 transition-all duration-300 w-full sm:w-auto text-center font-semibold"
                    >
                        Get In Touch
                    </a>
                </motion.div>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center"
            >
                <span className="text-xs text-gray-400 mb-2 uppercase tracking-widest font-mono">Scroll</span>
                <div className="w-[1px] h-16 bg-gradient-to-b from-gray-400 to-transparent animate-float" />
            </motion.div>
        </section>
    );
}
