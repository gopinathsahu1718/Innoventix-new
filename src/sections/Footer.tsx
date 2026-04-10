import { useState } from 'react';
import { Heart, ArrowUp, Mail, Phone, MapPin, Github, Linkedin, Twitter } from 'lucide-react';

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
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  const scrollToSection = (href: string) => {
    if (href === '#') return;
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#05070f] overflow-hidden pt-16 pb-12 border-t border-slate-800">
      {/* Futuristic Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(at_30%_20%,rgba(56,189,248,0.08),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(at_70%_80%,rgba(165,243,252,0.06),transparent_60%)]" />

      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(148,163,184,0.6) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(148,163,184,0.6) 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
        }}
      />

      <div className="relative max-w-[1300px] mx-auto px-5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16">

          {/* Brand + Description */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center">
                <span className="text-white font-bold text-xl tracking-tighter">I</span>
              </div>
              <a
                href="#"
                onClick={(e) => { e.preventDefault(); scrollToTop(); }}
                className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tighter hover:text-cyan-300 transition-colors"
              >
                Innoventix
              </a>
            </div>

            <p className="text-slate-400 text-[15px] leading-relaxed max-w-md">
              We craft exceptional digital experiences by blending cutting-edge technology
              with bold creativity. From scalable platforms to immersive interfaces — we build what matters.
            </p>

            <div className="mt-8 sm:mt-10 flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-2xl text-cyan-400 border border-cyan-500/50 flex items-center justify-center hover:border-slate-700 hover:text-slate-700 transition-all"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-2xl text-cyan-400 border border-cyan-500/50 flex items-center justify-center hover:border-slate-700 hover:text-slate-700 transition-all"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-2xl text-cyan-400 border border-cyan-500/50 flex items-center justify-center hover:border-slate-700 hover:text-slate-700 transition-all"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3">
            <h3 className="text-xs uppercase tracking-[2px] text-slate-500 mb-6">Navigation</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.href);
                  }}
                  onMouseEnter={() => setHoveredLink(link.name)}
                  onMouseLeave={() => setHoveredLink(null)}
                  className="group flex items-center text-slate-300 hover:text-white transition-all text-[15px]"
                >
                  <span className="relative">
                    {link.name}
                    <span
                      className="absolute -bottom-px left-0 h-px bg-gradient-to-r from-cyan-400 to-transparent transition-all duration-300"
                      style={{ width: hoveredLink === link.name ? '100%' : '0%' }}
                    />
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="lg:col-span-4">
            <h3 className="text-xs uppercase tracking-[2px] text-slate-500 mb-6">Connect With Us</h3>

            <div className="space-y-6">
              <a
                href="mailto:team.innoventix@gmail.com"
                className="group flex items-start gap-4 text-slate-300 hover:text-white transition-all"
              >
                <div className="w-10 h-10 rounded-2xl bg-slate-900/80 border border-slate-700 flex items-center justify-center group-hover:border-cyan-500/40 transition-colors flex-shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm text-slate-400">Email</p>
                  <p className="font-medium text-sm sm:text-base break-all">team.innoventix@gmail.com</p>
                </div>
              </a>

              <a
                href="tel:+919078509424"
                className="group flex items-start gap-4 text-slate-300 hover:text-white transition-all"
              >
                <div className="w-10 h-10 rounded-2xl bg-slate-900/80 border border-slate-700 flex items-center justify-center group-hover:border-cyan-500/40 transition-colors flex-shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm text-slate-400">Phone</p>
                  <p className="font-medium">+91 90785 09424</p>
                </div>
              </a>

              <div className="flex items-start gap-4 text-slate-300">
                <div className="w-10 h-10 rounded-2xl bg-slate-900/80 border border-slate-700 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm text-slate-400">Location</p>
                  <p className="font-medium leading-tight text-sm sm:text-base">
                    101, Patia<br />
                    Bhubaneswar, Odisha
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6 text-sm">
          <p className="text-slate-500 text-center md:text-left">
            © {new Date().getFullYear()} Innoventix. All rights reserved.
          </p>

          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors mx-auto md:mx-0"
          >
            Back to top
            <div className="w-8 h-8 rounded-full border border-slate-700 flex items-center justify-center group-hover:border-cyan-500/50 transition-all">
              <ArrowUp className="w-4 h-4" />
            </div>
          </button>

          <p className="text-slate-500 flex items-center gap-1.5 justify-center md:justify-end">
            Crafted with{' '}
            <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" />{' '}
            in Bhubaneswar, India
          </p>
        </div>
      </div>

      {/* Bottom neon line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
    </footer>
  );
}