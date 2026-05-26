/**
 * Cloudflare Pages Function — POST /api/events
 * Logs analytics events (section_dwell, click, page_view) to D1.
 */
export async function onRequestPost(context) {
    const { request, env } = context;

    const headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
    };

    try {
        const body = await request.json();
        const { event, properties, distinct_id } = body;

        if (!event) {
            return new Response(JSON.stringify({ error: 'Missing event name' }), {
                status: 400,
                headers,
            });
        }

        await env.DB.prepare(
            `INSERT INTO events (event_name, properties, distinct_id, created_at)
             VALUES (?, ?, ?, datetime('now'))`
        )
            .bind(event, JSON.stringify(properties || {}), distinct_id || 'anonymous')
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
