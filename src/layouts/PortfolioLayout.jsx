import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { initPostHog, captureEvent, getDistinctId } from '../lib/posthog';
import { resolveGeo } from '../lib/analytics';

import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';

import HomeProjects from '../components/HomeProjects';
import Certifications from '../components/Certifications';
import Contact from '../components/Contact';
import ThemeToggle, { applyTheme, getInitialTheme } from '../components/ThemeToggle';

gsap.registerPlugin(ScrollTrigger);

// Apply saved theme immediately
applyTheme(getInitialTheme());

export default function PortfolioLayout() {
    const location = useLocation();

    useEffect(() => {
        initPostHog();
        (async () => {
            const geo = await resolveGeo();
            captureEvent('page_view', {
                path: location.pathname,
                browser: navigator.userAgentData?.brands?.[0]?.brand || 'Unknown',
                os: navigator.platform,
                distinct_id: getDistinctId(),
                ...geo,
            });
            try {
                await fetch('/api/events', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        event: 'page_view',
                        properties: {
                            path: location.pathname,
                            browser: navigator.userAgentData?.brands?.[0]?.brand || navigator.userAgent.split(' ').pop(),
                            os: navigator.platform,
                            ...geo,
                        },
                        distinct_id: getDistinctId(),
                    }),
                });
            } catch { /* non-blocking */ }
        })();
    }, [location.pathname]);

    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            direction: 'vertical',
            gestureDirection: 'vertical',
            smooth: true,
            mouseMultiplier: 1,
            smoothTouch: false,
            touchMultiplier: 2,
        });

        lenis.on('scroll', ScrollTrigger.update);

        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });

        gsap.ticker.lagSmoothing(0);

        return () => {
            lenis.destroy();
            gsap.ticker.remove(lenis.raf);
        };
    }, []);

    return (
        <main className="relative bg-gray-950 min-h-screen text-gray-50 overflow-hidden font-sans">
            <div className="fixed inset-0 z-0 bg-grid-pattern opacity-20 pointer-events-none mix-blend-screen" />
            <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/20 blur-[120px] pointer-events-none" />
            <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-secondary/20 blur-[120px] pointer-events-none" />
            <div className="relative z-10 flex flex-col items-center">
                <Hero />
                <About />
                <Skills />
                <HomeProjects />
                <Certifications />
                <Contact />
            </div>
            <ThemeToggle />
        </main>
    );
}
