import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Linkedin, Github, Instagram, ArrowUpRight, Send, Loader2, CheckCircle } from 'lucide-react';
import { getDistinctId, captureEvent, identifyUser } from '../lib/posthog';
import { resolveGeo } from '../lib/analytics';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const links = [
    { name: 'LinkedIn', icon: <Linkedin size={24} />, url: 'https://linkedin.com/in/parthashankar', color: 'hover:text-blue-500 hover:border-blue-500' },
    { name: 'GitHub', icon: <Github size={24} />, url: 'https://github.com/parthashankar', color: 'hover:text-gray-100 hover:border-gray-100' },
    { name: 'Instagram', icon: <Instagram size={24} />, url: 'https://instagram.com/partha_shankar', color: 'hover:text-pink-500 hover:border-pink-500' }
];

export default function Contact() {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState('idle');
    const footerRef = useRef(null);
    const orbRef = useRef(null);

    useEffect(() => {
        const anim = gsap.to(orbRef.current, {
            y: -80,
            ease: 'none',
            scrollTrigger: {
                trigger: footerRef.current,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 2,
            },
        });
        return () => anim.scrollTrigger?.kill();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');

        try {
            const geo = await resolveGeo();
            const distinctId = getDistinctId();

            const payload = {
                ...formData,
                posthog_distinct_id: distinctId,
                ...geo,
            };

            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (!res.ok) throw new Error('Failed to submit');

            // Identity Stitching in PostHog
            identifyUser(formData.email, formData.name);
            captureEvent('contact_form_submit', { email: formData.email });

            setStatus('success');
            setFormData({ name: '', email: '', message: '' });
            setTimeout(() => setStatus('idle'), 5000);
        } catch (err) {
            console.error(err);
            setStatus('error');
        }
    };

    return (
        <footer ref={footerRef} id="contact" className="w-full py-24 px-6 md:px-24 bg-black relative border-t border-white/5 overflow-hidden">
            <div ref={orbRef} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] md:w-[40vw] md:h-[40vw] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />

            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center lg:items-start justify-between gap-16 relative z-10">
                
                {/* Left side: Info */}
                <div className="flex-1 text-center lg:text-left">
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
                        className="text-gray-400 text-lg md:text-xl max-w-xl mx-auto lg:mx-0 mb-12 font-light"
                    >
                        Have an idea or want to collaborate? Send me a message below, and I'll get back to you as soon as possible.
                    </motion.p>

                    <motion.a
                        href="mailto:parthashankar21@gmail.com"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                        className="group inline-flex items-center justify-center gap-4 bg-white/10 backdrop-blur-md px-8 py-5 rounded-full border border-white/20 hover:bg-white hover:text-black transition-all duration-500 mb-12 shadow-[0_0_30px_rgba(59,130,246,0.2)]"
                    >
                        <Mail className="group-hover:animate-bounce" />
                        <span className="text-xl font-bold font-heading hidden sm:inline">parthashankar21@gmail.com</span>
                        <ArrowUpRight className="opacity-50 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                    </motion.a>

                    <div className="flex justify-center lg:justify-start gap-6">
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
                </div>

                {/* Right side: Form */}
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="flex-1 w-full max-w-md bg-white/[0.02] border border-white/[0.08] p-8 rounded-3xl backdrop-blur-sm"
                >
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">Name</label>
                            <input
                                required
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
                                placeholder="John Doe"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">Email</label>
                            <input
                                required
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="w-full bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
                                placeholder="john@example.com"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">Message</label>
                            <textarea
                                required
                                rows={4}
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                className="w-full bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors resize-none"
                                placeholder="Tell me about your project..."
                            />
                        </div>

                        <button
                            disabled={status === 'loading' || status === 'success'}
                            type="submit"
                            className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-xl transition-all disabled:opacity-50 mt-2"
                        >
                            {status === 'loading' ? (
                                <Loader2 className="animate-spin w-5 h-5" />
                            ) : status === 'success' ? (
                                <>
                                    <CheckCircle className="w-5 h-5" />
                                    Sent Successfully
                                </>
                            ) : (
                                <>
                                    <Send className="w-5 h-5" />
                                    Send Message
                                </>
                            )}
                        </button>
                        
                        {status === 'error' && (
                            <p className="text-red-400 text-xs text-center mt-2">Failed to send message. Please try again.</p>
                        )}
                    </form>
                </motion.div>
            </div>

            <div className="max-w-7xl mx-auto mt-24 text-gray-600 font-medium text-sm flex flex-col md:flex-row items-center justify-between w-full border-t border-white/5 pt-8">
                <p>© {new Date().getFullYear()} Partha Shankar. All Rights Reserved.</p>
                <p className="mt-2 md:mt-0">Built with React, Framer Motion & Cloudflare</p>
            </div>
        </footer>
    );
}
