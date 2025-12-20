
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { CheckCircle2, ChevronRight, Gavel, Scale, Shield, Users } from 'lucide-react';
import HeroBackground3D from './HeroBackground3D';

const NOISE_TEXTURE =
    "url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAQAAAAAYLlVAAAArklEQVR4Ae3VQQrCQBBF0Sn//zZuIhqQYdI04MYQ/uxUULgmIpR2m9F9DA7K5wDcfVqvXz7P50A8zDCqRQhC0pgWR5F7pFU03SMMdEINZIohpEIJ7c3Xk8yvYwzBrOGwozW8k5DXJfG70YVd4KzPh1QFCjF8AA9U6vvl0nrsVj2wTaNGkReSwI/lJjWz5E2vWM0ZPkJZkENzow6Lx81pT7yL6k96tZKcS1aDQLEo6N3n2yfo4b8nzjA43f8sVTc8o4V4yRXTKP1PK5zhfZ9zF6AAAAAElFTkSuQmCC\")";
const NOISE_OVERLAY =
    "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='140' height='140' viewBox='0 0 140 140'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='140' height='140' filter='url(%23n)' opacity='0.6'/></svg>\")";

const CTA_BUTTONS = [
    {
        label: 'Document Their Lies',
        href: '#features',
        primary: true,
    },
    {
        label: 'See Success Stories',
        href: '#social-proof',
        primary: false,
    },
];

const PERKS = ['Court-Ready Format', 'AI-Powered Insights', 'Encrypted Storage'];

const BACKGROUND_ICONS = [
    {
        key: 'gavel',
        Component: Gavel,
        className: 'absolute -bottom-32 -left-32 lg:-left-10 opacity-[0.03] text-white transition-transform duration-100 ease-out blur-[2px]',
        transform: (y: number, delta: number) => `translateY(${y * -0.06 - delta * 0.05}px) rotate(-12deg)`,
        size: 900,
    },
    {
        key: 'users',
        Component: Users,
        className: 'absolute -top-40 -right-40 lg:right-0 opacity-[0.03] text-white transition-transform duration-100 ease-out blur-[2px]',
        transform: (y: number, delta: number) => `translateY(${y * 0.1 + delta * 0.04}px) rotate(10deg)`,
        size: 820,
    },
    {
        key: 'scale',
        Component: Scale,
        className: 'absolute top-20 left-10 lg:left-24 opacity-[0.025] text-white transition-transform duration-100 ease-out blur-[1px]',
        transform: (y: number, delta: number) => `translateY(${y * -0.04 - delta * 0.035}px) rotate(-6deg)`,
        size: 540,
    },
    {
        key: 'shield',
        Component: Shield,
        className: 'absolute bottom-10 right-16 lg:right-28 opacity-[0.025] text-white transition-transform duration-100 ease-out blur-[1px]',
        transform: (y: number, delta: number) => `translateY(${y * 0.035 + delta * 0.035}px) rotate(4deg)`,
        size: 520,
    },
];

const useInView = <T extends HTMLElement>(threshold = 0.2) => {
    const elementRef = useRef<T | null>(null);
    const [inView, setInView] = useState(false);

    useEffect(() => {
        const element = elementRef.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            entries => {
                const [entry] = entries;
                if (entry.isIntersecting) {
                    setInView(true);
                    observer.unobserve(element);
                }
            },
            { threshold }
        );

        observer.observe(element);
        return () => observer.disconnect();
    }, [threshold]);

    return { elementRef, inView };
};

const Hero: React.FC = () => {
    const heroRef = useRef<HTMLElement | null>(null);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [scrollY, setScrollY] = useState(0);
    const lastScrollY = useRef(0);
    const [scrollDelta, setScrollDelta] = useState(0);

    const { elementRef: badgeRef, inView: badgeInView } = useInView<HTMLDivElement>(0.3);
    const { elementRef: titleRef, inView: titleInView } = useInView<HTMLHeadingElement>(0.3);
    const { elementRef: bodyRef, inView: bodyInView } = useInView<HTMLParagraphElement>(0.3);
    const { elementRef: ctaRef, inView: ctaInView } = useInView<HTMLDivElement>(0.3);
    const { elementRef: perksRef, inView: perksInView } = useInView<HTMLDivElement>(0.3);

    useEffect(() => {
        let frameId: number | null = null;

        const updateScrollState = () => {
            const heroEl = heroRef.current;
            if (!heroEl) return;
            const rect = heroEl.getBoundingClientRect();
            const viewport = window.innerHeight || 1;
            const raw = 1 - (rect.top + rect.height * 0.2) / (viewport + rect.height * 0.2);
            const clamped = Math.min(1, Math.max(0, raw));
            setScrollProgress(clamped);
            const currentY = window.scrollY;
            setScrollDelta(currentY - lastScrollY.current);
            lastScrollY.current = currentY;
            setScrollY(currentY);
        };

        const onScroll = () => {
            if (frameId) {
                window.cancelAnimationFrame(frameId);
            }
            frameId = window.requestAnimationFrame(updateScrollState);
        };

        updateScrollState();
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll);
        return () => {
            if (frameId) {
                window.cancelAnimationFrame(frameId);
            }
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onScroll);
        };
    }, []);

    const contentMotionStyle = useMemo(
        () => ({
            opacity: 0.55 + scrollProgress * 0.45,
            transform: `translateY(${20 * (1 - scrollProgress)}px)`,
            transition: 'opacity 200ms ease, transform 200ms ease',
        }),
        [scrollProgress]
    );

    return (
        <section
            ref={heroRef}
            className="flex items-center justify-center pt-40 pb-20 md:pt-48 md:pb-24 lg:pt-64 lg:pb-28 text-center relative overflow-hidden bg-slate-950"
        >
            <div className="absolute inset-0 z-0">
                <HeroBackground3D />
            </div>
            <div
                className="pointer-events-none absolute inset-0 opacity-20 mix-blend-soft-light z-10"
                style={{
                    backgroundImage: NOISE_TEXTURE,
                    backgroundRepeat: 'repeat',
                    backgroundSize: 'auto',
                    transform: `translateY(${scrollProgress * -10}px)`,
                }}
                aria-hidden="true"
            />
            <div
                className="absolute inset-0 opacity-20 mix-blend-soft-light z-10"
                style={{
                    backgroundImage:
                        "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 800'><g fill='none' stroke='%23fbbf24' stroke-width='5' opacity='0.28'><path d='M180 520l160-160 40 40-160 160z'/><path d='M310 350l70-70 40 40-70 70z'/><rect x='120' y='540' width='260' height='24' rx='12'/></g><g fill='none' stroke='%23fbbf24' stroke-width='5' opacity='0.2'><circle cx='760' cy='300' r='50'/><circle cx='900' cy='320' r='40'/><path d='M700 520c40-80 200-80 240 0' /><path d='M820 520c20-60 120-60 140 0' /></g></svg>\")",
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    backgroundSize: '80%',
                    transform: `translateY(${scrollProgress * -25}px)`,
                }}
                aria-hidden="true"
            />
            <div className="absolute inset-0 pointer-events-none select-none z-20 overflow-hidden">
                {BACKGROUND_ICONS.map(icon => (
                    <div
                        key={icon.key}
                        className={icon.className}
                        style={{ transform: icon.transform(scrollY, scrollDelta) }}
                    >
                        <icon.Component size={icon.size} strokeWidth={0.24} />
                    </div>
                ))}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-slate-950 opacity-80" />
                <div className="absolute inset-0 bg-gradient-to-b from-amber-400/5 via-transparent to-transparent opacity-70" />
                <div
                    className="absolute inset-0 opacity-15 mix-blend-soft-light"
                    style={{
                        backgroundImage: NOISE_OVERLAY,
                        backgroundRepeat: 'repeat',
                    }}
                    aria-hidden="true"
                />
            </div>

            <div className="container mx-auto px-6 lg:px-10 z-30" style={contentMotionStyle}>
                <div
                    ref={badgeRef}
                    className={`inline-flex items-center space-x-3 bg-slate-900/70 border border-slate-800 px-5 py-3 sm:px-8 sm:py-3.5 rounded-full text-amber-300 text-sm sm:text-base font-semibold mb-12 sm:mb-16 backdrop-blur-sm shadow-xl transition duration-500 ${
                        badgeInView ? 'animate-fade-in-up-scale opacity-90' : 'opacity-0 translate-y-4 scale-[0.98]'
                    }`}
                >
                    <span className="flex items-center">
                        <span className="relative flex h-2.5 w-2.5 mr-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-400" />
                        </span>
                        Version 2.0 Now Live
                    </span>
                    <div className="w-px h-5 bg-slate-700 mx-3" />
                    <span className="text-slate-300 font-medium">Featuring advanced GPT-4 case logic</span>
                </div>

                <h1
                    ref={titleRef}
                    className={`text-4xl sm:text-6xl md:text-6xl lg:text-7xl xl:text-8xl font-black mb-8 leading-tight transition duration-500 ${
                        titleInView ? 'animate-fade-in-up-scale' : 'opacity-0 translate-y-4 scale-[0.98]'
                    }`}
                >
                    <span className="text-amber-400">Your Ally</span> in Co-Parenting
                    <br className="hidden lg:block" />
                    <span className="block lg:inline">
                        with a <span className="text-amber-400">Toxic Ex</span>.
                    </span>
                </h1>
                <p></p>
                <p></p>

                <p
                    ref={bodyRef}
                    className={`text-xl sm:text-2xl md:text-3xl font-light max-w-4xl mx-auto mb-10 text-gray-300 leading-relaxed transition duration-500 ${
                        bodyInView ? 'animate-fade-in-up-scale' : 'opacity-0 translate-y-4 scale-[0.98]'
                    }`}
                >
                    AI-Powered Legal Toolkit for Self-Represented Parents. <br className="hidden sm:inline" />
                    Transform stress into strategy, turn manipulation into court evidence.
                </p>
                <p></p>

                <div
                    ref={ctaRef}
                    className={`space-y-4 sm:space-y-0 sm:space-x-6 transition duration-500 ${
                        ctaInView ? 'animate-fade-in-up-scale' : 'opacity-0 translate-y-4 scale-[0.98]'
                    }`}
                >
                    {CTA_BUTTONS.map(btn => {
                        const isPrimary = btn.primary;
                        return (
                            <a
                                key={btn.label}
                                href={btn.href}
                                className={
                                    isPrimary
                                        ? 'inline-flex items-center justify-center gap-2 bg-amber-400 text-black font-bold py-4 px-10 rounded-full shadow-xl transition-all duration-200 ease-out motion-safe:hover:scale-105 motion-safe:active:scale-95 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-slate-900 animate-pulse-bright text-lg'
                                        : 'inline-block bg-gradient-to-r from-amber-400/30 via-amber-300/35 to-amber-400/30 text-amber-50 border-[3px] border-amber-200/90 font-bold py-4 px-10 rounded-full shadow-xl shadow-amber-400/20 transition-all duration-200 ease-out hover:bg-amber-400 hover:text-black hover:border-amber-400 motion-safe:hover:scale-105 motion-safe:active:scale-95 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-slate-900 text-lg relative overflow-hidden group'
                                }
                            >
                                <span className="relative z-10">{btn.label}</span>
                                {isPrimary ? <ChevronRight className="w-5 h-5 relative z-10" /> : <span className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-white/10" />}
                            </a>
                        );
                    })}
                </div>
                <div
                    ref={perksRef}
                    className={`mt-12 flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-12 text-gray-300 text-lg transition duration-500 ${
                        perksInView ? 'animate-fade-in-up-scale' : 'opacity-0 translate-y-4 scale-[0.98]'
                    }`}
                >
                    {PERKS.map(text => (
                        <span key={text} className="flex items-center space-x-2 group">
                            <CheckCircle2 className="text-amber-400 w-6 h-6 group-hover:scale-110 transition-transform" />
                            <span className="group-hover:text-slate-100 transition-colors">{text}</span>
                        </span>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default React.memo(Hero);
