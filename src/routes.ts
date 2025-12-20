import React, { lazy } from 'react';

// Lazy load page components for better performance
const HomePage = lazy(() => import('./features/marketing/pages/HomePage'));
const AboutPage = lazy(() => import('./features/marketing/pages/AboutPage'));
const FeaturesPage = lazy(() => import('./features/marketing/pages/FeaturesPage'));
const HowItWorksPage = lazy(() => import('./features/marketing/pages/HowItWorksPage'));
const TestimonialsPage = lazy(() => import('./features/marketing/pages/TestimonialsPage'));
const ResourcesPage = lazy(() => import('./features/resources/pages/ResourcesPage'));
const DonatePage = lazy(() => import('./features/marketing/pages/DonatePage'));
const ContactPage = lazy(() => import('./features/contact/pages/ContactPage'));
const TemplateLibraryPage = lazy(() => import('./features/template-library/pages/TemplateLibraryPage'));
const PrivacyPolicyPage = lazy(() => import('./features/legal/pages/PrivacyPolicyPage'));
const TermsOfUsePage = lazy(() => import('./features/legal/pages/TermsOfUsePage'));
const JurisdictionWizardPage = lazy(() => import('./features/onboarding/pages/JurisdictionWizardPage'));
const SupportCalculatorPage = lazy(() => import('./features/support-calculator/pages/SupportCalculatorPage'));
const IncidentReportPage = lazy(() => import('./features/incident-report/IncidentReportPage'));
const EmailBuddyPage = lazy(() => import('./features/email-buddy/EmailBuddyPage'));
const CaseAnalysisPage = lazy(() => import('./features/case-analysis/pages/CaseAnalysisPage'));

export interface RouteConfig {
    path: string;
    label: string;
    component: React.ComponentType;
    inHeader: boolean;
    inFooter: boolean;
}

export interface ExternalLinkConfig {
    href: string;
    text: string;
    inHeader: boolean;
    inFooter: boolean;
}

export interface NavLink {
    href: string;
    text: string;
    isExternal?: boolean;
}

export const routes: RouteConfig[] = [
    { path: '/', label: 'Home', component: HomePage, inHeader: true, inFooter: false },
    { path: '/about', label: 'About', component: AboutPage, inHeader: true, inFooter: true },
    { path: '/features', label: 'Features', component: FeaturesPage, inHeader: true, inFooter: true },
    { path: '/how-it-works', label: 'How It Works', component: HowItWorksPage, inHeader: false, inFooter: true },
    { path: '/template-library', label: 'Template Library', component: TemplateLibraryPage, inHeader: false, inFooter: false },
    { path: '/resources', label: 'Tips', component: ResourcesPage, inHeader: true, inFooter: false },
    { path: '/incident-report', label: 'Incident Report', component: IncidentReportPage, inHeader: false, inFooter: true },
    { path: '/case-analysis', label: 'Case Analysis', component: CaseAnalysisPage, inHeader: false, inFooter: true },
    { path: '/testimonials', label: 'Testimonials', component: TestimonialsPage, inHeader: false, inFooter: true },
    { path: '/donate', label: 'Donate', component: DonatePage, inHeader: true, inFooter: true },
    { path: '/contact', label: 'Contact', component: ContactPage, inHeader: true, inFooter: true },
    { path: '/privacy', label: 'Privacy Policy', component: PrivacyPolicyPage, inHeader: false, inFooter: true },
    { path: '/terms', label: 'Terms of Use', component: TermsOfUsePage, inHeader: false, inFooter: true },
    { path: '/onboarding', label: 'Jurisdiction Onboarding', component: JurisdictionWizardPage, inHeader: false, inFooter: false },
    { path: '/support-calculator', label: 'Calculator', component: SupportCalculatorPage, inHeader: false, inFooter: true },
    { path: '/email-buddy', label: 'Email Buddy', component: EmailBuddyPage, inHeader: false, inFooter: true },
    { path: '/incidents', label: 'Log Incident', component: IncidentReportPage, inHeader: false, inFooter: false },
];

export const externalLinks: ExternalLinkConfig[] = [
    { href: 'https://blog.custodybuddy.com', text: 'Blog', inHeader: true, inFooter: true },
];
