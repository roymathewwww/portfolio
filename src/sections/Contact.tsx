import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { personalInfo } from '../data';
import { Mail, Download } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    gsap.fromTo(
      containerRef.current.children,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        }
      }
    );
  }, []);

  return (
    <section id="contact" className="py-32 px-4 md:px-8 relative bg-surface mt-20">
      <div 
        ref={containerRef} 
        className="max-w-4xl mx-auto text-center flex flex-col items-center"
      >
        <span className="text-accent text-sm tracking-widest uppercase mb-4">
          04. What's Next?
        </span>
        <h2 className="text-5xl md:text-7xl font-display font-bold mb-8">
          Get In Touch
        </h2>
        
        <p className="text-muted text-lg md:text-xl max-w-2xl leading-relaxed mb-16">
          I'm currently looking for new opportunities. Whether you have a question, want to collaborate on a project, or just want to say hi, I'll try my best to get back to you!
        </p>

        <a 
          href={`mailto:${personalInfo.email}`}
          className="btn-primary flex items-center gap-3 text-lg px-10 py-5"
        >
          <Mail size={20} />
          Say Hello
        </a>

        <div className="mt-24 pt-12 border-t border-border w-full flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex gap-8">
            <a 
              href={personalInfo.github} 
              target="_blank" 
              rel="noreferrer"
              className="text-muted hover:text-white hover:-translate-y-1 transition-all font-display tracking-widest text-sm uppercase"
              aria-label="GitHub"
            >
              GitHub
            </a>
            <a 
              href={personalInfo.linkedin} 
              target="_blank" 
              rel="noreferrer"
              className="text-muted hover:text-white hover:-translate-y-1 transition-all font-display tracking-widest text-sm uppercase"
              aria-label="LinkedIn"
            >
              LinkedIn
            </a>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-4 text-sm text-muted">
            <span>{personalInfo.phone}</span>
            <span className="hidden md:inline">•</span>
            <span>Based in India</span>
          </div>

          <a
            href="#resume"
            className="flex items-center gap-2 text-sm text-muted hover:text-accent transition-colors group"
            aria-label="Jump to resume section"
          >
            <Download size={16} className="group-hover:-translate-y-1 transition-transform" />
            <span>RESUME</span>
          </a>
        </div>
      </div>
    </section>
  );
}
