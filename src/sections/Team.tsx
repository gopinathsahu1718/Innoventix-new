import { useEffect, useRef, useState } from 'react';
import { Linkedin, Github, Twitter } from 'lucide-react';
import founderImg from '/assets/founder-innoventix.png';

export default function Founder() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

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
          <div className="relative rounded-[2rem] border border-slate-700/60 bg-slate-950/75 backdrop-blur-xl overflow-hidden grid grid-cols-1 md:grid-cols-[40%_60%] shadow-[0_60px_140px_-80px_rgba(15,23,42,0.95)] min-h-[680px]">

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
              {/* Founder photo */}
              <img
                src={founderImg}
                alt="Gopinath Sahu — Founder & CEO, Innoventix"
                className="absolute inset-0 w-full h-full object-cover object-top"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />

              {/* Fallback initials */}
              {/* <div className="absolute inset-0 flex items-center justify-center pb-72 pointer-events-none">
                  <div
                    className="w-40 h-40 rounded-full border-[3px] border-sky-400/35 flex items-center justify-center text-5xl font-bold text-white tracking-widest"
                    style={{ background: 'linear-gradient(135deg, #0e43a6, #0ea5e9)' }}
                  >
                    GS
                  </div>
                </div> */}

              {/* Bottom overlay */}
              <div
                className="relative z-10 mt-auto px-8 pb-9 pt-24"
                style={{
                  background:
                    'linear-gradient(to top, rgba(2,6,23,0.98) 0%, rgba(2,6,23,0.78) 58%, transparent 100%)',
                }}
              >
                {/* Name */}
                <h3 className="font-display text-2xl font-bold text-white tracking-tight mb-2">
                  Gopinath Sahu
                </h3>

                {/* Founder badge */}
                <span className="inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-sky-500/15 px-4 py-2 text-xs uppercase tracking-[0.28em] text-sky-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-400 inline-block" />
                  Founder &amp; CEO
                </span>

                {/* Divider */}
                <div className="my-5 h-px bg-slate-700/60" />

                {/* Quote */}
                <p className="text-sm text-sky-200/85 leading-[1.75] italic mb-2">
                  "We build systems that don't just work today — they scale for what enterprises need five years from now."
                </p>
                <p className="text-xs text-slate-500 mb-6">
                  — Gopinath Sahu, Founder &amp; CEO, Innoventix
                </p>

                {/* Social links */}
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
            <div className="flex flex-col gap-8 p-10 border-t md:border-t-0 md:border-l border-slate-700/50">

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
                <div className="flex flex-wrap gap-2.5">
                  {[
                    'Full-Stack Engineer',
                    'Cloud Architect',
                    'Systems Design',
                    'AI Integration',
                    'DevOps',
                  ].map((r) => (
                    <span
                      key={r}
                      className="rounded-full border border-slate-700/75 bg-slate-900/85 px-4 py-2 text-sm font-medium text-slate-300"
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
                <div className="flex flex-col gap-3">
                  {[
                    { label: 'Full-stack systems engineering & modern web platforms', color: 'bg-sky-400' },
                    { label: 'Cloud architecture — AWS / GCP / Azure infrastructure', color: 'bg-indigo-400' },
                    { label: 'AI-integrated product development & automation', color: 'bg-emerald-400' },
                    { label: 'Enterprise scalability, security & compliance', color: 'bg-pink-400' },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="flex items-center gap-3 rounded-2xl border border-slate-700/70 bg-slate-900/80 px-5 py-3.5"
                    >
                      <span className={`w-2 h-2 rounded-full flex-shrink-0 ${item.color}`} />
                      <span className="text-sm font-medium text-slate-200">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stats */}
              <div>
                <p className="text-xs uppercase tracking-[0.32em] text-slate-500 mb-3">
                  At a glance
                </p>
                <div className="grid grid-cols-4 gap-3">
                  {[
                    { value: '8+', label: 'Years engineering' },
                    { value: '50+', label: 'Projects delivered' },
                    { value: '12+', label: 'Certifications' },
                    { value: '15+', label: 'Tech partnerships' },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="rounded-[18px] border border-slate-700/65 bg-slate-900/80 p-4 text-center"
                    >
                      <p className="text-2xl font-display font-semibold text-white">{item.value}</p>
                      <p className="text-xs text-slate-400 mt-1.5 leading-snug">{item.label}</p>
                    </div>
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