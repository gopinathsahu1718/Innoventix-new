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
    { number: '5+', label: 'Projects Completed' },
    { number: '5+', label: 'Happy Clients' },
    { number: '2+', label: 'Years Experience' },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-24 sm:py-32 bg-white overflow-hidden"
    >
      {/* Decorative Line */}
      <svg
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
        style={{ opacity: isVisible ? 1 : 0, transition: 'opacity 1s ease' }}
      >
        <path
          d="M 0 200 Q 400 100 800 300 T 1600 200"
          fill="none"
          stroke="url(#gradient)"
          strokeWidth="1"
          strokeDasharray="1000"
          strokeDashoffset={isVisible ? 0 : 1000}
          style={{ transition: 'stroke-dashoffset 2s ease 1s' }}
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0e43a6" stopOpacity="0" />
            <stop offset="50%" stopColor="#0e43a6" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#0e43a6" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="mb-16">
          <h2
            className={`font-display text-4xl sm:text-5xl font-bold text-black mb-4 transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
              }`}
            style={{ transitionTimingFunction: 'var(--ease-expo-out)' }}
          >
            About Us
          </h2>
          <div
            className={`w-24 h-1 bg-gradient-brand rounded-full transition-all duration-500 ${isVisible ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
              }`}
            style={{
              transitionTimingFunction: 'var(--ease-expo-out)',
              transitionDelay: '400ms',
              transformOrigin: 'left'
            }}
          />
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text Content */}
          <div>
            <p
              className={`text-lg text-gray-600 leading-relaxed mb-8 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
                }`}
              style={{
                transitionTimingFunction: 'var(--ease-smooth)',
                transitionDelay: '300ms'
              }}
            >
              We are a group of fifteen experienced software developers with more than 3 years of experience
              in building and freelancing real-world projects. We build scalable and user-friendly products
              that help businesses grow faster.
            </p>
            <p
              className={`text-lg text-gray-600 leading-relaxed mb-10 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
                }`}
              style={{
                transitionTimingFunction: 'var(--ease-smooth)',
                transitionDelay: '450ms'
              }}
            >
              Our services include Web Development, App Development, Custom Software, Admin Panels,
              UI/UX Design, and 3D Design. We combine technical expertise with creative innovation
              to deliver exceptional digital solutions.
            </p>

            {/* CTA Button */}
            <div
              className={`transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              style={{
                transitionTimingFunction: 'var(--ease-expo-out)',
                transitionDelay: '600ms'
              }}
            >
              <a
                href="#services"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 text-[#0e43a6] font-semibold hover:gap-4 transition-all duration-300 group"
              >
                Learn More
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </a>
            </div>
          </div>

          {/* Stats Orbs */}
          <div className="flex flex-wrap justify-center lg:justify-end gap-6 sm:gap-8">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className={index === 1 ? 'lg:mt-12' : ''}
              >
                <StatOrb
                  number={stat.number}
                  label={stat.label}
                  delay={500 + index * 150}
                  isVisible={isVisible}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
