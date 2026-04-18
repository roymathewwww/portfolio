"use client";

import { useEffect, useState } from 'react';
import { personalInfo } from '../../data';

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("#home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sectionIds = ['home', 'resume', 'projects', 'contact'];
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) {
          setActiveSection(`#${visible.target.id}`);
        }
      },
      { threshold: [0.35, 0.55, 0.75], rootMargin: "-20% 0px -45% 0px" }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home', num: '01' },
    { name: 'Resume', href: '#resume', num: '02' },
    { name: 'Work', href: '#projects', num: '03' },
    { name: 'Contact', href: '#contact', num: '04' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'py-3 bg-white/95 backdrop-blur-xl border-b-2 border-accent shadow-[0_4px_30px_rgba(230,0,0,0.1)]' 
          : 'py-8 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#home"
          className="text-3xl md:text-4xl font-druk tracking-tighter hover:text-reddark text-accent transition-all duration-300 transform active:scale-90"
        >
          RM<span className="text-reddark">.</span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`group flex items-center gap-2 font-druk tracking-widest text-sm transition-colors uppercase ${
                activeSection === link.href ? 'text-reddark' : 'text-accent hover:text-reddark'
              }`}
            >
              <span className={`text-[10px] transition-colors font-bold tracking-tighter ${
                activeSection === link.href ? 'text-accent' : 'text-accent/30 group-hover:text-accent'
              }`}>
                {link.num}
              </span>
              {link.name}
            </a>
          ))}
        </nav>

        {/* Mobile Nav Toggle */}
        <button
          className="md:hidden flex flex-col justify-center gap-1.5 w-10 h-10 z-50 relative bg-accent rounded-none p-2 border-2 border-accent shadow-[4px_4px_0_#8b0000] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle Menu"
        >
          <span className={`w-full h-0.5 bg-white transition-transform duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
          <span className={`w-full h-0.5 bg-white transition-opacity duration-300 ${menuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`w-full h-0.5 bg-white transition-transform duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </button>

        {/* Mobile Menu Backdrop */}
        <div
          className={`fixed inset-0 bg-white z-40 transition-all duration-700 ease-[cubic-bezier(0.85,0,0.15,1)] md:hidden flex flex-col items-center justify-center ${
            menuOpen ? 'translate-y-0' : '-translate-y-full'
          }`}
        >
          <div className="absolute top-10 left-10 text-6xl font-druk text-accent/5 opacity-20 pointer-events-none">
            MENU
          </div>
          <nav className="flex flex-col items-center gap-10">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-5xl font-druk tracking-widest hover:text-reddark text-accent transition-all duration-300 flex flex-col items-center gap-1 uppercase transform hover:scale-110"
                onClick={() => setMenuOpen(false)}
              >
                <span className="text-xs text-reddark tracking-[0.5em] font-bold">{link.num}</span>
                {link.name}
              </a>
            ))}
          </nav>
          
          <div className="absolute bottom-10 flex gap-8 font-druk text-accent text-sm tracking-widest">
            <a href={personalInfo.linkedin}>LINKEDIN</a>
            <a href={personalInfo.github}>GITHUB</a>
          </div>
        </div>
      </div>
    </header>
  );
}
