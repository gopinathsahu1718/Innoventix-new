import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';

interface Project {
  number: string;
  title: string;
  description: string;
  tags: string[];
  color: string;
}

const projects: Project[] = [
  {
    number: '01',
    title: 'HealthCare Application',
    description: 'HearingZen is a healthcare web application designed to deliver audio wellness solutions and improve accessibility for users through a scalable MERN-stack architecture.',
    tags: ['React Native', 'Bootstrap', 'MongoDB', 'AWS', 'Node.js'],
    color: '#0e43a6',
  },
  {
    number: '02',
    title: 'E-commerce Platform',
    description: 'Kohl is a retail and e-commerce platform offering fashion and lifestyle products for men, women, and kids. It features advanced search and recommendation tools to enhance the shopping experience.',
    tags: ['Laravel', 'Bootstrap', 'React.js', 'MySQL', 'PHP', 'Hostinger'],
    color: '#06b6d4',
  },
  {
    number: '03',
    title: 'Billing Management System',
    description: 'Swastik Enterprises is an online bookstore platform offering a wide collection of books across genres. It provides advanced search, filtering, and secure checkout features to enhance the shopping experience.',
    tags: ['React.js', 'Node.js', 'SQL', 'Express'],
    color: '#8b5cf6',
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
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const goToSlide = (index: number) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex(index);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const nextSlide = () => {
    goToSlide((activeIndex + 1) % projects.length);
  };

  const prevSlide = () => {
    goToSlide((activeIndex - 1 + projects.length) % projects.length);
  };

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative py-24 sm:py-32 bg-gradient-dark overflow-hidden"
    >
      {/* Background Decorations */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-[#0e43a6]/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-[#8b5cf6]/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12 sm:mb-16">
          <span
            className={`inline-block font-accent text-sm uppercase tracking-[0.2em] text-[#3b82f6] mb-4 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionTimingFunction: 'var(--ease-expo-out)' }}
          >
            Our Works
          </span>
          <h2
            className={`font-display text-4xl sm:text-5xl font-bold text-white transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionTimingFunction: 'var(--ease-expo-out)', transitionDelay: '200ms' }}
          >
            Projects
          </h2>
        </div>

        {/* Carousel */}
        <div 
          className={`relative transition-all duration-700 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ transitionTimingFunction: 'var(--ease-smooth)', transitionDelay: '300ms' }}
        >
          {/* Cards Container */}
          <div className="relative overflow-hidden rounded-2xl">
            <div 
              className="flex transition-transform duration-500"
              style={{ 
                transform: `translateX(-${activeIndex * 100}%)`,
                transitionTimingFunction: 'var(--ease-expo-out)',
              }}
            >
              {projects.map((project) => (
                <div
                  key={project.number}
                  className="w-full flex-shrink-0"
                >
                  <div className="relative bg-[#111] border border-white/10 rounded-2xl overflow-hidden">
                    {/* Project Number */}
                    <div className="absolute top-6 left-6 z-10">
                      <span 
                        className="font-accent text-8xl sm:text-9xl font-bold text-gradient opacity-20"
                        style={{ textShadow: `0 0 60px ${project.color}40` }}
                      >
                        {project.number}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="relative p-8 sm:p-12 lg:p-16 min-h-[400px] flex flex-col justify-end">
                      {/* Tech Tags */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 text-xs font-medium bg-white/5 text-white/70 rounded-full border border-white/10 backdrop-blur-sm"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Title */}
                      <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold text-white mb-4">
                        {project.title}
                      </h3>

                      {/* Description */}
                      <p className="text-white/60 text-base sm:text-lg leading-relaxed max-w-2xl mb-8">
                        {project.description}
                      </p>

                      {/* View Project Button */}
                      <div>
                        <button 
                          className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 text-white rounded-full border border-white/10 transition-all duration-300 group"
                          style={{ transitionTimingFunction: 'var(--ease-expo-out)' }}
                        >
                          View Project
                          <ExternalLink className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                        </button>
                      </div>

                      {/* Background Gradient */}
                      <div 
                        className="absolute inset-0 -z-10 opacity-30"
                        style={{
                          background: `radial-gradient(circle at 80% 20%, ${project.color}30 0%, transparent 50%)`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8">
            {/* Arrows */}
            <div className="flex gap-4">
              <button
                onClick={prevSlide}
                disabled={isAnimating}
                className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 hover:border-[#3b82f6]/50 transition-all duration-300 disabled:opacity-50"
                style={{ transitionTimingFunction: 'var(--ease-elastic)' }}
                aria-label="Previous project"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextSlide}
                disabled={isAnimating}
                className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 hover:border-[#3b82f6]/50 transition-all duration-300 disabled:opacity-50"
                style={{ transitionTimingFunction: 'var(--ease-elastic)' }}
                aria-label="Next project"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Dots */}
            <div className="flex gap-3">
              {projects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`relative w-3 h-3 rounded-full transition-all duration-300 ${
                    index === activeIndex 
                      ? 'bg-[#3b82f6]' 
                      : 'bg-white/20 hover:bg-white/40'
                  }`}
                  style={{ transitionTimingFunction: 'var(--ease-expo-out)' }}
                  aria-label={`Go to project ${index + 1}`}
                >
                  {index === activeIndex && (
                    <span className="absolute inset-0 rounded-full bg-[#3b82f6] animate-ping opacity-50" />
                  )}
                </button>
              ))}
            </div>

            {/* Progress */}
            <div className="hidden sm:block w-32 h-1 bg-white/10 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-brand rounded-full transition-all duration-500"
                style={{ 
                  width: `${((activeIndex + 1) / projects.length) * 100}%`,
                  transitionTimingFunction: 'var(--ease-expo-out)',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
