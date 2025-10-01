// components/FloatingTerminal.jsx
"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTerminal, FaTimes } from 'react-icons/fa';
import TerminalSimulator from './TerminalSimulator';

export default function FloatingTerminal() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleTerminal = () => {
        setIsOpen(!isOpen);
    };

    return (
        // Fixed positioning in the bottom right corner
        <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end">
            
            {/* The Terminal Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="mb-4 w-full max-w-xs md:max-w-md lg:max-w-xl"
                        initial={{ opacity: 0, y: 50, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 50, scale: 0.8 }}
                        transition={{ type: "spring", stiffness: 150, damping: 20 }}
                    >
                        {/* Pass the prop to remove heavy margin */}
                        <TerminalSimulator reducedMargin={true} />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Floating Toggle Button */}
            <motion.button
                onClick={toggleTerminal}
                className={`w-16 h-16 rounded-full shadow-2xl text-white text-2xl transition-colors duration-300 flex items-center justify-center 
                            ${isOpen ? 'bg-red-600 hover:bg-red-700' : 'bg-indigo-600 hover:bg-indigo-700'}`}
                whileHover={{ scale: 1.1, rotate: isOpen ? 90 : 0 }}
                whileTap={{ scale: 0.9 }}
            >
                {/* Icon changes based on state */}
                <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                        key={isOpen ? "close" : "open"}
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.5, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        {isOpen ? <FaTimes /> : <FaTerminal />}
                    </motion.div>
                </AnimatePresence>
            </motion.button>

        </div>
    );
}