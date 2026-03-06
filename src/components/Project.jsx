import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';

export default function Project() {
    const highlightRef = useRef(null);

    useEffect(() => {
        gsap.fromTo(
            highlightRef.current,
            { opacity: 0, scale: 0.8 },
            {
                opacity: 1,
                scale: 1,
                scrollTrigger: {
                    trigger: highlightRef.current,
                    start: 'top 80%',
                    end: 'bottom bottom',
                    scrub: 1,
                }
            }
        );
    }, []);

    return (
        <section id="project" className="w-full min-h-[90vh] py-24 px-6 md:px-24 flex items-center justify-center relative bg-black">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/10 opacity-50 pointer-events-none" />

            <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center z-10">

                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-20%' }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    className="flex flex-col space-y-8"
                >
                    <div>
                        <span className="text-sm font-black text-accent tracking-[0.3em] uppercase mb-4 block">Delivered SAAS</span>
                        <h2 className="text-5xl md:text-7xl font-extrabold font-heading text-white leading-[1.1]">
                            HOSTELDESK <span className="text-primary glow-text">OS</span>
                        </h2>
                        <div className="w-24 h-1 bg-gradient-to-r from-primary via-secondary to-accent mt-6 rounded-full" />
                    </div>

                    <p className="text-2xl text-gray-300 font-light leading-relaxed">
                        Transform your hostel from paper to digital.
                    </p>

                    <div className="bg-white/5 backdrop-blur-md p-6 rounded-xl border border-white/10 hover:border-accent/40 transition-colors shadow-2xl">
                        <h4 className="text-xl font-bold font-heading mb-3 text-white">First Client Deployed</h4>
                        <p className="text-lg text-accent font-semibold flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                            Nagarjuna College of Engineering and Technology
                        </p>
                    </div>

                    <p className="text-gray-400 leading-relaxed text-lg">
                        HostelDesk delivers the <strong className="text-white">best, buttery smooth user experience</strong>. Designed with modern web architectures to replace outdated paper-based gate passes and records with a secure, fast, and scalable digital workflow. Go Paperless.
                    </p>

                    <div className="flex gap-4">
                        <a href="/" className="px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-lg hover:shadow-lg hover:shadow-primary/30 transition-all">
                            Back to Application
                        </a>
                    </div>
                </motion.div>

                {/* Dynamic Project Showcase 3D effect abstraction */}
                <div ref={highlightRef} className="relative w-full aspect-video lg:aspect-square bg-gray-900 rounded-3xl overflow-hidden border border-gray-800 shadow-[0_0_50px_rgba(59,130,246,0.2)] flex items-center justify-center p-8">
                    {/* Abstract SAAS dashboard representation */}
                    <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

                    <div className="w-full h-full bg-black/60 backdrop-blur-2xl rounded-2xl border border-white/5 flex flex-col p-6 shadow-2xl relative">
                        <div className="flex gap-2 mb-6">
                            <div className="w-3 h-3 rounded-full bg-red-500" />
                            <div className="w-3 h-3 rounded-full bg-yellow-500" />
                            <div className="w-3 h-3 rounded-full bg-green-500" />
                        </div>

                        <div className="flex-1 flex flex-col gap-4">
                            <div className="w-full h-12 bg-gray-800/50 rounded-lg animate-pulse" />
                            <div className="flex gap-4 flex-1">
                                <div className="w-1/3 h-full bg-primary/20 rounded-lg border border-primary/30 flex items-center justify-center">
                                    <span className="text-primary font-bold tracking-widest text-xs uppercase rotate-[-90deg]">Paperless</span>
                                </div>
                                <div className="w-2/3 flex flex-col gap-4">
                                    <div className="w-full h-1/2 bg-gray-800/50 rounded-lg animate-pulse delay-75" />
                                    <div className="w-full h-1/2 bg-secondary/20 rounded-lg border border-secondary/30 flex items-center justify-center animate-pulse delay-150">
                                        <span className="text-secondary font-bold tracking-widest">Smooth UX</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Glowing dot moving around border */}
                        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white to-transparent opacity-50" />
                    </div>
                </div>

            </div>
        </section>
    );
}
