import React, { Suspense, lazy } from 'react';
import Hero from '../components/Hero';
import Features from '../components/Features';
const Resources = lazy(() => import('@/features/resources/Resources'));
const DonationLazy = lazy(() => import('../components/Donation'));
const CTALazy = lazy(() => import('../components/CTA'));
const StayInTouchLazy = lazy(() => import('../components/StayInTouch'));

const HomePage: React.FC = () => {
    return (
        <>
            <Hero />
            <Features />
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
                <StayInTouchLazy />
            </Suspense>
        </>
    );
};

export default HomePage;
