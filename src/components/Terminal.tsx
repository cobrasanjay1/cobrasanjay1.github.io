'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal as TerminalIcon } from 'lucide-react';

type CommandLog = {
    command: string;
    output: React.ReactNode;
};

export default function Terminal() {
    const [input, setInput] = useState('');
    const [logs, setLogs] = useState<CommandLog[]>([
        {
            command: '',
            output: (
                <span>
                    Welcome to Sanjay Vinod's interactive terminal.
                    <br /> Type <span className="text-secondary">help</span> to see available commands.
                </span>
            ),
        },
    ]);
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [logs]);

    const handleCommand = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            const trimmed = input.trim().toLowerCase();
            let output: React.ReactNode = '';

            if (trimmed === 'help') {
                output = (
                    <ul className="list-disc list-inside text-gray-400 mt-1">
                        <li><strong className="text-white">whoami</strong> - Get to know me</li>
                        <li><strong className="text-white">skills</strong> - List my core skills</li>
                        <li><strong className="text-white">projects</strong> - My top achievements</li>
                        <li><strong className="text-white">clear</strong> - Clear the terminal</li>
                    </ul>
                );
            } else if (trimmed === 'whoami') {
                output = 'I am Sanjay Vinod, a Full Stack Developer & Cybersecurity enthusiast from Kerala.';
            } else if (trimmed === 'skills') {
                output = 'React, Next.js, Flutter, Python, Node.js, Typescript, Tailwind CSS, MySQL, Ethical Hacking.';
            } else if (trimmed === 'projects') {
                output = '1. Automated CCTV Monitoring\n2. Electricity Billing System\n3. BMI Calculator';
            } else if (trimmed === 'clear') {
                setLogs([]);
                setInput('');
                return;
            } else if (trimmed !== '') {
                output = `Command not found: ${trimmed}. Type 'help' for a list of commands.`;
            }

            if (trimmed !== '') {
                setLogs((prev) => [...prev, { command: trimmed, output }]);
            }
            setInput('');
        }
    };

    return (
        <section id="terminal" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10 w-full max-w-4xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="glass-card overflow-hidden rounded-xl border border-white/10 flex flex-col h-[400px] font-mono text-sm"
            >
                {/* Terminal Header */}
                <div className="bg-black/60 px-4 py-3 flex items-center justify-between border-b border-white/10">
                    <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className="text-gray-400 flex items-center gap-2 text-xs font-semibold">
                        <TerminalIcon className="w-4 h-4" /> guest@sanjay-vinod: ~
                    </div>
                    <div className="w-12"></div>
                </div>

                {/* Terminal Body */}
                <div className="flex-1 bg-black/40 p-4 overflow-y-auto text-gray-300">
                    {logs.map((log, i) => (
                        <div key={i} className="mb-4">
                            {log.command && (
                                <div className="flex gap-2 text-white">
                                    <span className="text-green-400">guest@sanjay-vinod:~$</span>
                                    <span>{log.command}</span>
                                </div>
                            )}
                            <div className="mt-1 whitespace-pre-wrap">{log.output}</div>
                        </div>
                    ))}
                    <div className="flex gap-2 text-white items-center">
                        <span className="text-green-400 shrink-0">guest@sanjay-vinod:~$</span>
                        <input
                            type="text"
                            className="bg-transparent border-none outline-none flex-1 font-mono text-white caret-primary"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleCommand}
                            autoFocus
                            spellCheck={false}
                            autoComplete="off"
                        />
                    </div>
                    <div ref={bottomRef} className="h-4" />
                </div>
            </motion.div>
        </section>
    );
}
