import React, { useEffect, useRef, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Github, ExternalLink, ChevronRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getProjectById } from '../data/projects';
import ThemeToggle from '../components/ThemeToggle';

gsap.registerPlugin(ScrollTrigger);

const categoryColors = {
    'Full Stack':   'text-emerald-400',
    'Cloud Native': 'text-violet-400',
    'AI / ML':      'text-blue-400',
};

export default function ProjectDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const project = getProjectById(id);
    const heroRef = useRef(null);
    const contentRef = useRef(null);
    const [liveUrl, setLiveUrl] = useState(project?.liveUrl || null);

    useEffect(() => {
        fetch('/api/projects')
            .then(r => r.json())
            .then(data => {
                const found = data.find?.(p => p.project_id === id);
                if (found?.live_url) setLiveUrl(found.live_url);
            })
            .catch(() => {});
    }, [id]);

    useEffect(() => {
        if (!heroRef.current) return;
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: heroRef.current,
                start: 'top top',
                end: 'bottom top',
                scrub: 1.5,
            }
        });
        tl.to(heroRef.current, { y: 100, opacity: 0.4 });
        return () => tl.scrollTrigger?.kill();
    }, []);

    useEffect(() => {
        if (!contentRef.current) return;
        const ctx = gsap.context(() => {
            gsap.from('.detail-card', {
                opacity: 0,
                y: 40,
                duration: 0.65,
                stagger: 0.1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: contentRef.current,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse',
                },
            });
        }, contentRef);
        return () => ctx.revert();
    }, []);

    useEffect(() => { window.scrollTo(0, 0); }, [id]);

    if (!project) {
        return (
            <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center gap-5 px-6">
                <h1 className="text-2xl font-bold text-white font-heading">Project not found</h1>
                <p className="text-gray-500 text-sm">The project you're looking for doesn't exist.</p>
                <Link to="/" className="px-5 py-2.5 bg-white text-gray-950 rounded-lg font-semibold text-sm hover:bg-gray-100 transition-colors">
                    Back to Portfolio
                </Link>
                <ThemeToggle />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-950 text-gray-50 font-sans overflow-x-hidden">
            {/* Subtle background */}
            <div
                className="fixed top-0 right-0 w-[40%] h-[60%] rounded-full blur-[160px] pointer-events-none z-0 opacity-30"
                style={{ background: `${project.accent}20` }}
            />
            <div className="fixed inset-0 z-0 bg-grid-pattern opacity-20 pointer-events-none" />

            {/* ── HERO ─────────────────────────────────────────────── */}
            <section
                ref={heroRef}
                className="relative z-10 w-full min-h-[60vh] flex flex-col justify-end px-6 md:px-16 lg:px-24 pb-16 pt-28"
            >
                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-xs text-gray-600 mb-10 flex-wrap">
                    <Link to="/" className="hover:text-gray-400 transition-colors">Portfolio</Link>
                    <ChevronRight size={12} />
                    <Link to="/#projects" className="hover:text-gray-400 transition-colors">Projects</Link>
                    <ChevronRight size={12} />
                    <span className="text-gray-400">{project.title}</span>
                </div>

                <div className="max-w-5xl">
                    {/* Category + tag */}
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.05 }}
                        className="flex flex-wrap items-center gap-4 mb-5"
                    >
                        <span className={`text-xs font-bold tracking-widest uppercase ${categoryColors[project.category] || 'text-gray-400'}`}>
                            {project.category}
                        </span>
                        <span className="text-xs text-gray-600">/</span>
                        <span className="text-xs text-gray-500">{project.tag}</span>
                    </motion.div>

                    {/* Title */}
                    <motion.h1
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.15 }}
                        className="text-5xl sm:text-6xl md:text-8xl font-black font-heading leading-[1.0] mb-5"
                    >
                        {project.title}
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="text-lg md:text-xl text-gray-400 font-light max-w-2xl leading-relaxed mb-10"
                    >
                        {project.subtitle}
                    </motion.p>

                    {/* Action buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.45 }}
                        className="flex flex-wrap items-center gap-3"
                    >
                        <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm border border-white/12 bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white hover:border-white/20 transition-all"
                        >
                            <Github size={15} />
                            GitHub
                        </a>

                        {liveUrl && (
                            <a
                                href={liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm text-white transition-all hover:opacity-90"
                                style={{ background: project.accent }}
                            >
                                <ExternalLink size={15} />
                                Live Demo
                            </a>
                        )}

                        <button
                            onClick={() => navigate(-1)}
                            className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-600 hover:text-gray-400 transition-colors"
                        >
                            <ArrowLeft size={14} />
                            Back
                        </button>
                    </motion.div>
                </div>
            </section>

            {/* Divider */}
            <div className="relative z-10 w-full h-px bg-white/5" />

            {/* ── CONTENT ──────────────────────────────────────────── */}
            <div ref={contentRef} className="relative z-10 max-w-6xl mx-auto px-6 md:px-16 lg:px-24 py-20 space-y-10">

                {/* Overview grid */}
                <div className="detail-card grid grid-cols-1 lg:grid-cols-5 gap-6">
                    {/* Problem */}
                    <div className="lg:col-span-3 p-7 rounded-2xl border border-white/8 bg-white/[0.02]">
                        <p className="text-xs font-bold tracking-[0.2em] uppercase text-gray-600 mb-4">Problem Statement</p>
                        <p className="text-gray-300 text-base leading-relaxed">{project.problem}</p>
                    </div>

                    {/* Tech stack */}
                    <div className="lg:col-span-2 p-7 rounded-2xl border border-white/8 bg-white/[0.02]">
                        <p className="text-xs font-bold tracking-[0.2em] uppercase text-gray-600 mb-4">Tech Stack</p>
                        <div className="flex flex-wrap gap-2">
                            {project.tech.map((t, i) => (
                                <span key={i} className="px-3 py-1 bg-gray-900 text-gray-300 rounded-md text-xs font-medium border border-white/5">
                                    {t}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Key Features */}
                <div className="detail-card p-7 rounded-2xl border border-white/8 bg-white/[0.02]">
                    <p className="text-xs font-bold tracking-[0.2em] uppercase text-gray-600 mb-6">Key Features</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {project.highlights.map((h, i) => (
                            <div
                                key={i}
                                className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors"
                            >
                                <span className="flex-shrink-0 text-xs font-bold text-gray-600 mt-0.5 w-5 text-right">{String(i + 1).padStart(2, '0')}</span>
                                <p className="text-gray-400 text-sm leading-relaxed">{h}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Engineering Challenges */}
                <div className="detail-card">
                    <p className="text-xs font-bold tracking-[0.2em] uppercase text-gray-600 mb-6">Engineering Challenges</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        {project.challenges.map((c, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.45, delay: i * 0.1 }}
                                className="p-6 rounded-2xl bg-white/[0.02] border border-white/8 hover:border-white/15 transition-colors duration-300"
                            >
                                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">{`0${i + 1}`}</p>
                                <h3 className="text-base font-bold text-white font-heading mb-3">{c.title}</h3>
                                <p className="text-gray-500 text-sm leading-relaxed">{c.solution}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Bottom CTA */}
                <div className="detail-card flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 p-7 rounded-2xl border border-white/8 bg-white/[0.02]">
                    <div>
                        <p className="text-xs text-gray-600 uppercase tracking-widest mb-1">Source Code</p>
                        <p className="text-white font-bold">{project.title}</p>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm border border-white/10 bg-white/[0.03] text-gray-300 hover:bg-white/[0.07] hover:text-white transition-all"
                        >
                            <Github size={15} />
                            GitHub Repository
                        </a>
                        {liveUrl && (
                            <a href={liveUrl} target="_blank" rel="noopener noreferrer"
                               className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm text-white transition-all hover:opacity-90"
                               style={{ background: project.accent }}>
                                <ExternalLink size={15} />
                                Live Demo
                            </a>
                        )}
                        <Link to="/#projects" className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-600 hover:text-gray-400 transition-colors">
                            <ArrowLeft size={14} />
                            All Projects
                        </Link>
                    </div>
                </div>
            </div>

            <ThemeToggle />
        </div>
    );
}
