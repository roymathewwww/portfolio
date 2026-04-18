"use client";
import { useState, useEffect, useRef } from "react";
import { Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export interface TimelineItem {
  id: number;
  title: string;
  date: string;
  content: string;
  category: string;
  icon: React.ElementType;
  relatedIds: number[];
  status: "completed" | "in-progress" | "pending";
  energy: number;
}

interface RadialOrbitalTimelineProps {
  timelineData: TimelineItem[];
}

export function RadialOrbitalTimeline({ timelineData }: RadialOrbitalTimelineProps) {
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>({});
  const [viewMode] = useState<"orbital">("orbital");
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [pulseEffect, setPulseEffect] = useState<Record<number, boolean>>({});
  const [centerOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [activeNodeId, setActiveNodeId] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Record<number, HTMLDivElement | null>>({});

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === containerRef.current || e.target === orbitRef.current) {
      setExpandedItems({});
      setActiveNodeId(null);
      setPulseEffect({});
      setAutoRotate(true);
    }
  };

  const toggleItem = (id: number) => {
    setExpandedItems((prev) => {
      const newState = { ...prev };
      Object.keys(newState).forEach((key) => {
        if (parseInt(key) !== id) newState[parseInt(key)] = false;
      });

      newState[id] = !prev[id];

      if (!prev[id]) {
        setActiveNodeId(id);
        setAutoRotate(false);
        const relatedItems = getRelatedItems(id);
        const newPulseEffect: Record<number, boolean> = {};
        relatedItems.forEach((relId) => newPulseEffect[relId] = true);
        setPulseEffect(newPulseEffect);
        centerViewOnNode(id);
      } else {
        setActiveNodeId(null);
        setAutoRotate(true);
        setPulseEffect({});
      }
      return newState;
    });
  };

  useEffect(() => {
    let rotationTimer: ReturnType<typeof setInterval>;
    if (autoRotate && viewMode === "orbital") {
      rotationTimer = setInterval(() => {
        setRotationAngle((prev) => Number(((prev + 0.3) % 360).toFixed(3)));
      }, 50);
    }
    return () => clearInterval(rotationTimer);
  }, [autoRotate, viewMode]);

  const centerViewOnNode = (nodeId: number) => {
    if (viewMode !== "orbital" || !nodeRefs.current[nodeId]) return;
    const nodeIndex = timelineData.findIndex((item) => item.id === nodeId);
    const targetAngle = (nodeIndex / timelineData.length) * 360;
    setRotationAngle(270 - targetAngle);
  };

  const calculateNodePosition = (index: number, total: number) => {
    const angle = ((index / total) * 360 + rotationAngle) % 360;
    const radius = Math.min(window.innerWidth * 0.3, 200); // responsive radius
    const radian = (angle * Math.PI) / 180;
    const x = radius * Math.cos(radian) + centerOffset.x;
    const y = radius * Math.sin(radian) + centerOffset.y;
    const zIndex = Math.round(100 + 50 * Math.cos(radian));
    const opacity = Math.max(0.4, Math.min(1, 0.4 + 0.6 * ((1 + Math.sin(radian)) / 2)));
    return { x, y, angle, zIndex, opacity };
  };

  const getRelatedItems = (itemId: number): number[] => {
    return timelineData.find((item) => item.id === itemId)?.relatedIds || [];
  };

  const isRelatedToActive = (itemId: number): boolean => {
    if (!activeNodeId) return false;
    return getRelatedItems(activeNodeId).includes(itemId);
  };

  const getStatusStyles = (status: TimelineItem["status"]) => {
    if (status === "completed") return "text-white bg-accent border-accent";
    if (status === "in-progress") return "text-accent bg-white border-accent";
    return "text-white bg-muted border-muted";
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-white overflow-hidden relative border-b-2 border-accent" ref={containerRef} onClick={handleContainerClick}>
      <h2 className="absolute top-20 text-4xl font-druk uppercase text-accent z-20">My Experience</h2>
      <div className="relative w-full max-w-4xl h-full flex items-center justify-center">
        <div className="absolute w-full h-full flex items-center justify-center" ref={orbitRef} style={{ perspective: "1000px", transform: `translate(${centerOffset.x}px, ${centerOffset.y}px)` }}>
          <div className="absolute w-16 h-16 rounded-full bg-accent animate-[pulse_2s_cubic-bezier(0.4,0,0.6,1)_infinite] flex items-center justify-center z-10 shadow-[0_0_20px_#e60000]">
            <div className="absolute w-20 h-20 rounded-full border-2 border-accent animate-ping opacity-70"></div>
            <div className="absolute w-24 h-24 rounded-full border border-reddark animate-ping opacity-50" style={{ animationDelay: "0.5s" }}></div>
            <div className="w-8 h-8 rounded-full bg-white backdrop-blur-md"></div>
          </div>
          <div className="absolute w-[min(100vw-80px,500px)] h-[min(100vw-80px,500px)] rounded-full border border-accent/20 border-dashed"></div>
          {timelineData.map((item, index) => {
            const position = calculateNodePosition(index, timelineData.length);
            const isExpanded = expandedItems[item.id];
            const isRelated = isRelatedToActive(item.id);
            const isPulsing = pulseEffect[item.id];
            const Icon = item.icon;
            
            return (
              <div key={item.id} ref={(el) => { if (el) nodeRefs.current[item.id] = el; }} className="absolute transition-all duration-700 cursor-pointer" style={{ transform: `translate(${position.x}px, ${position.y}px)`, zIndex: isExpanded ? 200 : position.zIndex, opacity: isExpanded ? 1 : position.opacity }} onClick={(e) => { e.stopPropagation(); toggleItem(item.id); }}>
                <div className={`absolute rounded-full -inset-1 ${isPulsing ? "animate-[pulse_1s_infinite]" : ""}`} style={{ background: `radial-gradient(circle, rgba(230,0,0,0.2) 0%, rgba(230,0,0,0) 70%)`, width: `${item.energy * 0.5 + 40}px`, height: `${item.energy * 0.5 + 40}px`, left: `-${(item.energy * 0.5 + 40 - 40) / 2}px`, top: `-${(item.energy * 0.5 + 40 - 40) / 2}px` }}></div>
                <div className={`w-10 h-10 flex items-center justify-center ${isExpanded ? "bg-accent text-white" : isRelated ? "bg-white text-accent" : "bg-surface text-accent"} border-2 ${isExpanded ? "border-accent shadow-[4px_4px_0_#8b0000]" : isRelated ? "border-accent animate-pulse" : "border-accent/40"} transition-all duration-300 transform ${isExpanded ? "scale-150 rotate-[-10deg]" : ""}`}>
                  <Icon size={16} />
                </div>
                <div className={`absolute top-12 whitespace-nowrap text-xs font-druk tracking-wider transition-all duration-300 uppercase ${isExpanded ? "text-accent scale-125" : "text-accent/70"}`}>
                  {item.title}
                </div>
                {isExpanded && (
                  <Card className="absolute top-20 left-1/2 -translate-x-1/2 w-64 bg-white border-2 border-accent shadow-[8px_8px_0_#e60000] overflow-visible hidden md:block rounded-none font-theater">
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-px h-3 bg-accent" />
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <Badge className={`px-2 text-[10px] uppercase font-druk rounded-none ${getStatusStyles(item.status)}`}>{item.status}</Badge>
                        <span className="text-xs font-theater font-bold text-accent">{item.date}</span>
                      </div>
                      <CardTitle className="text-sm mt-2 font-druk uppercase text-accent">{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="text-xs text-black font-bold">
                      <p>{item.content}</p>
                      <div className="mt-4 pt-3 border-t border-accent/20">
                         <div className="flex justify-between items-center text-[10px] mb-1 font-druk uppercase text-accent">
                            <span className="flex items-center"><Zap size={10} className="mr-1" />Energy Level</span>
                            <span>{item.energy}%</span>
                         </div>
                         <div className="w-full h-2 bg-surface overflow-hidden border border-accent">
                           <div className="h-full bg-accent" style={{ width: `${item.energy}%` }}></div>
                         </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
