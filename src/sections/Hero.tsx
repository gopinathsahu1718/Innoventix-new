import { useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';

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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0a0a0a]">
      {/* Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0"
        style={{ opacity: isLoaded ? 1 : 0, transition: 'opacity 1s ease' }}
      />

      {/* Gradient Overlay */}
      <div 
        className="absolute inset-0 z-10"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(14, 67, 166, 0.15) 0%, rgba(10, 10, 10, 0.9) 70%)',
          opacity: isLoaded ? 1 : 0,
          transition: 'opacity 0.8s ease 0.2s'
        }}
      />

      {/* Content */}
      <div className="relative z-20 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        {/* Headline */}
        <h1 
          className={`font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 transition-all duration-1000 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ 
            transitionTimingFunction: 'var(--ease-expo-out)',
            transitionDelay: '400ms',
            textShadow: '0 0 60px rgba(59, 130, 246, 0.3)'
          }}
        >
          <span className="block">Innovating with</span>
          <span className="block text-gradient mt-2">Innoventix</span>
        </h1>

        {/* Subheadline */}
        <p 
          className={`text-lg sm:text-xl text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed transition-all duration-1000 ${
            isLoaded ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-5 blur-sm'
          }`}
          style={{ 
            transitionTimingFunction: 'var(--ease-expo-out)',
            transitionDelay: '800ms'
          }}
        >
          Building innovative projects, empowering clients, and crafting digital experiences that inspire.
        </p>

        {/* CTA Button */}
        <div 
          className={`transition-all duration-700 ${
            isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
          }`}
          style={{ 
            transitionTimingFunction: 'var(--ease-elastic)',
            transitionDelay: '1000ms'
          }}
        >
          <button
            onClick={scrollToAbout}
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-brand text-white font-semibold rounded-full hover:shadow-xl hover:shadow-[#0e43a6]/40 transition-all duration-300 group"
            style={{ transitionTimingFunction: 'var(--ease-expo-out)' }}
          >
            About Us
            <ChevronDown className="w-5 h-5 group-hover:translate-y-1 transition-transform duration-300" />
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div 
        className={`absolute bottom-10 left-1/2 -translate-x-1/2 z-20 transition-all duration-700 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ 
          transitionTimingFunction: 'var(--ease-smooth)',
          transitionDelay: '1200ms'
        }}
      >
        <div className="flex flex-col items-center gap-2 text-white/50">
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-3 bg-white/50 rounded-full animate-bounce" />
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-[#0e43a6]/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#06b6d4]/10 rounded-full blur-[120px] pointer-events-none" />
    </section>
  );
}
