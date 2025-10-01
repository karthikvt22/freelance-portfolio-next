// app/page.js or Home.jsx

"use client";

import dynamic from 'next/dynamic';
import { FaEnvelope, FaLinkedin, FaGithub, FaTwitter, FaCode, FaLaptopCode, FaTools, FaCloud, FaLinux, FaClipboardList, FaChevronDown } from "react-icons/fa";
import MagneticWrapper from "../components/MagneticWrapper"; 
import TerminalSimulator from '../components/TerminalSimulator';
import { useScroll, useSpring, motion } from "framer-motion";
import Navbar from "../components/Navbar";
import CursorGlow from "../components/CursorGlow";
import { useState, useEffect } from "react";

// DYNAMICALLY IMPORT HEAVY BACKGROUND COMPONENTS
const BlueDots = dynamic(() => import('../components/BlueDots'), { ssr: false, loading: () => null });
const FloatingSpheres = dynamic(() => import('../components/FloatingSpheres'), { ssr: false, loading: () => null });
// REMOVED: const Globe = dynamic(() => import('../components/Globe'), { ssr: false, loading: () => null });

export default function Home() {
  const { scrollYProgress, scrollY } = useScroll();
  const [isTerminalOpen, setIsTerminalOpen] = useState(false); // NEW STATE for terminal

  const backgroundY = useSpring(scrollY, {
    stiffness: 50,
    damping: 20,
    restDelta: 0.001,
  });

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    restDelta: 0.001,
  });

  // Typing animation for tagline (SPEED INCREASED: 35ms delay)
  const tagline = "Software Developer | Cloud & DevOps Enthusiast";
  const [displayText, setDisplayText] = useState("");
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setDisplayText(tagline.slice(0, index + 1));
      index++;
      if (index === tagline.length) clearInterval(interval);
    }, 35); // CHANGED FROM 60 TO 35
    return () => clearInterval(interval);
  }, []);

  // Dot-matrix name
  const name = "Karthik V T";

  // Constant rotation for the Globe component (REMOVED: globeRotation)
  // REMOVED: 
  /*
  const globeRotation = {
    animate: {
      rotate: 360,
    },
    transition: {
      duration: 50,
      repeat: Infinity,
      ease: "linear",
    },
  };
  */

  // Function for smooth scroll to "about"
  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };
  
  // Terminal Content to pass to Navbar
  const terminalContent = <TerminalSimulator reducedMargin={true} />;

  return (
    <main className="bg-[#0a0a0a] text-white w-full min-h-screen relative overflow-x-hidden font-sans select-none">

      {/* Top Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 h-2 md:h-3 bg-gradient-to-r from-indigo-600 to-blue-500 z-50 origin-left rounded-r-lg shadow-lg shadow-indigo-500/50"
        style={{ scaleX }}
      />

      {/* Cursor Glow */}
      <CursorGlow />

      {/* Navbar - NOW PASSING TERMINAL STATE AND CONTENT */}
      <Navbar 
          isTerminalOpen={isTerminalOpen}
          setIsTerminalOpen={setIsTerminalOpen}
          TerminalContent={terminalContent}
      />
      {/* ------------------------------------------------ */}

      {/* Hero Section */}
      <section className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0f0f0f] to-[#1a1a1a]"></div>

        {/* Parallax & Rotating Globe (Dynamically Loaded) */}
        {/* REMOVED GLOBE COMPONENT */}
        {/* <motion.div style={{ y: backgroundY }} className="absolute inset-0 z-[1]">
            <motion.div variants={globeRotation} animate="animate" style={{ position: 'absolute', inset: 0 }}>
                <Globe /> 
            </motion.div>
        </motion.div>
        */}
        
        <motion.div style={{ y: backgroundY.get() * 0.75 }} className="absolute inset-0 z-[2]">
            <FloatingSpheres count={20} />
        </motion.div>
        
        <motion.div style={{ y: backgroundY.get() * 0.5 }} className="absolute inset-0 z-[3]">
            <BlueDots count={50} />
        </motion.div>

        {/* Profile Content */}
        <div className="relative z-10 flex flex-col items-center text-center px-4">
          <motion.img
            src="/profile.jpg"
            alt="Karthik V T"
            className="w-64 h-64 md:w-80 md:h-80 rounded-full shadow-2xl object-cover mb-6 border-4 border-indigo-600/60 transition-all duration-500"
            whileHover={{ scale: 1.03, boxShadow: "0 0 30px rgba(99, 102, 241, 0.5)" }}
          />
          
          <motion.p
            className="text-lg md:text-xl text-indigo-400 mb-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Hi, I am
          </motion.p>
          
          {/* Dot-Matrix Name */}
          <motion.h1 className="flex text-6xl md:text-7xl font-bold mb-2 text-white">
            {name.split("").map((letter, index) => (
              <motion.span
                key={index}
                className="relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.05, type: "spring", stiffness: 400 }}
              >
                <span className="font-mono">{letter === " " ? "\u00A0" : letter}</span>
                <motion.span
                  className="absolute -right-2 -bottom-2 w-1.5 h-1.5 bg-indigo-400 rounded-full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ repeat: Infinity, duration: 1, delay: 0.4 + index * 0.1 }}
                />
              </motion.span>
            ))}
          </motion.h1>

          {/* Tagline */}
          <motion.p
            className="mt-4 text-xl md:text-2xl max-w-3xl mx-auto text-gray-400 leading-relaxed h-10"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 1 }}
          >
            {displayText}
          </motion.p>
          
          {/* Simple Deep Quote */}
          <motion.p
            className="mt-6 text-sm md:text-md italic text-indigo-500/70 max-w-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5, duration: 1 }}
          >
            &ldquo;Building the future, one elegant solution at a time.&rdquo;
          </motion.p>

          {/* CTA Buttons */}
          <div className="mt-8 flex gap-4">
            <motion.a
              href="#projects"
              className="px-6 py-3 bg-indigo-600 text-white rounded-xl shadow-lg hover:bg-indigo-700 transition"
              whileHover={{ scale: 1.05, boxShadow: "0 0 15px #4f46e5" }}
            >
              See Projects
            </motion.a>
            <motion.a
              href="/Karthik_Resume.pdf"
              download
              className="px-6 py-3 border border-indigo-600 text-indigo-400 rounded-xl shadow-lg hover:bg-indigo-600 hover:text-white transition"
              whileHover={{ scale: 1.05 }}
            >
              Download Resume
            </motion.a>
          </div>
        </div>
        
        {/* --- Animated Scroll Down Arrow --- */}
        <motion.div
          className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-indigo-400 text-3xl cursor-pointer z-20"
          animate={{ y: [0, 10, 0] }} // Gentle bounce animation
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          onClick={scrollToAbout}
        >
          <FaChevronDown />
        </motion.div>
        {/* -------------------------------------- */}

      </section>
      
      {/* About Section */}
      <section id="about" className="relative py-16 px-6 max-w-4xl mx-auto overflow-hidden">
        <BlueDots count={30} />
        <motion.h2
          className="text-4xl md:text-5xl font-bold mb-6 text-indigo-400 relative z-10"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          About Me
        </motion.h2>
        <motion.p
          className="text-gray-400 text-lg md:text-xl leading-relaxed relative z-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          I’m an Electronics & Communication graduate passionate about software
          development, DevOps, and cloud computing. I enjoy solving problems,
          building efficient systems, and delivering user-focused applications.
          With hands-on experience in CI/CD pipelines, AWS infrastructure, and
          modern frameworks, I aim to create technology that scales and inspires.
        </motion.p>
      </section>

      {/* Skills Section */}
      <section id="skills" className="relative py-16 px-6 max-w-5xl mx-auto overflow-hidden">
        <BlueDots count={30} />
        <motion.h2
          className="text-4xl md:text-5xl font-bold mb-6 text-indigo-400 relative z-10"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Technical Skills
        </motion.h2>
        <div className="grid md:grid-cols-2 gap-6 relative z-10">
          {[
            // UPDATED SKILL DATA WITH ICONS
            { title: "Programming", skills: ["Java (Core Java, OOPs)", "C++", "SQL"], color: "#3b82f6", icon: FaCode },
            { title: "Software Development", skills: ["DSA", "OOP", "REST APIs"], color: "#8b5cf6", icon: FaLaptopCode },
            { title: "DevOps Tools", skills: ["Git", "Jenkins", "Docker", "Kubernetes", "Argo CD", "Terraform"], color: "#fbbf24", icon: FaTools },
            { title: "Cloud Platforms", skills: ["AWS EC2, S3, IAM, VPC, Auto Scaling"], color: "#60a5fa", icon: FaCloud },
            { title: "OS & Networking", skills: ["Linux", "TCP/IP", "DNS", "DHCP"], color: "#34d399", icon: FaLinux },
            { title: "Development Practices", skills: ["Agile", "Scrum", "CI/CD", "GitOps"], color: "#a78bfa", icon: FaClipboardList },
          ].map((cat) => (
            <motion.div
              key={cat.title}
              className="p-4 md:p-6 bg-[#1f1f1f] rounded-xl shadow-lg hover:shadow-indigo-500/20 transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-bold" style={{ color: cat.color }}>{cat.title}</h3>
                <cat.icon className="text-3xl" style={{ color: cat.color }}/>
              </div>
              <ul className="list-disc list-inside text-gray-400">
                {cat.skills.map((s) => (<li key={s}>{s}</li>))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="relative py-16 px-6 max-w-5xl mx-auto overflow-hidden">
        <BlueDots count={40} />
        <motion.h2
          className="text-4xl md:text-5xl font-bold mb-6 text-indigo-400 relative z-10"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Projects
        </motion.h2>
        <div className="grid md:grid-cols-2 gap-6 relative z-10">
          {[
            { title: "AWS Cloud Infrastructure Design", description: "Designed and deployed a scalable web application backend on AWS across multiple Availability Zones.", link: "#" },
            { title: "End-to-End CI/CD Pipeline", description: "Developed a Java application with database integration and automated build/testing pipelines using Jenkins and Argo CD.", link: "#" },
            { title: "Campus Network Design", description: "Created a robust campus network topology with routers, switches, and VLANs ensuring scalability and security.", link: "#" },
            { title: "Portfolio Website", description: "Developed this personal portfolio using Next.js, TailwindCSS, and Framer Motion for animations and interactivity.", link: "#" },
          ].map((proj) => (
            <motion.div
              key={proj.title}
              className="p-4 md:p-6 bg-[#1f1f1f] rounded-xl shadow-lg transition-all duration-300 cursor-pointer 
                         border border-transparent hover:border-indigo-600/50" 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              whileHover={{ scale: 1.02, boxShadow: "0 0 25px rgba(99, 102, 241, 0.4)" }}
            >
              <h3 className="text-xl font-bold text-indigo-400 mb-2">{proj.title}</h3>
              <p className="text-gray-400">{proj.description}</p>
              <a href={proj.link} className="text-blue-400 mt-2 inline-block font-semibold hover:underline">View Project</a>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-8 bg-[#1f1f1f] z-10 relative border-t border-indigo-700/30">
        <h2 className="text-4xl font-bold text-center mb-10">
          Get in <span className="text-indigo-400">Touch</span>
        </h2>

        <div className="flex flex-col items-center space-y-6">
          <div className="flex space-x-6">
            {[
              { icon: FaEnvelope, link: "mailto:karthikvt2190694@gmail.com" },
              { icon: FaLinkedin, link: "https://www.linkedin.com/in/karthik67/" },
              { icon: FaGithub, link: "https://github.com/karthikvt22" },
              { icon: FaTwitter, link: "https://x.com/karthikvt21" },
            ].map(({ icon: Icon, link }, i) => (
              <MagneticWrapper key={i}>
                <motion.a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-16 h-16 bg-gray-700 rounded-xl shadow-md text-white text-2xl cursor-pointer"
                  whileHover={{ scale: 1.1, boxShadow: "0 0 20px #8b5cf6" }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Icon />
                </motion.a>
              </MagneticWrapper>
            ))}
          </div>

          {/* Resume Download Button */}
          <a
            href="/Karthik_Resume.pdf"
            download
            className="mt-6 px-6 py-3 bg-indigo-600 text-white rounded-xl shadow-lg hover:bg-indigo-700 transition"
          >
            Download Resume
          </a>
        </div>
      </section>

    </main>
  );
}