import React from 'react';
import { motion } from 'framer-motion';

const skillsData = [
    { category: 'Languages', items: ['Python', 'C++', 'JavaScript', 'SQL'] },
    { category: 'Web Technologies', items: ['HTML5', 'CSS3', 'React.js', 'Node.js', 'Express.js', 'Flask', 'Bootstrap', 'Tailwind CSS', 'REST APIs'] },
    { category: 'AI & ML', items: ['PyTorch', 'TensorFlow', 'Transformers', 'LangChain', 'OpenCV', 'Computer Vision', 'Deep Learning', 'RAG', 'Vector DBs'] },
    { category: 'Databases & Cloud', items: ['MongoDB', 'MySQL', 'PostgreSQL', 'AWS (EC2, S3, Lambda)', 'GCP', 'Docker', 'CI/CD Pipelines'] },
    { category: 'Tools', items: ['Git', 'GitHub', 'VS Code', 'Postman', 'Linux', 'Jupyter', 'NumPy', 'Pandas', 'Scikit-learn'] },
];

export default function Skills() {
    return (
        <section className="w-full py-24 px-6 md:px-24 bg-gray-900/40 relative border-t border-b border-white/5">
            <div className="max-w-7xl mx-auto z-10 relative">
                <h2 className="text-4xl md:text-5xl font-extrabold font-heading text-white text-center mb-16">
                    TECHNICAL <span className="text-secondary glow-text">ARSENAL</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {skillsData.map((skillGroup, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9, y: 30 }}
                            whileInView={{ opacity: 1, scale: 1, y: 0 }}
                            viewport={{ once: true, margin: "-10%" }}
                            transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                            className="p-8 rounded-3xl bg-black/40 backdrop-blur-sm border border-white/10 hover:border-secondary/50 transition-colors shadow-2xl"
                        >
                            <h3 className="text-2xl font-bold text-white mb-6 uppercase tracking-wider">{skillGroup.category}</h3>
                            <div className="flex flex-wrap gap-3">
                                {skillGroup.items.map((item, i) => (
                                    <span
                                        key={i}
                                        className="px-4 py-2 bg-gray-800 text-gray-300 rounded-lg text-sm font-semibold hover:bg-secondary hover:text-white transition-all duration-300 cursor-default"
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
