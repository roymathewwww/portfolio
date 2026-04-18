import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects } from '../data';
import { ExternalLink } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    gsap.fromTo(
      titleRef.current,
      { opacity: 0, x: -50 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        }
      }
    );

    projectRefs.current.forEach((el) => {
      if (!el) return;
      gsap.fromTo(
        el,
        { opacity: 0, y: 100 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
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
    <section id="projects" ref={containerRef} className="py-32 px-4 md:px-8 relative bg-black/50">
      <div className="max-w-7xl mx-auto">
        <h2 ref={titleRef} className="text-4xl md:text-6xl font-display font-bold mb-20">
          <span className="text-accent">02.</span> Selected Works
        </h2>

        <div className="flex flex-col gap-24">
          {projects.map((project, index) => (
            <div 
              key={index}
              ref={el => { projectRefs.current[index] = el; }}
              className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 md:gap-16 items-center group`}
            >
              {/* Project Image Mock */}
              <div className="w-full md:w-3/5 rounded-2xl overflow-hidden aspect-video bg-surface border border-border relative group-hover:border-accent/30 transition-colors duration-500">
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
                {/* 3D Tilt Effect Container */}
                <div className="absolute inset-0 flex items-center justify-center p-8">
                  <div className="w-full h-full bg-background/80 rounded-lg shadow-2xl overflow-hidden border border-border/50 flex flex-col transform group-hover:scale-[1.02] transition-transform duration-700 ease-out">
                    {/* Mock Browser Header */}
                    <div className="h-6 bg-surface border-b border-border flex items-center px-4 gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-red-500/50"></div>
                      <div className="w-2 h-2 rounded-full bg-yellow-500/50"></div>
                      <div className="w-2 h-2 rounded-full bg-green-500/50"></div>
                    </div>
                    {/* Content Area */}
                    <div className="flex-1 flex items-center justify-center relative overflow-hidden">
                       <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                       <h3 className="text-3xl font-display font-bold opacity-20">{project.title}</h3>
                    </div>
                  </div>
                </div>
              </div>

              {/* Project Info */}
              <div className="w-full md:w-2/5 flex flex-col">
                <span className="text-accent text-sm tracking-widest uppercase mb-4">
                  {project.featured ? 'Featured Project' : 'Project'}
                </span>
                <h3 className="text-3xl md:text-4xl font-display font-bold mb-6 group-hover:text-accent transition-colors">
                  {project.title}
                </h3>
                
                <div className="glass-card p-6 md:p-8 mb-6 md:-ml-12 z-10 relative">
                  <p className="text-muted leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <ul className={`flex flex-wrap gap-4 text-sm text-muted/80 mb-8 font-mono ${index % 2 === 0 ? '' : 'md:justify-end'}`}>
                  {project.tech.map(tech => (
                    <li key={tech}>{tech}</li>
                  ))}
                </ul>

                <div className={`flex items-center gap-6 ${index % 2 === 0 ? '' : 'md:justify-end'}`}>
                  {project.live && (
                    <a 
                      href={project.live} 
                      target="_blank" 
                      rel="noreferrer"
                      className="text-white hover:text-accent transition-colors flex items-center gap-2"
                    >
                      <ExternalLink size={20} />
                      <span className="uppercase tracking-widest text-sm">Live Demo</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
