import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { trackSection, untrackSection } from '../lib/analytics';

export default function Hero() {
    const containerRef = useRef(null);

    useEffect(() => {
        if (containerRef.current) trackSection('hero', containerRef.current);
        return () => untrackSection('hero');
    }, []);

    useEffect(() => {
        // Parallax effect on the entire hero component
        gsap.to(containerRef.current, {
            y: 200,
            opacity: 0,
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "bottom top",
                scrub: true,
            }
        });
    }, []);

    return (
        <section
            ref={containerRef}
            className="relative w-full min-h-screen flex flex-col justify-center items-center px-4 overflow-hidden"
        >
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="z-10 text-center flex flex-col items-center"
            >
                <motion.p
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-primary font-bold tracking-[0.2em] uppercase text-sm mb-4"
                >
                    Developer & AI Enthusiast
                </motion.p>

                <h1 className="text-6xl md:text-8xl font-black font-heading mb-6 tracking-tight drop-shadow-2xl">
                    Hi, I'm <br className="md:hidden" />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent glow-text">
                        Partha Shankar
                    </span>
                </h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.8 }}
                    className="text-gray-400 text-lg md:text-2xl max-w-2xl font-light"
                >
                    Building intelligent systems, scalable full-stack applications, and the future of digital management.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1.2 }}
                    className="mt-12 flex space-x-6"
                >
                    <a href="#about" className="px-8 py-4 rounded-full bg-white text-gray-950 font-bold hover:bg-gray-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                        Explore My Work
                    </a>
                    <a href="#project" className="px-8 py-4 rounded-full border border-gray-600 hover:border-white transition-colors duration-300">
                        View Project
                    </a>
                </motion.div>
            </motion.div>

            {/* Floating 3D elements abstraction */}
            <motion.div
                animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute right-[10%] top-[20%] w-32 h-32 rounded-full border border-primary/30 blur-sm pointer-events-none"
            />
            <motion.div
                animate={{ y: [0, 30, 0], rotate: [0, -10, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute left-[10%] bottom-[20%] w-48 h-48 rounded-full border border-secondary/20 blur-md pointer-events-none"
            />
        </section>
    );
}
