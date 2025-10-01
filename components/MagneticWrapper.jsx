// MagneticWrapper.jsx
"use client";

import { motion } from "framer-motion";
import { useRef, useState } from "react";

export default function MagneticWrapper({ children }) {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e) => {
    const { clientX, clientY } = e;
    // Get the element's position and size
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    
    // Calculate how far the cursor is from the center of the element
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    
    // Scale the movement for a smoother, magnetic feel
    setPosition({ x: x * 0.3, y: y * 0.3 }); 
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  const { x, y } = position;

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x, y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
    >
      {children}
    </motion.div>
  );
}