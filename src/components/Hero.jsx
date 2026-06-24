import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { trackSection, untrackSection } from '../lib/analytics';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
    const containerRef = useRef(null);
    const textRef = useRef(null);
    const orb1Ref = useRef(null);
    const orb2Ref = useRef(null);

    useEffect(() => {
        if (containerRef.current) trackSection('hero', containerRef.current);
        return () => untrackSection('hero');
    }, []);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.to(textRef.current, {
                y: -80,
                opacity: 0,
                ease: 'none',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: 1.5,
                },
            });
            gsap.to(orb1Ref.current, {
                y: -160,
                ease: 'none',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: 2,
                },
            });
            gsap.to(orb2Ref.current, {
                y: 100,
                ease: 'none',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: 2.5,
                },
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={containerRef}
            className="relative w-full min-h-screen flex flex-col justify-center px-6 md:px-16 lg:px-24 overflow-hidden"
        >
            <div ref={textRef} className="z-10 max-w-4xl w-full" data-no-transition>
                <motion.p
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-xs font-semibold tracking-[0.25em] uppercase text-primary mb-6"
                >
                    Full Stack Engineer · AI/ML Developer · Cloud
                </motion.p>

                <motion.h1
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-6xl md:text-8xl font-black font-heading leading-[1.0] tracking-tight mb-8"
                >
                    Partha
                    <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                        Shankar.
                    </span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-gray-400 text-base md:text-xl max-w-xl leading-relaxed mb-10"
                >
                    Building intelligent AI systems, full-stack applications, and cloud-native platforms that solve real engineering problems.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="flex flex-wrap gap-4"
                >
                    <a
                        href="#projects"
                        className="px-6 py-3 rounded-lg bg-white text-gray-950 font-semibold text-sm hover:bg-gray-100 transition-colors"
                    >
                        View Projects
                    </a>
                    <a
                        href="#contact"
                        className="px-6 py-3 rounded-lg border border-gray-700 text-gray-300 font-semibold text-sm hover:border-gray-400 hover:text-white transition-colors"
                    >
                        Get in Touch
                    </a>
                </motion.div>
            </div>

            {/* Parallax depth orbs */}
            <div
                ref={orb1Ref}
                className="absolute right-[5%] top-[15%] w-64 h-64 md:w-96 md:h-96 rounded-full pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.07) 0%, transparent 70%)' }}
            />
            <div
                ref={orb2Ref}
                className="absolute left-[5%] bottom-[10%] w-72 h-72 md:w-[28rem] md:h-[28rem] rounded-full pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 70%)' }}
            />
        </section>
    );
}
