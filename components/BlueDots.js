// components/BlueDots.jsx
"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

// Generate a static array of dot positions once
const generateDots = (count) => {
  const dots = [];
  for (let i = 0; i < count; i++) {
    dots.push({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 1.5 + 0.5, // Tiny size: 0.5px to 2px
      delay: Math.random() * 8, // Very long initial delay spread (up to 8 seconds)
      duration: 8 + Math.random() * 8, // Very slow pulse duration (8 to 16 seconds)
    });
  }
  return dots;
};

export default function BlueDots({ count = 80 }) {
  // ------------------------------------------------------------------
  // FIX: This section must be present to define 'staticDots'.
  // Use useMemo to ensure dots are generated only once on mount
  const staticDots = useMemo(() => generateDots(count), [count]);
  // ------------------------------------------------------------------

  return (
    // FIX: suppressHydrationWarning helps with random client-side values
    <div 
        className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden"
        suppressHydrationWarning
    >
      {staticDots.map((dot, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-indigo-300" 
          style={{
            width: dot.size,
            height: dot.size,
            top: dot.top,
            left: dot.left,
          }}
          // Subtle, slow animation for "star dust" effect
          animate={{
            opacity: [0.1, 0.4, 0.1],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: dot.duration,
            repeat: Infinity,
            delay: dot.delay,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}