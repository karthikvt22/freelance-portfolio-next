// components/TerminalSimulator.jsx (Updated with history and prop)
"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

// --- COMMANDS DATA ---
const COMMAND_DATA = {
    'help': {
        output: 'Available commands: <span class="text-indigo-400">whoami, skills, projects, contact, resume, clear</span>. Use <span class="text-indigo-400">projects --view</span> for details.'
    },
    'whoami': {
        output: 'Welcome, Guest. I am <span class="text-green-400">Karthik V T</span>, Software Developer and DevOps Enthusiast.'
    },
    'skills': {
        output: 'Primary skills: <span class="text-yellow-400">Java</span>, <span class="text-yellow-400">DevOps (Docker/K8s/Terraform)</span>, <span class="text-yellow-400">AWS</span>, <span class="text-yellow-400">Linux</span>. See the Skills section for the full list.'
    },
    'projects': {
        output: 'Listing top projects: AWS Cloud Infra, CI/CD Pipeline, Network Design. Use <span class="text-indigo-400">projects --view</span> to jump to the Projects section.',
        handler: (args) => {
            if (args.includes('--view')) {
                document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                return "Scrolling to projects section...";
            }
            return COMMAND_DATA.projects.output;
        }
    },
    'contact': {
        output: 'Email: <span class="text-blue-400">karthikvt2190694@gmail.com</span> | LinkedIn: <span class="text-blue-400">/in/karthik67/</span>. Find links in the Contact section.'
    },
    'resume': {
        output: 'Preparing resume for download... <span class="text-green-400">[karthik_resume.pdf]</span>. Please use the "Download Resume" button on the main page.',
        handler: () => {
             return 'Preparing resume for download... <span class="text-green-400">[karthik_resume.pdf]</span>. Use the main button.';
        }
    },
    'clear': {
        output: '::CLEAR_SCREEN::'
    },
    'default': {
        output: (cmd) => `Error: command not found: <span class="text-red-400">${cmd}</span>. Try <span class="text-indigo-400">help</span>.`
    }
};

export default function TerminalSimulator({ reducedMargin = false }) { // Added reducedMargin prop
  const [history, setHistory] = useState([{ type: 'output', text: COMMAND_DATA.whoami.output }]);
  const [input, setInput] = useState('');
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef(null);
  const scrollRef = useRef(null); 

  // --- FOCUS AND SCROLL EFFECT ---
  useEffect(() => {
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    if (inputRef.current) {
        inputRef.current.focus();
    }
  }, [history]);

  // Focus on mount (useful when toggling open)
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  // -----------------------------

  const handleCommand = (cmd) => {
    const parts = cmd.toLowerCase().trim().split(/\s+/);
    const primaryCmd = parts[0];
    const args = parts.slice(1);

    setHistory(prev => [...prev, { type: 'command', text: cmd }]);
    setHistoryIndex(-1);

    let commandObject = COMMAND_DATA[primaryCmd] || COMMAND_DATA.default;
    let output;

    if (primaryCmd === 'clear') {
        setHistory([]);
        return;
    }

    if (commandObject.handler) {
        output = commandObject.handler(args);
    } else if (typeof commandObject.output === 'function') {
        output = commandObject.output(cmd);
    } else {
        output = commandObject.output;
    }
    
    setHistory(prev => [...prev, { type: 'output', text: output }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      handleCommand(input.trim());
      setInput('');
    }
  };
  
  // --- KEYBOARD HISTORY NAVIGATION (Arrow Up/Down) ---
  const handleKeyDown = (e) => {
    const commandHistory = history.filter(item => item.type === 'command').map(item => item.text);
    if (commandHistory.length === 0) return;

    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        e.preventDefault();
        
        let newIndex = historyIndex;

        if (e.key === 'ArrowUp') {
            newIndex = Math.min(commandHistory.length - 1, historyIndex + 1);
        } else if (e.key === 'ArrowDown') {
            newIndex = Math.max(-1, historyIndex - 1);
        }

        if (newIndex !== historyIndex) {
            setHistoryIndex(newIndex);
            setInput(newIndex === -1 ? '' : commandHistory[commandHistory.length - 1 - newIndex]);
        }
    }
  };
  // ---------------------------------------------------

  // Helper component for the blinking cursor
  const BlinkingCursor = () => {
    return (
        <span className="text-indigo-400 animate-pulse text-sm">_</span>
    );
  };

  return (
    // Conditional class for margin
    <div className={`bg-[#121212] border border-indigo-700/50 rounded-lg shadow-2xl p-4 font-mono w-full ${reducedMargin ? 'mt-0' : 'mt-10'}`}>
      
      {/* Terminal Header */}
      <div className="flex justify-between text-xs mb-2 text-gray-400">
        <span>[karthik@portfolio ~]</span>
        <BlinkingCursor />
      </div>
      
      {/* Scrollable History Area */}
      <div 
        ref={scrollRef} 
        className="h-64 overflow-y-auto text-sm pr-2 scrollbar-thin scrollbar-thumb-indigo-500/50 scrollbar-track-transparent whitespace-pre-wrap"
      >
        {history.map((item, index) => (
          <div key={index}>
            {item.type === 'command' ? (
                <span className="text-green-400">
                    <span className="text-indigo-400 mr-2">$</span>
                    {item.text}
                </span>
            ) : (
                // Use dangerouslySetInnerHTML for colored output
                <p 
                    className="text-gray-200"
                    dangerouslySetInnerHTML={{ __html: item.text }} 
                />
            )}
          </div>
        ))}
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="flex mt-2">
        <span className="text-indigo-400 text-sm mr-2">[karthik@portfolio ~]$</span>
        <input
          ref={inputRef} 
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="bg-transparent text-gray-100 flex-grow outline-none text-sm caret-indigo-400"
          spellCheck="false"
          autoFocus
        />
      </form>
    </div>
  );
}