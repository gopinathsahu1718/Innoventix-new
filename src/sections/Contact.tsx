import { useEffect, useRef, useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';

// Replace with your EmailJS credentials (see Setup guide)
const EMAILJS_SERVICE_ID = 'service_8skod81';
const EMAILJS_CONTACT_TEMPLATE_ID = 'template_pxtkl8h';
const EMAILJS_PUBLIC_KEY = 'Lt-RIiv86pyeDRSdO';

interface ContactInfo {
  icon: React.ElementType;
  label: string;
  value: string;
  href: string;
}

const contactInfo: ContactInfo[] = [
  { icon: Mail, label: 'Email Us', value: 'team.innoventix@gmail.com', href: 'mailto:team.innoventix@gmail.com' },
  { icon: Phone, label: 'Call Us', value: '+91 90785 09424', href: 'tel:+919078509424' },
  { icon: MapPin, label: 'Visit Us', value: '101, Patia, Bhubaneswar, Odisha', href: '#' },
];

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [charCount, setCharCount] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setIsVisible(true); observer.unobserve(entry.target); }
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const validate = (data: typeof formData): FormErrors => {
    const errs: FormErrors = {};
    if (!data.name.trim()) errs.name = 'Your name is required.';
    else if (data.name.trim().length < 2) errs.name = 'Name must be at least 2 characters.';
    if (!data.email.trim()) errs.email = 'Email address is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errs.email = 'Please enter a valid email address.';
    if (!data.message.trim()) errs.message = 'Message is required.';
    else if (data.message.trim().length < 10) errs.message = 'Message must be at least 10 characters.';
    return errs;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const updated = { ...formData, [name]: value };
    setFormData(updated);
    if (name === 'message') setCharCount(value.length);
    // Live validation once user has touched the field
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: validate(updated)[name as keyof FormErrors] }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFocusedField(null);
    const { name } = e.target;
    const fieldErr = validate(formData)[name as keyof FormErrors];
    setErrors(prev => ({ ...prev, [name]: fieldErr }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(formData);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setIsSubmitting(true);
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_CONTACT_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_email: 'gopinathsahu1718@gmail.com',
        },
        EMAILJS_PUBLIC_KEY
      );
      setIsSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      setCharCount(0);
      setErrors({});
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (error) {
      setErrors({ message: 'Failed to send. Please try again or email us directly.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const fieldClass = (field: keyof FormErrors, focused: boolean) =>
    `w-full bg-slate-50 border rounded-2xl px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all duration-200 ${errors[field]
      ? 'border-red-400 ring-2 ring-red-500/20 bg-red-50/30'
      : focused
        ? 'border-blue-400 ring-2 ring-blue-500/20 bg-white'
        : 'border-blue-100 hover:border-blue-200'
    }`;

  return (
    <section id="contact" ref={sectionRef} className="relative py-16 sm:py-24 bg-[#f0f4ff] overflow-hidden">
      <div className="pointer-events-none absolute -top-20 -right-16 w-[380px] h-[380px] sm:w-[480px] sm:h-[480px] rounded-full bg-blue-500/10 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-16 -left-10 w-[320px] h-[320px] sm:w-[420px] sm:h-[420px] rounded-full bg-cyan-400/9 blur-[120px]" />
      <div className="pointer-events-none absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(59,130,246,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.04) 1px, transparent 1px)', backgroundSize: '48px 48px' }} />

      <div className="relative z-10 max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header — unchanged */}
        <div className="text-center mb-12 sm:mb-16">
          <div className={`inline-flex items-center gap-2 rounded-full border border-blue-300/40 bg-white/80 backdrop-blur-sm px-4 py-2 text-xs uppercase tracking-[0.35em] text-blue-700 shadow-[0_2px_12px_rgba(59,130,246,0.1)] mb-5 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)] animate-pulse" />
            Get in Touch
          </div>
          <h2 className={`font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight mb-4 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`} style={{ transitionDelay: '150ms', transitionTimingFunction: 'var(--ease-expo-out)' }}>
            Let&apos;s build something{' '}
            <span className="bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">remarkable</span>
          </h2>
          <p className={`text-base sm:text-lg text-slate-500 max-w-md mx-auto leading-relaxed transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '280ms', transitionTimingFunction: 'var(--ease-expo-out)' }}>
            Have a project in mind? We&apos;d love to hear about it and explore how we can help.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-start">
          {/* Form Card */}
          <div className={`relative rounded-3xl border border-blue-200/50 bg-white shadow-[0_20px_60px_-20px_rgba(59,130,246,0.12)] p-6 sm:p-8 lg:p-10 overflow-hidden transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '350ms', transitionTimingFunction: 'var(--ease-expo-out)' }}>
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-cyan-400/40 rounded-t-3xl" />

            <p className="font-display text-xl sm:text-2xl font-bold text-slate-900 mb-1">Send us a message</p>
            <p className="text-sm text-slate-400 mb-6 leading-relaxed">Fill in the form and our team will get back to you within 24 hours.</p>

            {/* Required legend */}
            <p className="text-xs text-slate-400 mb-5">
              Fields marked <span className="text-red-500 font-semibold">*</span> are required.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              {/* Name */}
              <div>
                <label htmlFor="contact-name" className="block text-[11px] font-medium uppercase tracking-widest text-blue-500 mb-2">
                  Your Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="contact-name" type="text" name="name" value={formData.name}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('name')}
                  onBlur={handleBlur}
                  placeholder="John Doe"
                  aria-required="true"
                  aria-describedby={errors.name ? 'name-error' : undefined}
                  className={fieldClass('name', focusedField === 'name')}
                />
                {errors.name && <p id="name-error" className="text-red-500 text-xs mt-1.5">{errors.name}</p>}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="contact-email" className="block text-[11px] font-medium uppercase tracking-widest text-blue-500 mb-2">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  id="contact-email" type="email" name="email" value={formData.email}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('email')}
                  onBlur={handleBlur}
                  placeholder="john@company.com"
                  aria-required="true"
                  aria-describedby={errors.email ? 'email-error' : undefined}
                  className={fieldClass('email', focusedField === 'email')}
                />
                {errors.email && <p id="email-error" className="text-red-500 text-xs mt-1.5">{errors.email}</p>}
              </div>

              {/* Message */}
              <div>
                <label htmlFor="contact-message" className="block text-[11px] font-medium uppercase tracking-widest text-blue-500 mb-2">
                  Your Message <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <textarea
                    id="contact-message" name="message" value={formData.message}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('message')}
                    onBlur={handleBlur}
                    placeholder="Tell us about your project..."
                    maxLength={200} rows={4}
                    aria-required="true"
                    aria-describedby={errors.message ? 'message-error' : undefined}
                    className={fieldClass('message', focusedField === 'message') + ' resize-none'}
                  />
                  <span className="absolute bottom-3 right-4 text-xs text-slate-400">{charCount}/200</span>
                </div>
                {errors.message && <p id="message-error" className="text-red-500 text-xs mt-1.5">{errors.message}</p>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting || isSubmitted}
                className="w-full py-4 bg-gradient-to-r from-blue-500 to-cyan-400 text-white text-base font-semibold rounded-2xl shadow-[0_8px_24px_rgba(59,130,246,0.3)] hover:shadow-[0_12px_32px_rgba(59,130,246,0.4)] hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-3 group"
              >
                {isSubmitting ? (
                  <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />Sending...</>
                ) : isSubmitted ? (
                  <><CheckCircle className="w-5 h-5" />Message Sent!</>
                ) : (
                  <><Send className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />Send Message</>
                )}
              </button>
            </form>
          </div>

          {/* Reach Us — unchanged */}
          <div className={`flex flex-col gap-5 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '480ms', transitionTimingFunction: 'var(--ease-expo-out)' }}>
            <div className="mb-4 sm:mb-6">
              <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-blue-500 mb-2">Reach us</p>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 leading-tight mb-3">We&apos;re always ready<br />to connect</h3>
              <p className="text-sm sm:text-base text-slate-500 leading-relaxed mb-6">Whether you&apos;re ready to start a project or just exploring — reach out and let&apos;s talk.</p>
              <div className="inline-flex items-center gap-2.5 bg-sky-50 border border-cyan-300/40 rounded-full px-4 py-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <span className="text-xs font-medium text-sky-700">Typically responds within a few hours</span>
              </div>
            </div>
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <a key={info.label} href={info.href}
                  className={`group flex items-center gap-4 bg-white border border-blue-100 rounded-2xl px-5 py-5 shadow-[0_4px_20px_rgba(59,130,246,0.05)] hover:border-blue-300/60 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(59,130,246,0.12)] transition-all duration-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}
                  style={{ transitionDelay: `${580 + index * 80}ms`, transitionTimingFunction: 'var(--ease-expo-out)' }}
                >
                  <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-blue-500/10 to-cyan-400/10 border border-blue-200/60 flex items-center justify-center flex-shrink-0 group-hover:border-blue-400/40 transition-colors duration-300">
                    <Icon className="w-5 h-5 text-blue-500" strokeWidth={1.8} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] font-medium uppercase tracking-widest text-slate-400 mb-0.5">{info.label}</p>
                    <p className="text-sm font-medium text-slate-800 break-words group-hover:text-blue-600 transition-colors duration-300">{info.value}</p>
                  </div>
                  <span className="text-slate-300 group-hover:text-blue-400 group-hover:translate-x-1 transition-all duration-300 text-xl">›</span>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}