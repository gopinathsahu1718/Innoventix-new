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
      <div className="relative bg-[#111] border border-white/10 rounded-2xl p-6 sm:p-8 h-full overflow-hidden transition-all duration-300 hover:border-[#3b82f6]/50 hover:shadow-xl hover:shadow-[#0e43a6]/20 flex flex-col">
        {/* Number Badge */}
        <span
          className="absolute top-4 right-4 font-accent text-6xl sm:text-7xl font-bold text-gradient opacity-30 group-hover:opacity-50 transition-opacity duration-300"
          style={{ transform: isHovered ? 'scale(1.1) rotate(-5deg)' : 'scale(1) rotate(0deg)', transition: 'transform 0.3s ease' }}
        >
          {service.number}
        </span>

        {/* Icon */}
        <div className="relative mb-6">
          <div className="w-14 h-14 rounded-xl bg-gradient-brand flex items-center justify-center group-hover:shadow-lg group-hover:shadow-[#0e43a6]/30 transition-all duration-300">
            <Icon className="w-7 h-7 text-white" />
          </div>
        </div>

        {/* Content */}
        <h3 className="font-display text-xl sm:text-2xl font-semibold text-white mb-3 group-hover:text-gradient transition-all duration-300">
          {service.title}
        </h3>
        <p className="text-white/60 text-sm leading-relaxed mb-6 flex-grow">
          {service.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-auto">
          {service.tags.map((tag, tagIndex) => (
            <span
              key={tag}
              className="px-3 py-1 text-xs font-medium bg-white/5 text-white/70 rounded-full border border-white/10 group-hover:bg-[#0e43a6]/20 group-hover:border-[#0e43a6]/30 transition-all duration-300"
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
            background: 'radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(14, 67, 166, 0.15) 0%, transparent 50%)',
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
      className="relative py-24 sm:py-32 bg-gradient-dark overflow-hidden"
    >
      {/* Background Decorations */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#0e43a6]/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#06b6d4]/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 sm:mb-20">
          <span
            className={`inline-block font-accent text-sm uppercase tracking-[0.2em] text-[#3b82f6] mb-4 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            style={{ transitionTimingFunction: 'var(--ease-expo-out)' }}
          >
            Enterprise Solutions
          </span>
          <h2
            className={`font-display text-4xl sm:text-5xl font-bold text-white mb-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            style={{
              transitionTimingFunction: 'var(--ease-expo-out)',
              transitionDelay: '200ms'
            }}
          >
            Transform Your Business
          </h2>
          <p
            className={`text-lg text-white/60 max-w-2xl mx-auto transition-all duration-700 ${isVisible ? 'opacity-100 blur-0' : 'opacity-0 blur-sm'
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
          <h3 className="font-display text-2xl sm:text-3xl font-semibold text-white mb-6">
            Ready to Get Started?
          </h3>
          <p className="text-white/60 mb-8 max-w-xl mx-auto">
            Let&apos;s discuss how we can help transform your business with our enterprise solutions
          </p>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-brand text-white font-semibold rounded-full hover:shadow-xl hover:shadow-[#0e43a6]/40 transition-all duration-300 group"
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