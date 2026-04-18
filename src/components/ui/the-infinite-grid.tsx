import React, { useEffect, useId, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "../../lib/utils";
import {
  motion,
  useAnimationFrame,
  useMotionTemplate,
  useMotionValue
} from "framer-motion";

export const InfiniteGridBackground = ({ children, className }: { children?: React.ReactNode, className?: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMoveGlobal = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMoveGlobal);
    return () => window.removeEventListener("mousemove", handleMouseMoveGlobal);
  }, []);

  const gridOffsetX = useMotionValue(0);
  const gridOffsetY = useMotionValue(0);

  const speedX = 0.5;
  const speedY = 0.5;

  useAnimationFrame(() => {
    const currentX = gridOffsetX.get();
    const currentY = gridOffsetY.get();
    gridOffsetX.set((currentX + speedX) % 40);
    gridOffsetY.set((currentY + speedY) % 40);
  });

  const maskImage = useMotionTemplate`radial-gradient(300px circle at ${mouseX}px ${mouseY}px, black, transparent)`;

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full min-h-screen bg-transparent overflow-hidden",
        className
      )}
    >
      {/* Background layer */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.05]">
        <GridPattern offsetX={gridOffsetX} offsetY={gridOffsetY} />
      </div>
      
      {/* Hover reveal layer */}
      <motion.div
        className="fixed inset-0 z-0 pointer-events-none opacity-40 mix-blend-difference"
        style={{ maskImage, WebkitMaskImage: maskImage }}
      >
        <GridPattern offsetX={gridOffsetX} offsetY={gridOffsetY} />
      </motion.div>

      {/* Decorative blur blobs */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute right-[-20%] top-[-20%] w-[40%] h-[40%] rounded-full bg-orange-500/10 blur-[120px]" />
        <div className="absolute right-[10%] top-[-10%] w-[20%] h-[20%] rounded-full bg-blue-500/10 blur-[100px]" />
        <div className="absolute left-[-10%] bottom-[-20%] w-[40%] h-[40%] rounded-full bg-purple-500/10 blur-[120px]" />
      </div>

      {/* Page Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export const InfiniteGridScrollSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const planeRef = useRef<HTMLDivElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  const pendingPointerRef = useRef<{ x: number; y: number } | null>(null);
  const rafRef = useRef<number | null>(null);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    pendingPointerRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };

    if (rafRef.current != null) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      const pending = pendingPointerRef.current;
      const container = containerRef.current;
      if (!pending || !container) return;
      container.style.setProperty("--mx", `${pending.x}px`);
      container.style.setProperty("--my", `${pending.y}px`);
    });
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    const plane = planeRef.current;
    const reveal = revealRef.current;
    const progressBar = progressBarRef.current;
    if (!container || !plane || !reveal || !progressBar) return;

    const setGx = gsap.quickSetter(plane, "--gx", "px");
    const setGy = gsap.quickSetter(plane, "--gy", "px");
    const setProg = gsap.quickSetter(progressBar, "scaleX");

    gsap.set(progressBar, { transformOrigin: "0 50%", scaleX: 0 });
    gsap.set(plane, {
      rotationX: 70,
      rotationY: 0,
      rotationZ: 0,
      yPercent: 35,
      scale: 1.05,
      transformPerspective: 900,
      transformOrigin: "50% 50%"
    });

    const phaseEls = Array.from(container.querySelectorAll<HTMLElement>("[data-grid-phase]"));
    phaseEls.forEach((el, idx) => {
      gsap.set(el, { autoAlpha: idx === 0 ? 1 : 0, y: idx === 0 ? 0 : 14 });
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: "+=240%",
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const p = self.progress;
          setProg(p);
          setGx(p * 820);
          setGy(p * 1180);
        }
      }
    });

    tl.to(
      plane,
      {
        rotationX: 55,
        rotationY: -18,
        yPercent: -10,
        scale: 1.35,
        ease: "none"
      },
      0
    );

    tl.fromTo(reveal, { opacity: 0.18 }, { opacity: 0.55, ease: "none" }, 0.1);

    if (phaseEls.length >= 3) {
      tl.to(phaseEls[0], { autoAlpha: 0, y: -14, duration: 0.08, ease: "none" }, 0.33);
      tl.to(phaseEls[1], { autoAlpha: 1, y: 0, duration: 0.08, ease: "none" }, 0.33);
      tl.to(phaseEls[1], { autoAlpha: 0, y: -14, duration: 0.08, ease: "none" }, 0.66);
      tl.to(phaseEls[2], { autoAlpha: 1, y: 0, duration: 0.08, ease: "none" }, 0.66);
    }

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  useEffect(() => {
    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const gridImage =
    "linear-gradient(to right, rgba(239,83,76,0.24) 1px, transparent 1px), linear-gradient(to bottom, rgba(239,83,76,0.24) 1px, transparent 1px)";

  const revealMask = "radial-gradient(320px circle at var(--mx) var(--my), black, transparent)";

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      className="relative w-full h-screen bg-white border-y-2 border-accent overflow-hidden"
      style={{
        // defaults for the reveal mask
        ["--mx" as any]: "50%",
        ["--my" as any]: "50%"
      }}
    >
      {/* subtle brand lighting */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(239,83,76,0.16),transparent_55%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white" />
      </div>

      {/* 3D grid plane */}
      <div className="absolute inset-0 [perspective:900px]">
        <div
          ref={planeRef}
          className="absolute left-1/2 top-[58%] w-[170vmax] h-[170vmax] -translate-x-1/2 -translate-y-1/2"
          style={{
            ["--gx" as any]: "0px",
            ["--gy" as any]: "0px"
          }}
        >
          <div
            className="absolute inset-0 opacity-[0.10]"
            style={{
              backgroundImage: gridImage,
              backgroundSize: "48px 48px",
              backgroundPosition: "var(--gx) var(--gy)"
            }}
          />
          <div
            ref={revealRef}
            className="absolute inset-0 opacity-50"
            style={{
              backgroundImage: gridImage,
              backgroundSize: "48px 48px",
              backgroundPosition: "var(--gx) var(--gy)",
              WebkitMaskImage: revealMask,
              maskImage: revealMask
            }}
          />
        </div>
      </div>


      {/* Progress */}
      <div className="absolute bottom-10 right-10 z-20 w-44 h-[2px] bg-black/10 overflow-hidden">
        <div ref={progressBarRef} className="h-full w-full bg-accent" />
      </div>
    </div>
  );
};

const GridPattern = ({
  offsetX,
  offsetY,
  className,
  strokeClassName = "text-black/50"
}: {
  offsetX: any;
  offsetY: any;
  className?: string;
  strokeClassName?: string;
}) => {
  const patternId = useId().replace(/:/g, "");

  return (
    <svg className={cn("w-full h-full", className)}>
      <defs>
        <motion.pattern
          id={patternId}
          width="40"
          height="40"
          patternUnits="userSpaceOnUse"
          x={offsetX}
          y={offsetY}
        >
          <path
            d="M 40 0 L 0 0 0 40"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            className={strokeClassName}
          />
        </motion.pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
    </svg>
  );
};
