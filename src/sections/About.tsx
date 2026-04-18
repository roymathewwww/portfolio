import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';


gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || !textRef.current) return;

    gsap.fromTo(
      textRef.current.children,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 75%',
        },
      }
    );
  }, []);

  return (
    <section 
      id="about" 
      ref={sectionRef} 
      className="relative py-32 px-4 md:px-8 max-w-7xl mx-auto flex items-center min-h-[70vh]"
    >
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full bg-accent/5 blur-[120px]"></div>
      </div>

      <div ref={textRef} className="w-full max-w-4xl mx-auto text-center md:text-left">
        <h2 className="text-3xl md:text-6xl font-display font-bold mb-8 opacity-90">
          Crafting <span className="text-accent italic font-light">Digital</span> Experiences.
        </h2>
        
        <p className="text-xl md:text-3xl text-muted leading-relaxed font-light mb-8">
          I am a Full-stack developer and MCA student with a strong focus on backend systems, cloud deployment, and scalable web applications.
        </p>
        
        <p className="text-lg md:text-xl text-muted/70 leading-relaxed font-light">
          Experienced in building modern applications using React, Supabase, PostgreSQL, and REST APIs. I have a strong interest in backend architecture, cloud systems, and real-world problem-solving methodologies that create actual impact.
        </p>

        <div className="mt-16 flex flex-col md:flex-row gap-8 md:gap-16 items-center justify-center md:justify-start border-t border-border pt-12">
          <div className="text-center md:text-left">
            <span className="block text-4xl md:text-5xl font-display font-bold text-white mb-2">2+</span>
            <span className="text-sm text-muted uppercase tracking-widest">Years Exp.</span>
          </div>
          <div className="w-[1px] h-12 bg-border hidden md:block"></div>
          <div className="text-center md:text-left">
            <span className="block text-4xl md:text-5xl font-display font-bold text-white mb-2">10+</span>
            <span className="text-sm text-muted uppercase tracking-widest">Projects</span>
          </div>
          <div className="w-[1px] h-12 bg-border hidden md:block"></div>
          <div className="text-center md:text-left">
            <span className="block text-4xl md:text-5xl font-display font-bold text-white mb-2">7</span>
            <span className="text-sm text-muted uppercase tracking-widest">Certificates</span>
          </div>
        </div>
      </div>
    </section>
  );
}
