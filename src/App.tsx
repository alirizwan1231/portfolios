import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useScroll, useSpring, useMotionValue, AnimatePresence } from 'framer-motion';
import {
  ArrowUpRight, ArrowDown, Github, Facebook, Instagram, Mail, MapPin,
  Globe, ShoppingBag, PenTool, Gauge, Search, LayoutTemplate, Code2,
  Blocks, Sparkles, GraduationCap, Calculator, Percent, Landmark, Shirt, Star,
  Command, Copy, Check, CornerDownLeft,
} from 'lucide-react';
import profileImage from './profileimage.png';

const EMAIL = 'alis5597153@gmail.com';

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

function Reveal({ children, className, i = 0 }: { children: React.ReactNode; className?: string; i?: number }) {
  return (
    <motion.div className={className} variants={fadeUp} custom={i}
      initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }}>
      {children}
    </motion.div>
  );
}

const reduced = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = () => typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches;

/* ------------------------- UNIQUE ELEMENTS ------------------------- */

function Preloader({ done }: { done: () => void }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (reduced()) { done(); return; }
    const t = setInterval(() => setN(v => {
      const next = v + Math.floor(Math.random() * 14) + 6;
      if (next >= 100) { clearInterval(t); setTimeout(done, 180); return 100; }
      return next;
    }), 90);
    return () => clearInterval(t);
  }, [done]);
  return (
    <motion.div onClick={done} exit={{ y: '-100%' }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-[100] flex cursor-pointer flex-col items-center justify-center bg-ink">
      <p className="font-display text-3xl font-bold">ali<span className="text-lime">.</span>rizwan</p>
      <p className="mt-4 font-mono text-sm text-muted">loading portfolio… <span className="text-lime">{n}%</span></p>
      <div className="mt-4 h-1 w-52 overflow-hidden rounded-full bg-white/10">
        <div className="h-full bg-lime transition-all duration-150" style={{ width: `${n}%` }} />
      </div>
    </motion.div>
  );
}

function Spotlight() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!finePointer() || reduced()) return;
    const move = (e: MouseEvent) => {
      if (ref.current) ref.current.style.transform = `translate(${e.clientX - 250}px, ${e.clientY - 250}px)`;
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);
  return <div ref={ref} aria-hidden className="pointer-events-none fixed left-0 top-0 z-30 hidden h-[500px] w-[500px] rounded-full md:block"
    style={{ background: 'radial-gradient(circle, rgba(184,241,53,0.07) 0%, transparent 65%)' }} />;
}

function Particles() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current; if (!canvas || reduced()) return;
    const ctx = canvas.getContext('2d'); if (!ctx) return;
    let w = 0, h = 0, raf = 0; const mouse = { x: -9999, y: -9999 };
    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    type P = { x: number; y: number; vx: number; vy: number };
    let pts: P[] = [];
    const resize = () => {
      const r = canvas.parentElement!.getBoundingClientRect();
      w = r.width; h = r.height;
      canvas.width = w * DPR; canvas.height = h * DPR; ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      const count = Math.min(70, Math.floor(w / 18));
      pts = Array.from({ length: count }, () => ({ x: Math.random() * w, y: Math.random() * h, vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35 }));
    };
    resize(); window.addEventListener('resize', resize);
    const onMove = (e: MouseEvent) => { const r = canvas.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; };
    window.addEventListener('mousemove', onMove);
    let visible = true;
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; }, { threshold: 0 });
    io.observe(canvas);
    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (!visible || document.hidden) return;
      ctx.clearRect(0, 0, w, h);
      for (const p of pts) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1; if (p.y < 0 || p.y > h) p.vy *= -1;
        const dm = Math.hypot(p.x - mouse.x, p.y - mouse.y);
        ctx.beginPath(); ctx.arc(p.x, p.y, dm < 120 ? 2.2 : 1.4, 0, Math.PI * 2);
        ctx.fillStyle = dm < 120 ? 'rgba(184,241,53,0.9)' : 'rgba(242,245,236,0.35)'; ctx.fill();
        if (dm < 150) { ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(mouse.x, mouse.y); ctx.strokeStyle = 'rgba(184,241,53,0.25)'; ctx.stroke(); }
      }
      for (let i = 0; i < pts.length; i++) for (let j = i + 1; j < pts.length; j++) {
        const a = pts[i], b = pts[j]; const d = Math.hypot(a.x - b.x, a.y - b.y);
        if (d < 110) { ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.strokeStyle = `rgba(184,241,53,${0.14 * (1 - d / 110)})`; ctx.stroke(); }
      }
    };
    tick();
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); window.removeEventListener('mousemove', onMove); io.disconnect(); };
  }, []);
  return <canvas ref={ref} aria-hidden className="pointer-events-none absolute inset-0 h-full w-full" />;
}

const ROLES = ['WordPress Developer', 'Front-End Developer', 'WooCommerce Builder', 'Next.js Developer'];
const GLYPHS = '!<>-_\\/[]{}—=+*^?#';

function ScrambleRole() {
  const [text, setText] = useState(ROLES[0]);
  useEffect(() => {
    if (reduced()) return;
    let idx = 0; let frame = 0; let raf = 0; let timer: ReturnType<typeof setTimeout>;
    const run = () => {
      idx = (idx + 1) % ROLES.length; const target = ROLES[idx]; frame = 0;
      const step = () => {
        frame++;
        const reveal = Math.floor(frame / 2);
        let out = target.slice(0, reveal);
        for (let i = reveal; i < target.length; i++) out += target[i] === ' ' ? ' ' : GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        setText(out);
        if (reveal < target.length) raf = requestAnimationFrame(step);
        else timer = setTimeout(run, 2400);
      };
      step();
    };
    timer = setTimeout(run, 2400);
    return () => { cancelAnimationFrame(raf); clearTimeout(timer); };
  }, []);
  return <span className="font-mono text-lime">{text}</span>;
}

const TERM_LINES = [
  { cmd: '$ whoami', out: 'ali-rizwan — wordpress & front-end developer' },
  { cmd: '$ services --list', out: 'wordpress · woocommerce · react · next.js · seo' },
  { cmd: '$ status', out: 'available for new projects' },
];

function TypeTerminal() {
  const [lines, setLines] = useState<string[]>([]);
  const [current, setCurrent] = useState('');
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (reduced()) { setLines(TERM_LINES.flatMap(l => [l.cmd, l.out])); return; }
    let started = false; let cancelled = false;
    const io = new IntersectionObserver(async ([e]) => {
      if (!e.isIntersecting || started) return; started = true;
      while (!cancelled) {
        setLines([]); 
        const doneLines: string[] = [];
        for (const l of TERM_LINES) {
          for (let i = 1; i <= l.cmd.length; i++) { if (cancelled) return; setCurrent(l.cmd.slice(0, i)); await new Promise(r => setTimeout(r, 42)); }
          await new Promise(r => setTimeout(r, 220)); if (cancelled) return;
          doneLines.push(l.cmd, l.out); setLines([...doneLines]); setCurrent('');
          await new Promise(r => setTimeout(r, 500)); if (cancelled) return;
        }
        await new Promise(r => setTimeout(r, 4200)); if (cancelled) return;
      }
    }, { threshold: 0.3 });
    if (ref.current) io.observe(ref.current);
    return () => { cancelled = true; io.disconnect(); };
  }, []);
  return (
    <div ref={ref} className="overflow-hidden rounded-2xl border border-white/10 bg-black/50 text-left backdrop-blur">
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2.5">
        <span className="h-3 w-3 rounded-full bg-[#FF5F57]" /><span className="h-3 w-3 rounded-full bg-[#FEBC2E]" /><span className="h-3 w-3 rounded-full bg-[#28C840]" />
        <span className="ml-2 font-mono text-xs text-muted">ali@portfolio — zsh</span>
      </div>
      <div className="min-h-[118px] px-4 py-3 font-mono text-[13px] leading-6">
        {lines.map((l, i) => <p key={i} className={l.startsWith('$') ? 'text-cream' : 'text-lime'}>{l}</p>)}
        <p className="text-cream">{current}<span className="ml-0.5 inline-block h-4 w-2 animate-pulse bg-lime align-middle" /></p>
      </div>
    </div>
  );
}

function Magnetic({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLSpanElement>(null);
  const onMove = (e: React.MouseEvent) => {
    if (!finePointer() || reduced() || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width / 2) * 0.25; const y = (e.clientY - r.top - r.height / 2) * 0.35;
    ref.current.style.transform = `translate(${x}px, ${y}px)`;
  };
  const onLeave = () => { if (ref.current) ref.current.style.transform = 'translate(0,0)'; };
  return <span ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} className="inline-block transition-transform duration-200 ease-out">{children}</span>;
}

function LiveClock() {
  const [time, setTime] = useState('');
  useEffect(() => {
    const f = () => setTime(new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit', timeZone: 'Asia/Karachi' }).format(new Date()));
    f(); const t = setInterval(f, 1000); return () => clearInterval(t);
  }, []);
  return <span className="font-mono text-xs text-muted">Bahawalnagar, PK — {time}</span>;
}

function CommandPalette({ open, setOpen }: { open: boolean; setOpen: (v: boolean) => void }) {
  const [q, setQ] = useState(''); const [sel, setSel] = useState(0); const [copied, setCopied] = useState(false);
  const actions = [
    { label: 'View selected work', hint: 'jump', run: () => document.querySelector('#work')?.scrollIntoView({ behavior: 'smooth' }) },
    { label: 'See services', hint: 'jump', run: () => document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' }) },
    { label: 'About Ali', hint: 'jump', run: () => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' }) },
    { label: 'How we work — process', hint: 'jump', run: () => document.querySelector('#process')?.scrollIntoView({ behavior: 'smooth' }) },
    { label: `Copy email — ${EMAIL}`, hint: 'copy', run: () => { navigator.clipboard?.writeText(EMAIL); setCopied(true); setTimeout(() => setCopied(false), 1600); } },
    { label: 'Send an email', hint: 'open', run: () => { window.location.href = `mailto:${EMAIL}`; } },
    { label: 'Open GitHub profile', hint: 'open', run: () => window.open('https://github.com/alirizwan1231', '_blank') },
  ].filter(a => a.label.toLowerCase().includes(q.toLowerCase()));
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); setOpen(!open); }
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey); return () => window.removeEventListener('keydown', onKey);
  }, [open, setOpen]);
  useEffect(() => { if (open) { setQ(''); setSel(0); } }, [open ]);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[90] flex items-start justify-center bg-black/70 px-4 pt-24 backdrop-blur-sm" onClick={() => setOpen(false)}>
      <div className="w-full max-w-lg overflow-hidden rounded-2xl border border-lime/25 bg-panel shadow-2xl" onClick={e => e.stopPropagation()} role="dialog" aria-label="Command palette">
        <input autoFocus value={q} onChange={e => { setQ(e.target.value); setSel(0); }}
          onKeyDown={e => {
            if (e.key === 'ArrowDown') { e.preventDefault(); setSel(s => Math.min(s + 1, actions.length - 1)); }
            if (e.key === 'ArrowUp') { e.preventDefault(); setSel(s => Math.max(s - 1, 0)); }
            if (e.key === 'Enter' && actions[sel]) { actions[sel].run(); if (actions[sel].hint !== 'copy') setOpen(false); }
          }}
          placeholder="Type a command — try 'work' or 'email'…" className="w-full bg-transparent px-5 py-4 font-mono text-sm text-cream outline-none placeholder:text-muted" />
        <div className="max-h-72 overflow-y-auto border-t border-white/10 py-2">
          {actions.map((a, i) => (
            <button key={a.label} onMouseEnter={() => setSel(i)} onClick={() => { a.run(); if (a.hint !== 'copy') setOpen(false); }}
              className={`flex w-full items-center justify-between px-5 py-3 text-left text-sm font-semibold ${i === sel ? 'bg-lime/15 text-lime' : 'text-cream'}`}>
              <span className="flex items-center gap-2">{a.hint === 'copy' ? (copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />) : <CornerDownLeft className="h-4 w-4 opacity-60" />}{a.label}</span>
              <span className="font-mono text-[11px] text-muted">{a.hint}</span>
            </button>
          ))}
          {actions.length === 0 && <p className="px-5 py-4 text-sm text-muted">No matching command.</p>}
        </div>
        <p className="border-t border-white/10 px-5 py-2.5 font-mono text-[11px] text-muted">↑↓ navigate · Enter run · Esc close</p>
      </div>
    </div>
  );
}

/* ------------------------------- DATA ------------------------------- */

const projects = [
  {
    name: 'University Manager', tag: 'Web App · SaaS',
    desc: 'A student management PWA for university classes — group roles, class packs, schedules and shared resources, all in one place.',
    stack: ['Next.js', 'Supabase', 'Cloudflare R2'], link: 'https://ptutsms.vercel.app',
    cover: 'from-[#1D2B0E] via-[#2E4A12] to-[#B8F135]', icon: GraduationCap,
  },
  {
    name: 'FlockCalc', tag: 'Tool Website',
    desc: '14 calculators and 26 guides for backyard flock owners — coop size, feed cost and egg production, built to rank and to help.',
    stack: ['Next.js', 'TypeScript'], link: 'https://flockcalc.site',
    cover: 'from-[#0E2418] via-[#14532D] to-[#4ADE80]', icon: Calculator,
  },
  {
    name: 'AP Score Calculator', tag: 'Tool Website',
    desc: 'Score calculators and study guides for AP exams, under the AP Prep Hub brand.',
    stack: ['Next.js', 'SEO'], link: 'https://apscorecalculator.org',
    cover: 'from-[#241A08] via-[#57400D] to-[#F5C135]', icon: Percent,
  },
  {
    name: 'GPGC University Website', tag: 'Institution · Portals',
    desc: 'Official college website with an admin panel and staff portals for the Principal, Clerk and Teachers.',
    stack: ['Next.js', 'Supabase', 'R2'], link: 'https://gpgcbwn.vercel.app',
    cover: 'from-[#0B1E2B] via-[#14405E] to-[#38BDF8]', icon: Landmark,
  },
  {
    name: 'Elite Stitch', tag: 'Redesign · Tailoring',
    desc: 'A premium redesign for a men\u2019s tailoring studio in Bahria Town, Lahore — suits, sherwani and waistcoats, presented like a fashion house.',
    stack: ['React', 'Tailwind'], link: '',
    cover: 'from-[#221610] via-[#4A2C17] to-[#D9A05B]', icon: Shirt,
  },
  {
    name: 'Google Review Request', tag: 'WordPress Plugin',
    desc: 'A free plugin I built: review short-link with click counting, a QR code, and automatic review-request emails after WooCommerce orders.',
    stack: ['WordPress', 'PHP', 'WooCommerce'], link: '',
    cover: 'from-[#1E1030] via-[#3B1D63] to-[#A78BFA]', icon: Star,
  },
];

const services = [
  { icon: Globe, title: 'WordPress Websites', desc: 'Custom WordPress + Elementor sites that are fast, secure and easy for you to update yourself.' },
  { icon: ShoppingBag, title: 'WooCommerce Stores', desc: 'E-commerce stores with clean product pages, smooth checkout and payments set up properly.' },
  { icon: PenTool, title: 'Website Redesign', desc: 'Old, slow or dated site? I rebuild it modern, responsive and eye-catching — without losing your content.' },
  { icon: Gauge, title: 'Speed & Fixes', desc: 'Performance optimisation and technical fixes: Core Web Vitals, broken layouts, plugin conflicts.' },
  { icon: Search, title: 'On-Page SEO', desc: 'Structure, headings, metadata and internal linking done right, so Google understands every page.' },
  { icon: LayoutTemplate, title: 'Landing Pages', desc: 'Focused, high-converting landing pages and business sites that turn visitors into enquiries.' },
];

const stack = ['WordPress', 'Elementor', 'WooCommerce', 'React', 'Next.js', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS', 'Supabase', 'PHP', 'Plugin Development', 'SEO Structure', 'Responsive UI', 'Git & GitHub'];
const marquee = ['WordPress', 'WooCommerce', 'React', 'Next.js', 'Elementor', 'Speed Optimisation', 'SEO', 'Landing Pages', 'Redesigns', 'Plugins'];

function VelocityMarquee() {
  const trackRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (reduced() || !trackRef.current) return;
    let offset = 0; let lastY = window.scrollY; let boost = 0; let raf = 0;
    const step = () => {
      const y = window.scrollY; boost += (Math.abs(y - lastY) * 0.06 - boost) * 0.08; lastY = y;
      offset -= 0.6 + Math.min(boost, 6);
      const track = trackRef.current; if (track) {
        const w = track.scrollWidth / 2;
        if (w > 0 && -offset >= w) offset += w;
        track.style.transform = `translateX(${offset}px)`;
      }
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);
  return (
    <div aria-hidden className="relative -mx-4 overflow-hidden border-y border-white/10 py-4 sm:-mx-6">
      <div ref={trackRef} className="flex w-max will-change-transform">
        {[0, 1].map(n => (
          <div key={n} className="flex shrink-0 items-center">
            {marquee.map(item => (
              <span key={item + n} className="flex items-center font-display text-lg font-semibold text-muted">
                <span className="px-5">{item}</span><Sparkles className="h-4 w-4 text-lime" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function TiltCard({ p }: { p: typeof projects[number] }) {
  const ref = useRef<HTMLElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const onMove = (e: React.MouseEvent) => {
    if (!finePointer() || reduced() || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width; const py = (e.clientY - r.top) / r.height;
    ref.current.style.transform = `perspective(900px) rotateX(${(0.5 - py) * 7}deg) rotateY(${(px - 0.5) * 9}deg) translateY(-4px)`;
    if (glareRef.current) glareRef.current.style.background = `radial-gradient(circle at ${px * 100}% ${py * 100}%, rgba(184,241,53,0.16), transparent 55%)`;
  };
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = '';
    if (glareRef.current) glareRef.current.style.background = 'transparent';
  };
  const Icon = p.icon;
  return (
    <article ref={ref} onMouseMove={onMove} onMouseLeave={onLeave}
      className="group relative flex h-full flex-col overflow-hidden rounded-[24px] border border-white/10 bg-panel transition-transform duration-200 ease-out will-change-transform">
      <div ref={glareRef} aria-hidden className="pointer-events-none absolute inset-0 z-10" />
      <div className={`relative h-44 overflow-hidden bg-gradient-to-br ${p.cover} sm:h-52`}>
        <div aria-hidden className="absolute inset-0 opacity-25" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,.35) 1px, transparent 1px)', backgroundSize: '18px 18px' }} />
        <Icon className="absolute bottom-5 left-5 h-11 w-11 text-white/90 transition duration-300 group-hover:scale-110" strokeWidth={1.5} />
        <span className="absolute right-5 top-5 rounded-full bg-black/35 px-3 py-1 font-mono text-[11px] font-medium text-white backdrop-blur">{p.tag}</span>
        {p.link && <ArrowUpRight className="absolute bottom-5 right-5 h-6 w-6 text-white/80 transition duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-2xl font-bold">{p.name}</h3>
        <p className="mt-2 flex-1 leading-relaxed text-muted">{p.desc}</p>
        <p className="mt-5 flex flex-wrap gap-2">
          {p.stack.map(s => <span key={s} className="rounded-full bg-white/5 px-3 py-1 text-xs font-semibold text-cream/85">{s}</span>)}
        </p>
      </div>
    </article>
  );
}

/* ------------------------------- APP ------------------------------- */

export default function App() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 25 });
  const [loading, setLoading] = useState(true);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const closePreloader = useCallback(() => setLoading(false), []);

  return (
    <div className="grain relative min-h-screen overflow-x-clip bg-ink">
      <AnimatePresence>{loading && <Preloader done={closePreloader} />}</AnimatePresence>
      <CommandPalette open={paletteOpen} setOpen={setPaletteOpen} />
      <Spotlight />
      <motion.div style={{ scaleX: progress }} className="fixed inset-x-0 top-0 z-50 h-[3px] origin-left bg-lime" />
      <div aria-hidden className="pointer-events-none absolute -top-40 left-1/2 h-[480px] w-[820px] -translate-x-1/2 rounded-full bg-lime/15 blur-[140px]" />
      <div aria-hidden className="pointer-events-none absolute right-[-180px] top-[38%] h-[380px] w-[380px] rounded-full bg-lime/10 blur-[120px]" />

      {/* ---------- NAV ---------- */}
      <header className="fixed inset-x-0 top-0 z-40 px-4 sm:px-6">
        <div className="mx-auto mt-4 flex max-w-6xl items-center justify-between rounded-2xl border border-white/10 bg-ink/70 px-4 py-3 backdrop-blur-xl sm:px-6">
          <a href="#top" className="font-display text-lg font-bold tracking-tight">ali<span className="text-lime">.</span>rizwan</a>
          <nav className="hidden items-center gap-7 text-sm font-semibold text-muted md:flex">
            <a className="transition hover:text-cream" href="#about">About</a>
            <a className="transition hover:text-cream" href="#work">Work</a>
            <a className="transition hover:text-cream" href="#services">Services</a>
            <a className="transition hover:text-cream" href="#process">Process</a>
          </nav>
          <div className="flex items-center gap-2.5">
            <button onClick={() => setPaletteOpen(true)} aria-label="Open command palette"
              className="hidden items-center gap-1.5 rounded-full border border-white/15 px-3.5 py-2 font-mono text-xs text-muted transition hover:border-lime/50 hover:text-lime sm:inline-flex">
              <Command className="h-3.5 w-3.5" /> Ctrl K
            </button>
            <Magnetic>
              <a href={`mailto:${EMAIL}`} className="group inline-flex items-center gap-1.5 rounded-full bg-lime px-4 py-2 text-sm font-bold text-ink transition hover:bg-cream">
                Hire me <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </Magnetic>
          </div>
        </div>
      </header>

      {/* ---------- HERO ---------- */}
      <main id="top" className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <section className="relative grid items-center gap-12 pb-16 pt-36 lg:grid-cols-[1.25fr_0.75fr] lg:pt-44">
          <Particles />
          <div className="relative">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2.5 rounded-full border border-lime/25 bg-lime/10 px-4 py-1.5 text-[13px] font-semibold text-lime">
              <span className="h-2 w-2 rounded-full bg-lime animate-pulseDot" /> Available for freelance projects
            </motion.div>

            <h1 className="mt-7 font-display text-[13.5vw] font-bold leading-[0.98] tracking-tight sm:text-6xl lg:text-7xl">
              {['I build', 'websites that'].map((line, li) => (
                <span key={line} className="block overflow-hidden pb-1">
                  <motion.span className="block" initial={{ y: '110%' }} animate={{ y: 0 }}
                    transition={{ duration: 0.7, delay: 0.15 + li * 0.12, ease: [0.22, 1, 0.36, 1] }}>{line}</motion.span>
                </span>
              ))}
              <span className="block overflow-hidden pb-2">
                <motion.span className="block" initial={{ y: '110%' }} animate={{ y: 0 }}
                  transition={{ duration: 0.7, delay: 0.39, ease: [0.22, 1, 0.36, 1] }}>
                  <span className="text-stroke">turn visitors</span><br />into <span className="text-lime">customers.</span>
                </motion.span>
              </span>
            </h1>

            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.55 }}
              className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
              I&apos;m <strong className="text-cream">Ali Rizwan</strong>, a <ScrambleRole /> from Pakistan.
              I craft fast, modern websites with WordPress, WooCommerce, React and Next.js — for clients worldwide.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.68 }}
              className="mt-9 flex flex-wrap items-center gap-4">
              <Magnetic>
                <a href="#work" className="group inline-flex items-center gap-2 rounded-full bg-lime px-6 py-3.5 font-bold text-ink transition hover:bg-cream">
                  View my work <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
                </a>
              </Magnetic>
              <a href="https://github.com/alirizwan1231" target="_blank" rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3.5 font-bold transition hover:border-lime/50 hover:text-lime">
                <Github className="h-5 w-5" /> GitHub
              </a>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.8 }} className="mt-9 max-w-md">
              <TypeTerminal />
            </motion.div>
          </div>

          {/* photo */}
          <motion.div initial={{ opacity: 0, scale: 0.94, rotate: 2 }} animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }} className="relative mx-auto w-full max-w-sm">
            <div className="animate-floaty relative overflow-hidden rounded-[28px] border border-white/10">
              <img src={profileImage} alt="Portrait of Ali Rizwan" className="aspect-[4/5] w-full object-cover grayscale-[35%] transition duration-500 hover:grayscale-0" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink via-ink/40 to-transparent p-5 pt-16">
                <p className="font-display text-xl font-bold">Ali Rizwan</p>
                <p className="flex items-center gap-1.5 text-sm text-muted"><MapPin className="h-4 w-4 text-lime" /> Bahawalnagar, Pakistan · working worldwide</p>
              </div>
            </div>
            <div className="absolute -left-4 top-6 rounded-2xl border border-white/10 bg-panel/90 px-4 py-2.5 backdrop-blur">
              <p className="font-mono text-xs text-lime">role</p>
              <p className="text-sm font-bold">WordPress + Front-End Dev</p>
            </div>
            <div className="absolute -right-3 bottom-24 rounded-2xl border border-white/10 bg-panel/90 px-4 py-2.5 backdrop-blur">
              <p className="font-mono text-xs text-lime">focus</p>
              <p className="text-sm font-bold">Fast · Modern · SEO-ready</p>
            </div>
          </motion.div>
        </section>

        <VelocityMarquee />

        {/* ---------- ABOUT ---------- */}
        <section id="about" className="scroll-mt-28 py-20 lg:py-28">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <Reveal>
              <h2 className="font-display text-4xl font-bold leading-tight sm:text-5xl">Design eye.<br />Developer hands.</h2>
            </Reveal>
            <Reveal i={1}>
              <div className="space-y-5 text-lg leading-relaxed text-muted">
                <p>I&apos;m a passionate WordPress designer and front-end developer dedicated to building modern, responsive and user-friendly websites. My work combines clean code with creative design, so sites don&apos;t just look stunning — they load fast, rank well and achieve real business goals.</p>
                <p>Alongside client work, I design and ship my own products end to end — from a university management app and an official college website with staff portals, to calculator tools used by people around the world and a free WordPress plugin. That means when you hire me, you get someone who has built the whole thing before, not just a theme installer.</p>
                <p className="flex flex-wrap gap-2 pt-2">
                  {['Based in Pakistan', 'Clients worldwide', 'WordPress + React/Next.js'].map(chip => (
                    <span key={chip} className="rounded-full border border-white/10 bg-panel px-4 py-1.5 text-sm font-semibold text-cream">{chip}</span>
                  ))}
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ---------- WORK (BENTO) ---------- */}
        <section id="work" className="scroll-mt-28 py-6 lg:py-10">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 className="font-display text-4xl font-bold sm:text-5xl">Selected work</h2>
              <p className="max-w-sm text-muted">Real products I designed and built — most are live. Open one and see for yourself.</p>
            </div>
          </Reveal>

          <div className="mt-10 grid gap-5 md:grid-cols-2" style={{ perspective: '1200px' }}>
            {projects.map((p, idx) => (
              <Reveal key={p.name} i={idx % 2}>
                {p.link
                  ? <a href={p.link} target="_blank" rel="noreferrer" className="block h-full" aria-label={`${p.name} — visit live site`}><TiltCard p={p} /></a>
                  : <TiltCard p={p} />}
              </Reveal>
            ))}
          </div>

          <Reveal i={1}>
            <p className="mt-6 rounded-[24px] border border-dashed border-lime/30 bg-lime/5 p-5 text-center text-muted">
              In the lab: <strong className="text-cream">GALAXIA</strong> — a gesture-controlled 3D universe built with Three.js and hand tracking. Because sometimes I build just to explore.
            </p>
          </Reveal>
        </section>

        {/* ---------- SERVICES ---------- */}
        <section id="services" className="scroll-mt-28 py-20 lg:py-28">
          <Reveal>
            <h2 className="font-display text-4xl font-bold sm:text-5xl">What I can do for you</h2>
            <p className="mt-3 max-w-xl text-lg text-muted">Everything a business needs to look credible online and turn visits into enquiries.</p>
          </Reveal>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, idx) => {
              const Icon = s.icon;
              return (
                <Reveal key={s.title} i={idx % 3}>
                  <motion.div whileHover={{ y: -5 }} transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                    className="group h-full rounded-[24px] border border-white/10 bg-panel p-6 transition-colors hover:border-lime/40">
                    <span className="inline-flex rounded-2xl bg-lime/10 p-3 text-lime transition group-hover:bg-lime group-hover:text-ink">
                      <Icon className="h-6 w-6" strokeWidth={1.8} />
                    </span>
                    <h3 className="mt-5 font-display text-xl font-bold">{s.title}</h3>
                    <p className="mt-2 leading-relaxed text-muted">{s.desc}</p>
                  </motion.div>
                </Reveal>
              );
            })}
          </div>

          <Reveal i={1}>
            <div className="mt-14 rounded-[24px] border border-white/10 bg-panel p-6 sm:p-8">
              <h3 className="flex items-center gap-2 font-display text-xl font-bold"><Code2 className="h-5 w-5 text-lime" /> My toolbox</h3>
              <div className="mt-5 flex flex-wrap gap-2.5">
                {stack.map((t, i) => (
                  <motion.span key={t} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }} transition={{ delay: i * 0.03, duration: 0.25 }}
                    className="cursor-default rounded-full border border-white/10 px-4 py-2 text-sm font-semibold transition hover:border-lime/60 hover:text-lime">{t}</motion.span>
                ))}
              </div>
              <p className="mt-5 flex items-center gap-2 text-sm text-muted"><Blocks className="h-4 w-4 text-lime" /> No percentage bars — the work above is the proof.</p>
            </div>
          </Reveal>
        </section>

        {/* ---------- PROCESS ---------- */}
        <section id="process" className="scroll-mt-28 pb-20 lg:pb-28">
          <Reveal><h2 className="font-display text-4xl font-bold sm:text-5xl">How we&apos;ll work together</h2></Reveal>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { title: 'Discover', desc: 'A short call or chat about your business, goals and what the site must achieve.' },
              { title: 'Design', desc: 'You see the look early — layout, colours and type — and we refine it together.' },
              { title: 'Build', desc: 'I develop it fast, responsive and SEO-ready, and keep you updated as it comes alive.' },
              { title: 'Launch & grow', desc: 'We go live, check everything on real devices, and I stay available for fixes and improvements.' },
            ].map((step, idx) => (
              <Reveal key={step.title} i={idx}>
                <div className="h-full rounded-[24px] border border-white/10 bg-panel p-6">
                  <p className="font-display text-4xl font-bold text-lime/90">{step.title}</p>
                  <p className="mt-3 leading-relaxed text-muted">{step.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ---------- CONTACT CTA ---------- */}
        <section id="contact" className="pb-24">
          <Reveal>
            <div className="relative overflow-hidden rounded-[32px] border border-lime/25 bg-gradient-to-br from-panel2 via-panel to-ink px-6 py-14 text-center sm:px-12">
              <div aria-hidden className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[520px] -translate-x-1/2 rounded-full bg-lime/20 blur-[100px]" />
              <h2 className="relative font-display text-4xl font-bold leading-tight sm:text-6xl">Have a project in mind?<br /><span className="text-lime">Let&apos;s build it.</span></h2>
              <p className="relative mx-auto mt-4 max-w-lg text-lg text-muted">Tell me what you need — a new site, a store, or a redesign — and I&apos;ll reply with honest next steps.</p>
              <p className="relative mt-4"><LiveClock /></p>
              <div className="relative mt-9 flex flex-wrap justify-center gap-4">
                <Magnetic>
                  <a href={`mailto:${EMAIL}`} className="inline-flex items-center gap-2 rounded-full bg-lime px-7 py-4 font-bold text-ink transition hover:bg-cream">
                    <Mail className="h-5 w-5" /> {EMAIL}
                  </a>
                </Magnetic>
                <a href="https://github.com/alirizwan1231" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/15 px-7 py-4 font-bold transition hover:border-lime/50 hover:text-lime">
                  <Github className="h-5 w-5" /> See my code
                </a>
              </div>
              <p className="relative mt-8 font-mono text-xs text-muted">Tip: press <span className="rounded border border-white/20 px-1.5 py-0.5 text-cream">Ctrl K</span> anywhere on this site</p>
            </div>
          </Reveal>
        </section>
      </main>

      {/* ---------- FOOTER ---------- */}
      <footer className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-5 px-4 py-8 text-sm text-muted sm:flex-row sm:px-6">
          <p className="font-display font-bold text-cream">ali<span className="text-lime">.</span>rizwan <span className="ml-2 font-sans font-normal text-muted">© {new Date().getFullYear()} · Bahawalnagar, Pakistan</span></p>
          <LiveClock />
          <div className="flex items-center gap-3">
            {[
              { href: 'https://github.com/alirizwan1231', icon: Github, label: 'GitHub' },
              { href: 'https://facebook.com/Alirizwan3418', icon: Facebook, label: 'Facebook' },
              { href: 'https://instagram.com/Alirizwan3418', icon: Instagram, label: 'Instagram' },
              { href: `mailto:${EMAIL}`, icon: Mail, label: 'Email' },
            ].map(s => {
              const Icon = s.icon;
              return (
                <a key={s.label} href={s.href} target={s.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" aria-label={s.label}
                  className="rounded-full border border-white/10 p-2.5 transition hover:border-lime/60 hover:text-lime"><Icon className="h-5 w-5" /></a>
              );
            })}
          </div>
        </div>
      </footer>
    </div>
  );
}
