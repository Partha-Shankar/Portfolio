/**
 * Section-level dwell time tracker using IntersectionObserver.
 * Fires events to our own D1 Worker AND PostHog.
 */
import { captureEvent, getDistinctId } from './posthog';

const observers = new Map();
const sectionTimers = new Map();

async function sendEvent(event, properties) {
    captureEvent(event, properties);
    try {
        await fetch('/api/events', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                event,
                properties,
                distinct_id: getDistinctId(),
            }),
        });
    } catch {
        // Non-blocking: swallow network errors silently
    }
}

export function trackSection(sectionId, element) {
    if (!element || observers.has(sectionId)) return;

    const observer = new IntersectionObserver(
        ([entry]) => {
            if (entry.isIntersecting) {
                sectionTimers.set(sectionId, Date.now());
                sendEvent('section_enter', { section: sectionId });
            } else {
                const enterTime = sectionTimers.get(sectionId);
                if (enterTime) {
                    const durationMs = Date.now() - enterTime;
                    sectionTimers.delete(sectionId);
                    sendEvent('section_dwell', { section: sectionId, durationMs });
                }
            }
        },
        { threshold: 0.3 }
    );

    observer.observe(element);
    observers.set(sectionId, observer);
}

export function untrackSection(sectionId) {
    const observer = observers.get(sectionId);
    if (observer) {
        observer.disconnect();
        observers.delete(sectionId);
    }
}

export function trackClick(label, properties = {}) {
    sendEvent('click', { label, ...properties });
}

export async function resolveGeo() {
    try {
        const token = import.meta.env.VITE_IPINFO_TOKEN;
        const url = token
            ? `https://ipinfo.io/json?token=${token}`
            : 'https://ipinfo.io/json';
        const res = await fetch(url);
        const data = await res.json();
        return {
            ip: data.ip,
            city: data.city,
            country: data.country,
            region: data.region,
        };
    } catch {
        return {};
    }
}
