import { useEffect, useRef, useState } from 'react';

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [counts, setCounts] = useState([0, 0, 0]); // For animated numbers

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);

          // Start counting animation after a small delay
          setTimeout(() => {
            animateCounts();
          }, 400);
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
    { target: 10, label: 'Projects Completed', suffix: '+' },
    { target: 10, label: 'Happy Clients', suffix: '+' },
    { target: 2, label: 'Years Experience', suffix: '+' },
  ];

  // Count-up animation function
  const animateCounts = () => {
    const duration = 1800; // Animation duration in ms
    const interval = 30;    // Update every 30ms
    const steps = duration / interval;

    stats.forEach((stat, index) => {
      let current = 0;
      const increment = Math.ceil(stat.target / steps);

      const timer = setInterval(() => {
        current += increment;

        if (current >= stat.target) {
          current = stat.target;
          clearInterval(timer);
        }

        setCounts((prev) => {
          const newCounts = [...prev];
          newCounts[index] = current;
          return newCounts;
        });
      }, interval);
    });
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-24 sm:py-32 bg-[#05070f] overflow-hidden"
    >
      {/* Futuristic Background */}
      <div className="absolute inset-0 bg-[radial-gradient(at_50%_30%,rgba(59,130,246,0.08),transparent_50%)]" />

      <div className="relative max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="inline-flex items-center rounded-full border border-slate-500/30 bg-slate-900/50 px-4 py-2 text-xs uppercase tracking-[0.4em] text-sky-200/80">
            About Innoventix
          </div>
          <h2
            className={`font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white mt-6 tracking-tight transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-6'
              }`}
            style={{ transitionTimingFunction: 'var(--ease-expo-out)' }}
          >
            Building future-ready products for enterprise growth.
          </h2>
          <p
            className={`mt-6 text-lg text-slate-300 leading-relaxed transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
              }`}
            style={{ transitionTimingFunction: 'var(--ease-smooth)', transitionDelay: '150ms' }}
          >
            We are eight focused software specialists delivering scalable digital platforms with a strategic, polished approach. Our experience spans startups, enterprise workflows and product launches built for reliability and velocity.
          </p>
        </div>

        <div className="mt-16 grid lg:grid-cols-2 gap-6">
          {/* Left Card - unchanged */}
          <div
            className={`rounded-3xl border border-slate-800/90 bg-slate-900/90 p-8 shadow-[0_25px_100px_-60px_rgba(15,23,42,0.85)] transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
              }`}
            style={{ transitionTimingFunction: 'var(--ease-expo-out)' }}
          >
            <p className="text-slate-300 leading-relaxed">
              We design polished digital experiences for investors, executives and end users. Our projects include custom web platforms, secure admin systems, intelligent mobile apps and 3D-informed interfaces that feel premium and intuitive.
            </p>
            <div className="mt-8 space-y-6">
              <div>
                <div className="text-cyan-400 text-sm font-medium">Strategic engineering</div>
                <div className="text-slate-400 text-sm mt-1">
                  Architected for scale, performance, and enterprise readiness.
                </div>
              </div>
              <div>
                <div className="text-cyan-400 text-sm font-medium">Product-focused delivery</div>
                <div className="text-slate-400 text-sm mt-1">
                  From UX to deployment, every detail is designed to drive business outcomes.
                </div>
              </div>
            </div>
          </div>

          {/* Right Card - unchanged */}
          <div
            className={`rounded-3xl border border-slate-800/90 bg-slate-900/90 p-8 shadow-[0_25px_100px_-60px_rgba(15,23,42,0.85)] transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
              }`}
            style={{ transitionTimingFunction: 'var(--ease-expo-out)', transitionDelay: '150ms' }}
          >
            <div className="text-sm uppercase tracking-[0.4em] text-slate-400 mb-4">Core capabilities</div>
            <ul className="space-y-3 text-slate-300">
              <li className="flex items-start gap-3">
                <span className="text-cyan-400 mt-1">•</span>
                Full-stack web and mobile platforms
              </li>
              <li className="flex items-start gap-3">
                <span className="text-cyan-400 mt-1">•</span>
                High-performance admin systems
              </li>
              <li className="flex items-start gap-3">
                <span className="text-cyan-400 mt-1">•</span>
                UX-led interfaces and branded visual design
              </li>
              <li className="flex items-start gap-3">
                <span className="text-cyan-400 mt-1">•</span>
                Secure, scalable cloud-ready architectures
              </li>
            </ul>
          </div>
        </div>

        {/* Stats with Count Animation */}
        <div className="mt-16 grid md:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`rounded-3xl border border-cyan-400/10 bg-slate-900/90 p-8 shadow-[0_20px_80px_-50px_rgba(6,182,212,0.35)] transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              style={{
                transitionTimingFunction: 'var(--ease-expo-out)',
                transitionDelay: `${300 + index * 120}ms`,
              }}
            >
              <div className="text-4xl font-display font-semibold text-white">
                {counts[index]}
                {stat.suffix}
              </div>
              <div className="mt-2 text-slate-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}