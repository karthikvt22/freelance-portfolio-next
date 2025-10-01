"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function EchoingCursor() {
  // Motion values track the actual, immediate mouse position
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring values track the smooth, delayed position for the larger ring
  const springConfig = { damping: 25, stiffness: 250, mass: 0.5 };
  const cursorXSpring = useSpring(mouseX, springConfig);
  const cursorYSpring = useSpring(mouseY, springConfig);

  useEffect(() => {
    // 1. Hide the default cursor for a clean look
    document.body.style.cursor = 'none';

    const moveCursor = (e) => {
      // Update the immediate motion values
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", moveCursor);
    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.body.style.cursor = 'auto'; // Restore cursor on unmount
    };
  }, [mouseX, mouseY]);

  return (
    <>
      {/* 1. The Small, Immediate Dot (The actual pointer) */}
      <motion.div
        className="fixed z-[9999] rounded-full pointer-events-none bg-indigo-400"
        style={{
          left: mouseX,
          top: mouseY,
          width: 8, 
          height: 8,
          x: "-50%", 
          y: "-50%",
        }}
      />

      {/* 2. The Large, Delayed Ring (The echo/trail) */}
      <motion.div
        className="fixed z-[9998] rounded-full pointer-events-none border-2 border-indigo-500/80 filter blur-xs"
        style={{
          left: cursorXSpring,
          top: cursorYSpring,
          width: 32, 
          height: 32,
          x: "-50%", 
          y: "-50%",
        }}
      />
    </>
  );
}