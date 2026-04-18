import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { skills } from '../data';

gsap.registerPlugin(ScrollTrigger);

export default function Skills() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    gsap.fromTo(
      cardsRef.current,
      { y: 100, opacity: 0, scale: 0.95 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        },
      }
    );
  }, []);

  return (
    <section id="skills" ref={containerRef} className="py-32 px-4 md:px-8 relative">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-display font-bold mb-16 text-center">
          <span className="text-accent">01.</span> Technical Arsenal
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(skills).map(([category, items], index) => (
            <div 
              key={category}
              ref={el => { cardsRef.current[index] = el; }}
              className="glass-card p-8 hover:-translate-y-2 transition-transform duration-500 will-change-transform"
            >
              <h3 className="text-xl font-medium mb-6 uppercase tracking-wider text-white/90 border-b border-border pb-4">
                {category.replace(/([A-Z])/g, ' $1').trim()}
              </h3>
              <ul className="space-y-3">
                {items.map(item => (
                  <li key={item} className="flex items-center text-muted group">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent/50 mr-3 group-hover:bg-accent transition-colors"></span>
                    <span className="group-hover:text-white transition-colors">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
