import { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';

interface StatOrbProps {
  number: string;
  label: string;
  delay: number;
  isVisible: boolean;
}

function StatOrb({ number, label, delay, isVisible }: StatOrbProps) {
  return (
    <div
      className={`relative group transition-all duration-700 ${isVisible ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-50 rotate-180'
        }`}
      style={{
        transitionTimingFunction: 'var(--ease-elastic)',
        transitionDelay: `${delay}ms`,
      }}
    >
      <div className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-full bg-gradient-brand flex flex-col items-center justify-center shadow-xl hover:shadow-2xl hover:shadow-[#0e43a6]/30 transition-all duration-300 group-hover:scale-105">
        <span className="font-accent text-4xl sm:text-5xl font-bold text-white">{number}</span>
        <span className="text-sm text-white/80 text-center px-4 mt-1">{label}</span>
      </div>
      {/* Glow effect */}
      <div className="absolute inset-0 rounded-full bg-[#0e43a6]/30 blur-xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
  );
}

export default function About() {
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
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const stats = [
    { number: '10+', label: 'Projects Completed' },
    { number: '10+', label: 'Happy Clients' },
    { number: '2+', label: 'Years Experience' },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-24 sm:py-32 bg-[#05070f] overflow-hidden"
    >
      {/* Futuristic Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_top_right,_rgba(59,130,246,0.12),_transparent_25%),radial-gradient(circle_at_bottom_right,_rgba(59,130,246,0.12),_transparent_25%)]" />
      </div>

      <div className="relative max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 max-w-3xl">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/80 text-sm uppercase tracking-[0.35em] text-cyan-300 font-medium ring-1 ring-cyan-300/20">
            About Innoventix
          </span>
          <h2
            className={`font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white mt-6 tracking-tight transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-6'
            }`}
            style={{ transitionTimingFunction: 'var(--ease-expo-out)' }}
          >
            Building future-ready products for enterprise growth.
          </h2>
          <p
            className={`mt-6 text-lg text-slate-300 leading-relaxed transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}
            style={{ transitionTimingFunction: 'var(--ease-smooth)', transitionDelay: '150ms' }}
          >
            We are eight focused software specialists delivering scalable digital platforms with a strategic, polished approach. Our experience spans startups, enterprise workflows and product launches built for reliability and velocity.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-12 lg:gap-20 items-start">
          <div className="space-y-8">
            <div className={`rounded-3xl border border-slate-800/90 bg-slate-900/90 p-8 shadow-[0_25px_100px_-60px_rgba(15,23,42,0.85)] transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`} style={{ transitionTimingFunction: 'var(--ease-expo-out)' }}>
              <p className="text-slate-300 leading-8 text-lg">
                We design polished digital experiences for investors, executives and end users. Our projects include custom web platforms, secure admin systems, intelligent mobile apps and 3D-informed interfaces that feel premium and intuitive.
              </p>
              <div className="grid gap-4 sm:grid-cols-2 mt-6 text-sm text-slate-300">
                <div className="rounded-2xl border border-slate-800/90 bg-slate-950/80 p-4">
                  <p className="font-semibold text-white">Strategic engineering</p>
                  <p className="mt-2 text-slate-400">Architected for scale, performance, and enterprise readiness.</p>
                </div>
                <div className="rounded-2xl border border-slate-800/90 bg-slate-950/80 p-4">
                  <p className="font-semibold text-white">Product-focused delivery</p>
                  <p className="mt-2 text-slate-400">From UX to deployment, every detail is designed to drive business outcomes.</p>
                </div>
              </div>
            </div>

            <div className={`rounded-3xl border border-slate-800/90 bg-slate-900/90 p-8 shadow-[0_25px_100px_-60px_rgba(15,23,42,0.85)] transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`} style={{ transitionTimingFunction: 'var(--ease-expo-out)', transitionDelay: '150ms' }}>
              <h3 className="text-white text-xl font-semibold mb-4">Core capabilities</h3>
              <ul className="space-y-3 text-slate-300 text-sm">
                <li>• Full-stack web and mobile platforms</li>
                <li>• High-performance admin systems</li>
                <li>• UX-led interfaces and branded visual design</li>
                <li>• Secure, scalable cloud-ready architectures</li>
              </ul>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className={`rounded-3xl border border-cyan-400/10 bg-slate-900/90 p-8 shadow-[0_20px_80px_-50px_rgba(6,182,212,0.35)] transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionTimingFunction: 'var(--ease-expo-out)', transitionDelay: `${300 + index * 120}ms` }}
              >
                <span className="text-4xl font-display font-bold text-white">{stat.number}</span>
                <p className="mt-4 text-slate-300 text-sm leading-6">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
