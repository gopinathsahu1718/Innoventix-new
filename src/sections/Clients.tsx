import { useEffect, useRef, useState } from 'react';

interface Client {
  name: string;
  initials: string;
  accent: string;
  accentFrom: string;
  accentTo: string;
  industry: string;
  tag: string;
  description: string;
  stat: string;
  statLabel: string;
}

const clients: Client[] = [
  {
    name: 'HearingZen',
    initials: 'HZ',
    accent: '#0e43a6',
    accentFrom: '#0e43a6',
    accentTo: '#06b6d4',
    industry: 'Healthcare · AI',
    tag: 'AI-enabled',
    description: 'Built a next-gen hearing diagnostics platform with AI triage and real-time audiologist dashboards.',
    stat: '3.2×',
    statLabel: 'Patient retention growth',
  },
  {
    name: 'LogicGo',
    initials: 'LG',
    accent: '#06b6d4',
    accentFrom: '#06b6d4',
    accentTo: '#6366f1',
    industry: 'Logistics · SaaS',
    tag: 'Cloud-first',
    description: 'Engineered a multi-tenant logistics SaaS with live tracking, automated dispatch, and analytics.',
    stat: '99.97%',
    statLabel: 'Platform uptime SLA',
  },
  {
    name: 'Kohl',
    initials: 'KO',
    accent: '#8b5cf6',
    accentFrom: '#8b5cf6',
    accentTo: '#ec4899',
    industry: 'Fashion · E-commerce',
    tag: 'Global launch',
    description: 'Delivered an immersive e-commerce experience with AR try-on and personalised style feeds.',
    stat: '48hrs',
    statLabel: 'Time to first 10k orders',
  },
  {
    name: 'Laxmi Book Store',
    initials: 'LB',
    accent: '#f59e0b',
    accentFrom: '#f59e0b',
    accentTo: '#ef4444',
    industry: 'Retail · Education',
    tag: 'Digital transform',
    description: 'Transformed a 40-year-old retail brand into a modern omnichannel book discovery platform.',
    stat: '220%',
    statLabel: 'Online revenue uplift',
  },
  {
    name: 'D Technologies',
    initials: 'DT',
    accent: '#10b981',
    accentFrom: '#10b981',
    accentTo: '#06b6d4',
    industry: 'Deep Tech · R&D',
    tag: 'Enterprise grade',
    description: 'Co-engineered secure, compliant R&D collaboration tools for distributed engineering teams.',
    stat: '60+',
    statLabel: 'Countries deployed in',
  },
];

const row1 = [...clients, ...clients, ...clients];
const row2 = [...clients.slice().reverse(), ...clients.slice().reverse(), ...clients.slice().reverse()];

interface HoverCard {
  client: Client;
  x: number;
  y: number;
}

function SlideItem({
  client,
  onHover,
  onLeave,
  isActive,
}: {
  client: Client;
  onHover: (e: React.MouseEvent, c: Client) => void;
  onLeave: () => void;
  isActive: boolean;
}) {
  return (
    <div
      className="flex-shrink-0 px-3 cursor-pointer"
      onMouseEnter={(e) => onHover(e, client)}
      onMouseLeave={onLeave}
    >
      <div
        className="relative flex items-center gap-3 px-6 py-4 rounded-2xl border transition-all duration-300"
        style={{
          background: isActive
            ? 'rgba(255,255,255,0.95)'
            : 'rgba(255,255,255,0.60)',
          borderColor: isActive
            ? `${client.accent}55`
            : 'rgba(148,163,184,0.25)',
          backdropFilter: 'blur(12px)',
          boxShadow: isActive
            ? `0 20px 60px -10px ${client.accent}30, 0 0 0 1px ${client.accent}22`
            : '0 4px 24px -4px rgba(15,23,42,0.08)',
          transform: isActive ? 'translateY(-3px) scale(1.04)' : 'scale(1)',
        }}
      >
        {/* Accent glow line */}
        <div
          className="absolute top-0 left-6 right-6 h-[2px] rounded-full opacity-0 transition-opacity duration-300"
          style={{
            background: `linear-gradient(to right, ${client.accentFrom}, ${client.accentTo})`,
            opacity: isActive ? 0.85 : 0,
          }}
        />
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 transition-all duration-300"
          style={{
            background: isActive
              ? `linear-gradient(135deg, ${client.accentFrom}, ${client.accentTo})`
              : `${client.accent}18`,
            color: isActive ? '#fff' : client.accent,
          }}
        >
          {client.initials}
        </div>
        <span
          className="text-sm font-semibold whitespace-nowrap transition-colors duration-300"
          style={{ color: isActive ? '#0f172a' : '#334155' }}
        >
          {client.name}
        </span>
      </div>
    </div>
  );
}

export default function Clients() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [hover, setHover] = useState<HoverCard | null>(null);
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const hoverTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleHover = (e: React.MouseEvent, client: Client, key: string) => {
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const containerRect = sectionRef.current?.getBoundingClientRect();
    if (!containerRect) return;

    setHover({
      client,
      x: rect.left - containerRect.left + rect.width / 2,
      y: rect.top - containerRect.top,
    });
    setActiveKey(key);
    setIsPaused(true);
  };

  const handleLeave = () => {
    hoverTimerRef.current = setTimeout(() => {
      setHover(null);
      setActiveKey(null);
      setIsPaused(false);
    }, 120);
  };

  return (
    <section
      id="clients"
      ref={sectionRef}
      className="relative py-28 overflow-hidden"
      style={{ background: '#f0f4ff' }}
    >
      {/* Background texture — light radial glow matching hero palette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 20% 0%, rgba(34,211,238,0.10) 0%, transparent 60%), radial-gradient(ellipse 50% 60% at 85% 100%, rgba(99,102,241,0.10) 0%, transparent 60%)',
        }}
      />
      {/* Subtle dot grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(99,102,241,0.18) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* Section header */}
      <div className="relative z-10 max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
          <div
            className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            style={{ transitionTimingFunction: 'cubic-bezier(0.16,1,0.3,1)', transitionDelay: '100ms' }}
          >
            <div
              className="inline-flex items-center rounded-full border px-4 py-2 text-xs uppercase tracking-[0.4em] mb-5"
              style={{
                borderColor: 'rgba(99,102,241,0.28)',
                background: 'rgba(99,102,241,0.06)',
                color: '#6366f1',
                backdropFilter: 'blur(8px)',
              }}
            >
              Our clients
            </div>
            <h2
              className="font-display text-4xl sm:text-5xl font-bold leading-tight"
              style={{ color: '#0f172a', letterSpacing: '-0.03em' }}
            >
              Brands we've{' '}
              <span
                style={{
                  background: 'linear-gradient(to right, #06b6d4, #6366f1)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                powered
              </span>
            </h2>
          </div>

          {/* <p
            className={`text-slate-500 max-w-sm text-sm leading-7 transition-all duration-1000 sm:text-right ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            style={{ transitionTimingFunction: 'cubic-bezier(0.16,1,0.3,1)', transitionDelay: '250ms' }}
          >
            Trusted by forward-thinking brands across 45+ countries who believe in bold, scalable digital futures.
          </p> */}
        </div>

        {/* Stats row */}
        {/* <div
          className={`grid grid-cols-3 gap-4 mt-10 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          style={{ transitionTimingFunction: 'cubic-bezier(0.16,1,0.3,1)', transitionDelay: '350ms' }}
        >
          {[
            { value: '150+', label: 'Enterprise projects' },
            { value: '45+', label: 'Countries served' },
            { value: '98%', label: 'Satisfaction rate' },
          ].map((s) => (
            <div
              key={s.label}
              className="rounded-2xl px-5 py-4 border"
              style={{
                background: 'rgba(255,255,255,0.65)',
                borderColor: 'rgba(148,163,184,0.22)',
                backdropFilter: 'blur(12px)',
              }}
            >
              <p
                className="text-2xl font-bold"
                style={{
                  background: 'linear-gradient(to right, #0ea5e9, #6366f1)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {s.value}
              </p>
              <p className="text-xs text-slate-500 mt-1">{s.label}</p>
            </div>
          ))}
        </div> */}
      </div>

      {/* Marquee rows */}
      <div
        className={`relative z-10 transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        style={{ transitionTimingFunction: 'cubic-bezier(0.16,1,0.3,1)', transitionDelay: '500ms' }}
      >
        {/* Fade masks */}
        <div
          className="absolute left-0 top-0 bottom-0 w-40 z-20 pointer-events-none"
          style={{ background: 'linear-gradient(to right, #f0f4ff, transparent)' }}
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-40 z-20 pointer-events-none"
          style={{ background: 'linear-gradient(to left, #f0f4ff, transparent)' }}
        />

        {/* Row 1 — left to right */}
        <div className="mb-5 overflow-hidden">
          <div
            className="flex"
            style={{
              width: 'max-content',
              animation: 'marquee-ltr 28s linear infinite',
              animationPlayState: isPaused ? 'paused' : 'running',
            }}
          >
            {row1.map((client, i) => (
              <SlideItem
                key={`r1-${i}`}
                client={client}
                isActive={activeKey === `r1-${i}`}
                onHover={(e, c) => handleHover(e, c, `r1-${i}`)}
                onLeave={handleLeave}
              />
            ))}
          </div>
        </div>

        {/* Row 2 — right to left */}
        <div className="overflow-hidden">
          <div
            className="flex"
            style={{
              width: 'max-content',
              animation: 'marquee-rtl 34s linear infinite',
              animationPlayState: isPaused ? 'paused' : 'running',
            }}
          >
            {row2.map((client, i) => (
              <SlideItem
                key={`r2-${i}`}
                client={client}
                isActive={activeKey === `r2-${i}`}
                onHover={(e, c) => handleHover(e, c, `r2-${i}`)}
                onLeave={handleLeave}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Hover detail card */}
      {hover && (
        <div
          className="absolute z-50 pointer-events-none"
          style={{
            left: Math.min(hover.x - 160, (sectionRef.current?.offsetWidth ?? 1300) - 340),
            top: hover.y - 240,
            width: 320,
          }}
          onMouseEnter={() => {
            if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
          }}
          onMouseLeave={handleLeave}
        >
          <div
            className="rounded-3xl border overflow-hidden"
            style={{
              background: 'rgba(255,255,255,0.92)',
              borderColor: `${hover.client.accent}40`,
              backdropFilter: 'blur(20px)',
              boxShadow: `0 32px 80px -20px ${hover.client.accent}35, 0 0 0 1px ${hover.client.accent}18`,
              animation: 'card-pop 0.22s cubic-bezier(0.34,1.56,0.64,1) forwards',
            }}
          >
            {/* Top accent bar */}
            <div
              className="h-1 w-full"
              style={{
                background: `linear-gradient(to right, ${hover.client.accentFrom}, ${hover.client.accentTo})`,
              }}
            />

            <div className="p-5">
              {/* Header */}
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-sm font-bold text-white shrink-0"
                  style={{
                    background: `linear-gradient(135deg, ${hover.client.accentFrom}, ${hover.client.accentTo})`,
                  }}
                >
                  {hover.client.initials}
                </div>
                <div>
                  <p className="font-bold text-slate-900 text-base leading-tight">{hover.client.name}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{hover.client.industry}</p>
                </div>
                <div
                  className="ml-auto shrink-0 rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-wider"
                  style={{
                    background: `${hover.client.accent}14`,
                    color: hover.client.accent,
                    border: `0.5px solid ${hover.client.accent}35`,
                  }}
                >
                  {hover.client.tag}
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-slate-500 leading-relaxed mb-4">
                {hover.client.description}
              </p>

              {/* Divider */}
              <div
                className="h-px mb-4"
                style={{ background: 'rgba(148,163,184,0.2)' }}
              />

              {/* Stat */}
              <div className="flex items-end gap-3">
                <div>
                  <p
                    className="text-3xl font-bold leading-none"
                    style={{
                      background: `linear-gradient(to right, ${hover.client.accentFrom}, ${hover.client.accentTo})`,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    {hover.client.stat}
                  </p>
                  <p className="text-xs text-slate-400 mt-1">{hover.client.statLabel}</p>
                </div>
                <div
                  className="ml-auto h-8 w-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
                  style={{
                    background: `linear-gradient(135deg, ${hover.client.accentFrom}, ${hover.client.accentTo})`,
                  }}
                >
                  ↗
                </div>
              </div>
            </div>
          </div>

          {/* Arrow pointer */}
          <div
            className="mx-auto mt-0 w-3 h-3 rotate-45 border-r border-b"
            style={{
              background: 'rgba(255,255,255,0.92)',
              borderColor: `${hover.client.accent}30`,
              marginLeft: 'calc(50% - 6px)',
              marginTop: -6,
            }}
          />
        </div>
      )}

      {/* Keyframe styles */}
      <style>{`
        @keyframes marquee-ltr {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        @keyframes marquee-rtl {
          0% { transform: translateX(-33.333%); }
          100% { transform: translateX(0); }
        }
        @keyframes card-pop {
          0% { opacity: 0; transform: translateY(10px) scale(0.95); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </section>
  );
}