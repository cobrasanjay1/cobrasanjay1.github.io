'use client';

import { motion } from 'framer-motion';
import { Mail, MapPin, Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';

// ─── FILL THESE IN AFTER CREATING YOUR EMAILJS ACCOUNT ───────────────────────
const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID';
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID';
const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY';
// ─────────────────────────────────────────────────────────────────────────────

export default function Contact() {
    const formRef = useRef<HTMLFormElement>(null);
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formRef.current) return;
        setStatus('loading');

        try {
            await emailjs.sendForm(
                EMAILJS_SERVICE_ID,
                EMAILJS_TEMPLATE_ID,
                formRef.current,
                EMAILJS_PUBLIC_KEY
            );
            setStatus('success');
            formRef.current.reset();
        } catch (err) {
            console.error('EmailJS error:', err);
            setStatus('error');
        }
    };

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

                    <form ref={formRef} onSubmit={handleSubmit} className="md:col-span-3 glass-card p-8 space-y-4">
                        <div className="grid sm:grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-gray-300">Name</label>
                                <input
                                    type="text"
                                    name="from_name"
                                    required
                                    className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
                                    placeholder="John Doe"
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-gray-300">Email</label>
                                <input
                                    type="email"
                                    name="reply_to"
                                    required
                                    className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
                                    placeholder="john@example.com"
                                />
                            </div>
                        </div>
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-300">Message</label>
                            <textarea
                                rows={4}
                                name="message"
                                required
                                className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors resize-none"
                                placeholder="How can I help you?"
                            />
                        </div>

                        {status === 'success' && (
                            <div className="flex items-center gap-2 text-emerald-400 text-sm font-medium">
                                <CheckCircle2 className="w-4 h-4" /> Message sent! I'll get back to you soon.
                            </div>
                        )}
                        {status === 'error' && (
                            <div className="flex items-center gap-2 text-red-400 text-sm font-medium">
                                <AlertCircle className="w-4 h-4" /> Something went wrong. Please try again.
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={status === 'loading'}
                            className="w-full py-4 rounded-lg bg-white text-black font-bold flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors disabled:opacity-60"
                        >
                            {status === 'loading'
                                ? <><Loader2 className="w-5 h-5 animate-spin" /> Sending...</>
                                : <><Send className="w-5 h-5" /> Send Message</>
                            }
                        </button>
                    </form>
                </div>
            </motion.div>
        </section>
    );
}
