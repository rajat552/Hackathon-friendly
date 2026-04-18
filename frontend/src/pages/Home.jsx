import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Brain, Zap, Shield, ChevronRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen pt-32 pb-20 px-4 transition-colors duration-300">
            {/* Background Orbs */}
            <div className="fixed top-1/4 -left-20 w-80 h-80 bg-primary/20 rounded-full blur-[120px] -z-10 animate-pulse" />
            <div className="fixed bottom-1/4 -right-20 w-80 h-80 bg-secondary/10 rounded-full blur-[120px] -z-10 animate-pulse" />

            <div className="max-w-6xl mx-auto">
                <header className="text-center mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card-bg border border-border-subtle mb-8 shadow-sm"
                    >
                        <Sparkles size={16} className="text-secondary" />
                        <span className="text-xs font-bold tracking-widest text-text-muted uppercase">AI Hackfest 2026 · MLH</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-7xl font-black mb-8 leading-tight text-text-main"
                    >
                        Think smarter with <br />
                        <span className="gradient-text tracking-tighter">AI-powered agents</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-text-muted max-w-2xl mx-auto mb-12 leading-relaxed"
                    >
                        ThinkAI is an intelligent copilot that thinks and makes decisions better than traditional tools.
                        Powered by Google Gemini, it understands your documents, follows your voice, and automates
                        multi-step workflows — so you can focus on what matters.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center"
                    >
                        <button
                            onClick={() => navigate('/dashboard')}
                            className="px-10 py-5 bg-primary text-white rounded-2xl font-black text-lg shadow-2xl shadow-primary/40 hover:brightness-110 hover:-translate-y-1 transition-all flex items-center gap-3 group"
                        >
                            Open Copilot <ChevronRight className="group-hover:translate-x-1 transition-transform" />
                        </button>
                        <button 
                            onClick={() => navigate('/documents')}
                            className="px-10 py-5 bg-card-bg border border-border-subtle text-text-main rounded-2xl font-black text-lg hover:bg-white/10 transition-all shadow-sm"
                        >
                            Upload Document
                        </button>
                    </motion.div>
                </header>

                <section className="grid md:grid-cols-3 gap-8">
                    {[
                        {
                            icon: Brain,
                            title: 'Agentic Reasoning',
                            desc: 'ThinkAI doesn\'t just answer questions — it reasons through multi-step workflows, identifies intents, and executes complex tasks autonomously.',
                            color: 'text-primary',
                            bg: 'bg-primary/10'
                        },
                        {
                            icon: Zap,
                            title: 'Voice + Document AI',
                            desc: 'Built-in real-time speech processing and document intelligence. Upload PDFs, give voice commands — ThinkAI handles the rest.',
                            color: 'text-secondary',
                            bg: 'bg-secondary/10'
                        },
                        {
                            icon: Shield,
                            title: 'Smart Task Automation',
                            desc: 'Automatically extracts tasks from documents, generates action plans, drafts emails, and syncs everything to your productivity pipeline.',
                            color: 'text-accent',
                            bg: 'bg-accent/10'
                        }
                    ].map((feature, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 + idx * 0.1 }}
                            className="glass-card p-10 hover:border-primary/20 transition-all group"
                        >
                            <div className={`${feature.bg} ${feature.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform`}>
                                <feature.icon size={32} />
                            </div>
                            <h3 className="text-2xl font-bold mb-4 text-text-main">{feature.title}</h3>
                            <p className="text-text-muted leading-relaxed italic">{feature.desc}</p>
                        </motion.div>
                    ))}
                </section>

                {/* Tech Stack Section */}
                <motion.section
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="mt-24 text-center"
                >
                    <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-text-muted mb-8">Powered By</h2>
                    <div className="flex flex-wrap justify-center gap-6">
                        {['Google Gemini 2.5 Flash', 'React 19', 'Node.js + Express', 'MongoDB Atlas', 'Framer Motion'].map((tech, i) => (
                            <span key={i} className="px-5 py-2.5 bg-card-bg border border-border-subtle rounded-full text-xs font-bold text-text-muted hover:text-primary hover:border-primary/30 transition-all">
                                {tech}
                            </span>
                        ))}
                    </div>
                </motion.section>
            </div>
        </div>
    );
};

export default Home;
