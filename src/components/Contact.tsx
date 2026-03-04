'use client';

import { motion } from 'framer-motion';
import { Mail, MapPin, Send } from 'lucide-react';

export default function Contact() {
    return (
        <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10 w-full max-w-4xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient inline-block">Get In Touch</h2>
                    <p className="text-gray-400 text-lg">Looking forward to collaborating or just an interesting chat.</p>
                </div>

                <div className="grid md:grid-cols-5 gap-8">
                    <div className="md:col-span-2 space-y-6">
                        <div className="glass-card p-6 flex flex-col items-center text-center">
                            <Mail className="w-8 h-8 text-primary mb-4" />
                            <h4 className="font-bold text-white text-lg mb-1">Email</h4>
                            <p className="text-sm text-gray-400">sanjay.vinod25@gmail.com</p>
                        </div>
                        <div className="glass-card p-6 flex flex-col items-center text-center">
                            <MapPin className="w-8 h-8 text-secondary mb-4" />
                            <h4 className="font-bold text-white text-lg mb-1">Location</h4>
                            <p className="text-sm text-gray-400">Calicut, Kerala</p>
                        </div>
                    </div>

                    <form className="md:col-span-3 glass-card p-8 space-y-4">
                        <div className="grid sm:grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-gray-300">Name</label>
                                <input
                                    type="text"
                                    className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
                                    placeholder="John Doe"
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-gray-300">Email</label>
                                <input
                                    type="email"
                                    className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
                                    placeholder="john@example.com"
                                />
                            </div>
                        </div>
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-300">Message</label>
                            <textarea
                                rows={4}
                                className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors resize-none"
                                placeholder="How can I help you?"
                            />
                        </div>
                        <button
                            type="button"
                            className="w-full py-4 rounded-lg bg-white text-black font-bold flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors"
                        >
                            <Send className="w-5 h-5" /> Send Message
                        </button>
                    </form>
                </div>
            </motion.div>
        </section>
    );
}
