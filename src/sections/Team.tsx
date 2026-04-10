import { useEffect, useRef, useState } from 'react';
import { Linkedin, Github, Twitter } from 'lucide-react';
import founderImg from '/assets/founder-innoventix.png';

// ── Count-up hook ──────────────────────────────────────────────────────────────
function useCountUp(target: number, duration: number = 1800, start: boolean = false) {
  const [count, setCount] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!start) return;

    // Reset to 0 first so user always sees it count from zero
    setCount(0);

    let startTime: number | null = null;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setCount(Math.floor(eased * target));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(step);
      } else {
        setCount(target); // guarantee exact final value
      }
    };

    // Double-rAF: lets React flush the setCount(0) paint before counting starts
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = requestAnimationFrame(step);
    });

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [start, target, duration]);

  return count;
}

// ── StatCard ───────────────────────────────────────────────────────────────────
function StatCard({
  value,
  label,
  animate,
  delay = 0,
}: {
  value: number;
  label: string;
  animate: boolean;
  delay?: number;
}) {
  const [active, setActive] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!animate) return;
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setActive(true), delay);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [animate, delay]);

  const count = useCountUp(value, 1800, active);

  return (
    <div className="rounded-[18px] border border-slate-700/65 bg-slate-900/80 p-3 sm:p-4 text-center min-w-0">
      <p className="text-xl sm:text-2xl font-display font-semibold text-white tabular-nums">
        {count}<span className="text-sky-400">+</span>
      </p>
      <p className="text-[10px] sm:text-xs text-slate-400 mt-1.5 leading-snug break-words hyphens-auto">
        {label}
      </p>
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────────
export default function Founder() {
  const sectionRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLDivElement>(null); // dedicated ref for stats row
  const [isVisible, setIsVisible] = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);

  // Section visibility (header + card fade-in)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Stats grid visibility — fires when the stats grid itself enters the viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.5 } // at least half the stats row must be visible
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="team"
      ref={sectionRef}
      className="relative py-24 sm:py-32 bg-[#05070f] overflow-hidden"
    >
      {/* Blobs */}
      <div className="pointer-events-none absolute -left-16 top-24 h-72 w-72 rounded-full bg-sky-500/10 blur-3xl" />
      <div className="pointer-events-none absolute right-8 bottom-20 h-80 w-80 rounded-full bg-indigo-500/10 blur-3xl" />

      <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-500/30 bg-slate-900/50 px-4 py-2 text-xs uppercase tracking-[0.4em] text-sky-200/80 backdrop-blur-sm mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400 inline-block" />
            Meet the visionary
          </div>
          <h2
            className={`font-display text-4xl sm:text-5xl font-bold text-white mb-4 tracking-tight transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            style={{ transitionTimingFunction: 'var(--ease-expo-out)' }}
          >
            The founder behind Innoventix
          </h2>
          <p
            className={`text-lg text-slate-300/75 max-w-md mx-auto leading-relaxed transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            style={{ transitionTimingFunction: 'var(--ease-expo-out)', transitionDelay: '150ms' }}
          >
            The mind architecting next-generation digital solutions for global enterprise growth.
          </p>
        </div>

        {/* Founder Card */}
        <div
          className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
          style={{ transitionTimingFunction: 'var(--ease-expo-out)', transitionDelay: '300ms' }}
        >
          <div className="relative rounded-[2rem] border border-slate-700/60 bg-slate-950/75 backdrop-blur-xl overflow-hidden grid grid-cols-1 md:grid-cols-[40%_60%] shadow-[0_60px_140px_-80px_rgba(15,23,42,0.95)]">

            {/* Top accent line */}
            <div className="absolute inset-x-14 top-0 h-px bg-gradient-to-r from-transparent via-sky-400/45 to-transparent" />

            {/* ── LEFT — Image + Name + Quote + Socials ── */}
            <div
              className="relative flex flex-col overflow-hidden"
              style={{
                background:
                  'linear-gradient(160deg, rgba(14,67,166,0.4) 0%, rgba(14,165,233,0.22) 50%, rgba(99,102,241,0.25) 100%)',
              }}
            >
              {/* Mobile image container */}
              <div className="block md:hidden relative w-full" style={{ height: '420px' }}>
                <img
                  src={founderImg}
                  alt="Gopinath Sahu — Founder & CEO, Innoventix"
                  className="w-full h-full object-cover"
                  style={{ objectPosition: '50% 8%' }}
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      'linear-gradient(to top, rgba(2,6,23,0.98) 0%, rgba(2,6,23,0.55) 42%, transparent 72%)',
                  }}
                />
                <div className="absolute bottom-0 left-0 right-0 px-6 pb-6">
                  <h3 className="font-display text-2xl font-bold text-white tracking-tight mb-2">
                    Gopinath Sahu
                  </h3>
                  <span className="inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-sky-500/15 px-4 py-2 text-xs uppercase tracking-[0.28em] text-sky-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-400 inline-block" />
                    Founder &amp; CEO
                  </span>
                </div>
              </div>

              {/* Desktop image — absolute fill */}
              <img
                src={founderImg}
                alt="Gopinath Sahu — Founder & CEO, Innoventix"
                className="hidden md:block absolute inset-0 w-full h-full object-cover object-top"
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
              />

              {/* Desktop bottom overlay */}
              <div
                className="hidden md:block relative z-10 mt-auto px-8 pb-9 pt-24"
                style={{
                  background:
                    'linear-gradient(to top, rgba(2,6,23,0.98) 0%, rgba(2,6,23,0.78) 58%, transparent 100%)',
                }}
              >
                <h3 className="font-display text-2xl font-bold text-white tracking-tight mb-2">
                  Gopinath Sahu
                </h3>
                <span className="inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-sky-500/15 px-4 py-2 text-xs uppercase tracking-[0.28em] text-sky-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-400 inline-block" />
                  Founder &amp; CEO
                </span>
                <div className="my-5 h-px bg-slate-700/60" />
                <p className="text-sm text-sky-200/85 leading-[1.75] italic mb-2">
                  "We build systems that don't just work today — they scale for what enterprises need five years from now."
                </p>
                <p className="text-xs text-slate-500 mb-6">
                  — Gopinath Sahu, Founder &amp; CEO, Innoventix
                </p>
                <div className="flex gap-3">
                  {[
                    { Icon: Linkedin, label: 'LinkedIn' },
                    { Icon: Github, label: 'GitHub' },
                    { Icon: Twitter, label: 'Twitter' },
                  ].map(({ Icon, label }) => (
                    <button
                      key={label}
                      aria-label={label}
                      className="w-10 h-10 rounded-full border border-slate-700/80 bg-slate-900/70 flex items-center justify-center text-slate-400 hover:border-sky-400/50 hover:text-sky-300 transition-all duration-300"
                    >
                      <Icon className="w-5 h-5" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Mobile — quote + socials below image */}
              <div className="block md:hidden px-6 pb-8 pt-5 bg-slate-950/90">
                <div className="h-px bg-slate-700/60 mb-5" />
                <p className="text-sm text-sky-200/85 leading-[1.75] italic mb-2">
                  "We build systems that don't just work today — they scale for what enterprises need five years from now."
                </p>
                <p className="text-xs text-slate-500 mb-5">
                  — Gopinath Sahu, Founder &amp; CEO, Innoventix
                </p>
                <div className="flex gap-3">
                  {[
                    { Icon: Linkedin, label: 'LinkedIn' },
                    { Icon: Github, label: 'GitHub' },
                    { Icon: Twitter, label: 'Twitter' },
                  ].map(({ Icon, label }) => (
                    <button
                      key={label}
                      aria-label={label}
                      className="w-10 h-10 rounded-full border border-slate-700/80 bg-slate-900/70 flex items-center justify-center text-slate-400 hover:border-sky-400/50 hover:text-sky-300 transition-all duration-300"
                    >
                      <Icon className="w-5 h-5" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* ── RIGHT — Content ── */}
            <div className="flex flex-col gap-6 sm:gap-8 p-6 sm:p-8 md:p-10 border-t md:border-t-0 md:border-l border-slate-700/50">

              {/* About */}
              <div>
                <p className="text-xs uppercase tracking-[0.32em] text-slate-500 mb-3">
                  About the founder
                </p>
                <div className="w-10 h-0.5 rounded-full bg-gradient-to-r from-sky-400 to-indigo-500 mb-5" />
                <p className="text-base text-slate-300/85 leading-[1.9]">
                  Strategic architect of the Innoventix ecosystem. Leading technical vision and cloud
                  infrastructure with deep expertise in scalable systems design, enterprise product
                  development, and modern AI-integrated workflows that drive measurable business
                  outcomes globally.
                </p>
              </div>

              {/* Roles */}
              <div>
                <p className="text-xs uppercase tracking-[0.32em] text-slate-500 mb-3">
                  Roles &amp; specialisations
                </p>
                <div className="flex flex-wrap gap-2">
                  {[
                    'Full-Stack Engineer',
                    'Cloud Architect',
                    'Systems Design',
                    'AI Integration',
                    'DevOps',
                  ].map((r) => (
                    <span
                      key={r}
                      className="rounded-full border border-slate-700/75 bg-slate-900/85 px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium text-slate-300"
                    >
                      {r}
                    </span>
                  ))}
                </div>
              </div>

              {/* Core expertise */}
              <div>
                <p className="text-xs uppercase tracking-[0.32em] text-slate-500 mb-3">
                  Core expertise
                </p>
                <div className="flex flex-col gap-2.5">
                  {[
                    { label: 'Full-stack systems engineering & modern web platforms', color: 'bg-sky-400' },
                    { label: 'Cloud architecture — AWS / GCP / Azure infrastructure', color: 'bg-indigo-400' },
                    { label: 'AI-integrated product development & automation', color: 'bg-emerald-400' },
                    { label: 'Enterprise scalability, security & compliance', color: 'bg-pink-400' },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="flex items-center gap-3 rounded-2xl border border-slate-700/70 bg-slate-900/80 px-4 py-3 sm:px-5 sm:py-3.5"
                    >
                      <span className={`w-2 h-2 rounded-full flex-shrink-0 ${item.color}`} />
                      <span className="text-xs sm:text-sm font-medium text-slate-200 leading-snug">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stats — 2×2 on mobile, 4×1 on sm+ */}
              <div>
                <p className="text-xs uppercase tracking-[0.32em] text-slate-500 mb-3">
                  At a glance
                </p>
                {/* statsRef watches exactly this grid element */}
                <div
                  ref={statsRef}
                  className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3"
                >
                  {[
                    { value: 8, label: 'Years engineering', delay: 0 },
                    { value: 50, label: 'Projects delivered', delay: 150 },
                    { value: 12, label: 'Certifications', delay: 300 },
                    { value: 15, label: 'Tech partnerships', delay: 450 },
                  ].map((item) => (
                    <StatCard
                      key={item.label}
                      value={item.value}
                      label={item.label}
                      animate={statsVisible}
                      delay={item.delay}
                    />
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}