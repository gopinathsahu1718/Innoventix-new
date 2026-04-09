import { useEffect, useRef, useState } from 'react';
import { Sparkles, Bell, ArrowRight } from 'lucide-react';

export default function Pricing() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
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

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setEmail('');
      }, 3000);
    }
  };

  return (
    <section
      id="pricing"
      ref={sectionRef}
      className="relative py-24 sm:py-32 bg-gradient-to-b from-white to-gray-50 overflow-hidden"
    >
      {/* Background Decorations */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#0e43a6]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2
            className={`font-display text-4xl sm:text-5xl font-bold text-black mb-4 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionTimingFunction: 'var(--ease-expo-out)' }}
          >
            Pricing
          </h2>
        </div>

        {/* Pricing Card */}
        <div
          className={`relative transition-all duration-700 ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
          }`}
          style={{ transitionTimingFunction: 'var(--ease-elastic)', transitionDelay: '200ms' }}
        >
          {/* Glow Effect */}
          <div 
            className="absolute inset-0 rounded-3xl opacity-60 animate-pulse-glow"
            style={{
              background: 'linear-gradient(135deg, #0e43a6 0%, #06b6d4 100%)',
              filter: 'blur(40px)',
            }}
          />

          <div className="relative bg-white rounded-3xl shadow-2xl p-8 sm:p-12 text-center overflow-hidden">
            {/* Sparkle Decorations */}
            <Sparkles 
              className="absolute top-6 left-6 w-6 h-6 text-[#f59e0b] animate-spin"
              style={{ animationDuration: '4s' }}
            />
            <Sparkles 
              className="absolute top-8 right-10 w-4 h-4 text-[#f59e0b] animate-spin"
              style={{ animationDuration: '3s', animationDelay: '-1s' }}
            />
            <Sparkles 
              className="absolute bottom-10 left-10 w-5 h-5 text-[#f59e0b] animate-spin"
              style={{ animationDuration: '5s', animationDelay: '-2s' }}
            />

            {/* Content */}
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
              <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <Bell className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl text-black placeholder-gray-400 focus:outline-none focus:border-[#0e43a6] focus:ring-2 focus:ring-[#0e43a6]/20 transition-all duration-300"
                      disabled={isSubmitted}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitted || !email}
                    className="px-6 py-4 bg-gradient-brand text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-[#0e43a6]/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2 group"
                  >
                    {isSubmitted ? (
                      <>Subscribed!</>
                    ) : (
                      <>
                        Notify Me
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                      </>
                    )}
                  </button>
                </div>
              </form>

              <p className="text-gray-400 text-sm mt-4">
                Be the first to know when we launch our pricing plans
              </p>
            </div>

            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5 pointer-events-none">
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 2px 2px, #0e43a6 1px, transparent 0)`,
                backgroundSize: '40px 40px',
              }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
