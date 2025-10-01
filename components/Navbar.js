// components/Navbar.jsx
"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // AnimatePresence FIX
import { FaTerminal, FaTimes } from 'react-icons/fa';

// Array of sections to track
const sections = ['about', 'skills', 'projects', 'contact'];

// Passed terminal props from Home.jsx
export default function Navbar({ isTerminalOpen, setIsTerminalOpen, TerminalContent }) {
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('home');
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // --- Dynamic Contrast (Sticky Blur) Effect & Active Section Highlighting ---
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 100);
            
            let currentActive = 'home';
            
            sections.forEach(id => {
                const element = document.getElementById(id);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    // Check if the section is prominently visible (near the top)
                    if (rect.top <= 50 && rect.bottom >= 50) {
                        currentActive = id;
                    }
                }
            });
            setActiveSection(currentActive);
        };

        handleScroll();
        window.addEventListener('scroll', handleScroll);
        
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    
    // --- Smooth scroll function ---
    const handleScrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
        setIsMenuOpen(false);
    };

    const navItems = [
        { name: 'About', id: 'about' },
        { name: 'Skills', id: 'skills' },
        { name: 'Projects', id: 'projects' },
        { name: 'Contact', id: 'contact' },
    ];

    return (
        <>
            {/* Main Navbar Bar */}
            <motion.nav
                // FIXED: Ensure w-full and correct sizing to remove white space
                className={`fixed top-0 left-0 z-50 w-full transition-all duration-300 py-4 px-6 md:px-12 
                    ${scrolled 
                        ? 'bg-[#0a0a0a]/80 backdrop-blur-md border-b border-indigo-700/30 shadow-lg' 
                        : 'bg-transparent'
                    }`}
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                // SPEED INCREASED
                transition={{ type: "spring", stiffness: 200, damping: 25, delay: 0.1 }}
            >
                <div className="flex items-center justify-between max-w-7xl mx-auto">
                    {/* Logo / Name */}
                    <a 
                        href="#top" 
                        onClick={() => handleScrollToSection('top')}
                        className="text-2xl font-bold text-indigo-400 hover:text-indigo-300 transition-colors"
                        aria-label="Go to the home section of Karthik V T's portfolio"
                    >
                        KV<span className="text-white">T.dev</span>
                    </a>

                    {/* Desktop Menu & Terminal Toggle */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navItems.map((item) => (
                            <a
                                key={item.id}
                                href={`#${item.id}`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleScrollToSection(item.id);
                                }}
                                className={`relative text-lg transition-colors hover:text-indigo-400 
                                    ${activeSection === item.id 
                                        ? 'text-indigo-400 font-semibold' 
                                        : 'text-gray-300'
                                    }`}
                                aria-label={`Maps to the ${item.name} section`}
                            >
                                {item.name}
                                {/* Underline indicator for active section */}
                                {activeSection === item.id && (
                                    <motion.div
                                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-400"
                                        layoutId="navbar-active-underline"
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    />
                                )}
                            </a>
                        ))}
                        
                        {/* Terminal Toggle Button in Navbar (Desktop) */}
                        <motion.button
                            onClick={() => setIsTerminalOpen(!isTerminalOpen)}
                            className={`w-10 h-10 rounded-full shadow-md text-white text-xl transition-colors duration-300 ml-4 flex items-center justify-center 
                                        ${isTerminalOpen ? 'bg-red-600 hover:bg-red-700' : 'bg-indigo-600 hover:bg-indigo-700'}`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.9 }}
                            aria-label={isTerminalOpen ? "Close interactive terminal" : "Open interactive terminal"}
                        >
                            <AnimatePresence mode="wait" initial={false}>
                                <motion.div
                                    key={isTerminalOpen ? "close" : "open"}
                                    initial={{ scale: 0.5, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0.5, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    {isTerminalOpen ? <FaTimes /> : <FaTerminal />}
                                </motion.div>
                            </AnimatePresence>
                        </motion.button>
                        {/* ------------------------------------ */}
                    </div>

                    {/* Mobile Menu Button (and Terminal Button on mobile) */}
                    <div className="flex md:hidden space-x-4 items-center">
                        <button
                            className="text-gray-300 text-2xl"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            aria-expanded={isMenuOpen}
                            aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                        >
                            {isMenuOpen ? (
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                            ) : (
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
                            )}
                        </button>
                        <motion.button
                            onClick={() => setIsTerminalOpen(!isTerminalOpen)}
                            className={`w-8 h-8 rounded-full shadow-md text-white text-lg transition-colors duration-300 flex items-center justify-center 
                                        ${isTerminalOpen ? 'bg-red-600 hover:bg-red-700' : 'bg-indigo-600 hover:bg-indigo-700'}`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.9 }}
                            aria-label={isTerminalOpen ? "Close interactive terminal" : "Open interactive terminal"}
                        >
                            <FaTerminal />
                        </motion.button>
                    </div>
                </div>

                {/* Mobile Menu Dropdown */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            className="md:hidden mt-4 pt-2 border-t border-indigo-700/30 flex flex-col items-center space-y-3 pb-2"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            {navItems.map((item) => (
                                <a
                                    key={item.id}
                                    href={`#${item.id}`}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleScrollToSection(item.id);
                                    }}
                                    className={`w-full text-center py-2 text-lg transition-colors 
                                        ${activeSection === item.id 
                                            ? 'text-indigo-400 font-semibold bg-[#1a1a1a] rounded-lg' 
                                            : 'text-gray-300 hover:text-indigo-400'
                                        }`}
                                    aria-label={`Maps to the ${item.name} section`}
                                >
                                    {item.name}
                                </a>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.nav>
            
            {/* Terminal Dropdown (Appears when toggled) */}
            <AnimatePresence>
                {isTerminalOpen && (
                    <motion.div
                        className="fixed top-20 right-4 z-[51] w-full max-w-sm md:max-w-md lg:max-w-lg"
                        initial={{ opacity: 0, y: -20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 150, damping: 20 }}
                    >
                        {TerminalContent}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}