import { useEffect, useRef, useState } from 'react';
import { Sparkles, Bell, ArrowRight, CheckCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';

// Replace with your EmailJS credentials (see Setup guide)
const EMAILJS_SERVICE_ID = 'service_8skod81';
const EMAILJS_NOTIFY_TEMPLATE_ID = 'template_n8zgnao';
const EMAILJS_PUBLIC_KEY = 'Lt-RIiv86pyeDRSdO';

export default function Pricing() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const validateEmail = (val: string) => {
    if (!val.trim()) return 'Email address is required.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val))
      return 'Please enter a valid email address.';
    return '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const err = validateEmail(email);
    setEmailError(err);
    if (err) return;

    setIsSubmitting(true);
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_NOTIFY_TEMPLATE_ID,
        {
          subscriber_email: email,
          to_email: 'gopinathsahu1718@gmail.com',
          message: `New pricing notification subscriber: ${email}`,
        },
        EMAILJS_PUBLIC_KEY
      );
      setIsSubmitted(true);
      setEmail('');
      setEmailError('');
      setTimeout(() => setIsSubmitted(false), 4000);
    } catch (error) {
      setEmailError('Failed to submit. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="pricing"
      ref={sectionRef}
      className="relative py-24 sm:py-32 bg-gradient-to-b from-white to-gray-50 overflow-hidden"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#0e43a6]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2
            className={`font-display text-4xl sm:text-5xl font-bold text-black mb-4 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            style={{ transitionTimingFunction: 'var(--ease-expo-out)' }}
          >
            Pricing
          </h2>
        </div>

        <div
          className={`relative transition-all duration-700 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
            }`}
          style={{ transitionTimingFunction: 'var(--ease-elastic)', transitionDelay: '200ms' }}
        >
          <div
            className="absolute inset-0 rounded-3xl opacity-60 animate-pulse-glow"
            style={{
              background: 'linear-gradient(135deg, #0e43a6 0%, #06b6d4 100%)',
              filter: 'blur(40px)',
            }}
          />

          <div className="relative bg-white rounded-3xl shadow-2xl p-8 sm:p-12 text-center overflow-hidden">
            <Sparkles className="absolute top-6 left-6 w-6 h-6 text-[#f59e0b] animate-spin" style={{ animationDuration: '4s' }} />
            <Sparkles className="absolute top-8 right-10 w-4 h-4 text-[#f59e0b] animate-spin" style={{ animationDuration: '3s', animationDelay: '-1s' }} />
            <Sparkles className="absolute bottom-10 left-10 w-5 h-5 text-[#f59e0b] animate-spin" style={{ animationDuration: '5s', animationDelay: '-2s' }} />

            <div className="relative z-10">
              <div className="mb-6">
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-brand text-white text-sm font-medium rounded-full">
                  <Sparkles className="w-4 h-4" />
                  Coming Soon
                </span>
              </div>

              <h3 className="font-display text-3xl sm:text-4xl font-bold text-gradient mb-4">
                Exciting Plans Ahead
              </h3>

              <p className="text-gray-600 text-lg max-w-md mx-auto mb-8">
                We&apos;re crafting flexible pricing plans tailored to your business needs.
                Stay tuned for something amazing!
              </p>

              {/* Notification Form */}
              <form onSubmit={handleSubmit} className="max-w-md mx-auto" noValidate>
                {/* Required field legend */}
                <p className="text-xs text-gray-400 text-left mb-3">
                  Fields marked <span className="text-red-500 font-semibold">*</span> are required.
                </p>

                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <Bell className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    {/* Label for screen readers */}
                    <label htmlFor="notify-email" className="sr-only">
                      Email address <span aria-hidden="true">*</span>
                    </label>
                    <input
                      id="notify-email"
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (emailError) setEmailError(validateEmail(e.target.value));
                      }}
                      placeholder="Enter your email *"
                      aria-required="true"
                      aria-describedby={emailError ? 'notify-email-error' : undefined}
                      className={`w-full pl-12 pr-4 py-4 bg-gray-50 border rounded-xl text-black placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-300 ${emailError
                        ? 'border-red-400 focus:border-red-400 focus:ring-red-200'
                        : 'border-gray-200 focus:border-[#0e43a6] focus:ring-[#0e43a6]/20'
                        }`}
                      disabled={isSubmitting || isSubmitted}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting || isSubmitted}
                    className="px-6 py-4 bg-gradient-brand text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-[#0e43a6]/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2 group"
                  >
                    {isSubmitting ? (
                      <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Sending...</>
                    ) : isSubmitted ? (
                      <><CheckCircle className="w-4 h-4" /> Subscribed!</>
                    ) : (
                      <>Notify Me <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" /></>
                    )}
                  </button>
                </div>

                {/* Inline error */}
                {emailError && (
                  <p id="notify-email-error" className="text-red-500 text-xs text-left mt-2">
                    {emailError}
                  </p>
                )}
              </form>

              <p className="text-gray-400 text-sm mt-4">
                Be the first to know when we launch our pricing plans
              </p>
            </div>

            <div className="absolute inset-0 opacity-5 pointer-events-none">
              <div className="absolute inset-0" style={{
                backgroundImage: 'radial-gradient(circle at 2px 2px, #0e43a6 1px, transparent 0)',
                backgroundSize: '40px 40px',
              }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}