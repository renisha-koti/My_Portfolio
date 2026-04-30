import React from 'react';
import { Github, Linkedin } from 'lucide-react';
import Hero from './Hero';
import AboutMe from './AboutMe';
import Skills from './Skills';
import Projects from './Projects';
import Achievements from './Achievements';
import Experience from './Experience';
import Contact from './Contact';
import Navbar from './Navbar';
import CursorFollower from './CursorFollower';
import leetcodeImg from '../assets/leetcode.png';

const Home = ({ theme, toggleTheme }) => {
    return (
        <>
            <CursorFollower theme={theme} />
            <Navbar theme={theme} toggleTheme={toggleTheme} />
            <Hero theme={theme} />
            <AboutMe />
            <Skills theme={theme} />
            <Projects theme={theme} />
            <Achievements theme={theme} />
            <Experience theme={theme} />
            <Contact theme={theme} />
            <footer className="bg-beige/50 dark:bg-card-dark text-brown dark:text-gray-400 py-8 transition-colors border-t border-brown/10 dark:border-white/10">
                <div className="container mx-auto px-12 md:px-32 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-6">
                        <a
                            href="https://github.com/renisha-koti"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:scale-110 transition-transform hover:text-charcoal dark:hover:text-white"
                            aria-label="GitHub"
                        >
                            <Github size={24} />
                        </a>
                        <a
                            href="https://www.linkedin.com/in/renisha-koti/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:scale-110 transition-transform hover:text-[#0077b5]"
                            aria-label="LinkedIn"
                        >
                            <Linkedin size={24} />
                        </a>
                    </div>

                    <p className="text-sm font-medium">&copy; {new Date().getFullYear()} Renisha Koti. All rights reserved.</p>
                </div>
            </footer>
        </>
    );
};

export default Home;
