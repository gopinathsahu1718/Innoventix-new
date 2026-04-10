import { useEffect, useRef, useState } from 'react';
import { ChevronRight } from 'lucide-react';
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

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Fewer particles on mobile for better performance
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 40 : 90;

    particlesRef.current = Array.from({ length: particleCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * (isMobile ? 0.4 : 0.6),
      vy: (Math.random() - 0.5) * (isMobile ? 0.4 : 0.6),
      size: Math.random() * 2 + 1,
      opacity: Math.random() * 0.5 + 0.25,
    }));

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    let frameCount = 0;
    const animate = () => {
      frameCount++;
      if (frameCount % (isMobile ? 3 : 2) === 0) {  // Slightly slower on mobile
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const particles = particlesRef.current;

        particles.forEach((particle, i) => {
          const dx = mouseRef.current.x - particle.x;
          const dy = mouseRef.current.y - particle.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            const force = (120 - dist) / 120;
            particle.vx -= (dx / dist) * force * 0.4;
            particle.vy -= (dy / dist) * force * 0.4;
          }

          particle.x += particle.vx;
          particle.y += particle.vy;

          particle.vx *= 0.985;
          particle.vy *= 0.985;

          // Wrap around
          if (particle.x < 0) particle.x = canvas.width;
          if (particle.x > canvas.width) particle.x = 0;
          if (particle.y < 0) particle.y = canvas.height;
          if (particle.y > canvas.height) particle.y = 0;

          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(59, 130, 246, ${particle.opacity})`;
          ctx.fill();

          // Connections (reduced on mobile)
          if (!isMobile && i % 4 === 0) {
            particles.slice(i + 1, i + 8).forEach((other) => {
              const dx2 = particle.x - other.x;
              const dy2 = particle.y - other.y;
              const distance = Math.sqrt(dx2 * dx2 + dy2 * dy2);

              if (distance < 90) {
                ctx.beginPath();
                ctx.moveTo(particle.x, particle.y);
                ctx.lineTo(other.x, other.y);
                ctx.strokeStyle = `rgba(59, 130, 246, ${0.08 * (1 - distance / 90)})`;
                ctx.lineWidth = 0.8;
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
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  const scrollToAbout = () => {
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#05070f] pt-16">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0"
        style={{ opacity: isLoaded ? 1 : 0, transition: 'opacity 1s ease' }}
      />

      <div className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.15),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.12),transparent_30%)]" />

      <div className="relative z-20 max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24 lg:pt-24">
        <div className="space-y-12 lg:space-y-16">
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center rounded-full border border-slate-500/30 bg-slate-900/60 px-5 py-2 text-xs uppercase tracking-[0.5em] text-sky-200/80 backdrop-blur-sm">
              Global enterprise digital solutions
            </div>

            {/* Heading + Logo */}
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 lg:gap-12">
              <h1 className="font-display text-[2.1rem] sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold tracking-tighter text-white leading-[1.1] flex-1">
                Next-gen digital products for modern enterprise growth.
              </h1>

              <div className="flex-shrink-0 self-center lg:self-start pt-2">
                <div className="relative group">
                  <div className="absolute inset-0 rounded-full blur-xl opacity-40 group-hover:opacity-60 transition-opacity" />
                  <img
                    src={logo}
                    alt="Innoventix Logo"
                    className="relative h-20 sm:h-24 lg:h-28 w-auto object-contain"
                  />
                </div>
              </div>
            </div>

            {/* Subtitle */}
            <p className="max-w-2xl text-base sm:text-lg text-slate-300/90 leading-relaxed">
              Innoventix partners with ambitious brands to deliver futuristic web, cloud, and AI experiences that scale globally and amplify business performance.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={scrollToAbout}
                className="inline-flex items-center justify-center gap-3 rounded-full bg-gradient-brand px-8 py-4 text-base font-semibold text-white shadow-xl shadow-sky-500/25 hover:-translate-y-0.5 transition-all active:scale-95"
              >
                Explore solutions
                <ChevronRight className="h-5 w-5" />
              </button>

              <button
                onClick={scrollToAbout}
                className="inline-flex items-center justify-center rounded-full border border-slate-600 bg-slate-900/70 px-8 py-4 text-base font-semibold text-slate-100 hover:border-sky-400 hover:text-white transition-all"
              >
                About Us
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-8">
              {[
                { value: '10+', label: 'Projects Completed' },
                { value: '10+', label: 'Happy Clients' },
                // Add more if needed
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-3xl border border-slate-700/70 bg-slate-950/60 p-6 backdrop-blur-xl"
                >
                  <p className="text-4xl font-display font-semibold text-white">{item.value}</p>
                  <p className="mt-2 text-sm text-slate-400">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Decorative blobs */}
      <div className="pointer-events-none absolute -left-20 top-40 h-64 w-64 rounded-full bg-sky-500/10 blur-3xl" />
      <div className="pointer-events-none absolute right-10 top-1/3 h-80 w-80 rounded-full bg-indigo-500/10 blur-3xl" />
    </section>
  );
}