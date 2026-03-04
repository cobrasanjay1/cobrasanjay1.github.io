'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal as TerminalIcon, X, Maximize2, Minimize2 } from 'lucide-react';

type CommandLog = {
    command: string;
    output: React.ReactNode;
};

export default function Terminal() {
    const [isOpen, setIsOpen] = useState(false);
    const [isMaximized, setIsMaximized] = useState(false);
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
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isOpen) {
            bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
            inputRef.current?.focus();
        }
    }, [logs, isOpen]);

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
        <>
            {/* Floating Button Component */}
            <motion.button
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(true)}
                className={`fixed bottom-6 right-6 z-50 flex items-center gap-2 px-5 py-3 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-white shadow-lg hover:border-primary transition-all duration-300 ${isOpen ? 'pointer-events-none opacity-0' : ''}`}
            >
                <TerminalIcon className="w-5 h-5 text-primary" />
                <span className="font-mono font-semibold text-sm">Open Terminal</span>
            </motion.button>

            {/* Terminal Modal */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 50, scale: 0.95 }}
                        transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                        className={`fixed z-50 flex flex-col font-mono text-sm overflow-hidden glass-card shadow-2xl ${isMaximized
                                ? 'inset-4 sm:inset-6 rounded-2xl'
                                : 'bottom-6 right-6 w-full max-w-[90vw] sm:max-w-lg h-[400px] rounded-xl'
                            }`}
                    >
                        {/* Header */}
                        <div className="bg-black/80 px-4 py-3 flex items-center justify-between border-b border-white/10 shrink-0 select-none">
                            <div className="flex gap-2">
                                <button onClick={() => setIsOpen(false)} className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 transition-colors flex items-center justify-center group">
                                    <X className="w-2 h-2 text-black opacity-0 group-hover:opacity-100" />
                                </button>
                                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                <button onClick={() => setIsMaximized(!isMaximized)} className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-400 transition-colors flex items-center justify-center group">
                                    {isMaximized ? (
                                        <Minimize2 className="w-2 h-2 text-black opacity-0 group-hover:opacity-100" />
                                    ) : (
                                        <Maximize2 className="w-2 h-2 text-black opacity-0 group-hover:opacity-100" />
                                    )}
                                </button>
                            </div>
                            <div className="text-gray-400 flex flex-1 justify-center items-center gap-2 text-xs font-semibold px-4 pointer-events-none truncate">
                                guest@sanjay-vinod: ~
                            </div>
                            <div className="w-12"></div>
                        </div>

                        {/* Body */}
                        <div
                            className="flex-1 bg-black/60 p-4 overflow-y-auto text-gray-300 backdrop-blur-md"
                            onClick={() => inputRef.current?.focus()}
                        >
                            {logs.map((log, i) => (
                                <div key={i} className="mb-4">
                                    {log.command && (
                                        <div className="flex gap-2 text-white">
                                            <span className="text-primary">guest@sanjay-vinod:~$</span>
                                            <span>{log.command}</span>
                                        </div>
                                    )}
                                    <div className="mt-1 whitespace-pre-wrap">{log.output}</div>
                                </div>
                            ))}
                            <div className="flex gap-2 text-white items-center">
                                <span className="text-primary shrink-0">guest@sanjay-vinod:~$</span>
                                <input
                                    ref={inputRef}
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
                )}
            </AnimatePresence>
        </>
    );
}
