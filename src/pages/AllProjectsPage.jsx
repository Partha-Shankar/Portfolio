import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowLeft } from 'lucide-react';
import { projectsData } from '../data/projects';
import ThemeToggle from '../components/ThemeToggle';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const categories = ['All', 'Full Stack', 'Cloud Native', 'AI / ML'];

const categoryDot = {
    'Full Stack':   'bg-emerald-400',
    'Cloud Native': 'bg-violet-400',
    'AI / ML':      'bg-blue-400',
};

export default function AllProjectsPage() {
    const [active, setActive] = useState('All');
    const filtered = active === 'All' ? projectsData : projectsData.filter(p => p.category === active);

    useEffect(() => { window.scrollTo(0, 0); }, []);

    return (
        <div className="min-h-screen bg-gray-950 text-gray-50 font-sans overflow-x-hidden">
            <div className="fixed inset-0 bg-grid-pattern opacity-[0.07] pointer-events-none z-0" />
            <div className="fixed top-[-5%] right-[-5%] w-80 h-80 rounded-full pointer-events-none z-0"
                style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%)' }} />

            <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-16 lg:px-24 py-20">

                {/* Back nav */}
                <motion.div
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4 }}
                    className="mb-14"
                >
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-300 transition-colors duration-200 mb-10"
                    >
                        <ArrowLeft size={14} />
                        Back to Portfolio
                    </Link>

                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mt-6">
                        <div>
                            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-3">All Work</p>
                            <h1 className="text-5xl md:text-6xl font-black font-heading">Projects</h1>
                            <p className="text-gray-500 text-base mt-3 max-w-lg leading-relaxed">
                                End-to-end systems spanning full-stack development, cloud-native platforms, and AI/ML pipelines.
                            </p>
                        </div>

                        {/* Filter */}
                        <div className="flex flex-wrap gap-2 self-start md:self-end">
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setActive(cat)}
                                    className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200 ${
                                        active === cat
                                            ? 'bg-white text-gray-950 border-white'
                                            : 'border-gray-700 text-gray-500 hover:border-gray-500 hover:text-gray-300'
                                    }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Count */}
                <AnimatePresence mode="wait">
                    <motion.p
                        key={active}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="text-xs text-gray-600 mb-6 uppercase tracking-widest"
                    >
                        {filtered.length} project{filtered.length !== 1 ? 's' : ''}
                    </motion.p>
                </AnimatePresence>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                    <AnimatePresence mode="popLayout">
                        {filtered.map((project, index) => (
                            <motion.div
                                key={project.id}
                                layout
                                initial={{ opacity: 0, y: 24, scale: 0.97 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 16, scale: 0.97 }}
                                transition={{ duration: 0.35, delay: index * 0.04, ease: [0.16, 1, 0.3, 1] }}
                            >
                                <Link
                                    to={`/project/${project.id}`}
                                    className="group relative flex flex-col h-full p-6 rounded-2xl border border-white/8 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04] transition-all duration-300 overflow-hidden"
                                >
                                    {/* Accent top bar */}
                                    <div
                                        className="absolute top-0 left-0 right-0 h-[2px] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                                        style={{ background: project.accent }}
                                    />

                                    {/* Top */}
                                    <div className="flex items-start justify-between mb-5">
                                        <div className="flex items-center gap-2">
                                            <span className={`w-2 h-2 rounded-full ${categoryDot[project.category] || 'bg-gray-500'} group-hover:scale-125 transition-transform duration-300`} />
                                            <span className="text-xs text-gray-500 font-medium">{project.category}</span>
                                        </div>
                                        <ArrowUpRight size={15} className="text-gray-700 group-hover:text-gray-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                                    </div>

                                    <h3 className="text-lg font-bold font-heading mb-1 group-hover:text-white transition-colors duration-200">{project.title}</h3>
                                    <p className="text-xs text-gray-500 mb-4">{project.subtitle}</p>
                                    <p className="text-gray-400 text-sm leading-relaxed flex-1 mb-6">{project.description}</p>

                                    <div className="flex flex-wrap gap-1.5 mb-4">
                                        {project.tech.slice(0, 4).map((t, i) => (
                                            <span key={i} className="px-2.5 py-1 bg-gray-900 text-gray-400 rounded-md text-xs border border-white/5 group-hover:border-white/10 transition-colors">
                                                {t}
                                            </span>
                                        ))}
                                        {project.tech.length > 4 && (
                                            <span className="text-gray-600 text-xs self-center pl-1">+{project.tech.length - 4}</span>
                                        )}
                                    </div>

                                    <div className="flex items-center gap-2 text-xs text-gray-600">
                                        <span className="w-1 h-1 rounded-full bg-gray-700" />
                                        {project.badge}
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>
            <ThemeToggle />
        </div>
    );
}
