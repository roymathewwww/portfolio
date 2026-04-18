"use client";

import { useEffect, useMemo, useRef } from "react";
import Lenis from "@studio-freight/lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Award, Briefcase, GraduationCap } from "lucide-react";

import Navigation from "./components/ui/Navigation";
import { SplineHero } from "./components/ui/SplineHero";
import { SkillsSection } from "./components/ui/Skills";
import { LandingAccordionItem } from "./components/ui/interactive-image-accordion";
import {
  RadialOrbitalTimeline,
  type TimelineItem
} from "./components/ui/radial-orbital-timeline";

import Contact from "./sections/Contact";
import {
  certifications,
  education,
  experience,
  personalInfo,
  projects
} from "./data";

function App() {
  const appShellRef = useRef<HTMLDivElement>(null);
  const scrollProgressRef = useRef<HTMLDivElement>(null);
  const resumeSectionRef = useRef<HTMLElement>(null);
  const resumeHeaderRef = useRef<HTMLDivElement>(null);
  const certCardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.6,
      touchMultiplier: 0.95,
      infinite: false,
    });
    (window as Window & { __lenis?: Lenis }).__lenis = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    const lenisTick = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(lenisTick);
    gsap.ticker.lagSmoothing(1000, 16);

    return () => {
      gsap.ticker.remove(lenisTick);
      lenis.off('scroll', ScrollTrigger.update);
      lenis.destroy();
      delete (window as Window & { __lenis?: Lenis }).__lenis;
    };
  }, []);

  useEffect(() => {
    const section = resumeSectionRef.current;
    const header = resumeHeaderRef.current;
    const cards = certCardRefs.current.filter(Boolean);
    if (!section || !header || cards.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        header,
        { autoAlpha: 0, y: 36 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 72%"
          }
        }
      );

      gsap.fromTo(
        cards,
        { autoAlpha: 0, y: 28, scale: 0.97 },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          ease: "power2.out",
          stagger: 0.08,
          scrollTrigger: {
            trigger: section,
            start: "top 65%"
          }
        }
      );
    }, section);

    return () => ctx.revert();
  }, [certifications.length]);

  useEffect(() => {
    const shell = appShellRef.current;
    if (!shell) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        shell,
        { autoAlpha: 0, y: 16 },
        { autoAlpha: 1, y: 0, duration: 0.95, ease: "power2.out", clearProps: "transform" }
      );

      if (scrollProgressRef.current) {
        gsap.set(scrollProgressRef.current, { scaleX: 0, transformOrigin: "0% 50%" });
        ScrollTrigger.create({
          trigger: document.documentElement,
          start: 0,
          end: "max",
          onUpdate: (self) => {
            gsap.to(scrollProgressRef.current, {
              scaleX: self.progress,
              duration: 0.18,
              ease: "power2.out",
              overwrite: true
            });
          }
        });
      }

      gsap.utils.toArray<HTMLElement>("[data-motion-reveal]").forEach((section) => {
        const revealTargets = section.querySelectorAll<HTMLElement>("[data-motion-reveal-item]");
        const targets = revealTargets.length ? revealTargets : [section];

        gsap.fromTo(
          targets,
          { autoAlpha: 0, y: 28 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 78%",
              once: true
            }
          }
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-motion-parallax]").forEach((section) => {
        gsap.fromTo(
          section,
          { yPercent: 2, autoAlpha: 0.96 },
          {
            yPercent: -2,
            autoAlpha: 1,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: 1
            }
          }
        );
      });
    }, shell);

    return () => ctx.revert();
  }, []);

  const timelineData = useMemo<TimelineItem[]>(() => {
    const expItems: TimelineItem[] = experience.map((exp, idx) => ({
      id: idx + 1,
      title: exp.role,
      date: exp.period,
      content: `${exp.company} — ${exp.points.join(" • ")}`,
      category: "Experience",
      icon: Briefcase,
      relatedIds: [],
      status: "completed",
      energy: Math.max(55, 92 - idx * 8)
    }));

    const eduOffset = expItems.length;
    const eduItems: TimelineItem[] = education.map((edu, idx) => ({
      id: eduOffset + idx + 1,
      title: edu.degree,
      date: edu.period ?? "",
      content: [edu.institution, edu.details].filter(Boolean).join(" • "),
      category: "Education",
      icon: GraduationCap,
      relatedIds: [],
      status: "completed",
      energy: Math.max(45, 78 - idx * 6)
    }));

    const certItem: TimelineItem = {
      id: eduOffset + eduItems.length + 1,
      title: "Certifications",
      date: "2023–2026",
      content: certifications.join(" • "),
      category: "Credentials",
      icon: Award,
      relatedIds: [],
      status: "in-progress",
      energy: 84
    };

    const all = [...expItems, ...eduItems, certItem];
    return all.map((item, idx, arr) => ({
      ...item,
      relatedIds: [
        arr[(idx - 1 + arr.length) % arr.length].id,
        arr[(idx + 1) % arr.length].id
      ]
    }));
  }, []);

  const projectItems = useMemo(
    () =>
      projects.map((p, idx) => ({
        id: idx + 1,
        title: p.title,
        link: p.live,
        imageUrl:
          p.title === "Canteen Rush AI"
            ? "/images/canteen-rush-ai.png"
            : p.title === "Habit Tracker"
              ? "/images/Screenshot%202026-04-18%20004426.png"
              : p.title === "Trackify"
                ? "/images/4002.PNG"
                : p.title === "Maison Noir"
                  ? "/Screenshot_20260418_003918_Chrome.jpg"
                  : undefined,
        imagePosition:
          p.title === "Canteen Rush AI"
            ? "left center"
            : p.title === "Habit Tracker"
              ? "center center"
              : p.title === "Maison Noir"
                ? "center top"
                : undefined,
        imageFit:
          p.title === "Trackify"
            ? ("contain" as const)
            : p.title === "Maison Noir"
              ? ("cover" as const)
              : undefined
      })),
    []
  );

  return (
    <div ref={appShellRef} className="bg-white selection:bg-accent selection:text-white">
      <div className="pointer-events-none fixed top-0 left-0 right-0 z-[70] h-[2px] bg-transparent">
        <div
          ref={scrollProgressRef}
          className="h-full w-full bg-accent/90 will-change-transform"
          aria-hidden="true"
        />
      </div>
      <Navigation />

      <main>
        <section id="home">
          <SplineHero />
        </section>

        <div data-motion-reveal data-motion-parallax className="will-change-transform">
          <LandingAccordionItem items={projectItems} />
        </div>

        <section id="resume" ref={resumeSectionRef} className="relative py-24 md:py-32 bg-white border-y-2 border-accent overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[70vw] h-[28rem] bg-[radial-gradient(ellipse_at_center,rgba(230,0,0,0.16),transparent_70%)]" />
            <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white to-transparent" />
          </div>

          <div className="relative max-w-6xl mx-auto px-6 text-center">
            <div ref={resumeHeaderRef}>
              <div className="inline-flex items-center gap-2 px-3 py-1 border-2 border-accent bg-white shadow-[4px_4px_0_#e60000]">
                <span className="text-sm text-accent tracking-widest font-druk uppercase">Resume</span>
              </div>

              <h2 className="mt-8 text-4xl md:text-7xl font-druk uppercase tracking-tighter text-accent">
                Everything in one page
              </h2>

              <p className="mt-6 text-black max-w-3xl mx-auto text-base md:text-lg leading-relaxed font-theater font-bold bg-white/80 p-6 border-2 border-accent shadow-[8px_8px_0_#e60000] backdrop-blur-sm">
                {personalInfo.summary}
              </p>
            </div>

            <div className="mt-14 max-w-4xl mx-auto text-left">
              <div className="border-2 border-accent bg-white p-6 shadow-[8px_8px_0_#8b0000]">
                <div className="flex items-end justify-between gap-4">
                  <h3 className="text-xl font-druk uppercase tracking-widest text-accent">
                    Certifications
                  </h3>
                  <div className="text-[10px] font-druk uppercase tracking-[0.35em] text-accent/60">
                    {certifications.length} items
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  {certifications.map((c, idx) => (
                    <div
                      key={c}
                      ref={(el) => {
                        certCardRefs.current[idx] = el;
                      }}
                      className="group border-2 border-accent bg-white p-4 shadow-[6px_6px_0_#e60000] transition-transform duration-300 hover:translate-x-2"
                    >
                      <div className="flex items-start gap-4">
                        <div className="shrink-0 w-9 h-9 border-2 border-accent bg-white text-accent flex items-center justify-center font-druk text-xs tracking-widest">
                          {String(idx + 1).padStart(2, "0")}
                        </div>
                        <div className="flex-1">
                          <div className="font-theater font-bold text-black leading-snug">
                            {c}
                          </div>
                          <div className="mt-1 text-[10px] font-druk uppercase tracking-[0.35em] text-accent/60 group-hover:text-accent transition-colors">
                            Certification
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <div data-motion-reveal data-motion-parallax className="will-change-transform">
          <SkillsSection />
        </div>

        <section id="experience">
          <RadialOrbitalTimeline timelineData={timelineData} />
        </section>

        <div className="will-change-transform">
          <Contact />
        </div>
      </main>

      <footer className="py-12 bg-white border-t-2 border-accent relative z-30">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-10">
          <a href="#home" className="text-4xl font-druk tracking-tighter text-accent">
            RM<span className="text-reddark">.</span>
          </a>

          <div className="flex flex-wrap justify-center gap-x-10 gap-y-4 font-druk text-accent tracking-widest text-sm uppercase">
            <a href="#resume" className="hover:text-reddark transition-colors">
              Resume
            </a>
            <a href="#skills" className="hover:text-reddark transition-colors">
              Skills
            </a>
            <a href="#experience" className="hover:text-reddark transition-colors">
              Experience
            </a>
            <a href="#projects" className="hover:text-reddark transition-colors">
              Work
            </a>
            <a href="#contact" className="hover:text-reddark transition-colors">
              Contact
            </a>
          </div>

          <p className="text-muted text-xs font-theater font-bold uppercase tracking-widest text-center md:text-right">
            Designed for Impact <br />
            Built for Scale by{" "}
            <span className="text-accent underline decoration-2 underline-offset-4">
              {personalInfo.name}
            </span>
          </p>
        </div>

        <div className="mt-10 text-center text-[10px] font-druk text-accent/30 tracking-[1em] uppercase">
          Digital Architect © 2026
        </div>
      </footer>
    </div>
  );
}

export default App;
