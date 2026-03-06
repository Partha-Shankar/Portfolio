import React from 'react';
import { motion } from 'framer-motion';

const mentors = [
    {
        name: "Babji Neelam Sir",
        role: "Mentor & Guide",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&auto=format&fit=crop"
    },
    {
        name: "Gopinath Sir",
        role: "Technical Advisor",
        avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400&auto=format&fit=crop"
    },
    {
        name: "Shishir Sir",
        role: "Project Coordinator",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop"
    }
];

export default function Mentors() {
    return (
        <section className="w-full py-24 px-6 md:px-24 bg-gradient-to-t from-gray-950 to-black relative">
            <div className="max-w-5xl mx-auto z-10 relative">
                <div className="text-center mb-16">
                    <span className="text-sm font-black text-secondary tracking-[0.3em] uppercase block mb-4">Honors & Gratitude</span>
                    <h2 className="text-4xl md:text-5xl font-extrabold font-heading text-white">
                        SPECIAL <span className="text-white glow-text drop-shadow-[0_0_20px_white]">THANKS</span>
                    </h2>
                    <p className="mt-6 text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
                        This project wouldn't be where it is today without the incredible support, guidance, and continuous encouragement of my mentors.
                    </p>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-12 lg:gap-24">
                    {mentors.map((mentor, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-10%" }}
                            transition={{ duration: 0.8, delay: index * 0.2, ease: "easeOut" }}
                            className="flex flex-col items-center group relative cursor-default"
                        >
                            {/* Avatar Ring Animation */}
                            <div className="absolute inset-0 rounded-full border border-secondary/0 group-hover:border-secondary/50 group-hover:scale-110 transition-all duration-500 pointer-events-none" />
                            <div className="absolute inset-[-10px] rounded-full border border-primary/0 group-hover:border-primary/20 group-hover:scale-125 transition-all duration-700 pointer-events-none" />

                            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-2 border-gray-800 shadow-2xl relative mb-4">
                                <img
                                    src={mentor.avatar}
                                    alt={mentor.name}
                                    className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-500"
                                />
                            </div>
                            <h3 className="text-xl font-bold text-white font-heading">{mentor.name}</h3>
                            <p className="text-secondary font-medium mt-1">{mentor.role}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
