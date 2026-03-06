import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';

export default function About() {
    const sectionRef = useRef(null);
    const textRef = useRef(null);
    const imageContainerRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(textRef.current.children, {
                opacity: 0,
                x: -50,
                duration: 1,
                stagger: 0.2,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 70%',
                    toggleActions: 'play none none reverse',
                }
            });

            gsap.from(imageContainerRef.current, {
                opacity: 0,
                scale: 0.8,
                duration: 1.2,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 70%',
                    toggleActions: 'play none none reverse',
                }
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            id="about"
            className="w-full min-h-screen py-24 px-4 md:px-24 flex flex-col justify-center items-center relative"
        >
            <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                {/* Left side: Text content */}
                <div ref={textRef} className="space-y-8">
                    <div>
                        <h2 className="text-4xl md:text-6xl font-black font-heading mb-4 inline-block relative">
                            Passion Meets
                            <span className="block text-primary">Precision</span>
                            <div className="absolute -bottom-2 left-0 w-24 h-2 bg-gradient-to-r from-primary to-secondary rounded-full" />
                        </h2>
                    </div>

                    <p className="text-xl text-gray-300 font-light leading-relaxed">
                        I'm <span className="text-white font-semibold">Partha Shankar</span>, a 3rd-year Computer Science student at
                        <span className="text-accent underline decoration-accent/30 underline-offset-4 ml-1">
                            Nagarjuna College of Engineering and Technology
                        </span>.
                    </p>

                    <div className="space-y-4 text-gray-400">
                        <p>
                            Being a developer is more than writing code; it's about solving real-world puzzles. My journey is fueled by a relentless curiosity about how systems function at scale and how AI can be integrated to create seamless user experiences.
                        </p>
                        <p>
                            Currently specializing in full-stack development and exploring the frontiers of Machine Learning. When I'm not debugging, you'll find me brainstorming the next big thing in college management systems or architectural innovations.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-4">
                        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/50 transition-colors">
                            <h4 className="text-primary font-bold text-2xl">3rd Year</h4>
                            <p className="text-xs uppercase tracking-widest text-gray-500">Education</p>
                        </div>
                        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-secondary/50 transition-colors">
                            <h4 className="text-secondary font-bold text-2xl">CSE</h4>
                            <p className="text-xs uppercase tracking-widest text-gray-500">Specialization</p>
                        </div>
                    </div>
                </div>

                {/* Right side: Visual representation */}
                <div
                    ref={imageContainerRef}
                    className="relative group"
                >
                    <div className="aspect-square w-full max-w-[500px] mx-auto relative z-10 rounded-2xl overflow-hidden bg-gradient-to-br from-gray-800 to-gray-950 border border-white/10 shadow-2xl">
                        {/* If user provides an image, replace this div with an <img> tag */}
                        <div className="absolute inset-0 flex items-center justify-center p-8">
                            <div className="text-center">
                                <span className="text-8xl mb-4 block">👨‍💻</span>
                                <p className="text-gray-500 italic">"Imagination is the only limit to innovation."</p>
                            </div>
                        </div>
                        {/* Animated overlay */}
                        <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>

                    {/* Background decorations */}
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl -z-1" />
                    <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-secondary/20 rounded-full blur-3xl -z-1" />
                </div>
            </div>
        </section>
    );
}
