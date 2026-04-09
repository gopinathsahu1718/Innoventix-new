import { useEffect, useRef, useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import logo from '/assets/logo.png';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
}

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationRef = useRef<number | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize particles
    const particleCount = window.innerWidth < 768 ? 50 : 100;
    particlesRef.current = Array.from({ length: particleCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 2 + 1,
      opacity: Math.random() * 0.5 + 0.2,
    }));

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    let frameCount = 0;
    const animate = () => {
      frameCount++;
      // Render every 2nd frame for performance (30fps)
      if (frameCount % 2 === 0) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const particles = particlesRef.current;

        // Update and draw particles
        particles.forEach((particle, i) => {
          // Mouse repulsion
          const dx = mouseRef.current.x - particle.x;
          const dy = mouseRef.current.y - particle.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 150) {
            const force = (150 - dist) / 150;
            particle.vx -= (dx / dist) * force * 0.5;
            particle.vy -= (dy / dist) * force * 0.5;
          }

          // Update position
          particle.x += particle.vx;
          particle.y += particle.vy;

          // Damping
          particle.vx *= 0.99;
          particle.vy *= 0.99;

          // Wrap around edges
          if (particle.x < 0) particle.x = canvas.width;
          if (particle.x > canvas.width) particle.x = 0;
          if (particle.y < 0) particle.y = canvas.height;
          if (particle.y > canvas.height) particle.y = 0;

          // Draw particle
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(59, 130, 246, ${particle.opacity})`;
          ctx.fill();

          // Draw connections (only check every 5th particle for performance)
          if (i % 5 === 0) {
            particles.slice(i + 1, i + 10).forEach((other) => {
              const dx = particle.x - other.x;
              const dy = particle.y - other.y;
              const distance = Math.sqrt(dx * dx + dy * dy);

              if (distance < 100) {
                ctx.beginPath();
                ctx.moveTo(particle.x, particle.y);
                ctx.lineTo(other.x, other.y);
                ctx.strokeStyle = `rgba(59, 130, 246, ${0.1 * (1 - distance / 100)})`;
                ctx.stroke();
              }
            });
          }
        });
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  const scrollToAbout = () => {
    const aboutSection = document.querySelector('#about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#05070f]">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0"
        style={{ opacity: isLoaded ? 1 : 0, transition: 'opacity 1s ease' }}
      />

      <div className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.15),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(59,130,246,0.12),_transparent_25%)]" />

      <div className="relative z-20 max-w-[1300px] mx-auto px-4 py-24 sm:px-6 lg:px-8">
        <div className="space-y-16">
          <div className="space-y-8">
            <div className="inline-flex items-center rounded-full border border-slate-500/30 bg-slate-900/50 px-4 py-2 text-xs uppercase tracking-[0.4em] text-sky-200/80 shadow-[0_0_40px_rgba(56,189,248,0.14)] backdrop-blur-sm">
              Global enterprise digital solutions
            </div>

            <div className="space-y-6">
              <div className={`flex items-start justify-between gap-8 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`} style={{ transitionTimingFunction: 'var(--ease-expo-out)', transitionDelay: '400ms' }}>
                <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight text-white leading-tight flex-1">
                  Next-gen digital products for modern enterprise growth.
                </h1>

                <div className="flex-shrink-0 flex items-center">
                  <div className="relative group">
                    <div className="absolute inset-0 rounded-full blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
                    <img
                      src={logo}
                      alt="Innoventix Logo"
                      className="relative h-24 w-auto object-contain"
                    />
                  </div>
                </div>
              </div>

              <p className={`max-w-2xl text-base sm:text-lg text-slate-300/90 leading-8 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-5 blur-sm'
                }`} style={{ transitionTimingFunction: 'var(--ease-expo-out)', transitionDelay: '650ms' }}>
                Innoventix partners with ambitious brands to deliver futuristic web, cloud, and AI experiences that scale globally and amplify business performance.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <button
                onClick={scrollToAbout}
                className="inline-flex items-center justify-center gap-3 rounded-full bg-gradient-brand px-8 py-4 text-sm font-semibold text-white shadow-xl shadow-sky-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_30px_80px_-40px_rgba(14,165,233,0.7)]"
                style={{ transitionTimingFunction: 'var(--ease-expo-out)' }}
              >
                Explore solutions
                <ChevronRight className="h-4 w-4" />
              </button>

              <button
                onClick={scrollToAbout}
                className="inline-flex items-center justify-center rounded-full border border-slate-700/80 bg-slate-900/70 px-8 py-4 text-sm font-semibold text-slate-100 transition-all duration-300 hover:border-sky-400/50 hover:text-white"
              >
                About Us
              </button>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { value: '10+', label: 'Projects Completed' },
                { value: '10+', label: 'Happy Clients' },
                // { value: '98%', label: 'Client satisfaction' },
              ].map((item) => (
                <div key={item.label} className="rounded-3xl border border-slate-700/70 bg-slate-950/60 p-5 shadow-[0_28px_80px_-60px_rgba(15,23,42,0.9)] backdrop-blur-xl">
                  <p className="text-3xl font-display font-semibold text-white">{item.value}</p>
                  <p className="mt-2 text-sm text-slate-400">{item.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* <div className="relative overflow-hidden rounded-[2rem] border border-slate-700/60 bg-slate-950/70 p-8 shadow-[0_50px_120px_-80px_rgba(15,23,42,0.85)] backdrop-blur-xl">
            <div className="absolute inset-x-8 top-8 h-1 rounded-full bg-gradient-to-r from-cyan-400/70 via-sky-500/40 to-indigo-400/50 blur-2xl" />
            <div className="space-y-6 relative">
              <div className="rounded-[1.75rem] border border-slate-700/70 bg-slate-900/80 p-6 shadow-[0_20px_80px_-40px_rgba(15,23,42,0.65)]">
                <p className="text-sm uppercase tracking-[0.24em] text-sky-200/70">Futuristic outcome stack</p>
                <h2 className="mt-4 text-2xl font-semibold text-white">Adaptive systems, bold product visions.</h2>
                <p className="mt-3 text-xs leading-6 text-slate-300/85">
                  We combine enterprise-grade design, intelligent automation, and scalable architecture to launch experiences that feel premium and perform at scale.
                </p>
              </div>

              <div className="grid gap-3 grid-cols-2 sm:grid-cols-2">
                {[
                  { label: 'AI-enabled workflows', accent: 'from-cyan-400 to-sky-500' },
                  { label: 'Cloud-first engineering', accent: 'from-violet-500 to-indigo-500' },
                  { label: 'Data-driven growth', accent: 'from-emerald-400 to-cyan-500' },
                  { label: 'Secure, compliant launch', accent: 'from-sky-400 to-blue-500' },
                ].map((item) => (
                  <div key={item.label} className="rounded-2xl border border-slate-700/80 bg-slate-900/85 p-4">
                    <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Core</p>
                    <p className="mt-2 text-sm font-semibold text-white">{item.label}</p>
                    <div className={`mt-3 h-0.5 rounded-full bg-gradient-to-r ${item.accent} opacity-80`} />
                  </div>
                ))}
              </div>

              <div className="grid gap-3 grid-cols-3">
                {[
                  { highlight: 'Real-time insights', description: 'Live dashboards' },
                  { highlight: 'Rapid prototypes', description: 'Concept to launch' },
                  { highlight: 'Strategic support', description: 'Growth roadmaps' },
                ].map((item) => (
                  <div key={item.highlight} className="rounded-2xl bg-slate-900/80 p-3 text-xs text-slate-300">
                    <p className="font-semibold text-white text-sm">{item.highlight}</p>
                    <p className="mt-1 text-slate-400 text-xs">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div> */}
        </div>
      </div>

      <div className="pointer-events-none absolute -left-16 top-32 h-48 w-48 rounded-full bg-sky-500/10 blur-3xl" />
      <div className="pointer-events-none absolute right-16 top-1/3 h-72 w-72 rounded-full bg-indigo-500/10 blur-3xl" />
    </section>
  );
}
