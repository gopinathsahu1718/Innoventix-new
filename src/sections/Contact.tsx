import { useEffect, useRef, useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';

interface ContactInfo {
  icon: React.ElementType;
  label: string;
  value: string;
  href: string;
}

const contactInfo: ContactInfo[] = [
  {
    icon: Mail,
    label: 'Email Us',
    value: 'team.innoventix@gmail.com',
    href: 'mailto:team.innoventix@gmail.com',
  },
  {
    icon: Phone,
    label: 'Call Us',
    value: '+91 90785 09424',
    href: 'tel:+919078509424',
  },
  {
    icon: MapPin,
    label: 'Visit Us',
    value: '101, Patia, Bhubaneswar, Odisha',
    href: '#',
  },
];

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [charCount, setCharCount] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (name === 'message') setCharCount(value.length);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
    setCharCount(0);
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-24 sm:py-32 bg-[#f0f4ff] overflow-hidden"
    >
      {/* Ambient blobs */}
      <div className="pointer-events-none absolute -top-20 -right-16 w-[480px] h-[480px] rounded-full bg-blue-500/10 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-16 -left-10 w-[420px] h-[420px] rounded-full bg-cyan-400/9 blur-[120px]" />
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-indigo-500/5 blur-[100px]" />

      {/* Subtle grid */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(rgba(59,130,246,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59,130,246,0.04) 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
        }}
      />

      <div className="relative z-10 max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16">
          <div
            className={`inline-flex items-center gap-2 rounded-full border border-blue-300/40 bg-white/80 backdrop-blur-sm px-4 py-2 text-xs uppercase tracking-[0.35em] text-blue-700 shadow-[0_2px_12px_rgba(59,130,246,0.1)] mb-5 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)] animate-pulse" />
            Get in Touch
          </div>

          <h2
            className={`font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight mb-4 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            style={{ transitionDelay: '150ms', transitionTimingFunction: 'var(--ease-expo-out)' }}
          >
            Let&apos;s build something{' '}
            <span className="bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
              remarkable
            </span>
          </h2>

          <p
            className={`text-lg text-slate-500 max-w-md mx-auto leading-relaxed transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            style={{ transitionDelay: '280ms', transitionTimingFunction: 'var(--ease-expo-out)' }}
          >
            Have a project in mind? We&apos;d love to hear about it and explore how we can help.
          </p>
        </div>

        {/* Two-column grid */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-10 items-start">

          {/* ── Form card ── */}
          <div
            className={`relative rounded-3xl border border-blue-200/50 bg-white shadow-[0_20px_60px_-20px_rgba(59,130,246,0.12)] p-8 sm:p-10 overflow-hidden transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            style={{ transitionDelay: '350ms', transitionTimingFunction: 'var(--ease-expo-out)' }}
          >
            {/* Top shimmer */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-cyan-400/40 rounded-t-3xl" />

            <p className="font-display text-lg font-bold text-slate-900 mb-1">Send us a message</p>
            <p className="text-sm text-slate-400 mb-8 leading-relaxed">
              Fill in the form and our team will get back to you within 24 hours.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name */}
              <div>
                <label className="block text-[11px] font-medium uppercase tracking-widest text-blue-500 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="John Doe"
                  required
                  className={`w-full bg-slate-50 border rounded-xl px-4 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all duration-200 ${focusedField === 'name'
                    ? 'border-blue-400 ring-[3px] ring-blue-500/12 bg-white'
                    : 'border-blue-100 hover:border-blue-200'
                    }`}
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-[11px] font-medium uppercase tracking-widest text-blue-500 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="john@company.com"
                  required
                  className={`w-full bg-slate-50 border rounded-xl px-4 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all duration-200 ${focusedField === 'email'
                    ? 'border-blue-400 ring-[3px] ring-blue-500/12 bg-white'
                    : 'border-blue-100 hover:border-blue-200'
                    }`}
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-[11px] font-medium uppercase tracking-widest text-blue-500 mb-2">
                  Your Message
                </label>
                <div className="relative">
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Tell us about your project..."
                    required
                    maxLength={200}
                    rows={4}
                    className={`w-full bg-slate-50 border rounded-xl px-4 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none resize-none transition-all duration-200 ${focusedField === 'message'
                      ? 'border-blue-400 ring-[3px] ring-blue-500/12 bg-white'
                      : 'border-blue-100 hover:border-blue-200'
                      }`}
                  />
                  <span className="absolute bottom-3 right-4 text-[11px] text-slate-400">{charCount}/200</span>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting || isSubmitted}
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-400 text-white text-sm font-semibold rounded-full shadow-[0_8px_24px_rgba(59,130,246,0.3)] hover:shadow-[0_16px_40px_rgba(59,130,246,0.4)] hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-3 group"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Sending...
                  </>
                ) : isSubmitted ? (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    Message Sent!
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>

          {/* ── Info column ── */}
          <div
            className={`flex flex-col gap-5 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            style={{ transitionDelay: '480ms', transitionTimingFunction: 'var(--ease-expo-out)' }}
          >
            <div className="mb-4">
              <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-blue-500 mb-2">Reach us</p>
              <h3 className="font-display text-2xl font-bold text-slate-900 leading-tight mb-3">
                We&apos;re always ready<br />to connect
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed mb-6">
                Whether you&apos;re ready to start a project or just exploring — reach out and let&apos;s talk.
              </p>

              {/* Response time pill */}
              <div className="inline-flex items-center gap-2.5 bg-sky-50 border border-cyan-300/40 rounded-full px-4 py-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <span className="text-xs font-medium text-sky-700">Typically responds within a few hours</span>
              </div>
            </div>

            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <a
                  key={info.label}
                  href={info.href}
                  className={`group flex items-center gap-4 bg-white border border-blue-100 rounded-2xl px-6 py-5 shadow-[0_4px_20px_rgba(59,130,246,0.05)] hover:border-blue-300/60 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(59,130,246,0.12)] transition-all duration-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
                    }`
                  }
                  style={{
                    transitionDelay: `${580 + index * 100}ms`,
                    transitionTimingFunction: 'var(--ease-expo-out)',
                  }}
                >
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-500/12 to-cyan-400/10 border border-blue-200/60 flex items-center justify-center flex-shrink-0 group-hover:border-blue-400/40 transition-colors duration-300">
                    <Icon className="w-4.5 h-4.5 text-blue-500" strokeWidth={1.8} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] font-medium uppercase tracking-widest text-slate-400 mb-0.5">
                      {info.label}
                    </p>
                    <p className="text-sm font-medium text-slate-800 truncate group-hover:text-blue-600 transition-colors duration-300">
                      {info.value}
                    </p>
                  </div>
                  <span className="text-slate-300 group-hover:text-blue-400 group-hover:translate-x-1 transition-all duration-300 text-lg">›</span>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section >
  );
}