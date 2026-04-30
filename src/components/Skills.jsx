import React, { useRef } from 'react';
import {
    motion,
    useScroll,
    useSpring,
    useTransform,
    useMotionValue,
    useVelocity,
    useAnimationFrame
} from 'framer-motion';
import SpotlightCard from './SpotlightCard';
import TiltCard from './TiltCard';

const skillsData = [
    { category: "Languages", items: ["C", "C++", "Python", "Java", "JavaScript"] },
    { category: "Frameworks & Libs", items: ["HTML", "CSS", "React.js", "Node.js", "FastAPI", "Django", "Express.js", "Tailwind CSS"] },
    { category: "Tools & DB", items: ["MySQL", "MongoDB", "Git", "GitHub", "VS Code", "Vercel", "Render"] },
    { category: "Soft Skills", items: ["Problem-Solving", "Team Player", "Critical Thinking", "Consistency"] }
];

// Utility function for wrapping logic
const wrap = (min, max, v) => {
    const rangeSize = max - min;
    return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

const ParallaxText = ({ children, baseVelocity = 100 }) => {
    const baseX = useMotionValue(0);
    const { scrollY } = useScroll();
    const scrollVelocity = useVelocity(scrollY);
    const smoothVelocity = useSpring(scrollVelocity, {
        damping: 50,
        stiffness: 400
    });
    const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
        clamp: false
    });

    // Wrap x between -50% and 0%
    // We wrap between -50 and 0 because the children are duplicated to create 2 visual sets, 
    // and we duplicate that again here to ensure seamless looping for a total of 4 sets.
    const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);

    const directionFactor = useRef(1);

    useAnimationFrame((t, delta) => {
        let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

        /**
         * Change direction based on scroll velocity polarity
         */
        if (velocityFactor.get() < 0) {
            directionFactor.current = -1;
        } else if (velocityFactor.get() > 0) {
            directionFactor.current = 1;
        }

        moveBy += directionFactor.current * moveBy * velocityFactor.get();

        baseX.set(baseX.get() + moveBy);
    });

    /**
     * We render children twice here to create the seamless loop effect.
     * If the incoming children are already a list of items, this creates two blocks of those items.
     */
    return (
        <motion.div className="flex w-fit" style={{ x }}>
            {children}
            {children}
        </motion.div>
    );
}

const Skills = ({ theme }) => {
    const spotlightColor = theme === 'light'
        ? "rgba(180, 140, 90, 0.4)"
        : "rgba(0, 240, 255, 0.4)";

    const images = [
        { src: "react.svg", label: "React" },
        { src: "js.svg", label: "JavaScript" },
        { src: "python.svg", label: "Python" },
        { src: "java.svg", label: "Java" },
        { src: "c.svg", label: "C/C++" },
        { src: "html-5.svg", label: "HTML5" },
        { src: "css3.svg", label: "CSS3" },
        { src: "tailwind-css.svg", label: "Tailwind" },
        { src: "php.svg", label: "PHP" },
        { src: "sql.svg", label: "SQL" }
    ];

    // Create duplicated array for infinite scroll effect (2 sets)
    const duplicatedImages = [...images, ...images];

    return (
        <section id="skills" className="py-20 bg-[#f5f2eb] dark:bg-[#0f0f0f] transition-colors duration-300">
            <div className="container">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-4xl font-bold mb-16 text-center text-charcoal dark:text-white"
                >
                    My Skills
                </motion.h2>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {skillsData.map((group, index) => (
                        <TiltCard key={group.category} className="h-full">
                            <SpotlightCard
                                spotlightColor={spotlightColor}
                                className="h-full p-6 rounded-2xl bg-cream dark:bg-card-dark border border-beige/30 dark:border-white/5 transition-all group"
                            >
                                <h3 className="text-xl font-semibold mb-6 text-brown dark:text-primary-cyan border-b border-beige dark:border-gray-800 pb-2 inline-block">
                                    {group.category}
                                </h3>
                                <div className="flex flex-wrap gap-3">
                                    {group.items.map((skill) => (
                                        <span
                                            key={skill}
                                            className="bg-beige/20 dark:bg-white/5 text-charcoal dark:text-gray-300 text-sm px-3 py-1 rounded-md font-medium group-hover:text-brown dark:group-hover:text-primary-cyan transition-colors"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </SpotlightCard>
                        </TiltCard>
                    ))}
                </div>
            </div>

            <div className="mt-10 w-full max-w-[1400px] h-[100px] overflow-hidden relative bg-transparent py-2 mx-auto">
                <div className="absolute top-0 left-0 w-20 h-full z-10 bg-gradient-to-r from-[#f5f2eb] dark:from-[#0f0f0f] to-transparent pointer-events-none" />
                <div className="absolute top-0 right-0 w-20 h-full z-10 bg-gradient-to-l from-[#f5f2eb] dark:from-[#0f0f0f] to-transparent pointer-events-none" />

                <ParallaxText baseVelocity={1}>
                    {duplicatedImages.map((img, idx) => (
                        <div
                            key={idx}
                            className="bg-cream/80 dark:bg-white/5 border border-brown/10 dark:border-white/5 backdrop-blur-sm group flex flex-col items-center justify-center w-[150px] h-[80px] mx-[10px] rounded-xl flex-shrink-0 shadow-sm transition-all duration-300 hover:scale-105 hover:shadow-lg hover:border-brown dark:hover:border-primary-cyan cursor-pointer">
                            <img
                                src={img.src}
                                alt={img.label}
                                className={`w-[50px] h-[45px] object-cover rounded-xl transition-all duration-300 ${img.label === 'PHP' ? 'dark:brightness-0' : ''}`}
                            />
                            <p className="mt-2 text-sm font-medium text-charcoal dark:text-gray-300 transition-colors duration-300 group-hover:text-brown dark:group-hover:text-primary-cyan">
                                {img.label}
                            </p>
                        </div>
                    ))}
                </ParallaxText>
            </div>
        </section >
    );
};

export default Skills;
