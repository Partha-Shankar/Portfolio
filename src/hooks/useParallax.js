import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * useParallax — apply a GSAP scrub-based parallax to a ref element.
 * @param {React.RefObject} ref - The element to animate.
 * @param {object} opts
 * @param {number} opts.yFrom   - Starting Y offset (px). Default -60.
 * @param {number} opts.yTo     - Ending Y offset (px).   Default 60.
 * @param {number} opts.scrub   - ScrollTrigger scrub value. Default 1.5.
 * @param {string} opts.start   - ScrollTrigger start. Default 'top bottom'.
 * @param {string} opts.end     - ScrollTrigger end.   Default 'bottom top'.
 * @param {number} opts.opacity - Optional fade from this value.
 */
export function useParallax(ref, {
    yFrom = -60,
    yTo = 60,
    scrub = 1.5,
    start = 'top bottom',
    end = 'bottom top',
    opacity = null,
} = {}) {
    useEffect(() => {
        if (!ref.current) return;

        const anim = gsap.fromTo(
            ref.current,
            {
                y: yFrom,
                ...(opacity !== null ? { opacity } : {}),
            },
            {
                y: yTo,
                ...(opacity !== null ? { opacity: 1 } : {}),
                ease: 'none',
                scrollTrigger: {
                    trigger: ref.current,
                    start,
                    end,
                    scrub,
                },
            }
        );

        return () => {
            anim.scrollTrigger?.kill();
            anim.kill();
        };
    }, []);
}

/**
 * useParallaxScale — scale up as element enters viewport.
 */
export function useParallaxScale(ref, { scaleFrom = 0.92, scaleTo = 1, scrub = 1.5 } = {}) {
    useEffect(() => {
        if (!ref.current) return;
        const anim = gsap.fromTo(
            ref.current,
            { scale: scaleFrom },
            {
                scale: scaleTo,
                ease: 'none',
                scrollTrigger: {
                    trigger: ref.current,
                    start: 'top bottom',
                    end: 'center center',
                    scrub,
                },
            }
        );
        return () => {
            anim.scrollTrigger?.kill();
            anim.kill();
        };
    }, []);
}
