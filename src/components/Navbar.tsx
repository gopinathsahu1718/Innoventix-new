import { useState, useEffect } from 'react';
import { Menu, X, ChevronRight } from 'lucide-react';
import logo from '/assets/logo.png';

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

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
            ? 'bg-black/95 backdrop-blur-xl border-b border-white/10'
            : 'bg-transparent'
          }`}
      >
        <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <a
              href="#"
              className="flex items-center gap-2 group"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <img
                src={logo}
                alt="Innoventix Logo"
                className="h-10 sm:h-12 lg:h-14 w-auto object-contain"
              />
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.href);
                  }}
                  className="relative text-sm text-white/80 hover:text-white uppercase tracking-widest font-medium transition-colors duration-300 group"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-1/2 w-0 h-[1px] bg-[#3b82f6] transition-all duration-300 group-hover:w-full group-hover:left-0" />
                </a>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden lg:block">
              <a
                href="#about"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('#about');
                }}
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-brand text-white text-sm font-semibold rounded-full hover:shadow-lg hover:shadow-[#0e43a6]/30 transition-all duration-300"
              >
                Why Choose Us
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-white hover:text-sky-400 transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu - FIXED SCROLLING */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-500 ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/90 backdrop-blur-xl"
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Menu Content - Now Scrollable */}
        <div
          className={`absolute right-0 top-0 h-full w-full max-w-[340px] bg-[#0a0a0a] border-l border-white/10 transform transition-transform duration-500 overflow-y-auto ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
          style={{ transitionTimingFunction: 'var(--ease-expo-out)' }}
        >
          <div className="pt-20 px-6 pb-12 min-h-full">
            <div className="flex flex-col gap-2">
              {navLinks.map((link, index) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.href);
                  }}
                  className="text-lg text-white/80 hover:text-white py-4 border-b border-white/10 transition-all hover:pl-3"
                  style={{ animationDelay: `${index * 60}ms` }}
                >
                  {link.name}
                </a>
              ))}
            </div>

            <div className="mt-12">
              <a
                href="#about"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('#about');
                }}
                className="inline-flex items-center justify-center gap-2 w-full py-4 bg-gradient-brand text-white font-semibold rounded-full text-base"
              >
                Why Choose Us
                <ChevronRight className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}