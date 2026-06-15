"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

export interface Post {
  title: string;
  brief: string;
  publishedAt: string;
  readTimeInMinutes: number;
  url: string;
  tags: { name: string }[];
}

const navItems = [
  { label: "Work", href: "#work", id: "work" },
  { label: "About", href: "#about", id: "about" },
  { label: "Writing", href: "#writing", id: "writing" },
  { label: "Contact", href: "#contact", id: "contact" },
];

const projects = [
  {
    year: "2025 — Present",
    name: "ERAD Investment",
    description:
      "A luxury investment brand that needed to feel authoritative without feeling cold. Navy, gold, and a lot of restraint.",
    tags: ["Next.js 14", "Framer Motion", "Tailwind"],
    link: { label: "Live ↗", href: "https://erad-mu.vercel.app" },
    image: "/assets/project-erad.png",
  },
  {
    year: "2025 — Present",
    name: "GigSecure",
    description:
      "Insurance built from scratch for Nigerian gig workers. Auth flows, KYC, marketplace, risk scoring — the full product.",
    tags: ["Next.js", "Zustand", "TanStack Query", "Framer Motion"],
    link: { label: "Live ↗", href: "https://gigsecure.co" },
    image: "/assets/project-gigsecure.png",
    flipped: true,
  },
  {
    year: "2025 — Present",
    name: "Aether",
    description:
      "A cloud-native platform that turns local Jupyter notebooks into production-ready APIs. One-click deploys, live build logs, and a deliberately sharp brutalist interface.",
    tags: ["Next.js", "TypeScript", "Google Cloud Run", "WebSockets"],
    link: {
      label: "Live ↗",
      href: "https://aether-860155021919.us-central1.run.app/",
    },
    image: "/assets/project-aether.png",
  },
  {
    year: "2025",
    name: "CKSI",
    description:
      "A website for a sickle cell NGO in Lagos. Real programs, donation flows, genotype testing, and a gallery of actual field work.",
    tags: ["Next.js", "Prisma", "Paystack", "Cloudinary"],
    link: { label: "Live ↗", href: "https://cksi.org" },
    image: "/assets/project-cksi.png",
    flipped: true,
  },
];

const principles = [
  {
    title: "Understand the business first",
    description:
      "Before I write a single component, I want to know who the product is for, what problem it's solving, and what success looks like for the client. The design always follows from that.",
  },
  {
    title: "Design before code. Always.",
    description:
      "I work through the layout and the decisions visually first. Once that's clear, I break it into smaller pieces and build each one properly — components that do one thing well.",
  },
  {
    title: "Every project is different",
    description:
      "ERAD needed restraint and elegance. GigSecure needed production-grade auth and risk scoring. CKSI needed warmth. I don't bring a template to a project — I bring a process.",
  },
  {
    title: "The details are where it lives",
    description:
      "Hover states. Load times. What happens when an API call fails. The transition between screens. This is where good frontend separates from the rest, and it's the part I enjoy most.",
  },
];

const tickerItems = [
  "Available for work",
  "Lagos, Nigeria",
  "Next.js",
  "TypeScript",
  "Frontend Engineer",
  "Framer Motion",
  "Open to relocation",
  "Web3",
  "React",
];

const spring = { type: "spring", stiffness: 300, damping: 25 };
const luffyPath =
  "M4645 7274 c-9 -10 -36 -47 -61 -84 -57 -87 -118 -143 -197 -180 -162 -78 -283 -221 -341 -404 -36 -110 -57 -131 -128 -122 -29 3 -58 3 -64 -1 -5 -5 -15 -35 -21 -69 -6 -34 -24 -81 -41 -108 -102 -161 -47 -251 242 -396 204 -103 370 -152 665 -195 58 -9 107 -17 109 -20 2 -2 -33 -45 -79 -97 -145 -164 -174 -225 -167 -345 7 -106 53 -195 126 -243 l54 -35 -34 -28 c-66 -56 -119 -81 -173 -81 -60 0 -103 19 -247 113 -128 83 -190 139 -225 200 -36 64 -111 139 -150 152 -44 14 -80 2 -141 -50 -79 -67 -134 -76 -237 -41 -66 23 -169 26 -243 9 -75 -18 -221 -93 -290 -150 -115 -94 -178 -200 -207 -354 -22 -114 -58 -510 -58 -645 0 -84 5 -146 16 -190 34 -132 16 -178 -65 -167 -33 4 -49 14 -70 39 -76 93 -72 91 -149 84 -67 -7 -70 -6 -97 21 -16 15 -44 66 -63 112 -37 91 -57 107 -115 96 -50 -9 -84 -41 -84 -79 0 -40 -17 -65 -61 -85 -62 -29 -45 -88 69 -240 76 -101 460 -500 488 -507 32 -8 43 1 69 60 31 69 52 86 115 91 64 5 109 37 139 98 34 70 37 125 11 209 -20 65 -22 86 -16 198 3 69 19 242 35 385 31 269 55 374 108 479 57 113 200 212 322 223 39 4 66 2 74 -6 9 -6 16 -40 20 -84 6 -90 21 -122 62 -142 44 -20 73 -19 118 5 69 37 119 21 225 -74 82 -73 94 -79 152 -71 58 8 75 0 152 -69 31 -28 75 -64 98 -81 28 -20 61 -60 97 -120 30 -49 76 -112 103 -140 78 -82 83 -97 91 -290 5 -126 12 -193 29 -260 25 -99 32 -259 16 -395 -7 -70 -6 -77 16 -110 13 -19 43 -48 67 -65 40 -28 49 -30 136 -30 107 -1 114 -4 171 -91 45 -68 94 -100 214 -140 202 -67 334 -72 450 -17 142 66 504 435 540 551 29 89 53 132 76 138 26 7 64 -20 174 -122 l55 -52 2 -82 c2 -70 6 -89 28 -122 35 -52 79 -78 136 -78 56 0 75 13 92 65 13 36 18 41 53 45 36 5 39 7 38 35 0 17 -13 84 -29 150 -25 103 -30 141 -31 270 -1 172 -11 203 -83 268 -64 57 -97 48 -136 -36 -28 -60 -51 -65 -118 -27 -88 49 -193 54 -237 10 -16 -16 -20 -34 -20 -90 0 -92 -17 -125 -170 -330 -144 -192 -185 -239 -263 -297 -74 -54 -120 -67 -183 -52 -93 24 -212 127 -202 175 2 10 25 29 53 44 89 48 132 175 89 266 -9 19 -37 46 -65 64 -62 41 -86 80 -105 177 -31 152 -15 449 27 499 18 22 48 17 75 -13 46 -50 81 -142 103 -271 38 -227 75 -278 191 -269 87 8 163 42 230 104 98 91 190 113 305 73 102 -35 165 -20 165 39 0 29 25 77 44 84 39 15 64 133 35 162 -12 11 -23 11 -69 -1 -53 -15 -119 -14 -198 2 -30 6 -36 2 -67 -33 -20 -23 -56 -50 -86 -63 -107 -45 -211 -8 -252 91 -16 38 -17 51 -8 87 15 53 41 71 127 83 38 5 93 21 122 34 30 14 62 25 71 25 9 0 49 -20 88 -45 124 -77 313 -146 473 -172 150 -25 236 -12 430 63 83 32 244 9 342 -49 59 -35 85 -65 112 -132 27 -64 33 -62 36 10 4 88 3 94 -34 109 -23 10 -42 28 -55 54 -26 51 -82 97 -137 112 -45 13 -53 12 -147 -13 -60 -17 -288 -37 -419 -38 -51 -1 -86 5 -118 18 -25 11 -83 30 -130 42 -127 34 -132 38 -124 116 7 63 6 65 -36 129 -23 36 -46 82 -52 103 -15 57 -22 432 -9 466 10 25 15 27 62 27 82 0 137 43 154 120 12 55 40 102 79 133 43 34 71 85 91 168 7 34 21 69 29 78 14 14 19 13 43 -5 16 -11 38 -40 51 -65 30 -57 24 -120 -17 -193 -37 -65 -30 -76 50 -76 80 0 92 -17 73 -103 -7 -35 -13 -126 -14 -207 0 -80 -4 -172 -10 -205 -13 -83 -29 -94 -129 -93 -63 1 -88 -4 -133 -24 -61 -28 -98 -62 -98 -90 0 -11 16 -33 35 -51 43 -40 54 -71 48 -130 -5 -46 -5 -47 29 -62 49 -20 205 -34 271 -24 104 17 179 64 196 124 5 20 5 65 -2 119 -9 73 -7 103 8 186 15 84 17 129 12 295 -7 198 -3 235 28 235 8 0 38 5 67 11 64 14 108 54 108 97 0 32 14 42 61 42 38 0 38 23 3 93 -105 205 -208 296 -394 343 -76 19 -103 31 -95 44 3 5 62 27 130 50 144 46 193 50 298 19 53 -16 85 -20 118 -15 95 14 260 140 338 257 53 79 81 171 87 289 5 84 3 99 -15 127 -44 70 -156 94 -233 51 -51 -29 -63 -21 -109 70 -41 82 -58 103 -116 144 -158 108 -362 92 -571 -45 -180 -118 -308 -156 -369 -111 -64 48 -50 109 35 146 l46 21 -28 23 c-31 27 -78 31 -116 9 -36 -21 -50 -18 -50 8 0 43 54 103 128 142 75 39 159 114 112 100 -112 -33 -163 -44 -210 -44 -71 -1 -110 -25 -154 -94 -40 -62 -82 -87 -149 -87 -53 0 -77 19 -77 58 0 37 8 46 56 68 23 11 69 48 102 84 l60 66 -131 -4 c-148 -4 -160 -9 -204 -74 -32 -48 -58 -53 -121 -27 -36 15 -28 18 -128 -49 -51 -34 -90 -49 -101 -38 -4 3 -2 22 4 41 6 19 7 35 3 35 -26 0 -60 -26 -70 -54 -24 -66 -36 -81 -75 -94 -53 -17 -65 -29 -91 -88 -23 -52 -67 -97 -106 -109 -58 -18 -72 -60 -43 -129 20 -47 10 -83 -29 -107 -23 -15 -41 -18 -70 -13 l-40 6 27 -32 c27 -32 35 -74 17 -85 -22 -14 -10 -35 20 -35 27 0 30 -3 30 -30 0 -33 6 -35 87 -30 96 5 125 -19 103 -85 -13 -40 -72 -95 -101 -95 -11 0 -37 9 -59 20 -22 11 -50 20 -63 20 -33 0 -97 -71 -97 -106 l0 -27 74 7 c85 8 132 -6 160 -45 23 -34 20 -49 -12 -49 -42 0 -160 -35 -233 -69 -75 -36 -136 -40 -275 -16 -123 22 -166 45 -226 122 -57 72 -90 93 -147 93 -55 0 -66 19 -90 168 -11 68 -26 133 -34 145 -8 12 -40 31 -73 42 -83 28 -84 47 -4 179 101 167 153 232 209 261 67 34 128 33 187 -1 39 -23 53 -26 109 -22 45 3 73 10 92 25 29 21 30 30 17 105 -5 29 -1 45 16 72 34 55 25 73 -74 148 -92 71 -114 79 -141 52z m2458 -647 c45 -19 104 -88 117 -137 9 -34 8 -47 -9 -85 -20 -46 -69 -85 -106 -85 -31 0 -80 -34 -104 -73 -32 -51 -68 -63 -153 -49 -37 7 -83 12 -101 12 -39 0 -90 -29 -113 -65 -24 -36 -65 -55 -121 -55 -43 0 -85 13 -73 22 3 2 18 12 33 22 26 16 28 21 22 56 l-6 38 48 14 c46 13 49 16 70 73 27 75 27 78 3 70 -24 -8 -70 18 -70 39 0 26 39 63 79 74 27 9 52 27 77 57 20 25 42 45 48 45 7 0 25 -13 41 -30 16 -16 37 -30 46 -30 10 0 53 22 96 50 84 54 118 61 176 37z m-1753 -716 c0 -48 -25 -64 -84 -56 -28 3 -55 10 -59 14 -9 9 106 71 130 71 8 0 13 -11 13 -29z m-297 -245 c47 -19 67 -43 67 -80 0 -62 -68 -221 -123 -288 -21 -27 -24 -27 -83 -19 -124 18 -143 65 -80 197 35 73 146 204 172 204 8 0 29 -6 47 -14z m1168 -632 c24 -86 24 -115 0 -156 -11 -18 -23 -50 -27 -71 -6 -36 -8 -37 -23 -23 -10 10 -18 43 -23 84 -3 37 -10 88 -13 114 -9 57 -1 92 26 119 28 28 37 17 60 -67z";

function externalProps(label: string) {
  return {
    target: "_blank",
    rel: "noopener noreferrer",
    "aria-label": label,
  };
}

function SectionStamp({ label }: { label: string }) {
  return (
    <h2 className="mb-9 inline-flex border-[1.5px] border-ink px-3 py-[5px] font-syne text-[11px] font-extrabold uppercase tracking-[0.2em] text-ink">
      {label}
    </h2>
  );
}

function CornerBrackets({
  color = "rgba(200,241,53,0.35)",
  size = 18,
}: {
  color?: string;
  size?: number;
}) {
  const style = (pos: React.CSSProperties): React.CSSProperties => ({
    position: "absolute",
    width: size,
    height: size,
    borderColor: color,
    borderStyle: "solid",
    ...pos,
  });

  return (
    <>
      <span style={style({ top: 20, left: 20, borderWidth: "1px 0 0 1px" })} />
      <span
        style={style({ top: 20, right: 20, borderWidth: "1px 1px 0 0" })}
      />
      <span
        style={style({ bottom: 20, left: 20, borderWidth: "0 0 1px 1px" })}
      />
      <span
        style={style({ bottom: 20, right: 20, borderWidth: "0 1px 1px 0" })}
      />
    </>
  );
}

function MagneticCursor() {
  const prefersReduced = useReducedMotion();
  const [finePointer, setFinePointer] = useState(false);
  const [follower, setFollower] = useState({
    x: -100,
    y: -100,
    scale: 1,
    label: "",
  });
  const target = useRef({ x: -100, y: -100 });
  const current = useRef({ x: -100, y: -100 });
  const pointer = useRef({ x: -100, y: -100 });
  const magnet = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const media = window.matchMedia("(pointer: fine)");
    const update = () => setFinePointer(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!finePointer || prefersReduced) return;

    let frame = 0;
    const getCursorLabel = (el: HTMLElement | null) => {
      if (!el) return "";
      if (el.dataset.cursorLabel) return el.dataset.cursorLabel;
      if (el.classList.contains("project-card")) return "View →";
      if (el.classList.contains("email-link")) return "Copy.";
      if (el.getAttribute("aria-label")) return el.getAttribute("aria-label") ?? "";
      return (el.textContent ?? "").replace(/\s+/g, " ").trim().slice(0, 16);
    };
    const getInteractive = (element: EventTarget | null) =>
      element instanceof HTMLElement
        ? element.closest<HTMLElement>("a,button,.project-card")
        : null;
    const syncMagnet = (el: HTMLElement | null) => {
      magnet.current = el;
    };
    const onMove = (event: MouseEvent) => {
      pointer.current = { x: event.clientX, y: event.clientY };
      const el = getInteractive(event.target);
      if (el !== magnet.current) syncMagnet(el);
    };
    const tick = () => {
      const el = magnet.current;
      const label = getCursorLabel(el);

      target.current = pointer.current;

      const speed = el ? 0.74 : 0.68;
      current.current.x += (target.current.x - current.current.x) * speed;
      current.current.y += (target.current.y - current.current.y) * speed;
      setFollower((value) => ({
        ...value,
        x: current.current.x,
        y: current.current.y,
        scale: el ? 1.08 : 1,
        label,
      }));
      frame = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove);
    frame = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(frame);
    };
  }, [finePointer, prefersReduced]);

  if (!finePointer || prefersReduced) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[90] flex h-5 w-5 items-center justify-center border border-lime bg-bg/40 font-mono uppercase tracking-wide text-lime shadow-[0_0_16px_rgba(200,241,53,0.25)]"
      animate={{
        x: follower.x - 10,
        y: follower.y - 10,
        scale: follower.scale,
        borderRadius: "0px",
      }}
      transition={{ type: "spring", stiffness: 900, damping: 42 }}
    >
      {follower.label ? (
        <span className="absolute left-1/2 top-1/2 flex h-8 min-w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center border border-lime bg-bg/90 px-2 text-[7px] shadow-[0_0_16px_rgba(200,241,53,0.35)]">
          {follower.label}
        </span>
      ) : (
        <span className="h-1 w-1 bg-lime" />
      )}
    </motion.div>
  );
}

function Navbar() {
  const [active, setActive] = useState("work");
  const [hovered, setHovered] = useState<string | null>(null);
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });
  const [open, setOpen] = useState(false);
  const refs = useRef<Record<string, HTMLAnchorElement | null>>({});

  useEffect(() => {
    const observers = navItems.map((item) => {
      const section = document.getElementById(item.id);
      if (!section) return null;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(item.id);
        },
        { rootMargin: "-35% 0px -50% 0px", threshold: 0.12 }
      );
      observer.observe(section);
      return observer;
    });
    return () => observers.forEach((observer) => observer?.disconnect());
  }, []);

  useEffect(() => {
    const id = hovered ?? active;
    const el = refs.current[id];
    const parent = el?.parentElement;
    if (!el || !parent) return;
    const rect = el.getBoundingClientRect();
    const parentRect = parent.getBoundingClientRect();
    setIndicator({ left: rect.left - parentRect.left, width: rect.width });
  }, [active, hovered]);

  return (
    <nav
      aria-label="Main navigation"
      className="fixed inset-x-0 top-0 z-50 border-b border-[rgba(200,241,53,0.16)] bg-[rgba(12,12,12,0.98)] px-6 py-[18px] shadow-[0_10px_40px_rgba(0,0,0,0.45)] backdrop-blur-xl md:px-10 md:py-[22px]"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        <Link href="#" className="glitch font-syne text-xl font-extrabold text-ink">
          TA<span className="text-lime">.</span>
        </Link>
        <div className="relative hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.id}
              ref={(el) => {
                refs.current[item.id] = el;
              }}
              href={item.href}
              onMouseEnter={() => setHovered(item.id)}
              onMouseLeave={() => setHovered(null)}
              className={`font-mono text-[10px] uppercase tracking-[0.16em] transition-colors duration-200 ${
                active === item.id ? "text-ink" : "text-[rgba(232,232,226,0.25)]"
              } hover:text-ink`}
            >
              {item.label}
            </Link>
          ))}
          <span
            className="absolute -bottom-2 h-px bg-lime transition-all duration-300"
            style={{
              left: indicator.left,
              width: indicator.width,
              transitionTimingFunction: "cubic-bezier(0.34,1.56,0.64,1)",
            }}
          />
        </div>
        <button
          type="button"
          className="flex h-8 w-8 flex-col items-center justify-center gap-[5px] md:hidden"
          aria-label="Open menu"
          onClick={() => setOpen(true)}
        >
          <span className="h-px w-6 bg-lime" />
          <span className="h-px w-6 bg-lime" />
          <span className="h-px w-6 bg-lime" />
        </button>
      </div>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[80] flex flex-col bg-bg px-8 py-8 md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setOpen(false)}
        >
          <button
            type="button"
            className="ml-auto font-mono text-[10px] uppercase tracking-[0.16em] text-lime"
            aria-label="Close menu"
          >
            Close
          </button>
          <div className="mt-24 flex flex-col gap-8">
            {navItems.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className="font-syne text-[32px] font-extrabold uppercase text-ink"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </motion.div>
      ) : null}
    </nav>
  );
}

function Hero() {
  const prefersReduced = useReducedMotion();
  const letters = (word: string, offset: number) =>
    word.split("").map((letter, index) => (
      <span key={`${word}-${index}`} className="inline-block overflow-hidden">
        <motion.span
          className="inline-block"
          initial={prefersReduced ? false : { opacity: 0, y: 18, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={
            prefersReduced
              ? undefined
              : {
                  type: "spring",
                  stiffness: 360,
                  damping: 24,
                  delay: offset + index * 0.055,
                }
          }
        >
          {letter}
        </motion.span>
      </span>
    ));
  const words = "I turn ideas into products people can actually use.".split(" ");

  return (
    <section className="relative px-6 pb-0 pt-12 md:px-10 md:pt-[72px]">
      <div className="relative mx-auto max-w-6xl overflow-hidden border border-[rgba(255,255,255,0.07)] px-6 py-10 md:px-10 md:py-12">
        <CornerBrackets size={18} />
        <motion.div
          className="mb-6 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.22em] text-lime"
          initial={prefersReduced ? false : { y: 8 }}
          animate={{ y: 0 }}
          transition={{ delay: 1.2, ...spring }}
        >
          <motion.span
            className="h-px bg-lime"
            initial={prefersReduced ? false : { width: 0 }}
            animate={{ width: 28 }}
            transition={{ delay: 1.2, ...spring }}
          />
          Frontend Engineer · Lagos, NG
        </motion.div>
        <h1 className="hero-name font-extrabold uppercase">
          <span className="block text-ink">{letters("TONI", 0.1)}</span>
          <span className="text-outline block">{letters("ADEKOLA", 0.4)}</span>
        </h1>
        <p className="mt-8 max-w-[300px] font-mono text-xs text-[rgba(232,232,226,0.5)] md:max-w-[520px]">
          {words.map((word, index) => (
            <motion.span
              key={`${word}-${index}`}
              className={word === "products" ? "mr-1 inline-block text-lime" : "mr-1 inline-block"}
              initial={prefersReduced ? false : { y: 6 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.4, delay: 1.4 + index * 0.09 }}
            >
              {word}
            </motion.span>
          ))}
        </p>
        <motion.p
          className="mt-5 max-w-[315px] font-mono text-xs leading-[1.85] text-[rgba(232,232,226,0.5)] md:max-w-[500px]"
          initial={false}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.65 }}
        >
          Frontend engineer based in Lagos. I work on complex products{" "}
          <br className="hidden md:block" />
          where the details matter — fintech, Web3, civic tech, anything{" "}
          <br className="hidden md:block" />
          with real users on the other end.
        </motion.p>
        <motion.div
          className="mt-7 flex flex-wrap gap-3"
          initial={prefersReduced ? false : { y: 8 }}
          animate={{ y: 0 }}
          transition={{ delay: 1.8, ...spring }}
        >
          <Link
            href="#work"
            data-cursor-label="Work →"
            className="bg-lime px-7 py-[13px] font-mono text-[10px] font-bold uppercase tracking-wide text-bg"
          >
            See my work
          </Link>
          <Link
            href="/Toni-Adekola-CV.pdf"
            data-cursor-label="Download"
            className="border border-[rgba(255,255,255,0.18)] px-7 py-[13px] font-mono text-[10px] font-bold uppercase tracking-wide text-[rgba(232,232,226,0.25)]"
          >
            Download CV
          </Link>
        </motion.div>
      </div>
      <div className="mx-auto mt-10 h-12 max-w-6xl border-t border-[rgba(255,255,255,0.07)] bg-surface [clip-path:polygon(0_0,100%_35%,100%_100%,0_100%)]" />
    </section>
  );
}

function StatsRow() {
  const stats = [
    ["5+", "Years building"],
    ["12+", "Projects shipped"],
    ["4", "Active clients"],
  ];
  return (
    <section aria-label="Portfolio stats" className="px-6 md:px-10">
      <div className="mx-auto grid max-w-6xl border border-[rgba(255,255,255,0.07)] md:grid-cols-3">
        {stats.map(([number, label], index) => (
          <div
            key={label}
            className={`p-6 md:p-7 ${
              index < 2
                ? "border-b border-[rgba(255,255,255,0.07)] md:border-b-0 md:border-r"
                : ""
            } border-[rgba(255,255,255,0.07)]`}
          >
            <div className="font-syne text-4xl font-extrabold tracking-[-1px] text-ink">{number}</div>
            <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.16em] text-[rgba(232,232,226,0.25)]">
              {label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Ticker() {
  const items = useMemo(() => Array.from({ length: 4 }).flatMap(() => tickerItems), []);
  return (
    <section className="my-12 overflow-hidden border-y border-[rgba(255,255,255,0.07)] py-[14px]">
      <div className="ticker-track flex w-max whitespace-nowrap">
        {items.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="mr-8 font-mono text-[10px] uppercase tracking-[0.2em] text-[rgba(232,232,226,0.2)]"
          >
            {item} <span className="ml-8 text-lime">·</span>
          </span>
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: (typeof projects)[number] }) {
  const flipped = Boolean(project.flipped);
  return (
    <Link
      href={project.link.href}
      className={`project-card group relative grid overflow-hidden border border-[rgba(255,255,255,0.07)] transition-colors duration-300 hover:border-[rgba(255,255,255,0.2)] md:grid-cols-2 ${
        flipped ? "md:[direction:rtl]" : ""
      }`}
      {...externalProps(`${project.name} ${project.link.label}`)}
    >
      <div
        className={`relative flex min-h-40 items-center justify-center bg-[#0f0f0f] p-8 md:min-h-[180px] ${
          flipped ? "md:border-l" : "md:border-r"
        } border-[rgba(255,255,255,0.07)] md:[direction:ltr]`}
      >
        <CornerBrackets color="rgba(200,241,53,0.18)" size={14} />
        <motion.div
          className="w-[92%] overflow-hidden border border-[rgba(255,255,255,0.12)] bg-[#1a1a1a] shadow-[0_18px_50px_rgba(0,0,0,0.28)]"
          whileHover={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <div className="flex h-[18px] items-center gap-1 border-b border-[rgba(255,255,255,0.08)] px-2">
            <span className="h-[5px] w-[5px] rounded-full bg-[rgba(232,232,226,0.25)]" />
            <span className="h-[5px] w-[5px] rounded-full bg-[rgba(232,232,226,0.18)]" />
            <span className="h-[5px] w-[5px] rounded-full bg-[rgba(232,232,226,0.12)]" />
          </div>
          <div className="relative aspect-[1440/1100] overflow-hidden bg-[#050505]">
            <Image
              src={project.image}
              alt={`${project.name} landing page screenshot`}
              fill
              sizes="(max-width: 768px) 80vw, 38vw"
              className="object-contain opacity-95 transition-transform duration-500 group-hover:scale-[1.015]"
            />
          </div>
        </motion.div>
      </div>
      <div className="flex min-h-[260px] flex-col justify-between p-7 md:[direction:ltr]">
        <div>
          <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-[rgba(232,232,226,0.25)]">
            {project.year}
          </div>
          <h3 className="mt-4 font-syne text-[22px] font-extrabold tracking-[-0.5px] text-ink transition-colors duration-200 group-hover:text-lime">
            {project.name}
          </h3>
          <p className="mt-4 font-mono text-[11px] leading-[1.7] text-[rgba(232,232,226,0.45)]">
            {project.description}
          </p>
        </div>
        <div className="mt-6">
          <div className="flex flex-wrap gap-1">
            {project.tags.map((tag, index) => (
              <span
                key={tag}
                className={`border px-[7px] py-[3px] font-mono text-[9px] ${
                  index === 0
                    ? "border-[rgba(200,241,53,0.3)] bg-[rgba(200,241,53,0.04)] text-lime"
                    : "border-[rgba(255,255,255,0.08)] text-[rgba(232,232,226,0.35)]"
                }`}
              >
                {tag}
              </span>
            ))}
          </div>
          <span className="mt-5 inline-block translate-x-[-6px] font-mono text-[10px] uppercase text-lime opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100">
            {project.link.label}
            <span className="sr-only">(opens in new tab)</span>
          </span>
        </div>
      </div>
    </Link>
  );
}

function SelectedWork() {
  return (
    <motion.section
      id="work"
      className="section mx-auto max-w-6xl"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.6, ease: [0.34, 1.2, 0.64, 1] }}
    >
      <SectionStamp label="Selected work" />
      <div className="space-y-5">
        {projects.map((project) => (
          <ProjectCard key={project.name} project={project} />
        ))}
      </div>
    </motion.section>
  );
}

function HowIWork() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.12 });
  const prefersReduced = useReducedMotion();

  return (
    <section ref={ref} className="section mx-auto max-w-6xl">
      <SectionStamp label="How I work" />
      <div className="how-grid grid gap-0.5 md:grid-cols-2">
        {principles.map((principle, index) => (
          <motion.article
            key={principle.title}
            className="work-card group relative overflow-hidden border border-[rgba(255,255,255,0.07)] p-7 transition-colors hover:border-[rgba(200,241,53,0.15)]"
            initial={prefersReduced ? false : { opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
            animate={inView || prefersReduced ? { opacity: 1, x: 0 } : undefined}
            transition={{ type: "spring", stiffness: 280, damping: 24, delay: index * 0.11 }}
          >
            <span className="absolute -bottom-5 -right-2 font-syne text-[80px] font-extrabold text-[rgba(200,241,53,0)] transition-colors duration-300 group-hover:text-[rgba(200,241,53,0.04)]">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div className="mb-3 font-mono text-[9px] uppercase tracking-[0.2em] text-lime">
              {String(index + 1).padStart(2, "0")}
            </div>
            <h3 className="mb-2 font-syne text-sm font-extrabold text-ink">
              {principle.title}
            </h3>
            <p className="relative z-10 font-mono text-[11px] leading-[1.78] text-[rgba(232,232,226,0.42)]">
              {principle.description}
            </p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

function LuffySVG() {
  const ref = useRef(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const inView = useInView(ref, { amount: 0.3, once: true });
  const playGearFive = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = 0;
    void audio.play().catch(() => undefined);
  };
  const stopGearFive = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    audio.currentTime = 0;
  };

  return (
    <div
      ref={ref}
      className="relative mx-auto h-[220px] w-[220px] md:h-[280px] md:w-[280px]"
      role="img"
      aria-label="Gear 5 Luffy silhouette. Hover or focus to play the Gear 5 audio."
      tabIndex={0}
      onMouseEnter={playGearFive}
      onMouseLeave={stopGearFive}
      onFocus={playGearFive}
      onBlur={stopGearFive}
    >
      <CornerBrackets />
      <audio ref={audioRef} src="/assets/gear_5.mp3" preload="none" />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 10000 10000"
        width="100%"
        height="100%"
        className="p-3 md:p-4"
        aria-hidden="true"
      >
        <defs>
          <clipPath id="luffyFillOne">
            <motion.rect
              x="0"
              y="0"
              width="10000"
              height="3300"
              initial={{ width: 0 }}
              animate={inView ? { width: 10000 } : { width: 0 }}
              transition={{ duration: 0.75, delay: 1.45, ease: [0.4, 0, 0.2, 1] }}
            />
          </clipPath>
          <clipPath id="luffyFillTwo">
            <motion.rect
              x="0"
              y="3300"
              width="10000"
              height="3400"
              initial={{ width: 0 }}
              animate={inView ? { width: 10000 } : { width: 0 }}
              transition={{ duration: 0.8, delay: 1.85, ease: [0.4, 0, 0.2, 1] }}
            />
          </clipPath>
          <clipPath id="luffyFillThree">
            <motion.rect
              x="0"
              y="6700"
              width="10000"
              height="3300"
              initial={{ width: 0 }}
              animate={inView ? { width: 10000 } : { width: 0 }}
              transition={{ duration: 0.75, delay: 2.25, ease: [0.4, 0, 0.2, 1] }}
            />
          </clipPath>
        </defs>
        <motion.circle
          cx="5000"
          cy="5000"
          r="4300"
          fill="rgba(200,241,53,0.04)"
          stroke="rgba(200,241,53,0.12)"
          strokeWidth="25"
          pathLength="1"
          initial={{ opacity: 0, pathLength: 0 }}
          animate={inView ? { opacity: 1, pathLength: 1 } : { opacity: 0, pathLength: 0 }}
          transition={{ pathLength: { duration: 0.9, delay: 0.15, ease: "easeInOut" }, opacity: { duration: 0.2, delay: 0.15 } }}
        />
        <motion.circle
          cx="5000"
          cy="5000"
          r="4180"
          fill="none"
          stroke="rgba(200,241,53,0.07)"
          strokeWidth="60"
          strokeDasharray="180 90"
          pathLength="1"
          initial={{ opacity: 0, pathLength: 0, rotate: -90 }}
          animate={inView ? { opacity: 1, pathLength: 1, rotate: 0 } : { opacity: 0, pathLength: 0, rotate: -90 }}
          transition={{ pathLength: { duration: 1.05, delay: 0.55, ease: "easeInOut" }, rotate: { duration: 1.05, delay: 0.55, ease: "easeInOut" }, opacity: { duration: 0.2, delay: 0.55 } }}
          style={{ transformOrigin: "50% 50%" }}
        />
        <g transform="translate(0,10000) scale(1,-1)">
          {[0, 1, 2].map((index) => (
            <motion.path
              key={`luffy-stroke-${index}`}
              d={luffyPath}
              fill="transparent"
              stroke="#c8f135"
              strokeWidth="42"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ opacity: 0, pathLength: 0 }}
              animate={inView ? { opacity: 0.85, pathLength: 1 } : { opacity: 0, pathLength: 0 }}
              transition={{
                pathLength: { duration: 0.9, delay: 0.95 + index * 0.24, ease: "easeInOut" },
                opacity: { duration: 0.2, delay: 0.95 + index * 0.24 },
              }}
              style={{
                clipPath:
                  index === 0
                    ? "inset(0 0 66% 0)"
                    : index === 1
                      ? "inset(33% 0 33% 0)"
                      : "inset(66% 0 0 0)",
              }}
            />
          ))}
          <g clipPath="url(#luffyFillOne)">
            <motion.path
              d={luffyPath}
              fill="#c8f135"
              fillRule="evenodd"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.3, delay: 1.45 }}
            />
          </g>
          <g clipPath="url(#luffyFillTwo)">
            <motion.path
              d={luffyPath}
              fill="#c8f135"
              fillRule="evenodd"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.3, delay: 1.85 }}
            />
          </g>
          <g clipPath="url(#luffyFillThree)">
            <motion.path
              d={luffyPath}
              fill="#c8f135"
              fillRule="evenodd"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.3, delay: 2.25 }}
            />
          </g>
        </g>
      </svg>
      <p className="mt-5 text-center font-mono text-[9px] uppercase leading-relaxed tracking-[0.12em] text-[rgba(232,232,226,0.2)]">
        Currently re-reading One Piece.
        <br />
        <span className="text-lime">Somewhere around Wano.</span>
      </p>
    </div>
  );
}

function About() {
  return (
    <motion.section
      id="about"
      className="section mx-auto max-w-6xl"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.6, ease: [0.34, 1.2, 0.64, 1] }}
    >
      <SectionStamp label="About" />
      <div className="about-wrap grid gap-12 md:grid-cols-[1.1fr_0.9fr] md:items-center">
        <div className="max-w-2xl space-y-5 font-mono text-xs leading-[1.85] text-[rgba(232,232,226,0.5)]">
          <p>
            I&apos;ve been building for the web since 2019. Started at LASIEC, then HNG, then Bitsaac where I worked on Drello — a Web3 marketplace on Base Network. Now I&apos;m at{" "}
            <strong className="font-normal text-ink">NITHUB on the University of Lagos campus</strong>, running hackathons and leading frontend on products that go into production.
          </p>
          <p>
            I care about the work that has real consequences. Fintech products people depend on to manage money. Civic platforms built for communities that don&apos;t have many options. Anything where{" "}
            <strong className="font-normal text-ink">getting it wrong actually costs someone something.</strong>
          </p>
          <p>
            Lagos shapes how I build. There&apos;s a practical energy here that I carry into every project — find what the product actually needs, build that, and don&apos;t overcomplicate it.
          </p>
          <p>
            <em>BSc. Computer Science · University of Lagos</em>
          </p>
        </div>
        <LuffySVG />
      </div>
    </motion.section>
  );
}

function Writing({ posts }: { posts: Post[] }) {
  return (
    <section id="writing" className="section mx-auto max-w-6xl">
      <SectionStamp label="Writing" />
      <div className="grid gap-3 md:grid-cols-3">
        {posts.slice(0, 3).map((post) => (
          <article
            key={post.url + post.title}
            className="post-card group relative border border-[rgba(255,255,255,0.07)] p-6 transition-colors hover:border-[rgba(255,255,255,0.2)]"
          >
            <Link href={post.url} {...externalProps(`${post.title} on Hashnode`)} className="block">
              <span className="border border-[rgba(200,241,53,0.3)] px-2 py-0.5 font-mono text-[9px] text-lime">
                {post.tags?.[0]?.name ?? "Writing"}
              </span>
              <h3 className="mt-2 line-clamp-2 font-syne text-base font-extrabold text-ink">
                {post.title}
              </h3>
              <p className="mt-3 line-clamp-3 font-mono text-[11px] leading-[1.7] text-[rgba(232,232,226,0.5)]">
                {post.brief}
              </p>
              <div className="mt-8 font-mono text-[9px] uppercase tracking-[0.12em] text-[rgba(232,232,226,0.25)]">
                {new Intl.DateTimeFormat("en", { month: "short", day: "numeric", year: "numeric" }).format(new Date(post.publishedAt))} · {post.readTimeInMinutes} min read
              </div>
              <span className="absolute right-6 top-6 text-lg text-lime opacity-0 transition-opacity group-hover:opacity-100">
                ↗
              </span>
              <span className="sr-only">(opens in new tab)</span>
            </Link>
          </article>
        ))}
      </div>
      <Link
        href="https://theadekolaexperience.hashnode.dev"
        className="mt-8 inline-block font-mono text-[10px] uppercase tracking-[0.12em] text-lime"
        {...externalProps("Read everything on Hashnode")}
      >
        Read everything on Hashnode →
        <span className="sr-only">(opens in new tab)</span>
      </Link>
    </section>
  );
}

function Contact() {
  const [flash, setFlash] = useState(false);

  return (
    <motion.section
      id="contact"
      className="section"
      animate={flash ? { backgroundColor: ["#0c0c0c", "#c8f135", "#0c0c0c"] } : { backgroundColor: "#0c0c0c" }}
      transition={{ duration: 0.3 }}
      onAnimationComplete={() => setFlash(false)}
    >
      <div className="contact-wrap relative mx-auto grid max-w-6xl gap-10 overflow-hidden border-y border-[rgba(255,255,255,0.07)] py-14 md:grid-cols-[1.1fr_0.9fr]">
        <motion.img
          src="/assets/ace-tattoo.svg"
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute -right-2 top-1/2 hidden h-[360px] w-auto -translate-y-1/2 opacity-[0.07] invert md:block"
          animate={{
            y: ["-50%", "-53%", "-50%"],
            opacity: [0.05, 0.11, 0.05],
            filter: [
              "invert(1) drop-shadow(0 0 0 rgba(200,241,53,0))",
              "invert(1) drop-shadow(0 0 18px rgba(200,241,53,0.18))",
              "invert(1) drop-shadow(0 0 0 rgba(200,241,53,0))",
            ],
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
        <div>
          <div className="contact-head font-extrabold uppercase">
            <span className="block text-ink">LET&apos;S</span>
            <span className="text-outline block">WORK.</span>
          </div>
          <p className="mt-7 max-w-md font-mono text-xs leading-[1.85] text-[rgba(232,232,226,0.5)]">
            Open to freelance projects, contract work, and full-time roles. If you have something complex that needs to be built properly, send me a message.
          </p>
          <Link
            href="mailto:atoniloba@gmail.com"
            className="email-link relative mt-6 inline-block break-all font-mono text-sm text-lime"
            onMouseEnter={() => setFlash(true)}
          >
            atoniloba@gmail.com
          </Link>
          <div className="mt-8 flex flex-wrap gap-5">
            {[
              ["GitHub", "https://github.com/AdekolaToniloba"],
              ["LinkedIn", "https://linkedin.com/in/adekola-toniloba-424224179"],
              ["X", "https://x.com/atoniloba"],
              ["Hashnode", "https://theadekolaexperience.hashnode.dev"],
            ].map(([label, href]) => (
              <Link
                key={label}
                href={href}
                className="font-mono text-[10px] uppercase tracking-[0.12em] text-[rgba(232,232,226,0.35)] transition-colors hover:text-ink"
                {...externalProps(`${label} profile`)}
              >
                {label}
                <span className="sr-only">(opens in new tab)</span>
              </Link>
            ))}
          </div>
        </div>
        <div className="flex flex-col justify-center gap-5">
          <div className="inline-flex w-max items-center gap-3 border border-[rgba(255,255,255,0.07)] px-4 py-3">
            <motion.img
              src="/assets/trafalgar-law-logo.svg"
              alt=""
              aria-hidden="true"
              width={24}
              height={24}
              className="border border-[rgba(200,241,53,0.25)] bg-lime/10"
              animate={{ rotate: 360 }}
              transition={{ duration: 7.5, ease: "linear", repeat: Infinity }}
            />
            <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-[rgba(232,232,226,0.35)]">
              Available for work
            </span>
          </div>
          <p className="max-w-sm font-mono text-[11px] leading-[1.78] text-[rgba(232,232,226,0.42)]">
            Based in Lagos, Nigeria. Working with clients locally and internationally. Response time under 24 hours.
          </p>
        </div>
      </div>
    </motion.section>
  );
}

function Footer() {
  return (
    <footer className="px-6 py-8 md:px-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-5 md:flex-row">
        <div className="flex items-center gap-3">
          <Link href="#" className="glitch font-syne text-xl font-extrabold text-ink">
            TA<span className="text-lime">.</span>
          </Link>
          <motion.div whileHover={{ opacity: 0.25, rotate: 360 }} transition={{ duration: 1.2, ease: "easeInOut" }} className="opacity-[0.05]">
            <Image
              src="/assets/strawhat-jolly-roger.png"
              alt=""
              aria-hidden="true"
              width={32}
              height={32}
              style={{ filter: "grayscale(1) invert(1)" }}
            />
          </motion.div>
        </div>
        <div className="font-mono text-[9px] uppercase tracking-[0.12em] text-[rgba(232,232,226,0.25)]">
          Built with Next.js · 2026
        </div>
      </div>
    </footer>
  );
}

export default function PortfolioRedesign({ posts }: { posts: Post[] }) {
  return (
    <>
      <MagneticCursor />
      <Navbar />
      <main id="main-content" className="relative z-10 pt-[68px] md:pt-[76px]">
        <Hero />
        <StatsRow />
        <Ticker />
        <SelectedWork />
        <HowIWork />
        <About />
        <Writing posts={posts} />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
