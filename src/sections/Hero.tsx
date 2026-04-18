import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { personalInfo } from '../data';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;
    
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    if (!context) return;
    
    const frameCount = 192;
    const currentFrame = (index: number) => 
      `/hero-frames/${(index + 1).toString().padStart(5, '0')}.jpg`;
      
    const images: HTMLImageElement[] = [];
    const dummy = { frame: 0 };
    let loadedCount = 0;
    let scrollTriggerInst: ScrollTrigger | null = null;
    let textScrollInst: ScrollTrigger | null = null;
    
    const renderFrame = (index: number) => {
        if (!context || !canvas || !images[index]) return;
        const img = images[index];
        
        // Scale to cover
        const hRatio = canvas.width / img.width;
        const vRatio = canvas.height / img.height;
        const ratio = Math.max(hRatio, vRatio);
        const centerShiftX = (canvas.width - img.width * ratio) / 2;
        const centerShiftY = (canvas.height - img.height * ratio) / 2;
        
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(
            img, 
            0, 0, img.width, img.height,
            centerShiftX, centerShiftY, img.width * ratio, img.height * ratio
        );
    };

    const handleResize = () => {
        if (!canvas) return;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        if (images.length === frameCount) {
           renderFrame(Math.round(dummy.frame));
        }
    };

    // Preload all images
    for (let i = 0; i < frameCount; i++) {
        const img = new Image();
        img.src = currentFrame(i);
        img.onload = () => {
          loadedCount++;
          setLoadingProgress(Math.round((loadedCount / frameCount) * 100));
          if (loadedCount === frameCount) {
             setImagesLoaded(true);
             handleResize(); // Set initial canvas dimensions
             renderFrame(0); // Draw first frame
             initScrollTrigger(); // Start GSAP pinning
          }
        };
        images.push(img);
    }
    
    window.addEventListener('resize', handleResize);
    
    const initScrollTrigger = () => {
        // Pin hero and scrub sequence
        scrollTriggerInst = ScrollTrigger.create({
            trigger: containerRef.current,
            start: "top top",
            end: "+=200%", 
            pin: true,
            scrub: 1, // Smooth scrub
            animation: gsap.to(dummy, {
               frame: frameCount - 1,
               ease: "none",
               onUpdate: () => {
                 requestAnimationFrame(() => renderFrame(Math.round(dummy.frame)));
               }
            })
        });
        
        // Fade out text while scrolling down
        if (textRef.current) {
          textScrollInst = ScrollTrigger.create({
             trigger: containerRef.current,
             start: "top top",
             end: "+=100%",
             scrub: true,
             animation: gsap.to(textRef.current, {
                opacity: 0,
                y: -100,
                ease: "power1.inOut"
             })
          });
          
          // Initial text reveal on load
          gsap.fromTo(
            textRef.current.children, 
            { y: 50, opacity: 0, scale: 0.95 },
            { y: 0, opacity: 1, scale: 1, duration: 1.5, stagger: 0.2, ease: "power4.out" }
          );
        }
    };
    
    return () => {
        window.removeEventListener('resize', handleResize);
        if (scrollTriggerInst) scrollTriggerInst.kill();
        if (textScrollInst) textScrollInst.kill();
    };
  }, []);

  return (
    <section ref={containerRef} className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-background">
      
      {/* Loading Overlay */}
      {!imagesLoaded && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-background/95 backdrop-blur-md">
            <span className="text-accent text-sm tracking-widest uppercase mb-4 animate-pulse">
              Preloading Cinematic Experience
            </span>
            <div className="w-64 h-1 bg-surface rounded-full overflow-hidden">
               <div className="h-full bg-accent transition-all duration-300" style={{ width: `${loadingProgress}%` }}></div>
            </div>
            <span className="text-muted text-xs mt-4 font-mono">{loadingProgress}%</span>
        </div>
      )}

      {/* Hero Canvas */}
      <canvas 
        ref={canvasRef} 
        className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none will-change-transform opacity-60"
      />
      
      <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/40 to-background pointer-events-none z-10"></div>
      
      <div 
        ref={textRef}
        className="relative z-20 text-center px-4 max-w-4xl mx-auto flex flex-col items-center"
      >
        <span className="text-accent text-sm md:text-base tracking-[0.3em] uppercase mb-6 font-medium">
          Creative Developer
        </span>
        
        <h1 className="font-display text-5xl md:text-8xl lg:text-9xl font-black tracking-tight mb-8 leading-none text-glow">
          {personalInfo.name.toUpperCase().split(' ')[0]}<br/>
          <span className="text-white/40">{personalInfo.name.toUpperCase().split(' ')[1]}</span>
        </h1>
        
        <p className="text-muted text-lg md:text-xl max-w-2xl font-light leading-relaxed mb-12">
          Building cinematic motion, smooth scroll-driven storytelling, and scalable high-performance web applications.
        </p>
        
        <div className="flex gap-4">
          <a href="#projects" className="btn-primary" aria-label="View Projects">
            Explore Work
          </a>
          <a href="#contact" className="btn-outline" aria-label="Contact">
            Let's Connect
          </a>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className={`absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center animate-bounce transition-opacity duration-1000 ${imagesLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <span className="text-xs uppercase tracking-widest text-muted mb-2">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-accent to-transparent"></div>
      </div>
    </section>
  );
}
