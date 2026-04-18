import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { experience, education } from '../data';

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    itemsRef.current.forEach((el) => {
      if (!el) return;
      gsap.fromTo(
        el,
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
          }
        }
      );
    });
  }, []);

  return (
    <section id="experience" ref={containerRef} className="py-32 px-4 md:px-8 max-w-5xl mx-auto">
      <h2 className="text-4xl md:text-6xl font-display font-bold mb-20 text-center">
        <span className="text-accent">03.</span> Journey
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Experience Timeline */}
        <div>
          <h3 className="text-2xl font-display font-semibold mb-10 text-white/90">Experience</h3>
          <div className="border-l border-border pl-8 space-y-12">
            {experience.map((exp, index) => (
              <div 
                key={index}
                ref={el => { itemsRef.current[index] = el; }}
                className="relative"
              >
                {/* Timeline Dot */}
                <div className="absolute -left-[41px] top-1.5 w-5 h-5 rounded-full bg-background border-2 border-accent flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                </div>

                <h4 className="text-xl font-medium text-white mb-1">{exp.role}</h4>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-4 text-sm">
                  <span className="text-accent font-medium">{exp.company}</span>
                  <span className="hidden sm:block text-muted">•</span>
                  <span className="text-muted tracking-wide">{exp.period}</span>
                </div>
                
                <ul className="space-y-2">
                  {exp.points.map((point, i) => (
                    <li key={i} className="text-muted/80 flex leading-relaxed">
                      <span className="text-accent mr-3 mt-1.5">▹</span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Education Timeline */}
        <div>
          <h3 className="text-2xl font-display font-semibold mb-10 text-white/90">Education</h3>
          <div className="border-l border-border pl-8 space-y-12">
            {education.map((edu, index) => (
              <div 
                key={index}
                ref={el => { itemsRef.current[experience.length + index] = el; }}
                className="relative"
              >
                <div className="absolute -left-[41px] top-1.5 w-5 h-5 rounded-full bg-background border-2 border-border group-hover:border-accent transition-colors flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-border rounded-full group-hover:bg-accent transition-colors"></div>
                </div>

                <h4 className="text-xl font-medium text-white mb-1 group">{edu.degree}</h4>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm mb-2">
                  {edu.institution && (
                     <>
                        <span className="text-accent/80 font-medium">{edu.institution}</span>
                        <span className="hidden sm:block text-muted">•</span>
                     </>
                  )}
                  {edu.period && <span className="text-muted tracking-wide">{edu.period}</span>}
                </div>
                {edu.details && (
                  <p className="text-muted/80 text-sm">{edu.details}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
