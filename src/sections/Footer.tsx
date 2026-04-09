import { Heart } from 'lucide-react';

const navLinks = [
  { name: 'About Us', href: '#about' },
  { name: 'Services', href: '#services' },
  { name: 'Tech', href: '#tech' },
  { name: 'Projects', href: '#projects' },
  { name: 'Team', href: '#team' },
  { name: 'Clients', href: '#clients' },
  { name: 'Pricing', href: '#pricing' },
  { name: 'Contact Us', href: '#contact' },
];

export default function Footer() {
  const scrollToSection = (href: string) => {
    if (href === '#') return;
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative bg-gradient-to-br from-[#0e43a6] to-[#0a2e75] overflow-hidden">
      {/* Animated Background */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: 'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.05) 50%, transparent 70%)',
          backgroundSize: '200% 200%',
          animation: 'gradient-shift 20s ease infinite',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <a 
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-block font-display text-3xl font-bold text-white mb-6 hover:text-white/80 transition-colors duration-300"
            >
              Innoventix
            </a>
            <p className="text-white/70 leading-relaxed mb-6">
              Innovertix is a creative collective of developers, designers, and innovators. 
              We blend technology with imagination to craft impactful digital experiences — 
              from responsive portfolios to AI-powered solutions.
            </p>
            <p className="text-white/50 text-sm italic">
              &ldquo;A great team builds great products.&rdquo;
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="font-display text-lg font-semibold text-white mb-6">
              Quick Links
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.href);
                  }}
                  className="text-white/70 hover:text-white text-sm transition-colors duration-300 relative group"
                >
                  {link.name}
                  <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-display text-lg font-semibold text-white mb-6">
              Get in Touch
            </h3>
            <div className="space-y-4">
              <a 
                href="mailto:team.innoventix@gmail.com"
                className="flex items-center gap-3 text-white/70 hover:text-white transition-colors duration-300"
              >
                <span className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-sm">
                  @
                </span>
                team.innoventix@gmail.com
              </a>
              <a 
                href="tel:+919078509424"
                className="flex items-center gap-3 text-white/70 hover:text-white transition-colors duration-300"
              >
                <span className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-sm">
                  #
                </span>
                +91 90785 09424
              </a>
              <div className="flex items-center gap-3 text-white/70">
                <span className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-sm">
                  #
                </span>
                101, Patia, Bhubaneswar, Odisha
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-12 h-px bg-white/10" />

        {/* Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/50 text-sm text-center sm:text-left">
            &copy; {new Date().getFullYear()} Innovertix. All rights reserved.
          </p>
          <p className="text-white/50 text-sm flex items-center gap-2">
            Made with 
            <Heart className="w-4 h-4 text-red-400 fill-red-400 animate-pulse" /> 
            in India
          </p>
        </div>
      </div>

      {/* CSS for gradient animation */}
      <style>{`
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </footer>
  );
}
