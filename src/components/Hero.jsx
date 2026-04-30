import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Download, Mail, Github, Linkedin } from 'lucide-react';
import Img from '../assets/my_pic.jpg';
import leetcodeImg from '../assets/leetcode.png';

const useTypewriter = (words, typingSpeed = 50, deletingSpeed = 30, pauseDuration = 1500) => {
    const [index, setIndex] = useState(0);
    const [subIndex, setSubIndex] = useState(0);
    const [reverse, setReverse] = useState(false);
    const [blink, setBlink] = useState(true);

    // Blinking cursor effect
    useEffect(() => {
        const timeout2 = setTimeout(() => {
            setBlink((prev) => !prev);
        }, 500);
        return () => clearTimeout(timeout2);
    }, [blink]);

    useEffect(() => {
        // When finished typing a word, pause before reversing
        if (subIndex === words[index].length && !reverse) {
            const timeout = setTimeout(() => {
                setReverse(true);
            }, pauseDuration);
            return () => clearTimeout(timeout);
        }

        // When finished deleting a word, move to next
        if (subIndex === 0 && reverse) {
            setReverse(false);
            setIndex((prev) => (prev + 1) % words.length);
            return;
        }

        const timeout = setTimeout(() => {
            setSubIndex((prev) => prev + (reverse ? -1 : 1));
        }, reverse ? deletingSpeed : typingSpeed + Math.random() * 50);

        return () => clearTimeout(timeout);
    }, [subIndex, index, reverse, words, typingSpeed, deletingSpeed, pauseDuration]);

    return `${words[index].substring(0, subIndex)}${blink ? "|" : " "}`;
};

const TYPED_WORDS = [
    "Full Stack Developer",
    "Google Student Ambassador",
    "AI Enthusiast",
    "Problem Solver"
];

const Hero = ({ theme }) => {
    const imageContainerRef = useRef(null);
    const [glowStyle, setGlowStyle] = useState({ opacity: 0, background: '' });

    // Typing Effect Text - Consistently fast typing and deleting
    const typedText = useTypewriter(TYPED_WORDS, 60, 60, 2000);

    const socialLinks = [
        { icon: <Github size={24} className="text-[#333] dark:text-white" />, url: "https://github.com/renisha-koti" },
        { icon: <Linkedin size={24} className="text-[#0077b5]" />, url: "https://linkedin.com/in/renisha-koti" }
    ];

    // Global listener for orbital border glow
    useEffect(() => {
        const handleMouseMove = (e) => {
            if (!imageContainerRef.current) return;
            const rect = imageContainerRef.current.getBoundingClientRect();

            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const dx = e.clientX - centerX;
            const dy = e.clientY - centerY;

            const distanceFromCenter = Math.sqrt(dx * dx + dy * dy);
            const imageRadius = rect.width / 2;

            // New request: 1000px from CENTER
            const MAX_DISTANCE = 1000;

            if (distanceFromCenter <= MAX_DISTANCE) {
                // Strength calculation: 1 at center, 0 at 1000px
                // You can tweak this curve (e.g., exponential) if linear is too harsh/soft
                let strength = 1 - (distanceFromCenter / MAX_DISTANCE);
                // Clamp strength to ensure it's valid
                strength = Math.max(0, Math.min(1, strength));

                // 🔄 ANGLE AROUND THE IMAGE (Orbital Logic)
                const angle = Math.atan2(dy, dx);

                // Glow moves around the image edge. 
                // "Pulling effect": The glow sits on the edge closest to cursor.
                // We keep it slightly outside the image radius so it bleeds nicely.
                const glowRadius = imageRadius + 20;
                const glowX = (rect.width / 2) + Math.cos(angle) * glowRadius;
                const glowY = (rect.height / 2) + Math.sin(angle) * glowRadius;

                // Determine Color based on Theme
                // Light Mode: Darker Sand (approx #B48C5A) -> rgba(180, 140, 90, ...)
                // Dark Mode: Cyan -> rgba(0, 240, 255, ...)
                const isLight = theme === 'light';
                const baseColor = isLight ? '180, 140, 90' : '0, 240, 255';

                setGlowStyle({
                    opacity: strength, // Opacity fades as you move away
                    background: `radial-gradient(circle at ${glowX}px ${glowY}px, rgba(${baseColor}, ${0.8 * strength}), rgba(${baseColor}, 0.3), transparent 70%)`
                });
            } else {
                setGlowStyle({ opacity: 0, background: '' });
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('touchmove', handleMouseMove); // Add touch support
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('touchmove', handleMouseMove);
        };
    }, [theme]);

    return (
        <section id="home" className="min-h-screen flex items-center pt-16 md:pt-16 overflow-hidden relative">
            {/* FORCE Grid 12 Columns for granular control */}
            <div className="container grid grid-cols-12 gap-2 md:gap-4 items-center">

                {/* TEXT SECTION: 7 Columns on Mobile, 6 on Desktop */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative z-10 pl-1 md:pl-8 col-span-7 md:col-span-6"
                >
                    <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-brown dark:text-primary-cyan font-medium tracking-wide text-[10px] md:text-base"
                    >
                        HELLO, I'M
                    </motion.span>
                    <h1 className="text-xl sm:text-3xl md:text-7xl font-extrabold text-charcoal dark:text-white mt-1 md:mt-4 mb-2 md:mb-4 leading-tight">
                        Renisha{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brown to-light-brown dark:from-primary-cyan dark:to-cyan-600">
                            Koti
                        </span>
                    </h1>

                    {/* Animated Typing Text - Smaller on Mobile to prevent wrapping */}
                    <div className="text-xs sm:text-lg md:text-3xl font-bold text-gray-600 dark:text-gray-300 mb-3 md:mb-6 h-6 md:h-10 flex flex-wrap items-center">
                        <span className="text-brown dark:text-primary-cyan font-mono">
                            {typedText}
                        </span>
                    </div>

                    <p className="hidden md:block text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl leading-relaxed">
                        A results-driven Full Stack Developer and Google Student Ambassador specializing in modern web development and Artificial Intelligence.
                    </p>

                    <div className="flex flex-col md:flex-row gap-2 md:gap-4 mt-1 md:mt-8 items-center md:items-start w-fit">
                        <motion.a
                            href="#contact"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-charcoal dark:bg-primary-cyan text-white dark:text-black px-3 py-1.5 md:px-8 md:py-3 rounded-full flex items-center justify-center gap-2 font-medium text-[10px] md:text-base hover:bg-brown dark:hover:bg-cyan-400 transition-colors shadow-lg w-fit"
                        >
                            <Mail size={12} className="md:w-[18px] md:h-[18px]" />
                            <span className="hidden md:inline">Contact Me</span>
                            <span className="md:hidden">Contact</span>
                        </motion.a>
                        <motion.a
                            href="/My_Portfolio/resume.pdf"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            download
                            className="border-2 border-charcoal dark:border-primary-cyan text-charcoal dark:text-primary-cyan px-3 py-1.5 md:px-8 md:py-3 rounded-full flex items-center justify-center gap-2 font-medium text-[10px] md:text-base hover:bg-charcoal hover:text-white dark:hover:bg-primary-cyan/10 transition-all w-fit"
                        >
                            <Download size={12} className="md:w-[18px] md:h-[18px]" />
                            Resume
                        </motion.a>
                    </div>
                </motion.div>

                {/* IMAGE SECTION: 5 Columns on Mobile, 6 on Desktop */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{
                        opacity: 1,
                        scale: 1,
                        y: [-15, 5, -15] // Sitting higher and floating
                    }}
                    transition={{
                        opacity: { duration: 0.8, delay: 0.2 },
                        scale: { duration: 0.8, delay: 0.2 },
                        y: {
                            duration: 5,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }
                    }}
                    className="flex flex-col items-center justify-center relative p-1 md:p-8 col-span-5 md:col-span-6"
                >
                    <div className="relative flex flex-col items-center group/hero-container">
                        <div
                            ref={imageContainerRef}
                            className="relative w-28 h-28 sm:w-48 sm:h-48 md:w-96 md:h-96 flex items-center justify-center transition-transform duration-500 ease-out hover:scale-105 z-10"
                        >
                            {/* Orbital Border Glow - No Pulse, Fixed to Edge */}
                            <div
                                className="absolute rounded-full pointer-events-none transition-opacity duration-150 ease-out -inset-5 md:-inset-10 blur-xl md:blur-2xl"
                                style={{
                                    // inset & filter moved to className for responsiveness
                                    background: glowStyle.background,
                                    opacity: glowStyle.opacity,
                                    zIndex: -1
                                }}
                            />

                            {/* Static Subtle Glow Background (Base) */}
                            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-brown/10 to-transparent dark:from-primary-cyan/20 dark:to-transparent blur-lg md:blur-3xl -z-10 animate-pulse"></div>

                            <img
                                src={Img}
                                alt="Renisha Koti"
                                className="w-full h-full object-cover rounded-full border-2 md:border-4 border-white/50 dark:border-primary-cyan/30 shadow-lg md:shadow-2xl relative z-10"
                                style={{
                                    boxShadow: theme === 'dark'
                                        ? '0 0 40px rgba(0, 240, 255, 0.2)'
                                        : '0 0 30px rgba(180, 140, 90, 0.2)'
                                }}
                            />
                        </div> {/* Closes imageContainerRef */}

                        {/* Social Links & Role Badge - Positioned below the image, separated from image hover */}
                        <div className="flex flex-col items-center gap-4 mt-4 md:mt-6 z-20">
                            {/* Machine Learning Engineer Badge */}
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                    scale: [1, 1.02, 1]
                                }}
                                transition={{
                                    delay: 0.8,
                                    scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                                }}
                                className="bg-white/40 dark:bg-white/5 backdrop-blur-xl px-4 py-1.5 md:px-6 md:py-2 rounded-xl border border-brown/10 dark:border-white/10 shadow-xl whitespace-nowrap"
                            >
                                <span className="text-[10px] md:text-sm font-bold text-brown dark:text-primary-cyan uppercase tracking-wider">
                                    Google Student Ambassador
                                </span>
                            </motion.div>

                            {/* Social Icons as Styled Boxes */}
                            <div className="flex gap-4 md:gap-6 mt-2 pb-4">
                                {socialLinks.map((link, index) => (
                                    <motion.a
                                        key={index}
                                        href={link.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                                        animate={{
                                            opacity: 1,
                                            y: 0,
                                            scale: 0.9,
                                            transition: { delay: 1 + index * 0.1, duration: 0.5 }
                                        }}
                                        whileHover={{
                                            y: -5,
                                            scale: 1.1,
                                            backgroundColor: theme === 'dark' ? "rgba(255, 255, 255, 0.1)" : "rgba(180, 140, 90, 0.3)"
                                        }}
                                        transition={{ duration: 0.2 }} // Default for all other states (like un-hover)
                                        className="w-10 h-10 md:w-14 md:h-14 flex items-center justify-center bg-white/30 dark:bg-white/5 backdrop-blur-md rounded-xl border border-brown/10 dark:border-white/10 hover:border-brown/40 dark:hover:border-primary-cyan/40 shadow-lg"
                                    >
                                        <div className="transition-all duration-200">
                                            {link.icon}
                                        </div>
                                    </motion.a>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer"
                onClick={() => document.getElementById('about').scrollIntoView({ behavior: 'smooth' })}
            >
                <ArrowDown className="animate-bounce text-brown dark:text-primary-cyan" />
            </motion.div>
        </section>
    );
};

export default Hero;
