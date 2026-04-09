import { useEffect, useRef, useState } from 'react';
import { Linkedin, Github, Twitter } from 'lucide-react';

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  initials: string;
  color: string;
}

const teamMembers: TeamMember[] = [
  {
    name: 'Gopinath Sahu',
    role: 'Founder | Full-Stack Systems Engineer | Cloud Engineer',
    bio: 'Strategic architect of the INNOVETIX ecosystem. Leading technical vision and cloud infrastructure with expertise in scalable systems design.',
    initials: 'GS',
    color: '#0e43a6',
  },
  {
    name: 'Mahamaya Biswal',
    role: 'Test Lead | Quality Assurance Engineer',
    bio: 'Leads quality assurance & risk mitigation. Ensures every product meets the highest standards of reliability and performance.',
    initials: 'MB',
    color: '#06b6d4',
  },
  {
    name: 'T. Sai Ram',
    role: 'Full-Stack Developer',
    bio: 'Architect of cohesive software systems. Specializes in building robust, scalable applications with modern technologies.',
    initials: 'SR',
    color: '#8b5cf6',
  },
];

interface TeamCardProps {
  member: TeamMember;
  index: number;
  isVisible: boolean;
}

function TeamCard({ member, index, isVisible }: TeamCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className={`relative transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
        }`}
      style={{
        transitionTimingFunction: 'var(--ease-expo-out)',
        transitionDelay: `${300 + index * 150}ms`,
        perspective: '1000px',
        height: '460px',
      }}
    >
      <div
        className="relative w-full h-full cursor-pointer"
        onClick={() => setIsFlipped(!isFlipped)}
        style={{
          transformStyle: 'preserve-3d',
          transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        {/* Front */}
        <div
          className="absolute inset-0"
          style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
        >
          <div className="h-full bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-shadow duration-300 flex flex-col">
            {/* Avatar Area */}
            <div
              className="flex-shrink-0 h-44 flex items-center justify-center"
              style={{
                background: `linear-gradient(135deg, ${member.color}20 0%, ${member.color}40 100%)`,
              }}
            >
              <div
                className="w-24 h-24 rounded-full flex items-center justify-center text-white text-2xl font-bold font-accent shadow-lg"
                style={{ background: member.color }}
              >
                {member.initials}
              </div>
            </div>

            {/* Content */}
            <div className="flex flex-col flex-1 p-6 text-center">
              <h3 className="font-display text-xl font-semibold text-black mb-2">
                {member.name}
              </h3>
              <p
                className="text-sm font-medium mb-3 leading-snug"
                style={{ color: member.color }}
              >
                {member.role}
              </p>
              <p className="text-gray-500 text-sm leading-relaxed flex-1">
                {member.bio}
              </p>

              {/* Social Links */}
              <div className="flex justify-center gap-3 mt-5 pt-4 border-t border-gray-100">
                <button
                  className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:text-white transition-all duration-300"
                  style={{ '--hover-bg': member.color } as React.CSSProperties}
                  onMouseEnter={e => (e.currentTarget.style.background = member.color)}
                  onMouseLeave={e => (e.currentTarget.style.background = '')}
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </button>
                <button
                  className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:text-white transition-all duration-300"
                  onMouseEnter={e => (e.currentTarget.style.background = member.color)}
                  onMouseLeave={e => (e.currentTarget.style.background = '')}
                  aria-label="GitHub"
                >
                  <Github className="w-4 h-4" />
                </button>
                <button
                  className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:text-white transition-all duration-300"
                  onMouseEnter={e => (e.currentTarget.style.background = member.color)}
                  onMouseLeave={e => (e.currentTarget.style.background = '')}
                  aria-label="Twitter"
                >
                  <Twitter className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          <div
            className="h-full rounded-2xl shadow-xl overflow-hidden text-white p-8 flex flex-col justify-center"
            style={{
              background: `linear-gradient(135deg, ${member.color} 0%, ${member.color}cc 100%)`,
            }}
          >
            <h3 className="font-display text-2xl font-semibold mb-3">{member.name}</h3>
            <p className="text-white/80 text-sm mb-5 leading-snug">{member.role}</p>
            <p className="text-white/90 leading-relaxed mb-8">{member.bio}</p>

            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-white/50" />
                <span className="text-sm text-white/80">5+ Years Experience</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-white/50" />
                <span className="text-sm text-white/80">20+ Projects Delivered</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-white/50" />
                <span className="text-sm text-white/80">Expert Level</span>
              </div>
            </div>

            <p className="text-white/50 text-xs mt-8 text-center">Click to flip back</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Team() {
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

  return (
    <section
      id="team"
      ref={sectionRef}
      className="relative py-24 sm:py-32 bg-gradient-to-b from-gray-50 to-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2
            className={`font-display text-4xl sm:text-5xl font-bold text-black mb-4 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            style={{ transitionTimingFunction: 'var(--ease-expo-out)' }}
          >
            Meet Our Team
          </h2>
          <p
            className={`text-lg text-gray-600 max-w-xl mx-auto transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            style={{
              transitionTimingFunction: 'var(--ease-expo-out)',
              transitionDelay: '150ms',
            }}
          >
            Talented professionals dedicated to your success
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <TeamCard
              key={member.name}
              member={member}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>
    </section>
  );
}