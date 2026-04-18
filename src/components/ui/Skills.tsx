"use client";
import { motion } from "framer-motion";
import { skills as skillsByCategory } from "@/data";

const skills = Array.from(new Set(Object.values(skillsByCategory).flat()));

export function SkillsSection() {
  return (
    <div className="py-24 bg-white overflow-hidden border-b-2 border-accent" id="skills">
      <div className="container mx-auto px-4 mb-16">
        <h2 className="text-sm font-theater font-bold text-reddark tracking-widest uppercase mb-4">What I do</h2>
        <h1 className="text-4xl md:text-7xl font-druk text-accent uppercase leading-none tracking-tighter mix-blend-multiply">
          Core <br /> Technologies
        </h1>
      </div>

      <div className="flex flex-col gap-8">
        {/* Rapid Marquee */}
        <div className="flex overflow-hidden group">
          <motion.div 
            initial={{ x: 0 }}
            animate={{ x: "-100%" }}
            transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
            className="flex flex-nowrap shrink-0 items-center"
          >
            {[...skills, ...skills].map((skill, i) => (
              <div key={i} className="px-12 py-6 border-y-2 border-r-2 border-accent text-accent font-druk text-5xl md:text-8xl uppercase tracking-tighter hover:bg-accent hover:text-white transition-colors cursor-default select-none">
                {skill}
              </div>
            ))}
          </motion.div>
        </div>

        <div className="flex overflow-hidden group">
          <motion.div 
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            transition={{ duration: 34, repeat: Infinity, ease: "linear" }}
            className="flex flex-nowrap shrink-0 items-center"
          >
            {[...skills, ...skills].reverse().map((skill, i) => (
              <div key={i} className="px-12 py-6 border-y-2 border-l-2 border-accent text-accent font-druk text-5xl md:text-8xl uppercase tracking-tighter hover:bg-accent hover:text-white transition-colors cursor-default select-none">
                {skill}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
