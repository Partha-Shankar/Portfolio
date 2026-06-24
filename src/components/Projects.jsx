import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { projectsData } from '../data/projects';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const categories = ['All', 'Full Stack', 'Cloud Native', 'AI / ML'];

// Short color dot for each category instead of emoji
const categoryDot = {
    'Full Stack':   'bg-emerald-400',
    'Cloud Native': 'bg-violet-400',
    'AI / ML':      'bg-blue-400',
};

export default function Projects() {
    const [active, setActive] = useState('All');
    const headingRef = useRef(null);
    const sectionRef = useRef(null);

    const filtered = active === 'All' ? projectsData : projectsData.filter(p => p.category === active);

    useEffect(() => {
        if (!headingRef.current) return;
        const anim = gsap.fromTo(
            headingRef.current,
            { y: -30, opacity: 0.5 },
            {
                y: 0, opacity: 1,
                ease: 'none',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 90%',
                    end: 'top 40%',
                    scrub: 1.2,
                },
            }
        );
        return () => anim.scrollTrigger?.kill();
    }, []);

    return (
        <section id="projects" ref={sectionRef} className="w-full py-28 px-6 md:px-16 lg:px-24 relative">
            <div className="max-w-7xl mx-auto">

                {/* Heading */}
                <div ref={headingRef} className="mb-14">
                    <p className="text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-4">Work</p>
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                        <h2 className="text-4xl md:text-5xl font-black font-heading leading-tight">
                            Selected Projects
                        </h2>
                        {/* Category Filter */}
                        <div className="flex flex-wrap gap-2">
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
                </div>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                    <AnimatePresence mode="popLayout">
                        {filtered.map((project, index) => (
                            <motion.div
                                key={project.id}
                                layout
                                initial={{ opacity: 0, y: 24 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 24 }}
                                transition={{ duration: 0.35, delay: index * 0.05, ease: 'easeOut' }}
                            >
                                <Link
                                    to={`/project/${project.id}`}
                                    className="group flex flex-col h-full p-6 rounded-2xl border border-white/8 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04] transition-all duration-300 hover:-translate-y-0.5"
                                >
                                    {/* Top: category indicator + arrow */}
                                    <div className="flex items-center justify-between mb-5">
                                        <div className="flex items-center gap-2">
                                            <span className={`w-2 h-2 rounded-full ${categoryDot[project.category] || 'bg-gray-500'}`} />
                                            <span className="text-xs text-gray-500 font-medium">{project.category}</span>
                                        </div>
                                        <ArrowUpRight
                                            size={16}
                                            className="text-gray-700 group-hover:text-gray-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200"
                                        />
                                    </div>

                                    {/* Title & subtitle */}
                                    <h3 className="text-lg font-bold font-heading mb-1 group-hover:text-white transition-colors">{project.title}</h3>
                                    <p className="text-xs text-gray-500 font-medium mb-4">{project.subtitle}</p>

                                    {/* Description */}
                                    <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-1">{project.description}</p>

                                    {/* Tech badges */}
                                    <div className="flex flex-wrap gap-1.5 mb-5">
                                        {project.tech.slice(0, 5).map((t, i) => (
                                            <span key={i} className="px-2.5 py-1 bg-gray-900 text-gray-400 rounded-md text-xs font-medium border border-white/5">
                                                {t}
                                            </span>
                                        ))}
                                        {project.tech.length > 5 && (
                                            <span className="px-2.5 py-1 text-gray-600 text-xs font-medium">+{project.tech.length - 5} more</span>
                                        )}
                                    </div>

                                    {/* Badge */}
                                    <div className="flex items-center gap-2 text-xs text-gray-500">
                                        <span className="w-1.5 h-1.5 rounded-full bg-current opacity-50" />
                                        {project.badge}
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}
