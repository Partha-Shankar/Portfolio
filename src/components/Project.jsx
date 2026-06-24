import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Project() {
    const sectionRef = useRef(null);
    const leftRef = useRef(null);
    const highlightRef = useRef(null);
    const bgRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Left content: slides from left with parallax
            gsap.fromTo(leftRef.current,
                { x: -80, opacity: 0 },
                {
                    x: 0, opacity: 1,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 80%',
                        end: 'top 20%',
                        scrub: 1.2,
                    },
                }
            );

            // Right panel: scales + fades in with a slower parallax
            gsap.fromTo(highlightRef.current,
                { scale: 0.88, opacity: 0, y: 40 },
                {
                    scale: 1, opacity: 1, y: 0,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 80%',
                        end: 'center center',
                        scrub: 1.5,
                    },
                }
            );

            // Background gradient: moves up at 0.3x scroll speed
            gsap.to(bgRef.current, {
                y: -60,
                ease: 'none',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 2,
                },
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} id="project" className="w-full min-h-[90vh] py-24 px-6 md:px-16 lg:px-24 flex items-center justify-center relative bg-black overflow-hidden">
            {/* Parallax background gradient */}
            <div ref={bgRef} className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/10 opacity-50 pointer-events-none" />

            <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center z-10">

                {/* Left: Project info */}
                <div ref={leftRef} className="flex flex-col space-y-7">
                    <div>
                        <span className="text-sm font-black text-accent tracking-[0.3em] uppercase mb-4 block">Delivered SaaS · NCET Bengaluru</span>
                        <h2 className="text-5xl md:text-7xl font-extrabold font-heading leading-[1.0]">
                            HOSTELDESK <span className="text-primary glow-text">OS</span>
                        </h2>
                        <div className="w-24 h-1 bg-gradient-to-r from-primary via-secondary to-accent mt-5 rounded-full" />
                    </div>

                    <p className="text-xl md:text-2xl text-gray-300 font-light leading-relaxed">
                        Transform your hostel from paper chaos to a secure digital ecosystem.
                    </p>

                    <div className="bg-white/5 backdrop-blur-md p-5 rounded-xl border border-white/10 hover:border-accent/40 transition-colors shadow-xl">
                        <h4 className="text-lg font-bold font-heading mb-2">First Client Deployed</h4>
                        <p className="text-accent font-semibold flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-accent animate-pulse flex-shrink-0" />
                            Nagarjuna College of Engineering and Technology
                        </p>
                    </div>

                    <p className="text-gray-400 leading-relaxed text-base md:text-lg">
                        HostelDesk delivers a <strong className="text-white">buttery smooth, enterprise-grade</strong> experience. Built with SvelteKit, TypeScript &amp; SQLite — featuring JWT auth, rotating QR gate verification, real-time notifications via SSE &amp; Web Push, and a full multi-role RBAC system. Go Paperless.
                    </p>

                    <div className="flex flex-wrap gap-2">
                        {['SvelteKit', 'TypeScript', 'SQLite', 'JWT', 'RBAC', 'SSE', 'Web Push', 'QR Verification'].map((t, i) => (
                            <span key={i} className="px-3 py-1 bg-gray-800/70 text-gray-300 rounded-md text-xs font-semibold">
                                {t}
                            </span>
                        ))}
                    </div>

                    <div className="flex flex-wrap gap-3">
                        <a href="#projects" className="px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-xl hover:shadow-lg hover:shadow-primary/30 transition-all text-sm">
                            See All 7 Projects
                        </a>
                    </div>
                </div>

                {/* Right: Abstract dashboard */}
                <div ref={highlightRef} className="relative w-full aspect-video lg:aspect-square bg-gray-900 rounded-3xl overflow-hidden border border-gray-800 shadow-[0_0_50px_rgba(59,130,246,0.15)] flex items-center justify-center p-6 md:p-8">
                    <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

                    <div className="w-full h-full bg-black/60 backdrop-blur-2xl rounded-2xl border border-white/5 flex flex-col p-5 md:p-6 shadow-2xl relative">
                        <div className="flex gap-2 mb-5">
                            <div className="w-3 h-3 rounded-full bg-red-500" />
                            <div className="w-3 h-3 rounded-full bg-yellow-500" />
                            <div className="w-3 h-3 rounded-full bg-green-500" />
                        </div>

                        <div className="flex-1 flex flex-col gap-4">
                            <div className="w-full h-10 bg-gray-800/50 rounded-lg animate-pulse" />
                            <div className="flex gap-4 flex-1">
                                <div className="w-1/3 h-full bg-primary/20 rounded-lg border border-primary/30 flex items-center justify-center">
                                    <span className="text-primary font-bold tracking-widest text-xs uppercase rotate-[-90deg] whitespace-nowrap">Paperless</span>
                                </div>
                                <div className="w-2/3 flex flex-col gap-3">
                                    <div className="w-full flex-1 bg-gray-800/50 rounded-lg animate-pulse delay-75" />
                                    <div className="w-full flex-1 bg-secondary/20 rounded-lg border border-secondary/30 flex items-center justify-center animate-pulse delay-150">
                                        <span className="text-secondary font-bold tracking-widest text-sm">Smooth UX</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white to-transparent opacity-40" />
                    </div>
                </div>
            </div>
        </section>
    );
}
