import React from 'react';
import CalendarCheckIcon from '@/components/icons/CalendarCheckIcon';
import SwordsIcon from '@/components/icons/SwordsIcon';
import MailPlusIcon from '@/components/icons/MailPlusIcon';
import ShieldHalfIcon from '@/components/icons/ShieldHalfIcon';
import ScaleIcon from '@/components/icons/ScaleIcon';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

type FeatureIcon = 'CalendarCheck' | 'Swords' | 'MailPlus' | 'ShieldHalfIcon' | 'ScaleIcon';

interface Feature {
    id: string;
    icon: FeatureIcon;
    title: React.ReactNode;
    description: string;
    stats?: string[];
    buttonText: string;
    link: string;
    isModal: boolean;
    badge?: string;
}

const features: Feature[] = [
    {
        id: 'report-incident',
        icon: 'CalendarCheck',
        title: <>Report An Incident: <span className="text-amber-400">Catch Them</span> Red-Handed.</>,
        description: 'Transform toxic behavior into court-ready evidence with guided documentation, timestamps, and professional exports.',
        stats: ['Up to 50% reduction in court time', 'Log 10x more details with prompts', 'Export in court-ready format'],
        buttonText: 'DOCUMENT THEIR LIES',
        link: '/incident-report',
        isModal: false,
    },
    {
        id: 'case-analysis',
        icon: 'Swords',
        title: <>Family Law Case Analysis Tool: Level the <span className="text-amber-400">Playing Field</span>.</>,
        description: 'Decode legal documents with AI analysis, get plain English explanations, and receive next-step recommendations.',
        stats: ['90% faster to spot contradictions', 'Plain-language briefs in minutes', 'Next steps tailored to your facts'],
        buttonText: 'EXPOSE THE TRUTH',
        link: '/case-analysis',
        isModal: false,
    },
    {
        id: 'email-buddy',
        icon: 'MailPlus',
        title: <>Email Law Buddy: <span className="text-amber-400">Shut Down</span> the Games.</>,
        description: 'Stop emotional manipulation with professional, AI-drafted responses that maintain composure and build your legal case.',
        stats: ['Cuts response drafting time by 70%', 'Keeps tone compliant with court orders', 'Auto-flags manipulative language'],
        buttonText: 'STOP THE GAMES',
        link: '/email-buddy',
        isModal: false,
    },
    {
        id: 'false-allegation',
        icon: 'ShieldHalfIcon',
        title: <>False Allegation: <span className="text-amber-400">Response Drafting</span>.</>,
        description: 'Produce structured, factual rebuttals to distorted claims.',
        buttonText: 'DRAFT REBUTTAL',
        link: '#',
        isModal: true,
    },
    {
        id: 'support-calculator',
        icon: 'ScaleIcon',
        title: <>SupportCalc CA: <span className="text-amber-400">Spousal & Child</span> Support.</>,
        description: 'Estimate SSAG spousal ranges, see simplified set-offs, and now get a plain-language explanation of exactly why the amount makes sense.',
        buttonText: 'RUN CALCULATOR',
        link: '/support-calculator',
        isModal: false,
        badge: 'NEW: EXPLAINER',
    },
];

const featureIcons: Record<FeatureIcon, React.ReactNode> = {
    CalendarCheck: <CalendarCheckIcon />,
    Swords: <SwordsIcon />,
    MailPlus: <MailPlusIcon />,
    ShieldHalfIcon: <ShieldHalfIcon />,
    ScaleIcon: <ScaleIcon />,
};

const Features: React.FC = () => {
    return (
        <section id="features" className="bg-slate-950 py-12 md:py-20 relative overflow-hidden">
            <div
                className="pointer-events-none absolute inset-0 opacity-[0.08]"
                style={{
                    backgroundImage:
                        "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160' viewBox='0 0 160 160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='160' height='160' filter='url(%23n)' opacity='0.7'/></svg>\")",
                    backgroundRepeat: 'repeat',
                }}
                aria-hidden="true"
            />
            <div className="container mx-auto px-4 text-center relative z-10">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 animate-fade-in-up">
                    <span className="text-amber-400">AI Tools</span> to<span className="text-amber-400"> Level</span> the<span className="text-amber-400"> <i>Playing Field</i></span>.
                </h2>
                <p className="text-base sm:text-lg text-slate-300 max-w-3xl mx-auto mb-16 animate-fade-in-up delay-200">
                    Court-ready clarity, powered by precision—turn chaos into evidence and reclaim control.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <Card
                            key={index}
                            className={`relative h-full p-8 flex flex-col items-center animate-fade-in-up delay-${index * 100} transition-all duration-300 ease-out hover:bg-slate-700/80 motion-safe:hover:-translate-y-2 motion-safe:hover:scale-[1.02] hover:shadow-2xl hover:shadow-amber-400/15 border border-amber-400/50 hover:border-amber-400 hover:ring-2 hover:ring-amber-400/25`}
                        >
                            <div
                                className="pointer-events-none absolute inset-0 opacity-[0.12] rounded-2xl"
                                style={{
                                    backgroundImage:
                                        "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='140' height='140' viewBox='0 0 140 140'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.95' numOctaves='1' stitchTiles='stitch'/></filter><rect width='140' height='140' filter='url(%23n)' opacity='0.6'/></svg>\")",
                                    backgroundRepeat: 'repeat',
                                }}
                                aria-hidden="true"
                            />
                            <div className="p-4 rounded-full bg-amber-400 text-slate-900 mb-4 relative">
                                {feature.badge && (
                                    <span className="absolute -top-2 -right-2 bg-slate-950 text-amber-300 text-[10px] font-semibold uppercase tracking-[0.2em] px-3 py-1 rounded-full border border-amber-400">
                                        {feature.badge}
                                    </span>
                                )}
                                {featureIcons[feature.icon]}
                            </div>
                            <h3 className="text-2xl font-bold mb-2 text-balance">
                                {feature.title}
                            </h3>
                            <p className="text-gray-400 mb-4 flex-grow text-balance">{feature.description}</p>
                            {feature.stats && (
                                <div className="w-full mb-4 space-y-2">
                                    <p className="text-xs uppercase tracking-[0.2em] text-amber-300/80">Key Wins</p>
                                    <div className="grid gap-2">
                                        {feature.stats.map(item => (
                                            <div
                                                key={item}
                                                className="flex items-start gap-2 rounded-lg border border-amber-400/30 bg-amber-400/5 px-3 py-2 text-left"
                                            >
                                                <span className="mt-[2px] h-2 w-2 rounded-full bg-amber-400/80" />
                                                <p className="text-sm text-slate-100 leading-snug">{item}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                            {feature.isModal ? (
                                <Button
                                    className="mt-auto"
                                    disabled
                                    aria-disabled="true"
                                >
                                    {feature.buttonText}
                                </Button>
                            ) : (
                                <Button
                                    as="a"
                                    href={feature.link}
                                    className="mt-auto text-center"
                                    rel={feature.link && feature.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                                    target={feature.link && feature.link.startsWith('http') ? '_blank' : '_self'}
                                >
                                    {feature.buttonText}
                                </Button>
                            )}
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
