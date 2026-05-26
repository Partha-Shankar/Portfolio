/**
 * Cloudflare Access JWT utilities
 * Real security is enforced at the Cloudflare network level.
 * Client-side we simply decode the JWT to read the admin email.
 */

export function getCFJWT() {
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
        const [name, value] = cookie.trim().split('=');
        if (name === 'CF_Authorization') return value;
    }
    return null;
}

export function decodeCFJWT(token) {
    try {
        const payload = token.split('.')[1];
        const decoded = JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/')));
        return decoded;
    } catch {
        return null;
    }
}

export function getAdminSession() {
    // Dev bypass: set VITE_DEV_AUTH=true in .env.local
    if (import.meta.env.VITE_DEV_AUTH === 'true') {
        return { email: 'dev@localhost', name: 'Dev Mode' };
    }
    const token = getCFJWT();
    if (!token) return null;
    const payload = decodeCFJWT(token);
    if (!payload) return null;
    // Check token expiry
    if (payload.exp && payload.exp < Date.now() / 1000) return null;
    return { email: payload.email || payload.sub || 'admin', name: payload.name || 'Admin' };
}

export function isAuthenticated() {
    return getAdminSession() !== null;
}
