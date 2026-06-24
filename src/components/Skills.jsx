import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const skillsData = [
    { category: 'Languages', items: ['Python', 'JavaScript', 'TypeScript', 'Java', 'C++', 'SQL'] },
    { category: 'Frontend', items: ['React 19', 'SvelteKit', 'Next.js', 'Three.js', 'D3.js', 'Leaflet.js', 'Framer Motion', 'Tailwind CSS', 'Bootstrap'] },
    { category: 'Backend & APIs', items: ['Node.js', 'Express.js', 'FastAPI', 'Flask', 'Server-Sent Events', 'Cloudflare Workers', 'Edge Computing'] },
    { category: 'AI & ML', items: ['PyTorch', 'Scikit-learn', 'XGBoost', 'LightGBM', 'TabPFN', 'Vision Transformers', 'OpenCV', 'SHAP', 'Grad-CAM++', 'LangChain', 'Transfer Learning', 'Computer Vision'] },
    { category: 'Databases', items: ['PostgreSQL', 'MongoDB', 'MySQL', 'SQLite', 'Cloudflare D1', 'Prisma ORM', 'Mongoose'] },
    { category: 'Cloud & DevOps', items: ['AWS (EC2, S3, Lambda)', 'Cloudflare Pages', 'Cloudflare R2', 'Neon PostgreSQL', 'Git', 'GitHub', 'Vite'] },
];

export default function Skills() {
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
                    <p className="text-xs font-semibold tracking-[0.2em] uppercase text-secondary mb-4">Skills</p>
                    <h2 className="text-4xl md:text-5xl font-black font-heading">Technical Arsenal</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {skillsData.map((group, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-8%' }}
                            transition={{ duration: 0.5, delay: index * 0.07, ease: 'easeOut' }}
                            className="p-6 rounded-2xl border border-white/8 bg-white/[0.02] hover:border-white/15 transition-colors duration-300"
                        >
                            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">{group.category}</h3>
                            <div className="flex flex-wrap gap-2">
                                {group.items.map((item, i) => (
                                    <span
                                        key={i}
                                        className="px-3 py-1 bg-gray-900 text-gray-300 rounded-md text-xs font-medium border border-white/5 hover:border-secondary/40 transition-colors duration-200 cursor-default"
                                    >
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
