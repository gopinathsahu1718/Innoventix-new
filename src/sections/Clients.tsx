import { useEffect, useRef, useState } from 'react';

const clients = [
  { name: 'HearingZen', color: '#0e43a6' },
  { name: 'LogicGo', color: '#06b6d4' },
  { name: 'Kohl', color: '#8b5cf6' },
  { name: 'Laxmi Book Store', color: '#f59e0b' },
  { name: 'D Technologies', color: '#ef4444' },
];

// Duplicate for seamless loop
const clientsRow1 = [...clients, ...clients];
const clientsRow2 = [...clients.slice().reverse(), ...clients.slice().reverse()];

interface ClientLogoProps {
  name: string;
  color: string;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}

function ClientLogo({ name, color, isHovered, onHover, onLeave }: ClientLogoProps) {
  const initials = name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();

  return (
    <div
      className={`flex-shrink-0 px-8 sm:px-12 transition-all duration-300 ${
        isHovered ? 'scale-110 z-10' : 'scale-100'
      }`}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <div 
        className={`flex items-center gap-4 px-8 py-6 rounded-xl bg-white border border-gray-100 shadow-sm transition-all duration-300 cursor-pointer ${
          isHovered ? 'shadow-xl border-transparent' : ''
        }`}
        style={{
          boxShadow: isHovered ? `0 20px 40px ${color}20` : undefined,
          transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
        }}
      >
        <div 
          className="w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold font-accent transition-all duration-300"
          style={{ 
            background: isHovered ? color : `${color}20`,
            color: isHovered ? 'white' : color,
          }}
        >
          {initials}
        </div>
        <span 
          className={`font-display text-lg font-semibold transition-all duration-300 ${
            isHovered ? 'text-black' : 'text-gray-600'
          }`}
        >
          {name}
        </span>
      </div>
    </div>
  );
}

export default function Clients() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredClient, setHoveredClient] = useState<string | null>(null);
  const [isPaused, setIsPaused] = useState(false);

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

  return (
    <section
      id="clients"
      ref={sectionRef}
      className="relative py-24 sm:py-32 bg-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2
            className={`font-display text-4xl sm:text-5xl font-bold text-black mb-4 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionTimingFunction: 'var(--ease-expo-out)' }}
          >
            Clients
          </h2>
          <p
            className={`text-lg text-gray-600 max-w-xl mx-auto transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionTimingFunction: 'var(--ease-expo-out)', transitionDelay: '150ms' }}
          >
            Trusted by forward-thinking brands who believe in our creativity and commitment to quality
          </p>
        </div>
      </div>

      {/* Marquee Container */}
      <div 
        className={`relative transition-all duration-1000 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ transitionTimingFunction: 'var(--ease-expo-out)', transitionDelay: '300ms' }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => {
          setIsPaused(false);
          setHoveredClient(null);
        }}
      >
        {/* Gradient Masks */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        {/* Row 1 - Left to Right */}
        <div className="mb-8 overflow-hidden">
          <div 
            className={`flex ${isPaused ? '' : 'animate-marquee'}`}
            style={{ width: 'fit-content' }}
          >
            {clientsRow1.map((client, index) => (
              <ClientLogo
                key={`row1-${index}`}
                name={client.name}
                color={client.color}
                isHovered={hoveredClient === `row1-${index}`}
                onHover={() => setHoveredClient(`row1-${index}`)}
                onLeave={() => setHoveredClient(null)}
              />
            ))}
          </div>
        </div>

        {/* Row 2 - Right to Left */}
        <div className="overflow-hidden">
          <div 
            className={`flex ${isPaused ? '' : 'animate-marquee-reverse'}`}
            style={{ width: 'fit-content' }}
          >
            {clientsRow2.map((client, index) => (
              <ClientLogo
                key={`row2-${index}`}
                name={client.name}
                color={client.color}
                isHovered={hoveredClient === `row2-${index}`}
                onHover={() => setHoveredClient(`row2-${index}`)}
                onLeave={() => setHoveredClient(null)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
