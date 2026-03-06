import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Linkedin, Github, Instagram, ArrowUpRight } from 'lucide-react';

const links = [
    { name: 'LinkedIn', icon: <Linkedin size={24} />, url: 'https://linkedin.com/in/parthashankar', color: 'hover:text-blue-500 hover:border-blue-500' },
    { name: 'GitHub', icon: <Github size={24} />, url: 'https://github.com/parthashankar', color: 'hover:text-gray-100 hover:border-gray-100' },
    { name: 'Instagram', icon: <Instagram size={24} />, url: 'https://instagram.com/partha_shankar', color: 'hover:text-pink-500 hover:border-pink-500' }
];

export default function Contact() {
    return (
        <footer className="w-full py-24 px-6 md:px-24 bg-black relative border-t border-white/5 overflow-hidden">
            {/* Decorative Orbs */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] md:w-[40vw] md:h-[40vw] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />

            <div className="max-w-7xl mx-auto flex flex-col items-center justify-center relative z-10 text-center">
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-5xl md:text-7xl font-black font-heading tracking-tight text-white mb-6"
                >
                    LET'S <span className="text-secondary glow-text">CONNECT</span>
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="text-gray-400 text-lg md:text-xl max-w-2xl mb-12 font-light"
                >
                    Have an idea or want to collaborate? I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
                </motion.p>

                <motion.a
                    href="mailto:parthashankar21@gmail.com"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="group flex items-center justify-center gap-4 bg-white/10 backdrop-blur-md px-8 py-5 rounded-full border border-white/20 hover:bg-white hover:text-black transition-all duration-500 mb-16 shadow-[0_0_30px_rgba(59,130,246,0.2)]"
                >
                    <Mail className="group-hover:animate-bounce" />
                    <span className="text-xl font-bold font-heading hidden sm:inline">parthashankar21@gmail.com</span>
                    <ArrowUpRight className="opacity-50 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                </motion.a>

                <div className="flex gap-6 md:gap-12">
                    {links.map((link, idx) => (
                        <motion.a
                            key={idx}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.6 + (idx * 0.1) }}
                            className={`p-4 rounded-full border border-gray-800 bg-gray-900/50 text-gray-400 transition-all duration-300 ${link.color} shadow-lg hover:shadow-2xl`}
                            aria-label={link.name}
                        >
                            {link.icon}
                        </motion.a>
                    ))}
                </div>

                <div className="mt-24 text-gray-600 font-medium text-sm flex flex-col md:flex-row items-center justify-between w-full border-t border-white/5 pt-8">
                    <p>© {new Date().getFullYear()} Partha Shankar. All Rights Reserved.</p>
                    <p className="mt-2 md:mt-0">Built with React, Framer Motion & GSAP</p>
                </div>
            </div>
        </footer>
    );
}
