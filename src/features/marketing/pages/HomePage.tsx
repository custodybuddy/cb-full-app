import React, { Suspense, lazy } from 'react';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Contact from '@/features/contact/Contact';

const Testimonials = lazy(() => import('../components/Testimonials'));
const Resources = lazy(() => import('@/features/resources/Resources'));
const DonationLazy = lazy(() => import('../components/Donation'));
const CTALazy = lazy(() => import('../components/CTA'));
const FAQLazy = lazy(() => import('../components/FAQ'));
const NewsletterLazy = lazy(() => import('../components/Newsletter'));

const HomePage: React.FC = () => {
    return (
        <>
            <Hero />
            <Features />
            <Suspense fallback={null}>
                <Testimonials />
            </Suspense>
            <Suspense fallback={null}>
                <Resources />
            </Suspense>
            <Suspense fallback={null}>
                <DonationLazy />
            </Suspense>
            <Suspense fallback={null}>
                <CTALazy />
            </Suspense>
            <Suspense fallback={null}>
                <FAQLazy />
            </Suspense>
            <Suspense fallback={null}>
                <NewsletterLazy />
            </Suspense>
            <Contact />
        </>
    );
};

export default HomePage;
