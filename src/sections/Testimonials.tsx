import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
}

const testimonials: Testimonial[] = [
  {
    quote: "Team Innoventix delivered a reliable and scalable healthcare platform for us. The application is smooth, secure, and exactly aligned with our accessibility goals.",
    author: "Healthcare Platform Client",
    role: "Product Owner",
    company: "HearingZen",
  },
  {
    quote: "Working with Innoventix was a game-changer for our business. Their technical expertise and attention to detail resulted in a platform that exceeded our expectations.",
    author: "E-commerce Client",
    role: "CEO",
    company: "Kohl",
  },
  {
    quote: "The team at Innoventix demonstrated exceptional professionalism throughout our project. They delivered on time and the quality of work was outstanding.",
    author: "Technology Client",
    role: "Founder",
    company: "LogicGo",
  },
];

export default function Testimonials() {
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
    goToSlide((activeIndex + 1) % testimonials.length);
  };

  const prevSlide = () => {
    goToSlide((activeIndex - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-24 sm:py-32 bg-gradient-dark overflow-hidden"
    >
      {/* Background Decorations */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#0e43a6]/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#8b5cf6]/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2
            className={`font-display text-4xl sm:text-5xl font-bold text-white mb-4 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionTimingFunction: 'var(--ease-expo-out)' }}
          >
            What Our Clients Say
          </h2>
          <p
            className={`text-lg text-white/60 max-w-xl mx-auto transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionTimingFunction: 'var(--ease-expo-out)', transitionDelay: '150ms' }}
          >
            Real stories from businesses we&apos;ve helped succeed
          </p>
        </div>

        {/* Testimonial Slider */}
        <div 
          className={`relative transition-all duration-700 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ transitionTimingFunction: 'var(--ease-smooth)', transitionDelay: '300ms' }}
        >
          {/* Quote Icon */}
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 z-10">
            <div 
              className={`w-16 h-16 rounded-full bg-gradient-brand flex items-center justify-center transition-all duration-700 ${
                isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
              }`}
              style={{ transitionTimingFunction: 'var(--ease-elastic)', transitionDelay: '500ms' }}
            >
              <Quote className="w-8 h-8 text-white" />
            </div>
          </div>

          {/* Cards Container */}
          <div className="relative overflow-hidden pt-8">
            <div 
              className="flex transition-transform duration-500"
              style={{ 
                transform: `translateX(-${activeIndex * 100}%)`,
                transitionTimingFunction: 'var(--ease-expo-out)',
              }}
            >
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="w-full flex-shrink-0 px-4"
                >
                  <div className="relative bg-[#111] border border-white/10 rounded-2xl p-8 sm:p-12 text-center">
                    {/* Quote */}
                    <blockquote className="text-xl sm:text-2xl text-white leading-relaxed mb-8">
                      &ldquo;{testimonial.quote}&rdquo;
                    </blockquote>

                    {/* Author */}
                    <div className="flex flex-col items-center">
                      <div className="w-16 h-16 rounded-full bg-gradient-brand flex items-center justify-center text-white text-xl font-bold font-accent mb-4">
                        {testimonial.author.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                      </div>
                      <cite className="not-italic">
                        <span className="block text-white font-semibold text-lg">
                          {testimonial.author}
                        </span>
                        <span className="block text-[#3b82f6] text-sm mt-1">
                          {testimonial.role}, {testimonial.company}
                        </span>
                      </cite>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-6 mt-8">
            <button
              onClick={prevSlide}
              disabled={isAnimating}
              className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 hover:border-[#3b82f6]/50 transition-all duration-300 disabled:opacity-50"
              style={{ transitionTimingFunction: 'var(--ease-elastic)' }}
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Dots */}
            <div className="flex gap-3">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`relative w-3 h-3 rounded-full transition-all duration-300 ${
                    index === activeIndex 
                      ? 'bg-[#3b82f6]' 
                      : 'bg-white/20 hover:bg-white/40'
                  }`}
                  style={{ transitionTimingFunction: 'var(--ease-expo-out)' }}
                  aria-label={`Go to testimonial ${index + 1}`}
                >
                  {index === activeIndex && (
                    <span className="absolute inset-0 rounded-full bg-[#3b82f6] animate-ping opacity-50" />
                  )}
                </button>
              ))}
            </div>

            <button
              onClick={nextSlide}
              disabled={isAnimating}
              className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 hover:border-[#3b82f6]/50 transition-all duration-300 disabled:opacity-50"
              style={{ transitionTimingFunction: 'var(--ease-elastic)' }}
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
