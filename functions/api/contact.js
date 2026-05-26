/**
 * Cloudflare Pages Function — POST /api/contact
 * Writes a contact form submission to Cloudflare D1.
 * Bind: DB → your D1 database in wrangler.toml / Pages dashboard
 */
export async function onRequestPost(context) {
    const { request, env } = context;

    // Basic CORS
    const headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
    };

    try {
        const body = await request.json();
        const { name, email, message, posthog_distinct_id, ip, city, country } = body;

        if (!name || !email || !message) {
            return new Response(JSON.stringify({ error: 'Missing required fields' }), {
                status: 400,
                headers,
            });
        }

        await env.DB.prepare(
            `INSERT INTO contacts (name, email, message, posthog_distinct_id, ip, city, country)
             VALUES (?, ?, ?, ?, ?, ?, ?)`
        )
            .bind(name, email, message, posthog_distinct_id || null, ip || null, city || null, country || null)
            .run();

        return new Response(JSON.stringify({ success: true }), { status: 200, headers });
    } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), { status: 500, headers });
    }
}

export async function onRequestOptions() {
    return new Response(null, {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
        },
    });
}
