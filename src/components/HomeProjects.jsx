import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { projectsData } from '../data/projects';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Featured first project — larger card
const categoryDot = {
    'Full Stack':   'bg-emerald-400',
    'Cloud Native': 'bg-violet-400',
    'AI / ML':      'bg-blue-400',
};

// Top 4 by impact
const TOP_4_IDS = ['hosteldesk', 'ikya2026', 'deepbreath', 'cardioxai'];
const topProjects = TOP_4_IDS.map(id => projectsData.find(p => p.id === id)).filter(Boolean);

function ProjectCard({ project, featured = false, index }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-6%' }}
            transition={{ duration: 0.55, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className={featured ? 'md:col-span-2' : ''}
        >
            <Link
                to={`/project/${project.id}`}
                className={`group relative flex flex-col h-full rounded-2xl border border-white/8 bg-white/[0.02] overflow-hidden hover:border-white/20 hover:bg-white/[0.04] transition-all duration-400 ${featured ? 'p-8 md:p-10' : 'p-6'}`}
                style={{ '--accent': project.accent }}
            >
                {/* Hover accent bar at top */}
                <div
                    className="absolute top-0 left-0 right-0 h-[2px] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                    style={{ background: project.accent }}
                />

                {/* Top row */}
                <div className="flex items-start justify-between mb-5">
                    <div className="flex items-center gap-2.5">
                        <span className={`w-2 h-2 rounded-full ${categoryDot[project.category] || 'bg-gray-500'} group-hover:scale-125 transition-transform duration-300`} />
                        <span className="text-xs text-gray-500 font-medium">{project.category}</span>
                    </div>
                    <ArrowUpRight
                        size={15}
                        className="text-gray-700 group-hover:text-gray-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300"
                    />
                </div>

                {/* Title */}
                <h3 className={`font-black font-heading group-hover:text-white transition-colors duration-200 ${featured ? 'text-2xl md:text-3xl mb-2' : 'text-xl mb-1'}`}>
                    {project.title}
                </h3>
                <p className={`text-gray-500 font-medium mb-4 ${featured ? 'text-sm' : 'text-xs'}`}>{project.subtitle}</p>

                {/* Description */}
                <p className={`text-gray-400 leading-relaxed flex-1 ${featured ? 'text-base mb-8' : 'text-sm mb-6'}`}>
                    {featured ? project.description : project.description.slice(0, 120) + '…'}
                </p>

                {/* On featured: show top 3 highlights */}
                {featured && (
                    <ul className="space-y-2 mb-8">
                        {project.highlights.slice(0, 3).map((h, i) => (
                            <li key={i} className="flex items-start gap-2.5 text-sm text-gray-500">
                                <span className="mt-1.5 w-1 h-1 rounded-full bg-gray-600 flex-shrink-0" />
                                {h}
                            </li>
                        ))}
                    </ul>
                )}

                {/* Tech */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.tech.slice(0, featured ? 6 : 4).map((t, i) => (
                        <span
                            key={i}
                            className="px-2.5 py-1 bg-gray-900 text-gray-400 rounded-md text-xs font-medium border border-white/5 group-hover:border-white/10 transition-colors duration-300"
                        >
                            {t}
                        </span>
                    ))}
                    {project.tech.length > (featured ? 6 : 4) && (
                        <span className="text-gray-600 text-xs self-center pl-1">+{project.tech.length - (featured ? 6 : 4)}</span>
                    )}
                </div>

                {/* Badge */}
                <div className="flex items-center gap-2 text-xs text-gray-600">
                    <span className="w-1 h-1 rounded-full bg-gray-700" />
                    {project.badge}
                </div>
            </Link>
        </motion.div>
    );
}

export default function HomeProjects() {
    const sectionRef = useRef(null);
    const headingRef = useRef(null);

    useEffect(() => {
        if (!headingRef.current) return;
        const anim = gsap.fromTo(
            headingRef.current,
            { y: -24, opacity: 0.4 },
            {
                y: 0, opacity: 1,
                ease: 'none',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 90%',
                    end: 'top 45%',
                    scrub: 1.2,
                },
            }
        );
        return () => anim.scrollTrigger?.kill();
    }, []);

    return (
        <section id="projects" ref={sectionRef} className="w-full py-28 px-6 md:px-16 lg:px-24">
            <div className="max-w-7xl mx-auto">

                {/* Heading */}
                <div ref={headingRef} className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-14">
                    <div>
                        <p className="text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-3">Work</p>
                        <h2 className="text-4xl md:text-5xl font-black font-heading leading-tight">Selected Projects</h2>
                    </div>
                    <Link
                        to="/projects"
                        className="group flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-white transition-colors duration-200 self-start md:self-end pb-1 border-b border-transparent hover:border-white/30 transition-all"
                    >
                        View all projects
                        <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-200" />
                    </Link>
                </div>

                {/* Grid: featured (full width) + 3 cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {/* Featured — HostelDesk spans full width on md */}
                    <ProjectCard project={topProjects[0]} featured index={0} />
                    {/* Next 3 */}
                    {topProjects.slice(1).map((project, i) => (
                        <ProjectCard key={project.id} project={project} index={i + 1} />
                    ))}
                </div>

                {/* View all CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="mt-12 flex justify-center"
                >
                    <Link
                        to="/projects"
                        className="group flex items-center gap-3 px-7 py-3.5 rounded-xl border border-white/10 text-gray-400 text-sm font-semibold hover:border-white/25 hover:text-white hover:bg-white/[0.04] transition-all duration-300"
                    >
                        See all 7 projects
                        <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-200" />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
