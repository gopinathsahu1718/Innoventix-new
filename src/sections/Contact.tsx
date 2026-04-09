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
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
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
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (name === 'message') {
      setCharCount(value.length);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
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
      className="relative py-24 sm:py-32 bg-white overflow-hidden"
    >
      {/* Background Decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#0e43a6]/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#06b6d4]/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2
            className={`font-display text-4xl sm:text-5xl font-bold text-black mb-4 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionTimingFunction: 'var(--ease-expo-out)' }}
          >
            Contact Us
          </h2>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Form */}
          <div
            className={`transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
            }`}
            style={{ transitionTimingFunction: 'var(--ease-expo-out)', transitionDelay: '200ms' }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div 
                className={`relative transition-all duration-500 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
                }`}
                style={{ transitionTimingFunction: 'var(--ease-expo-out)', transitionDelay: '350ms' }}
              >
                <label 
                  htmlFor="name"
                  className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                    focusedField === 'name' || formData.name
                      ? '-top-2.5 text-xs text-[#0e43a6] bg-white px-2'
                      : 'top-4 text-gray-400'
                  }`}
                >
                  Your Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                  required
                  className="w-full px-4 py-4 bg-white border border-gray-200 rounded-xl text-black focus:outline-none focus:border-[#0e43a6] focus:ring-2 focus:ring-[#0e43a6]/20 transition-all duration-300"
                />
              </div>

              {/* Email Field */}
              <div 
                className={`relative transition-all duration-500 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
                }`}
                style={{ transitionTimingFunction: 'var(--ease-expo-out)', transitionDelay: '430ms' }}
              >
                <label 
                  htmlFor="email"
                  className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                    focusedField === 'email' || formData.email
                      ? '-top-2.5 text-xs text-[#0e43a6] bg-white px-2'
                      : 'top-4 text-gray-400'
                  }`}
                >
                  Your Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  required
                  className="w-full px-4 py-4 bg-white border border-gray-200 rounded-xl text-black focus:outline-none focus:border-[#0e43a6] focus:ring-2 focus:ring-[#0e43a6]/20 transition-all duration-300"
                />
              </div>

              {/* Message Field */}
              <div 
                className={`relative transition-all duration-500 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
                }`}
                style={{ transitionTimingFunction: 'var(--ease-expo-out)', transitionDelay: '510ms' }}
              >
                <label 
                  htmlFor="message"
                  className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                    focusedField === 'message' || formData.message
                      ? '-top-2.5 text-xs text-[#0e43a6] bg-white px-2'
                      : 'top-4 text-gray-400'
                  }`}
                >
                  Your Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('message')}
                  onBlur={() => setFocusedField(null)}
                  required
                  maxLength={200}
                  rows={5}
                  className="w-full px-4 py-4 bg-white border border-gray-200 rounded-xl text-black focus:outline-none focus:border-[#0e43a6] focus:ring-2 focus:ring-[#0e43a6]/20 transition-all duration-300 resize-none"
                />
                <div className="absolute bottom-3 right-4 text-xs text-gray-400">
                  {charCount}/200
                </div>
              </div>

              {/* Submit Button */}
              <div 
                className={`transition-all duration-500 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionTimingFunction: 'var(--ease-elastic)', transitionDelay: '600ms' }}
              >
                <button
                  type="submit"
                  disabled={isSubmitting || isSubmitted}
                  className="w-full sm:w-auto px-8 py-4 bg-gradient-brand text-white font-semibold rounded-full hover:shadow-xl hover:shadow-[#0e43a6]/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-3 group"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : isSubmitted ? (
                    <>
                      <CheckCircle className="w-5 h-5" />
                      Message Sent!
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                      Send Message
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <a
                  key={info.label}
                  href={info.href}
                  className={`flex items-start gap-4 p-6 bg-gray-50 rounded-xl hover:bg-white hover:shadow-lg transition-all duration-300 group ${
                    isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
                  }`}
                  style={{ 
                    transitionTimingFunction: 'var(--ease-expo-out)', 
                    transitionDelay: `${400 + index * 100}ms` 
                  }}
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-brand flex items-center justify-center text-white flex-shrink-0 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-sm text-gray-500 mb-1">{info.label}</span>
                    <span className="block text-black font-medium group-hover:text-[#0e43a6] transition-colors duration-300">
                      {info.value}
                    </span>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
