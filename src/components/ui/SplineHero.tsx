'use client'

import { Suspense, lazy, useRef, type MouseEvent } from 'react'
import { Spotlight } from "@/components/ui/spotlight"
import { personalInfo } from '@/data'
import { motion } from 'framer-motion'
import Lenis from "@studio-freight/lenis"

const Spline = lazy(() => import('@splinetool/react-spline'))

interface SplineHeroProps {
  scene?: string
}

export function SplineHero({ 
  scene = "https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode" 
}: SplineHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  
  const scrollToSection = (targetId: string) => (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    const target = document.querySelector<HTMLElement>(targetId)
    if (!target) return

    const lenis = (window as Window & { __lenis?: Lenis }).__lenis
    if (lenis) {
      lenis.scrollTo(target, { duration: 1.2, offset: 0 })
      return
    }

    target.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <div ref={containerRef} className="w-full h-screen bg-white relative overflow-hidden flex items-center justify-center border-b-2 border-accent">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20 opacity-20"
        fill="red"
      />
      
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 h-full max-w-7xl items-center relative z-10 px-6">
        {/* Left content */}
        <div className="relative flex flex-col justify-center text-accent z-20 md:pr-10">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-5xl sm:text-7xl md:text-[8rem] font-moho font-bold text-accent mb-2 uppercase leading-none tracking-tighter">
              {personalInfo.name}
            </h1>
            <h2 className="text-xl md:text-3xl text-reddark font-druk tracking-widest uppercase mb-6 mt-4">
              Full-Stack Developer
            </h2>
            <p className="mt-4 text-black max-w-lg text-lg md:text-xl leading-relaxed font-theater font-bold bg-white/80 p-6 border-2 border-accent shadow-[8px_8px_0_#e60000] backdrop-blur-sm">
              I build reliable web applications with a focus on performance, clean UX, and practical results.
            </p>
            <div className="mt-10 flex gap-4">
              <a href="#projects" className="btn-primary transition-all duration-500" onClick={scrollToSection("#projects")}>
                Explore Work
              </a>
              <a href="#contact" className="btn-outline transition-all duration-500" onClick={scrollToSection("#contact")}>
                Let's Connect
              </a>
            </div>
          </motion.div>
        </div>

        {/* Right content - Full interaction area for model tracking */}
        <div className="absolute inset-y-0 right-0 w-full md:w-[58vw] pointer-events-auto z-10">
          <Suspense 
            fallback={
              <div className="w-full h-full flex items-center justify-center text-accent/50 animate-pulse font-druk uppercase tracking-widest">
                Connecting to 3D Interface...
              </div>
            }
          >
            <Spline
              scene={scene}
              className="w-full h-full"
            />
          </Suspense>
        </div>
      </div>

      {/* Brutalist Corner Decorations */}
      <div className="absolute top-0 right-0 w-20 h-20 border-b-2 border-l-2 border-accent" />
      <div className="absolute bottom-0 left-0 w-20 h-20 border-t-2 border-r-2 border-accent" />
      
    </div>
  )
}
