import posthog from 'posthog-js';

let initialized = false;

export function initPostHog() {
    if (initialized) return;
    const key = import.meta.env.VITE_POSTHOG_KEY;
    const host = import.meta.env.VITE_POSTHOG_HOST || 'https://us.i.posthog.com';
    if (!key) return;
    posthog.init(key, {
        api_host: host,
        capture_pageview: false, // we fire manually
        persistence: 'localStorage+cookie',
        autocapture: false,
    });
    initialized = true;
}

export function captureEvent(event, properties = {}) {
    if (!initialized) return;
    posthog.capture(event, properties);
}

export function identifyUser(email, name) {
    if (!initialized) return;
    posthog.identify(email, { email, name });
}

export function getDistinctId() {
    if (!initialized) return crypto.randomUUID();
    return posthog.get_distinct_id();
}

export default posthog;
