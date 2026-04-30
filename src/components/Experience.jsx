import React, { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { GraduationCap, School, Award, BookOpen, Briefcase } from 'lucide-react';
import SpotlightCard from './SpotlightCard';


const EducationIcon = ({ progress, index, total, theme, icon }) => {
    // Calculate the point at which this specific icon should be "active"
    // Each item represents a segment of the scroll line
    const centerPoint = (index) / (total - 1);

    // We want the glow to trigger when the scroll line is nearby
    const start = centerPoint - 0.15;
    const end = centerPoint + 0.15;

    const active = useTransform(progress, [Math.max(0, start), centerPoint, Math.min(1, end)], [0, 1, 1]);
    const glow = useSpring(active, { stiffness: 100, damping: 30 });

    const borderColor = useTransform(glow, [0, 1],
        theme === 'dark' ? ["rgba(0,0,0,0)", "rgba(0,240,255,0.6)"] : ["rgba(0,0,0,0)", "rgba(180,140,90,0.6)"]
    );
    const color = useTransform(glow, [0, 1],
        theme === 'dark' ? ["rgba(255,255,255,0.05)", "rgba(0,240,255,1)"] : ["rgba(0,0,0,0.1)", "rgba(180,140,90,1)"]
    );
    const backgroundColor = useTransform(glow, [0, 1],
        theme === 'dark' ? ["rgba(0,0,0,0)", "rgba(15,15,15,0.8)"] : ["rgba(0,0,0,0)", "rgba(255,255,255,0.8)"]
    );
    const scale = useTransform(glow, [0, 1], [0.8, 1.2]);
    const boxShadow = useTransform(glow, [0, 1],
        theme === 'dark'
            ? ["0 0 0px rgba(0,240,255,0)", "0 0 30px rgba(0,240,255,0.4)"]
            : ["0 0 0px rgba(180,140,90,0)", "0 0 20px rgba(180,140,90,0.3)"]
    );

    return (
        <motion.div
            style={{
                borderColor,
                color,
                backgroundColor,
                scale,
                boxShadow
            }}
            className="p-2.5 rounded-xl border-2 transition-none"
        >
            {icon}
        </motion.div>
    );
};

const Experience = ({ theme }) => {
    const educationRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: educationRef,
        offset: ["start center", "end center"]
    });
    const scaleY = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const education = [
        {
            period: "Sep 2023 - Present",
            title: "B.Tech in Computer Science & Engineering",
            institution: "Seshadri Rao Gudlavalleru Engineering College",
            score: "CGPA: 8.5/10",
            icon: <GraduationCap className="w-6 h-6" />
        },
        {
            period: "Aug 2021 - May 2023",
            title: "Intermediate (MPC)",
            institution: "Sri Chaitanya Junior College, Palakol",
            score: "Percentage: 92%",
            icon: <School className="w-6 h-6" />
        },
        {
            period: "Aug 2020 - Jun 2021",
            title: "SSC (10th Standard)",
            institution: "Sri Chaitanya School, Narsapur",
            score: "Percentage: 99%",
            icon: <BookOpen className="w-6 h-6" />
        }
    ];

    const certifications = [
        {
            date: "Nov 2025",
            title: "Design & Implementation of HCI",
            provider: "NPTEL",
            link: "#"
        },
        {
            date: "Nov 2025",
            title: "Privacy and Security in Online Social Media",
            provider: "NPTEL",
            link: "#"
        },
        {
            date: "Sep 2025",
            title: "AI Fundamentals",
            provider: "IBM",
            link: "#"
        },
        {
            date: "May 2025",
            title: "Java Programming",
            provider: "NPTEL",
            link: "#"
        },
        {
            date: "May 2024",
            title: "Computer Science Course CSX0001",
            provider: "Stanford Online",
            link: "#"
        }
    ];

    return (
        <section id="experience" className="py-24 bg-[#f5f2eb] dark:bg-[#0f0f0f] transition-colors duration-300">
            <div className="container px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="text-center mb-20"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-charcoal dark:text-white mb-4">Journey & Learning</h2>
                    <p className="text-brown/70 dark:text-gray-400 max-w-2xl mx-auto">A roadmap of my academic foundations and professional certifications.</p>
                </motion.div>

                <div className="max-w-5xl mx-auto">
                    <div className="space-y-24">
                        {/* Education Section */}
                        <div className="w-full" ref={educationRef}>
                            <div className="flex items-center gap-4 mb-16">
                                <div className="p-3 bg-brown/10 dark:bg-primary-cyan/10 rounded-xl text-brown dark:text-primary-cyan">
                                    <GraduationCap className="w-6 h-6" />
                                </div>
                                <h3 className="text-2xl font-bold text-charcoal dark:text-white">Education Timeline</h3>
                            </div>

                            <div className="relative">
                                {/* Vertical Scroll Track */}
                                <div className="absolute left-12 top-8 bottom-8 w-[2px] bg-brown/10 dark:bg-primary-cyan/10 rounded-full hidden sm:block" />

                                {/* Glowing Progress Line - Strictly Scroll Linked */}
                                <motion.div
                                    className={`absolute left-12 top-8 bottom-8 w-[2px] rounded-full origin-top hidden sm:block z-0 ${theme === 'dark' ? 'bg-primary-cyan shadow-[0_0_15px_rgba(0,240,255,0.5)]' : 'bg-brown shadow-[0_0_15px_rgba(180,140,90,0.5)]'}`}
                                    style={{ scaleY }}
                                />

                                <div className="space-y-16">
                                    {education.map((item, idx) => (
                                        <div key={idx} className="relative pl-0 sm:pl-28 group">
                                            {/* Icon positioned ON the line - precisely centered and scroll-aware */}
                                            <div className="absolute left-6 top-1/2 -translate-y-1/2 z-20 hidden sm:flex w-12 h-12 items-center justify-center">
                                                <EducationIcon
                                                    progress={scrollYProgress}
                                                    index={idx}
                                                    total={education.length}
                                                    theme={theme}
                                                    icon={item.icon}
                                                />
                                            </div>

                                            <motion.div
                                                initial={{ opacity: 0, x: 20 }}
                                                whileInView={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.2 }}
                                            >
                                                <SpotlightCard
                                                    spotlightColor={theme === 'light' ? "rgba(180, 140, 90, 0.1)" : "rgba(0, 240, 255, 0.1)"}
                                                    className="p-8 rounded-[2rem] bg-white/40 dark:bg-white/5 border border-brown/10 dark:border-white/10 hover:border-brown/30 dark:hover:border-primary-cyan/30 transition-all shadow-sm"
                                                >
                                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                                        <div>
                                                            <span className="text-xs font-bold text-brown/60 dark:text-primary-cyan/60 uppercase tracking-[0.2em]">{item.period}</span>
                                                            <h4 className="text-2xl font-bold text-charcoal dark:text-white mt-1 group-hover:text-brown dark:group-hover:text-primary-cyan transition-colors">{item.title}</h4>
                                                            <p className="text-gray-600 dark:text-gray-400 font-medium mt-1">{item.institution}</p>
                                                        </div>
                                                        <div className="flex-shrink-0">
                                                            <span className="px-5 py-2 bg-brown/10 dark:bg-primary-cyan/10 text-brown dark:text-primary-cyan rounded-full text-xs font-bold ring-1 ring-inset ring-brown/20 dark:ring-primary-cyan/20 group-hover:bg-brown dark:group-hover:bg-primary-cyan group-hover:text-white dark:group-hover:text-black transition-all">
                                                                {item.score}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </SpotlightCard>
                                            </motion.div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Certifications Section */}
                        <div className="w-full">
                            <div className="flex items-center gap-4 mb-10">
                                <div className="p-3 bg-brown/10 dark:bg-primary-cyan/10 rounded-xl text-brown dark:text-primary-cyan">
                                    <Award className="w-6 h-6" />
                                </div>
                                <h3 className="text-2xl font-bold text-charcoal dark:text-white">Certifications</h3>
                            </div>

                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {certifications.map((cert, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        whileHover={{ y: -5 }}
                                        className="group relative rounded-2xl bg-white dark:bg-white/5 border border-brown/20 dark:border-white/10 hover:border-brown dark:hover:border-primary-cyan transition-all p-6 flex flex-col gap-4 shadow-md hover:shadow-xl"
                                    >
                                        <div className="flex justify-between items-start">
                                            <div className="flex items-center gap-2">
                                                <div className="w-1.5 h-1.5 rounded-full bg-brown dark:bg-primary-cyan animate-pulse" />
                                                <span className="text-[10px] font-bold text-brown/60 dark:text-primary-cyan/60 uppercase tracking-wider">{cert.date}</span>
                                            </div>
                                            <div className="p-2.5 rounded-xl bg-brown/10 dark:bg-primary-cyan/10 text-brown dark:text-primary-cyan group-hover:bg-brown dark:group-hover:bg-primary-cyan group-hover:text-white dark:group-hover:text-black transition-all">
                                                <Award className="w-5 h-5" />
                                            </div>
                                        </div>

                                        <div className="flex-grow">
                                            <h4 className="text-[17px] font-bold text-charcoal dark:text-white leading-tight group-hover:text-brown dark:group-hover:text-primary-cyan transition-colors">
                                                {cert.title}
                                            </h4>
                                            <p className="text-[13px] font-medium text-gray-600 dark:text-gray-400 mt-1.5">{cert.provider}</p>
                                        </div>

                                        <div className="pt-2">
                                            <motion.a
                                                href={cert.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                whileHover={{ scale: 1.02 }}
                                                className="inline-flex items-center justify-center w-full py-2.5 rounded-xl border border-brown/30 dark:border-primary-cyan/30 text-brown dark:text-primary-cyan text-xs font-bold hover:bg-brown/5 dark:hover:bg-primary-cyan/5 transition-colors"
                                            >
                                                Verify Credential
                                            </motion.a>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Experience;
