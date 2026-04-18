"use client";
import { useEffect, useMemo, useState } from "react";

export type LandingAccordionWorkItem = {
  id: number | string;
  title: string;
  link?: string;
  imageUrl?: string;
  imagePosition?: string;
  imageFit?: "cover" | "contain";
};

const defaultItems: LandingAccordionWorkItem[] = [
  {
    id: 1,
    title: "Canteen Rush AI",
    imageUrl:
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1974&auto=format&fit=crop",
    link: "https://canteen-rush-ai-z8ve.vercel.app"
  },
  {
    id: 2,
    title: "Habit Tracker",
    imageUrl:
      "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?q=80&w=2072&auto=format&fit=crop",
    link: "https://habit-tracker-omega-jet.vercel.app"
  },
  {
    id: 3,
    title: "Trackify",
    imageUrl:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop",
    link: "https://trackify-six-weld.vercel.app"
  },
  {
    id: 4,
    title: "Maison Noir",
    imageUrl:
      "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=2070&auto=format&fit=crop",
    link: "https://maison-noir-azure.vercel.app"
  },
  {
    id: 5,
    title: "BookHive",
    imageUrl:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=2070&auto=format&fit=crop"
  }
];

function AccordionItem({
  item,
  isActive,
  onMouseEnter
}: {
  item: LandingAccordionWorkItem;
  isActive: boolean;
  onMouseEnter: () => void;
}) {
  const hasLink = Boolean(item.link && item.link !== "#");
  const clickable = Boolean(isActive && hasLink);

  const handleOpenLink = () => {
    if (!clickable || !item.link) return;
    window.open(item.link, "_blank", "noopener,noreferrer");
  };

  const inner = (
    <>
      {item.imageUrl ? (
        <img
          src={item.imageUrl}
          alt={item.title}
          className="absolute inset-0 w-full h-full bg-white"
          style={{
            objectFit: item.imageFit ?? "cover",
            objectPosition: item.imagePosition ?? "center"
          }}
          loading="eager"
        />
      ) : (
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(230,0,0,0.18),transparent_60%),linear-gradient(to_bottom_right,rgba(139,0,0,0.20),transparent)]" />
      )}

      <div className="absolute inset-0 bg-black/40 hover:bg-black/20 transition-colors" />

      <span
        className={`absolute text-white text-lg font-druk uppercase whitespace-nowrap transition-all duration-300 ease-in-out ${
          isActive
            ? "bottom-6 left-1/2 -translate-x-1/2 rotate-0"
            : "w-auto text-left bottom-24 left-1/2 -translate-x-1/2 rotate-90"
        }`}
      >
        {item.title}
      </span>

      {isActive && (
        <span
          className={`absolute top-6 right-6 px-3 py-1 bg-accent border-2 border-white rounded-none text-xs text-white uppercase tracking-widest font-druk transition-colors shadow-[2px_2px_0_white] ${
            clickable ? "hover:bg-white hover:text-accent" : "opacity-70"
          }`}
        >
          {clickable ? "View Live" : "No Link"}
        </span>
      )}
    </>
  );

  const baseClassName = `relative h-[450px] rounded-2xl overflow-hidden transition-all duration-700 ease-in-out ${
    isActive ? "w-[300px] md:w-[400px]" : "w-[60px]"
  } ${hasLink ? "cursor-pointer" : "cursor-default"}`;

  return (
    <div
      className={baseClassName}
      onMouseEnter={onMouseEnter}
      onClick={handleOpenLink}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleOpenLink();
        }
      }}
      role={hasLink ? "link" : undefined}
      tabIndex={hasLink ? 0 : undefined}
      aria-label={hasLink ? `${item.title} live link` : undefined}
    >
      {inner}
    </div>
  );
}

export function LandingAccordionItem({
  items
}: {
  items?: LandingAccordionWorkItem[];
}) {
  const [activeIndex, setActiveIndex] = useState(0);

  const data = useMemo(() => {
    const list = items && items.length ? items : defaultItems;
    return list.slice(0, Math.max(5, Math.min(10, list.length)));
  }, [items]);

  useEffect(() => {
    const imageUrls = data
      .map((item) => item.imageUrl)
      .filter((url): url is string => Boolean(url));

    imageUrls.forEach((url) => {
      const img = new Image();
      img.src = url;
      img.decoding = "async";
    });
  }, [data]);

  return (
    <div className="bg-white text-accent py-32 border-b-2 border-accent" id="projects">
      <section className="container mx-auto px-4">
        <div className="flex flex-col xl:flex-row items-center justify-between gap-12 max-w-7xl mx-auto">
          <div className="w-full xl:w-2/5 text-center xl:text-left">
            <h2 className="text-reddark text-sm tracking-widest uppercase mb-4 font-theater font-bold">
              Selected Work
            </h2>
            <h1 className="text-4xl md:text-6xl font-druk uppercase leading-none tracking-tighter text-accent mix-blend-multiply">
              Projects I shipped
            </h1>
            <p className="mt-6 text-lg text-black max-w-xl mx-auto xl:mx-0 font-theater font-bold bg-surface p-4 border border-accent shadow-[4px_4px_0_#e60000]">
              Real apps, real deployments, clean UX — built with performance and reliability.
            </p>
          </div>

          <div className="w-full xl:w-3/5">
            <div className="flex flex-row items-center justify-center gap-2 md:gap-4 overflow-x-auto p-4 w-full scrollbar-none border-2 border-accent shadow-[8px_8px_0_#8b0000] bg-white">
              {data.map((item, index) => (
                <AccordionItem
                  key={item.id}
                  item={item}
                  isActive={index === activeIndex}
                  onMouseEnter={() => setActiveIndex(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
