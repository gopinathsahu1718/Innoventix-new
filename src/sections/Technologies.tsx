import { useEffect, useRef, useState } from 'react';

interface Tech {
  name: string;
  icon: string;
  color: string;
}

const technologies: Tech[] = [
  { name: 'HTML5', icon: '', color: '#E34F26' },
  { name: 'CSS3', icon: '', color: '#1572B6' },
  { name: 'JavaScript', icon: '', color: '#F7DF1E' },
  { name: 'React', icon: '', color: '#61DAFB' },
  { name: 'Tailwind', icon: '', color: '#06B6D4' },
  { name: 'Node.js', icon: '', color: '#339933' },
  { name: 'Express', icon: '', color: '#000000' },
  { name: 'MongoDB', icon: '', color: '#47A248' },
];

const TechIcon = ({ tech, isHovered }: { tech: Tech; isHovered: boolean }) => {
  const icons: Record<string, React.ReactElement> = {
    'HTML5': (
      <svg viewBox="0 0 512 512" className="w-full h-full">
        <path fill="#E34F26" d="M71,460 L30,0 L481,0 L440,460 L255,512 L71,460 Z M394,150 L390,194 L255,194 L256,241 L386,241 L382,283 L255,283 L255,330 L381,330 L376,374 L255,422 L133,374 L125,283 L170,283 L174,330 L255,358 L336,330 L340,283 L125,283 L121,241 L256,241 L260,194 L116,194 L111,150 L394,150 Z"/>
      </svg>
    ),
    'CSS3': (
      <svg viewBox="0 0 512 512" className="w-full h-full">
        <path fill="#1572B6" d="M30,0 L71,460 L255,512 L440,460 L481,0 L30,0 Z M394,150 L111,150 L116,194 L390,194 L382,283 L133,283 L125,374 L255,422 L376,374 L381,330 L340,330 L336,358 L255,386 L174,358 L170,330 L381,330 L386,241 L121,241 L116,194 L260,194 L256,150 L394,150 Z"/>
      </svg>
    ),
    'JavaScript': (
      <svg viewBox="0 0 630 630" className="w-full h-full">
        <rect width="630" height="630" fill="#F7DF1E"/>
        <path d="M423.2,492.19c12.69,20.72,29.2,35.95,58.4,35.95c24.53,0,40.2-12.26,40.2-29.2c0-20.3-16.1-27.49-43.1-39.32l-14.8-6.35c-42.72-18.18-71.1-41-71.1-89.2c0-44.4,33.83-78.2,86.7-78.2c37.64,0,64.7,13.1,84.2,47.4l-46.1,29.6c-10.15-18.2-21.1-25.37-38.1-25.37c-17.34,0-28.33,11-28.33,25.37c0,17.76,11,24.95,36.4,35.95l14.8,6.34c50.3,21.57,78.7,43.56,78.7,93.03c0,53.3-41.87,82.5-98.1,82.5c-54.98,0-90.5-26.2-107.88-60.54L423.2,492.19z M214.13,492.19c12.69,20.72,29.2,35.95,58.4,35.95c24.53,0,40.2-12.26,40.2-29.2c0-20.3-16.1-27.49-43.1-39.32l-14.8-6.35c-42.72-18.18-71.1-41-71.1-89.2c0-44.4,33.83-78.2,86.7-78.2c37.64,0,64.7,13.1,84.2,47.4l-46.1,29.6c-10.15-18.2-21.1-25.37-38.1-25.37c-17.34,0-28.33,11-28.33,25.37c0,17.76,11,24.95,36.4,35.95l14.8,6.34c50.3,21.57,78.7,43.56,78.7,93.03c0,53.3-41.87,82.5-98.1,82.5c-54.98,0-90.5-26.2-107.88-60.54L214.13,492.19z" fill="#000"/>
      </svg>
    ),
    'React': (
      <svg viewBox="0 0 841.9 595.3" className="w-full h-full">
        <g fill="#61DAFB">
          <path d="M666.3,296.5c0-32.5-40.7-63.3-103.1-82.4c14.4-63.6,8-114.2-20.2-130.4c-6.5-3.8-14.1-5.6-22.4-5.6v22.3c4.6,0,8.3,0.9,11.4,2.6c13.6,7.8,19.5,37.5,14.9,75.7c-1.1,9.4-2.9,19.3-5.1,29.4c-19.6-4.8-41-8.5-63.5-10.9c-13.5-18.5-27.5-35.3-41.6-50c32.6-30.3,63.2-46.9,84-46.9l0-22.3c0,0,0,0,0,0c-27.5,0-63.5,19.6-99.9,53.6c-36.4-33.8-72.4-53.2-99.9-53.2v22.3c20.7,0,51.4,16.5,84,46.6c-14,14.7-28,31.4-41.3,49.9c-22.6,2.4-44,6.1-63.6,11c-2.3-10-4-19.7-5.2-29c-4.7-38.2,1.1-67.9,14.6-75.8c3-1.8,6.9-2.6,11.5-2.6l0-22.3c0,0,0,0,0,0c-8.4,0-16,1.8-22.6,5.6c-28.1,16.2-34.4,66.7-19.9,130.1c-62.2,19.2-102.7,49.9-102.7,82.3c0,32.5,40.7,63.3,103.1,82.4c-14.4,63.6-8,114.2,20.2,130.4c6.5,3.8,14.1,5.6,22.5,5.6c27.5,0,63.5-19.6,99.9-53.6c36.4,33.8,72.4,53.2,99.9,53.2c8.4,0,16-1.8,22.6-5.6c28.1-16.2,34.4-66.7,19.9-130.1C625.8,359.7,666.3,329,666.3,296.5z M536.1,229.8c-3.7,12.9-8.3,26.2-13.5,39.5c-4.1-8-8.4-16-13.1-24c-4.6-8-9.5-15.8-14.4-23.4C509.3,224,523,226.6,536.1,229.8z M490.3,336.3c-7.8,13.5-15.8,26.3-24.1,38.2c-14.9,1.3-30,2-45.2,2c-15.1,0-30.2-0.7-45-1.9c-8.3-11.9-16.4-24.6-24.2-38c-7.6-13.1-14.5-26.4-20.8-39.8c6.2-13.4,13.2-26.8,20.7-39.9c7.8-13.5,15.8-26.3,24.1-38.2c14.9-1.3,30-2,45.2-2c15.1,0,30.2,0.7,45,1.9c8.3,11.9,16.4,24.6,24.2,38c7.6,13.1,14.5,26.4,20.8,39.8C504.7,309.8,497.8,323.2,490.3,336.3z M522.6,323.3c5.4,13.4,10,26.8,13.8,39.8c-13.1,3.2-26.9,5.9-41.2,8c4.9-7.7,9.8-15.6,14.4-23.7C514.2,339.4,518.5,331.3,522.6,323.3z M421.2,430c-9.3-9.6-18.6-20.3-27.8-32c9,0.4,18.2,0.7,27.5,0.7c9.4,0,18.7-0.2,27.8-0.7C439.7,409.7,430.4,420.4,421.2,430z M346.8,371.1c-14.2-2.1-27.9-4.7-41-7.9c3.7-12.9,8.3-26.2,13.5-39.5c4.1,8,8.4,16,13.1,24C337.1,355.7,341.9,363.5,346.8,371.1z M420.7,163c9.3,9.6,18.6,20.3,27.8,32c-9-0.4-18.2-0.7-27.5-0.7c-9.4,0-18.7,0.2-27.8,0.7C402.2,183.3,411.5,172.6,420.7,163z M346.7,221.9c-4.9,7.7-9.8,15.6-14.4,23.7c-4.6,8-8.9,16-13,24c-5.4-13.4-10-26.8-13.8-39.8C318.6,226.7,332.4,224,346.7,221.9z M256.2,347.1c-35.4-15.1-58.3-34.9-58.3-50.6c0-15.7,22.9-35.6,58.3-50.6c8.6-3.7,18-7,27.7-10.1c5.7,19.6,13.2,40,22.5,60.9c-9.2,20.8-16.6,41.1-22.2,60.6C274.3,354.2,264.9,350.8,256.2,347.1z M585.7,296.5c0,15.7-22.9,35.6-58.3,50.6c-8.6,3.7-18,7-27.7,10.1c-5.7-19.6-13.2-40-22.5-60.9c9.2-20.8,16.6-41.1,22.2-60.6c9.9,3.1,20.3,6.5,29.8,10.1C562.7,260.9,585.7,280.8,585.7,296.5z"/>
          <circle cx="420.9" cy="296.5" r="45.7"/>
        </g>
      </svg>
    ),
    'Tailwind': (
      <svg viewBox="0 0 1000 1000" className="w-full h-full">
        <path fill="#06B6D4" d="M489.5,226.7C502.6,159.3,549.4,108.2,621.8,108.2C715.5,108.2,752.2,180.5,755.2,251.8H858.9C855.9,134.7,773.3,25.7,621.8,25.7C489.5,25.7,402.9,111.2,387.8,226.7H489.5z M355.5,502.2C368.6,434.8,415.4,383.7,487.8,383.7C581.5,383.7,618.2,456,621.2,527.3H724.9C721.9,410.2,639.3,301.2,487.8,301.2C355.5,301.2,268.9,386.7,253.8,502.2H355.5z M253.8,777.7C268.9,893.2,355.5,978.7,487.8,978.7C639.3,978.7,721.9,869.7,724.9,752.6H621.2C618.2,823.9,581.5,896.2,487.8,896.2C415.4,896.2,368.6,845.1,355.5,777.7H253.8z"/>
      </svg>
    ),
    'Node.js': (
      <svg viewBox="0 0 256 289" className="w-full h-full">
        <path fill="#339933" d="M127.999999,288.463771 C124.024844,288.463771 120.314699,287.403728 116.869564,285.548656 L81.6231884,264.612838 C76.32298,261.697724 78.9730864,260.637682 80.5631458,260.107661 C87.7184259,257.72257 89.0434775,257.192547 96.4637688,252.952381 C97.2587979,252.422361 98.3188405,252.687372 99.1138718,253.217392 L126.144927,269.383024 C127.20497,269.913045 128.530021,269.913045 129.325051,269.383024 L235.064182,208.165634 C236.124225,207.635611 236.654245,206.575571 236.654245,205.250521 L236.654245,83.0807467 C236.654245,81.7556929 236.124225,80.6956527 235.064182,80.1656324 L129.325051,19.2132506 C128.265009,18.6832305 126.939955,18.6832305 126.144927,19.2132506 L20.4057954,80.1656324 C19.3457551,80.6956527 18.8157349,82.0207041 18.8157349,83.0807467 L18.8157349,205.250521 C18.8157349,206.31056 19.3457551,207.635611 20.4057954,208.165634 L49.2919247,224.861286 C64.9275364,232.811595 74.7329196,223.536234 74.7329196,213.996821 L74.7329196,93.6070492 C74.7329196,92.282009 75.7979636,90.9569891 77.388023,90.9569891 L91.4285716,90.9569891 C92.7536129,90.9569891 94.0786542,92.022032 94.0786542,93.6070492 L94.0786542,213.996821 C94.0786542,235.606756 82.5992576,247.621151 62.3969426,247.621151 C57.1017501,247.621151 53.1315938,247.621151 42.2480902,242.850969 L13.8969428,226.685348 C5.14664063,221.650156 0.126449336,212.374795 0.126449336,202.57041 L0.126449336,83.3457567 C0.126449336,73.5413715 5.14664063,64.2660101 13.8969428,59.2308179 L119.636074,1.5748025 C128.121362,-3.19538018 138.186706,-3.19538018 146.937009,1.5748025 L252.67614,59.2308179 C261.426442,64.2660101 266.446633,73.5413715 266.446633,83.3457567 L266.446633,202.57041 C266.446633,212.374795 261.426442,221.650156 252.67614,226.685348 L146.937009,284.341363 C143.491874,286.196434 139.781728,288.463771 127.999999,288.463771"/>
      </svg>
    ),
    'Express': (
      <svg viewBox="0 0 512 512" className="w-full h-full">
        <path fill="#000000" d="M3.332 248.027c0 0 43.756-2.716 43.756-2.716l.001-.001c10.334-.668 19.867-1.002 28.596-1.002 27.565 0 49.646 5.35 66.243 16.049 16.597 10.699 28.262 25.59 34.994 44.673 6.732 19.083 10.099 41.268 10.099 66.556 0 25.288-3.367 47.473-10.099 66.556-6.732 19.083-18.397 33.974-34.994 44.673-16.597 10.699-38.678 16.049-66.243 16.049-8.729 0-18.262-.334-28.596-1.002l.001.001s-43.756-2.716-43.756-2.716v-247.12zm44.424 205.212c8.729 1.336 17.792 2.004 27.189 2.004 35.123 0 60.411-10.699 75.864-32.096 15.453-21.397 23.179-51.126 23.179-89.187 0-38.061-7.726-67.79-23.179-89.187-15.453-21.397-40.741-32.096-75.864-32.096-9.397 0-18.46.668-27.189 2.004v238.558zm223.066-3.341c-12.023 0-22.691-2.338-32.004-7.015-9.313-4.677-16.597-11.701-21.852-21.072-5.255-9.371-7.883-20.906-7.883-34.605 0-13.699 2.628-25.234 7.883-34.605 5.255-9.371 12.539-16.395 21.852-21.072 9.313-4.677 19.981-7.015 32.004-7.015 12.023 0 22.691 2.338 32.004 7.015 9.313 4.677 16.597 11.701 21.852 21.072 5.255 9.371 7.883 20.906 7.883 34.605 0 13.699-2.628 25.234-7.883 34.605-5.255 9.371-12.539 16.395-21.852 21.072-9.313 4.677-19.981 7.015-32.004 7.015zm0-29.338c5.789 0 10.811-1.446 15.065-4.339 4.254-2.893 7.549-7.015 9.885-12.367 2.336-5.352 3.504-11.701 3.504-19.047 0-7.346-1.168-13.695-3.504-19.047-2.336-5.352-5.631-9.474-9.885-12.367-4.254-2.893-9.276-4.339-15.065-4.339-5.789 0-10.811 1.446-15.065 4.339-4.254 2.893-7.549 7.015-9.885 12.367-2.336 5.352-3.504 11.701-3.504 19.047 0 7.346 1.168 13.695 3.504 19.047 2.336 5.352 5.631 9.474 9.885 12.367 4.254 2.893 9.276 4.339 15.065 4.339zm124.896 29.338c-12.023 0-22.691-2.338-32.004-7.015-9.313-4.677-16.597-11.701-21.852-21.072-5.255-9.371-7.883-20.906-7.883-34.605 0-13.699 2.628-25.234 7.883-34.605 5.255-9.371 12.539-16.395 21.852-21.072 9.313-4.677 19.981-7.015 32.004-7.015 12.023 0 22.691 2.338 32.004 7.015 9.313 4.677 16.597 11.701 21.852 21.072 5.255 9.371 7.883 20.906 7.883 34.605 0 13.699-2.628 25.234-7.883 34.605-5.255 9.371-12.539 16.395-21.852 21.072-9.313 4.677-19.981 7.015-32.004 7.015zm0-29.338c5.789 0 10.811-1.446 15.065-4.339 4.254-2.893 7.549-7.015 9.885-12.367 2.336-5.352 3.504-11.701 3.504-19.047 0-7.346-1.168-13.695-3.504-19.047-2.336-5.352-5.631-9.474-9.885-12.367-4.254-2.893-9.276-4.339-15.065-4.339-5.789 0-10.811 1.446-15.065 4.339-4.254 2.893-7.549 7.015-9.885 12.367-2.336 5.352-3.504 11.701-3.504 19.047 0 7.346 1.168 13.695 3.504 19.047 2.336 5.352 5.631 9.474 9.885 12.367 4.254 2.893 9.276 4.339 15.065 4.339z"/>
      </svg>
    ),
    'MongoDB': (
      <svg viewBox="0 0 256 512" className="w-full h-full">
        <path fill="#47A248" d="M152.26 0c-1.57 2.15-2.86 4.12-4.18 6.05-10.33 14.64-19.69 29.88-27.17 46.13-9.73 21.22-15.39 43.64-17.06 66.87-1.56 21.86 1.13 43.39 7.85 64.17 4.51 14.22 10.5 27.77 18.15 40.45 1.37 2.29 2.88 4.51 4.61 7.24.55-1.25.88-1.92 1.15-2.62 6.43-16.08 11.47-32.63 14.41-49.71 3.29-19.1 3.85-38.35 1.42-57.64-2.13-16.85-6.26-33.18-12.62-48.82-5.32-13.12-12.08-25.46-19.88-37.23-.82-1.24-1.68-2.45-2.83-4.09 1.57-.24 2.64-.47 3.72-.55 12.5-.96 24.89-2.5 37.16-5.46 17.65-4.26 34.23-11.2 49.61-21.16 13.58-8.78 25.23-19.63 34.63-32.93 8.84-12.48 14.73-26.26 17.41-41.25 1.41-7.82 1.88-15.73 1.28-23.68-.12-1.54-.5-3.06-.76-4.59-.19.05-.38.1-.57.15-1.32 4.61-2.57 9.25-3.97 13.82-4.67 15.13-12.16 28.77-22.37 40.91-11.57 13.73-25.65 24.08-42.01 31.39-14.33 6.39-29.35 10.15-44.84 11.81-2.95.31-5.92.37-9.12.55z"/>
      </svg>
    ),
  };

  return (
    <div
      className={`w-16 h-16 transition-all duration-300 ${isHovered ? 'scale-110' : 'scale-100'}`}
      style={{ filter: isHovered ? `drop-shadow(0 0 20px ${tech.color}40)` : 'none' }}
    >
      {icons[tech.name] || null}
    </div>
  );
};

export default function Technologies() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);

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
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="tech"
      ref={sectionRef}
      className="relative overflow-hidden bg-white py-24 sm:py-32"
    >
      {/* Background accents */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-slate-50 to-white pointer-events-none" />
      <div className="absolute -right-16 top-12 h-72 w-72 rounded-full bg-cyan-100/30 blur-3xl pointer-events-none" />
      <div className="absolute left-8 bottom-10 h-52 w-52 rounded-full bg-sky-100/30 blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] items-start">

          {/* ── Left: heading + two info cards ── */}
          <div className="space-y-8">
            <div
              className={`inline-flex items-center gap-2 rounded-full border border-sky-200/70 bg-sky-50/70 px-4 py-2 text-xs uppercase tracking-[0.36em] text-sky-700 shadow-[0_0_40px_rgba(56,189,248,0.08)] backdrop-blur-sm transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionTimingFunction: 'var(--ease-expo-out)' }}
            >
              <span className="h-2 w-2 rounded-full bg-sky-500 animate-pulse" />
              Team Expertise
            </div>

            <div>
              <h2
                className={`font-display text-4xl sm:text-5xl font-semibold tracking-tight text-slate-900 transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
                }`}
                style={{ transitionTimingFunction: 'var(--ease-expo-out)', transitionDelay: '200ms' }}
              >
                Modern technology design for a premium enterprise experience.
              </h2>
              <p
                className={`mt-6 max-w-2xl text-lg leading-8 text-slate-600 transition-all duration-700 ${
                  isVisible ? 'opacity-100 blur-0' : 'opacity-0 blur-sm'
                }`}
                style={{ transitionTimingFunction: 'var(--ease-smooth)', transitionDelay: '350ms' }}
              >
                A modern, closed-layout section with clean glass surfaces, bold white space, and crisp cyan accents to match the hero's futuristic identity.
              </p>
            </div>

          </div>

          {/* ── Right: feature chips 2×2 + stat strip 3-col ── */}
          <div
            className={`relative overflow-hidden rounded-[2rem] border border-slate-200/70 bg-slate-50/90 p-8 shadow-[0_30px_90px_rgba(15,23,42,0.06)] transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{ transitionTimingFunction: 'var(--ease-expo-out)', transitionDelay: '250ms' }}
          >
            {/* Top glow line — matches Hero feature card */}
            <div className="absolute inset-x-8 top-0 h-px rounded-full bg-gradient-to-r from-cyan-400/70 via-sky-400/50 to-indigo-400/50" />

            <div className="relative space-y-5">
              {/* Trusted stack + Futuristic polish cards */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl border border-slate-200/70 bg-slate-50/90 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.06)] backdrop-blur-xl">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Trusted stack</p>
                  <p className="mt-4 text-xl font-semibold text-slate-900">Engineered for speed, security, and scale.</p>
                </div>
                <div className="rounded-3xl border border-slate-200/70 bg-white/95 p-6 shadow-[0_24px_80px_rgba(56,189,248,0.08)] backdrop-blur-xl">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Futuristic polish</p>
                  <p className="mt-4 text-xl font-semibold text-slate-900">Glass-inspired cards and ambient glow details.</p>
                </div>
              </div>

              {/* 3-col stat strip */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { highlight: 'Performance', description: 'Optimised at every layer' },
                  { highlight: 'Scale',        description: 'Global-ready infra'       },
                  { highlight: 'Trust',        description: 'Security by default'      },
                ].map((item) => (
                  <div
                    key={item.highlight}
                    className="rounded-2xl bg-white/80 border border-slate-100 p-3 text-xs text-slate-500"
                  >
                    <p className="font-semibold text-slate-900 text-sm">{item.highlight}</p>
                    <p className="mt-1 text-slate-400 text-xs">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Tech card grid ── */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {technologies.map((tech, index) => (
            <button
              key={tech.name}
              type="button"
              onMouseEnter={() => setHoveredTech(tech.name)}
              onMouseLeave={() => setHoveredTech(null)}
              className={`group relative overflow-hidden rounded-[2rem] border bg-white/95 p-6 text-left shadow-[0_20px_60px_rgba(15,23,42,0.07)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_30px_90px_rgba(15,23,42,0.10)] ${
                hoveredTech === tech.name ? 'border-cyan-300/80' : 'border-slate-200/70'
              }`}
              style={{
                opacity: isVisible ? 1 : 0,
                transitionTimingFunction: 'var(--ease-expo-out)',
                transitionDelay: `${500 + index * 70}ms`,
              }}
            >
              <div
                className={`absolute -right-10 -top-10 h-28 w-28 rounded-full bg-cyan-100/40 blur-3xl pointer-events-none transition-opacity duration-500 ${
                  hoveredTech === tech.name ? 'opacity-100' : 'opacity-60'
                }`}
              />
              <div className="relative flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-3xl border border-slate-200/70 bg-slate-50 shadow-sm transition-all duration-300 group-hover:bg-cyan-50">
                  <TechIcon tech={tech} isHovered={hoveredTech === tech.name} />
                </div>
                <div className="space-y-1">
                  <p className="text-base font-semibold text-slate-900">{tech.name}</p>
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Leading edge</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}