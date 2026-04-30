import React from 'react';
import { motion } from 'framer-motion';
import { Award, Trophy, Code } from 'lucide-react';
import TiltCard from './TiltCard';

const Achievements = ({ theme }) => {
    const achievements = [
        {
            icon: <Trophy className="w-8 h-8" />,
            title: "Google Student Ambassador",
            description: "Selected to lead AI initiatives and promote Gemini LLM integration within the university tech community.",
            date: "Aug 2025 - Present"
        },
        {
            icon: <Code className="w-8 h-8" />,
            title: "IBM SkillsBuild Verified",
            description: "Awarded a verified competency credential for mastering core Artificial Intelligence concepts, including machine learning workflows.",
            date: "September 2025"
        },
        {
            icon: <Award className="w-8 h-8" />,
            title: "Competitive Programming",
            description: "Building strong problem-solving skills through algorithmic challenges and optimizing data structures.",
            date: "Ongoing"
        }
    ];

    return (
        <section id="achievements" className="py-20 bg-cream dark:bg-dark-bg transition-colors duration-300">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <p className="text-brown dark:text-primary-cyan font-mono tracking-widest text-sm mb-2">&lt;MILESTONES /&gt;</p>
                    <h2 className="text-4xl md:text-5xl font-bold text-charcoal dark:text-white">Achievements</h2>
                    <div className="w-20 h-1 bg-brown dark:bg-primary-cyan mx-auto rounded-full mt-4" />
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8">
                    {achievements.map((item, index) => (
                        <TiltCard key={index} className="h-full">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="relative overflow-hidden bg-white/50 dark:bg-black/40 backdrop-blur-sm border border-brown/10 dark:border-white/10 p-8 rounded-2xl h-full flex flex-col group hover:border-brown/30 dark:hover:border-primary-cyan/30 transition-colors"
                            >
                                {/* Shine Effect Layer */}
                                <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
                                    <motion.div
                                        animate={{
                                            x: ['-200%', '200%']
                                        }}
                                        transition={{
                                            duration: 1,
                                            repeat: Infinity,
                                            repeatDelay: 1.5, // 1 + 1.5 = 2.5s total cycle
                                            ease: "easeInOut"
                                        }}
                                        className={`w-1/2 h-full bg-gradient-to-r from-transparent ${theme === 'dark' ? 'via-primary-cyan/20' : 'via-brown/20'} to-transparent skew-x-[-30deg]`}
                                    />
                                </div>

                                <div className="relative z-10 flex flex-col h-full">
                                    <div className="text-brown dark:text-primary-cyan mb-6 bg-brown/10 dark:bg-primary-cyan/10 w-16 h-16 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                        {item.icon}
                                    </div>
                                    <h3 className="text-xl font-bold text-charcoal dark:text-white mb-3">{item.title}</h3>
                                    <p className="text-gray-600 dark:text-gray-400 mb-6 flex-grow">{item.description}</p>
                                    <span className="text-sm font-mono text-brown dark:text-primary-cyan/80 mt-auto">
                                        {item.date}
                                    </span>
                                </div>
                            </motion.div>
                        </TiltCard>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Achievements;
