import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const certifications = [
    {
        title: 'AWS Cloud Quest: Generative AI Practitioner',
        tag: 'Generative AI',
        color: 'border-orange-500/20 hover:border-orange-400/40',
        accent: 'text-orange-400',
    },
    {
        title: 'AWS Cloud Quest: Cloud Practitioner',
        tag: 'Cloud Foundations',
        color: 'border-blue-500/20 hover:border-blue-400/40',
        accent: 'text-blue-400',
    },
    {
        title: 'AWS Cloud Quest: Solutions Architect',
        tag: 'Architecture',
        color: 'border-violet-500/20 hover:border-violet-400/40',
        accent: 'text-violet-400',
    },
    {
        title: 'AWS Cloud Quest: Serverless Developer',
        tag: 'Serverless',
        color: 'border-emerald-500/20 hover:border-emerald-400/40',
        accent: 'text-emerald-400',
    },
];

export default function Certifications() {
    const sectionRef = useRef(null);
    const headingRef = useRef(null);

    useEffect(() => {
        if (!headingRef.current) return;
        const anim = gsap.fromTo(
            headingRef.current,
            { y: 40, opacity: 0.5 },
            {
                y: 0, opacity: 1,
                ease: 'none',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 90%',
                    end: 'top 40%',
                    scrub: 1,
                },
            }
        );
        return () => anim.scrollTrigger?.kill();
    }, []);

    return (
        <section ref={sectionRef} className="w-full py-28 px-6 md:px-16 lg:px-24 border-t border-white/5 overflow-hidden">
            <div className="max-w-7xl mx-auto">

                <div ref={headingRef} className="mb-14">
                    <p className="text-xs font-semibold tracking-[0.2em] uppercase text-accent mb-4">Credentials</p>
                    <h2 className="text-4xl md:text-5xl font-black font-heading">Certifications</h2>
                </div>

                {/* Issuer */}
                <div className="flex items-center gap-3 mb-10">
                    <Award size={16} className="text-gray-500" />
                    <p className="text-sm text-gray-500">Amazon Web Services (AWS) — Cloud Quest badge program</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {certifications.map((cert, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-10%' }}
                            transition={{ duration: 0.45, delay: index * 0.1, ease: 'easeOut' }}
                            className={`p-6 rounded-2xl bg-white/[0.02] border ${cert.color} transition-all duration-300 hover:-translate-y-0.5`}
                        >
                            <span className={`inline-block text-xs font-bold uppercase tracking-widest mb-4 ${cert.accent}`}>
                                {cert.tag}
                            </span>
                            <h3 className="text-sm font-semibold text-gray-200 leading-snug">{cert.title}</h3>
                        </motion.div>
                    ))}
                </div>

                {/* Summary row */}
                <div className="mt-8 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <p className="text-sm text-gray-500">4 badges earned — practical, hands-on cloud engineering certification</p>
                    <div className="flex flex-wrap gap-2">
                        {['Gen AI', 'Cloud', 'Architecture', 'Serverless'].map((tag, i) => (
                            <span key={i} className="px-3 py-1 border border-white/8 text-gray-500 text-xs rounded-full font-medium">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
