import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  initials: string;
  accentColor: string;
  featured?: boolean;
}

const testimonials: Testimonial[] = [
  {
    quote: "Team Innoventix delivered a reliable and scalable healthcare platform for us. The application is smooth, secure, and exactly aligned with our accessibility goals.",
    author: "Healthcare Platform Client",
    role: "Product Owner",
    company: "HearingZen",
    initials: "HZ",
    accentColor: "#38bdf8",
    // featured: true,
  },
  {
    quote: "Working with Innoventix was a game-changer for our business. Their technical expertise and attention to detail resulted in a platform that exceeded our expectations.",
    author: "E-commerce Client",
    role: "CEO",
    company: "Kohl",
    initials: "KH",
    accentColor: "#22d3ee",
  },
  {
    quote: "The team at Innoventix demonstrated exceptional professionalism throughout our project. They delivered on time and the quality of work was outstanding.",
    author: "Technology Client",
    role: "Founder",
    company: "LogicGo",
    initials: "LG",
    accentColor: "#a78bfa",
  },
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const active = testimonials[activeIndex];

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
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const goToSlide = (index: number) => {
    if (isAnimating || index === activeIndex) return;
    setIsAnimating(true);
    setActiveIndex(index);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const nextSlide = () => goToSlide((activeIndex + 1) % testimonials.length);
  const prevSlide = () => goToSlide((activeIndex - 1 + testimonials.length) % testimonials.length);

  return (
    <section
      ref={sectionRef}
      className="relative py-20 bg-[#05070f] overflow-hidden"
    >
      {/* Subtle background glow */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(circle at 50% 40%, ${active.accentColor}15, transparent 70%)`,
        }}
      />

      <div className="relative max-w-4xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-12">
          <div
            className={`inline-flex items-center gap-2 rounded-full border border-slate-700 px-4 py-1.5 text-xs tracking-widest text-slate-400 transition-all ${isVisible ? 'opacity-100' : 'opacity-0'
              }`}
          >
            CLIENT TESTIMONIALS
          </div>
          <h2
            className={`mt-4 text-3xl font-bold text-white tracking-tight transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
          >
            What our clients say
          </h2>
        </div>

        {/* Compact Card */}
        <div className="relative mx-auto max-w-2xl">
          <div className="rounded-3xl border border-slate-700/60 bg-slate-950/70 backdrop-blur-xl p-8 sm:p-10 shadow-xl">

            {/* Accent top line */}
            <div
              className="absolute inset-x-8 top-0 h-px -translate-y-1/2"
              style={{ background: `linear-gradient(90deg, transparent, ${active.accentColor}, transparent)` }}
            />

            {/* Quote */}
            <div className="text-5xl text-slate-700 mb-6">“</div>

            <blockquote className="text-[15px] sm:text-base leading-relaxed text-slate-300 min-h-[110px]">
              {active.quote}
            </blockquote>

            {/* Author */}
            <div className="mt-8 flex items-center gap-4">
              <div
                className="w-11 h-11 rounded-2xl flex items-center justify-center font-bold text-white text-lg flex-shrink-0"
                style={{ background: `linear-gradient(135deg, ${active.accentColor}, #6366f1)` }}
              >
                {active.initials}
              </div>
              <div>
                <p className="font-semibold text-white">{active.author}</p>
                <p className="text-sm text-slate-400">{active.role} • {active.company}</p>
              </div>
              {active.featured && (
                <div className="ml-auto text-[10px] px-3 py-1 border border-blue-500/30 bg-blue-500/10 text-blue-400 rounded-full">
                  Featured
                </div>
              )}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-6 px-2">
            <button
              onClick={prevSlide}
              disabled={isAnimating}
              className="p-3 rounded-xl border border-slate-700 hover:border-slate-500 text-slate-400 hover:text-white transition-all disabled:opacity-40"
            >
              <ChevronLeft size={20} />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goToSlide(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${i === activeIndex
                    ? 'bg-white scale-125'
                    : 'bg-slate-600 hover:bg-slate-500'
                    }`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              disabled={isAnimating}
              className="p-3 rounded-xl border border-slate-700 hover:border-slate-500 text-slate-400 hover:text-white transition-all disabled:opacity-40"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}