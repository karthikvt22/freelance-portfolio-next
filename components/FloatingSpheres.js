"use client";

// We can still use motion.div, but it's not strictly necessary since we removed animation.
// I'll keep it just in case you decide to add simple hover effects later.
import { motion } from "framer-motion";

// Number of total shapes/dots
const DOT_COUNT = 30;

export default function StaticDarkPinkGlowDots() {
  const dots = [...Array(DOT_COUNT)];

  return (
    <div className="absolute inset-0 w-full h-full bg-black z-0 pointer-events-none overflow-hidden">
      {dots.map((_, i) => {
        // Random size (moderate, visible dots)
        const size = Math.random() * 40 + 20; // 20px to 60px
        const top = Math.random() * 100;
        const left = Math.random() * 100;
        
        // Random initial opacity
        const initialOpacity = Math.random() * 0.2 + 0.1; // 0.1 to 0.3

        return (
          <motion.div
            key={i}
            // Appearance: Dark pink color, very rounded (circle), blur filter for softness
            className="absolute rounded-full bg-fuchsia-700 filter blur-sm"
            style={{
              width: size,
              height: size,
              top: `${top}%`,
              left: `${left}%`,
              opacity: initialOpacity, // Set a fixed, low opacity
              // Add a box shadow for a 'glow' effect matching the fuchsia
              boxShadow: "0 0 15px rgba(192, 38, 211, 0.6)", // Fuchsia glow
            }}
            // NOTE: The 'animate' and 'transition' blocks have been removed
          />
        );
      })}
    </div>
  );
}