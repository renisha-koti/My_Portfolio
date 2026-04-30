import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Github, ExternalLink, ArrowUpRight, ArrowDown } from 'lucide-react';
import documindImg from '../assets/documind.png';
import newsDigestImg from '../assets/news_digest.png';
import diabetesPredictorImg from '../assets/diabetes_predictor.png';
import landchatImg from '../assets/landchat.jpeg';

const projects = [
    {
        title: "Land Real Estate Chatbot",
        description: "An AI-driven eCommerce-style property marketplace featuring a natural language chatbot for property discovery.",
        details: [
            "Handled over 500+ natural language queries via Gemini Pro LLM.",
            "Built a scalable backend with Node.js, Express, and MongoDB.",
            "Real-time listing management and secure JWT-based authentication.",
            "Responsive chat interface with React.js and Tailwind CSS."
        ],
        tags: ["React.js", "Node.js", "MongoDB", "Gemini AI", "Tailwind CSS"],
        link: "https://github.com/renisha-koti",
        liveLink: null,
        date: "March 2026",
        image: landchatImg
    },
    {
        title: "BYOD Enterprise Management System",
        description: "A secure web-based system for real-time monitoring and classroom administration of concurrent devices.",
        details: [
            "Real-time monitoring of 100+ concurrent devices with low latency.",
            "Centralized dashboards for activity tracking and policy management.",
            "Improved classroom device oversight efficiency by 75%.",
            "Designed responsive UI screens using Tailwind CSS."
        ],
        tags: ["PHP", "MongoDB", "Tailwind CSS", "JavaScript", "HTML"],
        link: "https://github.com/renisha-koti",
        liveLink: null,
        date: "October 2025",
        image: newsDigestImg
    }
];

const ProjectCard = ({ project, index }) => {
    const [hovered, setHovered] = useState(false);

    return (
        <div
            className="relative w-[85vw] md:w-[700px] lg:w-[750px] h-[50vh] md:h-[500px] flex-shrink-0 rounded-2xl overflow-hidden bg-white dark:bg-white/5 border border-brown/10 dark:border-white/10 shadow-md hover:shadow-xl backdrop-blur-sm group hover:border-brown dark:hover:border-primary-cyan transition-all duration-500"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            {/* Background Image */}
            <div className="absolute inset-0 h-[45%] md:h-[60%] overflow-hidden">
                <div className="absolute inset-0 bg-black/5 dark:bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                />
            </div>

            {/* Content Panel — expands up on hover */}
            <div className="absolute bottom-0 left-0 right-0 bg-white dark:bg-[#121212] border-t border-brown/10 dark:border-white/10 z-20 flex flex-col transition-all duration-500 ease-in-out"
                style={{
                    height: hovered ? '72%' : '45%',
                    padding: '20px 28px 18px',
                }}
            >
                {/* Header row: date + icons */}
                <div className="flex items-center justify-between mb-2 flex-shrink-0">
                    <span className="text-brown dark:text-primary-cyan font-mono text-sm tracking-wide font-semibold">
                        {project.date}
                    </span>
                    <div className="flex gap-4">
                        {project.liveLink && (
                            <a
                                href={project.liveLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group/link relative text-brown/70 dark:text-gray-100/70 hover:text-brown dark:hover:text-primary-cyan transition-colors"
                            >
                                <ArrowUpRight size={20} />
                                <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-charcoal dark:bg-black rounded opacity-0 group-hover/link:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
                                    Live Link
                                </span>
                            </a>
                        )}
                        <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group/link relative text-brown/70 dark:text-gray-100/70 hover:text-brown dark:hover:text-primary-cyan transition-colors"
                        >
                            <Github size={20} />
                            <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-charcoal dark:bg-black rounded opacity-0 group-hover/link:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
                                GitHub
                            </span>
                        </a>
                    </div>
                </div>

                {/* Title */}
                <h2 className="text-2xl md:text-3xl font-bold text-charcoal dark:text-gray-100 mb-2 leading-tight group-hover:text-brown dark:group-hover:text-primary-cyan transition-colors flex-shrink-0">
                    {project.title}
                </h2>

                {/* Description */}
                <p className="text-brown/80 dark:text-gray-400 text-sm md:text-base leading-relaxed mb-3 flex-shrink-0">
                    {project.description}
                </p>

                {/* Key Features — revealed on hover */}
                <div
                    className="overflow-hidden transition-all duration-500 ease-in-out flex-shrink-0"
                    style={{
                        maxHeight: hovered ? '200px' : '0px',
                        opacity: hovered ? 1 : 0,
                        marginBottom: hovered ? '24px' : '0px',
                    }}
                >
                    <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-brown dark:text-primary-cyan mb-2">
                        ✦ Key Features
                    </p>
                    <ul className="space-y-1">
                        {project.details.map((feat, i) => (
                            <li key={i} className="flex items-start gap-2 group/feat">
                                {/* Accent dot — matches theme color */}
                                <span className="mt-[5px] w-1.5 h-1.5 rounded-full flex-shrink-0 bg-brown dark:bg-primary-cyan opacity-60 group-hover/feat:opacity-100 transition-opacity duration-200" />
                                <span className="text-xs text-brown/80 dark:text-gray-400 leading-snug group-hover/feat:text-brown dark:group-hover/feat:text-primary-cyan transition-colors duration-200">
                                    {feat}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Tags — always visible at bottom */}
                <div className="flex flex-wrap gap-2 mt-auto flex-shrink-0">
                    {project.tags.map(tag => (
                        <span key={tag} className="text-xs font-medium px-3 py-1 bg-black dark:bg-primary-cyan/5 text-white dark:text-primary-cyan rounded-full border-none dark:border dark:border-primary-cyan/20 transition-colors">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

const Projects = () => {
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    // Detect screen width to adjust scroll range
    const [scrollRange, setScrollRange] = useState(["1%", "-60%"]);

    useEffect(() => {
        const updateRange = () => {
            // Mobile: Adjusted for 4 cards to prevent trailing gap
            if (window.innerWidth < 768) {
                setScrollRange(["1%", "-72%"]);
            } else {
                // Desktop: -60% fits 4 projects perfectly in the horizontal track
                setScrollRange(["1%", "-60%"]);
            }
        };

        updateRange(); // Initial check
        window.addEventListener('resize', updateRange);
        return () => window.removeEventListener('resize', updateRange);
    }, []);

    const x = useTransform(scrollYProgress, [0, 1], scrollRange);

    return (
        <section ref={targetRef} id="projects" className="relative h-[300vh] bg-white dark:bg-black transition-colors duration-500">
            <div className="sticky top-0 h-screen flex items-center overflow-hidden">

                {/* Large Background Title */}
                <div className="absolute top-1/2 left-10 transform -translate-y-1/2 z-0">
                    <h2 className="text-[12vw] font-bold text-brown/[0.05] dark:text-white/[0.03] select-none leading-none tracking-tighter transition-colors duration-300">
                        SELECTED <br /> WORKS
                    </h2>
                </div>

                {/* Horizontal Scroll Track */}
                <motion.div
                    style={{ x }}
                    className="flex gap-8 md:gap-12 pl-[5vw] pr-[50vw] items-center z-10"
                >
                    {/* Intro Card */}
                    <div className="w-[85vw] md:w-[400px] lg:w-[450px] flex-shrink-0 flex flex-col justify-center text-charcoal dark:text-white p-6 md:p-12 transition-colors duration-300">
                        <div className="w-12 h-1 bg-brown dark:bg-primary-cyan mb-6 transition-colors duration-300 shadow-[0_0_10px_rgba(0,240,255,0.3)]"></div>
                        <h3 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
                            Recent <br />
                            <span className="text-brown/60 dark:text-gray-500 transition-colors duration-300">Projects</span>
                        </h3>
                        <p className="text-brown/80 dark:text-gray-400 text-lg mb-8 transition-colors duration-300">
                            Solving complex problems with elegant code.
                        </p>
                        <div className="flex items-center gap-2 text-sm font-mono animate-blink text-brown dark:text-primary-cyan transition-colors duration-300">
                            <span>SCROLL TO EXPLORE</span>
                            <ArrowDown className="w-4 h-4" />
                        </div>
                    </div>

                    {projects.map((project, index) => (
                        <ProjectCard key={index} project={project} index={index} />
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Projects;
