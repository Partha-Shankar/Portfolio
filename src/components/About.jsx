import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { trackSection, untrackSection } from '../lib/analytics';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
    const sectionRef = useRef(null);
    const textRef = useRef(null);
    const decorRef1 = useRef(null);
    const decorRef2 = useRef(null);

    useEffect(() => {
        if (sectionRef.current) trackSection('about', sectionRef.current);
        return () => untrackSection('about');
    }, []);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(Array.from(textRef.current.children), {
                opacity: 0,
                y: 40,
                duration: 0.9,
                stagger: 0.15,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 72%',
                    toggleActions: 'play none none reverse',
                },
            });

            gsap.to(decorRef1.current, {
                y: -70,
                ease: 'none',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 2,
                },
            });

            gsap.to(decorRef2.current, {
                y: 70,
                ease: 'none',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 2.5,
                },
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            id="about"
            className="w-full py-28 px-6 md:px-16 lg:px-24 relative overflow-hidden"
        >
            {/* Parallax depth blobs */}
            <div ref={decorRef1} className="absolute -top-20 right-0 w-80 h-80 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
            <div ref={decorRef2} className="absolute -bottom-20 left-0 w-72 h-72 bg-secondary/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

                    {/* Left: Stats block */}
                    <div className="grid grid-cols-2 gap-4">
                        {[
                            { value: '9.07', label: 'CGPA', sub: 'out of 10.0' },
                            { value: '3rd', label: 'Year', sub: 'B.E. CSE · 2023–2027' },
                            { value: '7+', label: 'Projects', sub: 'Production-grade' },
                            { value: '4', label: 'AWS Certs', sub: 'Cloud Quest badges' },
                        ].map((stat, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                className="p-6 rounded-2xl border border-white/8 bg-white/[0.02] hover:border-primary/30 transition-colors duration-300"
                            >
                                <p className="text-3xl font-black font-heading text-white mb-1">{stat.value}</p>
                                <p className="text-sm font-bold text-gray-400 uppercase tracking-wider">{stat.label}</p>
                                <p className="text-xs text-gray-600 mt-0.5">{stat.sub}</p>
                            </motion.div>
                        ))}
                    </div>

                    {/* Right: Text */}
                    <div ref={textRef} className="space-y-6">
                        <div>
                            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-4">About</p>
                            <h2 className="text-4xl md:text-5xl font-black font-heading leading-[1.05] mb-6">
                                Engineering<br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                                    with purpose.
                                </span>
                            </h2>
                        </div>

                        <p className="text-gray-300 text-base leading-relaxed">
                            I'm <span className="text-white font-semibold">Partha Shankar</span>, a Computer Science Engineering student at Nagarjuna College of Engineering and Technology, Bengaluru — specialising in AI/ML, full-stack web development, and cloud-native architecture.
                        </p>

                        <p className="text-gray-500 text-base leading-relaxed">
                            My work spans enterprise management platforms, healthcare AI systems with explainability, serverless cloud infrastructure, and large-scale event management systems. Every project I build is production-oriented, with a focus on security, architecture, and real-world utility.
                        </p>

                        <p className="text-gray-500 text-base leading-relaxed">
                            Currently exploring intersections between clinical AI, edge computing, and scalable software architecture.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
