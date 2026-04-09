import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react';

interface Project {
  number: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  accentColor: string;
  gradientFrom: string;
  gradientTo: string;
  stats: { label: string; value: string }[];
  year: string;
}

const projects: Project[] = [
  {
    number: '01',
    title: 'HealthCare Application',
    category: 'Digital Health · Wellness',
    description:
      'HearingZen is a healthcare web application designed to deliver audio wellness solutions and improve accessibility for users through a scalable MERN-stack architecture.',
    tags: ['React Native', 'Bootstrap', 'MongoDB', 'AWS', 'Node.js'],
    accentColor: '#38bdf8',
    gradientFrom: '#0e43a6',
    gradientTo: '#0ea5e9',
    stats: [
      { label: 'Platform', value: 'Web + Mobile' },
      { label: 'Architecture', value: 'MERN Stack' },
      { label: 'Hosting', value: 'AWS Cloud' },
    ],
    year: '2024',
  },
  {
    number: '02',
    title: 'E-commerce Platform',
    category: 'Retail · Fashion',
    description:
      'Kohl is a retail and e-commerce platform offering fashion and lifestyle products for men, women, and kids. It features advanced search and recommendation tools to enhance the shopping experience.',
    tags: ['Laravel', 'Bootstrap', 'React.js', 'MySQL', 'PHP', 'Hostinger'],
    accentColor: '#22d3ee',
    gradientFrom: '#0891b2',
    gradientTo: '#06b6d4',
    stats: [
      { label: 'Platform', value: 'Web' },
      { label: 'Architecture', value: 'Laravel + React' },
      { label: 'Hosting', value: 'Hostinger' },
    ],
    year: '2024',
  },
  {
    number: '03',
    title: 'Billing Management System',
    category: 'Enterprise · Finance',
    description:
      'Swastik Enterprises is a billing and bookstore platform offering a wide collection of books across genres. It provides advanced search, filtering, and secure checkout features to enhance the experience.',
    tags: ['React.js', 'Node.js', 'SQL', 'Express'],
    accentColor: '#a78bfa',
    gradientFrom: '#6d28d9',
    gradientTo: '#8b5cf6',
    stats: [
      { label: 'Platform', value: 'Web' },
      { label: 'Architecture', value: 'MERN Stack' },
      { label: 'Database', value: 'SQL' },
    ],
    year: '2023',
  },
];

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

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

  const goToSlide = (index: number) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex(index);
    setTimeout(() => setIsAnimating(false), 600);
  };

  const nextSlide = () => goToSlide((activeIndex + 1) % projects.length);
  const prevSlide = () => goToSlide((activeIndex - 1 + projects.length) % projects.length);

  const active = projects[activeIndex];

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative py-24 sm:py-32 bg-[#05070f] overflow-hidden"
    >
      {/* Atmosphere effects */}
      <div
        className="pointer-events-none absolute transition-all duration-1000"
        style={{
          top: '10%', left: '-10%',
          width: 600, height: 600,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${active.gradientFrom}22 0%, transparent 70%)`,
          filter: 'blur(60px)',
        }}
      />
      <div
        className="pointer-events-none absolute transition-all duration-1000"
        style={{
          bottom: '5%', right: '-8%',
          width: 500, height: 500,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${active.gradientTo}18 0%, transparent 70%)`,
          filter: 'blur(60px)',
        }}
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_50%,rgba(14,165,233,0.04),transparent)]" />

      <div className="relative max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="flex items-end justify-between mb-14 sm:mb-18">
          <div>
            <div
              className={`inline-flex items-center gap-2.5 rounded-full border border-sky-500/30 bg-slate-900/50 px-5 py-2 text-xs uppercase tracking-[0.4em] text-sky-200/80 shadow-[0_0_40px_rgba(56,189,248,0.10)] backdrop-blur-sm transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
              style={{ transitionTimingFunction: 'cubic-bezier(0.16,1,0.3,1)' }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
              Our Works
            </div>
            <h2
              className={`mt-5 font-bold text-4xl sm:text-5xl text-white tracking-tight transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}
              style={{ transitionTimingFunction: 'cubic-bezier(0.16,1,0.3,1)', transitionDelay: '150ms' }}
            >
              Featured{' '}
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: `linear-gradient(135deg, ${active.accentColor}, #818cf8)` }}
              >
                Projects
              </span>
            </h2>
          </div>

          <div
            className={`hidden sm:flex items-baseline gap-1 transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'
              }`}
            style={{ transitionDelay: '300ms' }}
          >
            <span
              className="font-bold text-5xl text-white tabular-nums transition-all duration-500"
              style={{ textShadow: `0 0 40px ${active.accentColor}60` }}
            >
              {String(activeIndex + 1).padStart(2, '0')}
            </span>
            <span className="text-slate-600 text-2xl font-light">/{String(projects.length).padStart(2, '0')}</span>
          </div>
        </div>

        {/* Main Project Card */}
        <div
          className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          style={{ transitionDelay: '250ms', transitionTimingFunction: 'cubic-bezier(0.16,1,0.3,1)' }}
        >
          <div className="relative rounded-[2rem] border border-slate-700/60 shadow-[0_50px_120px_-30px_rgba(0,0,0,0.8)]" style={{ minHeight: 480 }}>
            <div className="overflow-hidden rounded-[2rem]">
              <div
                className="flex transition-transform duration-500"
                style={{
                  transform: `translateX(-${activeIndex * 100}%)`,
                  transitionTimingFunction: 'cubic-bezier(0.16,1,0.3,1)',
                }}
              >
                {projects.map((project) => (
                  <div key={project.number} className="w-full flex-shrink-0">
                    <div className="relative bg-slate-950/70 backdrop-blur-xl" style={{ minHeight: 480 }}>
                      {/* Ghost number */}
                      <div
                        className="pointer-events-none absolute -top-8 -left-4 font-bold select-none"
                        style={{
                          fontSize: 'clamp(120px, 18vw, 220px)',
                          lineHeight: 1,
                          background: `linear-gradient(135deg, ${project.accentColor}22, transparent)`,
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          letterSpacing: '-0.05em',
                        }}
                      >
                        {project.number}
                      </div>

                      <div className="relative grid lg:grid-cols-[1fr_380px] min-h-[480px]">
                        {/* Left Content */}
                        <div className="flex flex-col justify-between p-8 sm:p-12 lg:p-14">
                          <div className="flex items-center justify-between mb-8">
                            <span className="text-xs uppercase tracking-[0.35em] font-medium" style={{ color: project.accentColor }}>
                              {project.category}
                            </span>
                            <span className="text-xs text-slate-600 tracking-widest">{project.year}</span>
                          </div>

                          <div className="space-y-5 flex-1 flex flex-col justify-center">
                            <h3 className="font-bold text-3xl sm:text-4xl lg:text-5xl text-white leading-tight tracking-tight">
                              {project.title}
                            </h3>
                            <p className="text-slate-400 text-base sm:text-lg leading-relaxed max-w-xl">
                              {project.description}
                            </p>
                            <div className="flex flex-wrap gap-2 pt-2">
                              {project.tags.map((tag) => (
                                <span
                                  key={tag}
                                  className="px-3 py-1 text-xs font-medium rounded-full border backdrop-blur-sm"
                                  style={{
                                    background: `${project.accentColor}12`,
                                    borderColor: `${project.accentColor}30`,
                                    color: project.accentColor,
                                  }}
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div className="mt-10">
                            <button
                              className="group inline-flex items-center gap-3 rounded-full px-7 py-3.5 text-sm font-semibold text-white border transition-all duration-300 hover:-translate-y-0.5"
                              style={{
                                background: `linear-gradient(135deg, ${project.gradientFrom}30, ${project.gradientTo}20)`,
                                borderColor: `${project.accentColor}40`,
                                boxShadow: `0 8px 32px ${project.accentColor}15`,
                              }}
                            >
                              View Project
                              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                            </button>
                          </div>
                        </div>

                        {/* Right Panel */}
                        <div className="relative flex flex-col justify-between border-t lg:border-t-0 lg:border-l p-8 sm:p-10 lg:p-12" style={{ borderColor: 'rgba(148,163,184,0.08)' }}>
                          <div className="space-y-7">
                            <p className="text-xs uppercase tracking-[0.35em] text-slate-600">Project details</p>
                            {project.stats.map((stat) => (
                              <div key={stat.label} className="space-y-1">
                                <p className="text-xs text-slate-600 uppercase tracking-widest">{stat.label}</p>
                                <p className="text-base font-semibold text-white">{stat.value}</p>
                                <div className="h-px mt-2 rounded-full" style={{ background: `linear-gradient(90deg, ${project.accentColor}40, transparent)` }} />
                              </div>
                            ))}
                          </div>

                          <div className="mt-10 space-y-3">
                            <p className="text-xs uppercase tracking-[0.35em] text-slate-600 mb-4">All projects</p>
                            {projects.map((p, i) => (
                              <button
                                key={p.number}
                                onClick={() => goToSlide(i)}
                                className="w-full flex items-center gap-3"
                              >
                                <span className="text-xs font-mono transition-colors duration-300" style={{ color: i === activeIndex ? project.accentColor : '#475569' }}>
                                  {p.number}
                                </span>
                                <div
                                  className="flex-1 h-px transition-all duration-300"
                                  style={{
                                    background: i === activeIndex
                                      ? `linear-gradient(90deg, ${project.accentColor}, transparent)`
                                      : 'rgba(71,85,105,0.4)',
                                    opacity: i === activeIndex ? 1 : 0.5,
                                  }}
                                />
                                <span className="text-xs font-medium transition-colors duration-300 text-right" style={{ color: i === activeIndex ? '#fff' : '#475569' }}>
                                  {p.title.split(' ').slice(0, 2).join(' ')}
                                </span>
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="absolute inset-x-0 bottom-0 h-32 pointer-events-none" style={{ background: `radial-gradient(ellipse at 50% 100%, ${project.gradientTo}20 0%, transparent 70%)` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className={`flex items-center justify-between mt-8 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '400ms' }}>
          <div className="flex gap-3">
            <button onClick={prevSlide} disabled={isAnimating} className="w-12 h-12 rounded-full flex items-center justify-center text-white border border-slate-700/60 bg-slate-900/60 backdrop-blur-sm hover:border-sky-500/50 hover:bg-slate-800/60 transition-all duration-300 disabled:opacity-40">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button onClick={nextSlide} disabled={isAnimating} className="w-12 h-12 rounded-full flex items-center justify-center text-white border border-slate-700/60 bg-slate-900/60 backdrop-blur-sm hover:border-sky-500/50 hover:bg-slate-800/60 transition-all duration-300 disabled:opacity-40">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div className="flex gap-3 items-center">
            {projects.map((_, i) => (
              <button key={i} onClick={() => goToSlide(i)} className="relative flex items-center justify-center">
                <span
                  className="block rounded-full transition-all duration-400"
                  style={{
                    width: i === activeIndex ? 28 : 8,
                    height: 8,
                    background: i === activeIndex ? active.accentColor : 'rgba(100,116,139,0.4)',
                  }}
                />
                {i === activeIndex && (
                  <span className="absolute inset-0 rounded-full animate-ping opacity-30" style={{ background: active.accentColor }} />
                )}
              </button>
            ))}
          </div>

          <div className="hidden sm:block w-36 h-px bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${((activeIndex + 1) / projects.length) * 100}%`,
                background: `linear-gradient(90deg, ${active.gradientFrom}, ${active.accentColor})`,
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}