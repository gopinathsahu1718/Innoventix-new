import { useEffect, useRef, useState } from 'react';
import {
  Globe,
  Smartphone,
  Box,
  LayoutDashboard,
  FileText,
  Palette,
  ArrowRight,
  Calendar
} from 'lucide-react';

interface Service {
  number: string;
  title: string;
  description: string;
  icon: React.ElementType;
  tags: string[];
}

const services: Service[] = [
  {
    number: '01',
    title: 'Website Development',
    description: 'High-performance, scalable websites tailored for startups and businesses with a strong focus on speed, SEO, and maintainability.',
    icon: Globe,
    tags: ['React', 'Next.js', 'PHP', 'Maintenance & Support', 'Modern Tech Stack'],
  },
  {
    number: '02',
    title: 'App Development',
    description: 'Custom mobile and web applications designed to deliver seamless user experiences and robust performance.',
    icon: Smartphone,
    tags: ['Cross-Platform Apps', 'API Integration', 'Android & iOS'],
  },
  {
    number: '03',
    title: '3D Design',
    description: 'Interactive and visually striking 3D designs for products, websites, and marketing experiences.',
    icon: Box,
    tags: ['3D Modeling', 'Web-based 3D', 'High Visual Fidelity'],
  },
  {
    number: '04',
    title: 'Admin Panel Development',
    description: 'Secure, scalable, and user-friendly admin dashboards to manage data, users, and business operations efficiently.',
    icon: LayoutDashboard,
    tags: ['Role-Based Access', 'Data Analytics', 'Custom Dashboards'],
  },
  {
    number: '05',
    title: 'Technical Content Creation',
    description: 'Professional documentation and tech-focused content to clearly communicate your product, architecture, and workflows.',
    icon: FileText,
    tags: ['Project Documentation', 'Technical Blogs', 'Product Walkthroughs'],
  },
  {
    number: '06',
    title: 'UI/UX Design',
    description: 'User-centric UI/UX design that balances aesthetics, usability, and business goals.',
    icon: Palette,
    tags: ['User Research', 'Wireframing', 'Design Systems'],
  },
];

interface ServiceCardProps {
  service: Service;
  index: number;
  isVisible: boolean;
}

function ServiceCard({ service, index, isVisible }: ServiceCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState('');

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(30px)`);
  };

  const handleMouseLeave = () => {
    setTransform('');
    setIsHovered(false);
  };

  const Icon = service.icon;
  return (
    <div
      ref={cardRef}
      className={`relative group transition-all duration-700 h-full ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
        }`}
      style={{
        transitionTimingFunction: 'var(--ease-expo-out)',
        transitionDelay: `${400 + index * 100}ms`,
        transform: transform || undefined,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative bg-gradient-to-br from-slate-900/40 via-slate-950/60 to-slate-950/80 border border-slate-700/50 rounded-2xl p-6 sm:p-8 h-full overflow-hidden transition-all duration-300 hover:border-sky-400/60 hover:shadow-2xl hover:shadow-sky-500/10 flex flex-col group-hover:bg-slate-950/70">
        {/* Glow Background on Hover */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-br from-cyan-500/5 via-sky-500/5 to-indigo-500/5" />
        
        {/* Top Accent Line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sky-400/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Number Badge */}
        <span
          className="absolute top-6 right-6 font-display text-5xl sm:text-6xl font-bold bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-400 bg-clip-text text-transparent opacity-20 group-hover:opacity-40 transition-opacity duration-300"
          style={{ transform: isHovered ? 'scale(1.1) rotate(-5deg)' : 'scale(1) rotate(0deg)', transition: 'transform 0.3s ease' }}
        >
          {service.number}
        </span>

        {/* Icon with Gradient Background */}
        <div className="relative mb-6 z-10">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-500/30 to-sky-500/30 flex items-center justify-center group-hover:shadow-lg group-hover:shadow-sky-500/30 transition-all duration-300 border border-sky-400/30 group-hover:border-sky-400/60">
            <Icon className="w-7 h-7 text-sky-200 group-hover:text-sky-100 transition-colors duration-300" />
          </div>
        </div>

        {/* Content */}
        <h3 className="font-display text-xl sm:text-2xl font-semibold text-white mb-3 group-hover:text-sky-100 transition-colors duration-300 relative z-10">
          {service.title}
        </h3>
        <p className="text-slate-300/80 text-sm leading-relaxed mb-6 flex-grow relative z-10">
          {service.description}
        </p>

        {/* Tags with Enhanced Styling */}
        <div className="flex flex-wrap gap-2 mt-auto relative z-10">
          {service.tags.map((tag, tagIndex) => (
            <span
              key={tag}
              className="px-3 py-1.5 text-xs font-medium bg-slate-800/40 text-sky-200/90 rounded-full border border-sky-500/30 group-hover:bg-sky-500/20 group-hover:border-sky-400/60 group-hover:text-sky-100 transition-all duration-300 backdrop-blur-sm"
              style={{ transitionDelay: `${tagIndex * 50}ms` }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Hover Glow */}
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(14, 165, 233, 0.08) 0%, transparent 60%)',
          }}
        />
      </div>
    </div>
  );
}

export default function Services() {
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
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative py-24 sm:py-32 bg-[#05070f] overflow-hidden"
    >
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.08),_transparent_40%),radial-gradient(circle_at_bottom_right,_rgba(59,130,246,0.08),_transparent_40%)]" />

      {/* Dynamic Decorative Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-72 h-72 bg-sky-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 sm:mb-20">
          <div
            className={`inline-flex items-center gap-2 rounded-full border border-slate-500/30 bg-slate-900/50 px-4 py-2 text-xs uppercase tracking-[0.4em] text-sky-200/80 shadow-[0_0_40px_rgba(56,189,248,0.14)] backdrop-blur-sm transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            style={{ transitionTimingFunction: 'var(--ease-expo-out)' }}
          >
            <span className="w-1.5 h-1.5 bg-sky-400 rounded-full animate-pulse" />
            Enterprise Solutions
          </div>
          <h2
            className={`font-display text-4xl sm:text-5xl font-bold text-white mb-6 transition-all duration-700 mt-6 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            style={{
              transitionTimingFunction: 'var(--ease-expo-out)',
              transitionDelay: '200ms'
            }}
          >
            Transform Your Business
          </h2>
          <p
            className={`text-lg text-slate-300/90 max-w-2xl mx-auto transition-all duration-700 ${isVisible ? 'opacity-100 blur-0' : 'opacity-0 blur-sm'
              }`}
            style={{
              transitionTimingFunction: 'var(--ease-smooth)',
              transitionDelay: '350ms'
            }}
          >
            Cutting-edge technology solutions designed for forward-thinking organizations
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16 items-stretch">
          {services.map((service, index) => (
            <ServiceCard
              key={service.number}
              service={service}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>

        {/* CTA Section */}
        <div
          className={`text-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          style={{
            transitionTimingFunction: 'var(--ease-expo-out)',
            transitionDelay: '1000ms'
          }}
        >
          <h3 className="font-display text-2xl sm:text-3xl font-semibold text-white mb-6 tracking-tight">
            Ready to Transform Your Business?
          </h3>
          <p className="text-slate-300/80 mb-8 max-w-xl mx-auto leading-relaxed">
            Let&apos;s discuss how we can help accelerate your growth with our cutting-edge enterprise solutions
          </p>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-500 via-sky-500 to-indigo-500 text-white font-semibold rounded-full hover:shadow-2xl hover:shadow-sky-500/40 transition-all duration-300 group hover:scale-105"
          >
            <Calendar className="w-5 h-5" />
            Schedule Consultation
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </a>
        </div>
      </div>
    </section>
  );
}