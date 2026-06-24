/**
 * Cloudflare Pages Function — /api/projects
 * GET  — returns all project live URLs (public, no auth needed)
 * PUT  — updates a project's live URL (Cloudflare Access protects this at network level)
 */

export async function onRequestGet(context) {
    const { env } = context;
    const headers = { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' };

    try {
        const result = await env.DB.prepare(
            'SELECT project_id, live_url, updated_at FROM project_links ORDER BY updated_at DESC'
        ).all();
        return new Response(JSON.stringify(result.results || []), { status: 200, headers });
    } catch (err) {
        // Table may not exist yet — return empty array gracefully
        return new Response(JSON.stringify([]), { status: 200, headers });
    }
}

export async function onRequestPut(context) {
    const { env, request, params } = context;
    const headers = { 'Content-Type': 'application/json' };

    try {
        const { project_id, live_url } = await request.json();

        if (!project_id) {
            return new Response(JSON.stringify({ error: 'project_id required' }), { status: 400, headers });
        }

        // Upsert
        await env.DB.prepare(`
            INSERT INTO project_links (project_id, live_url, updated_at)
            VALUES (?, ?, datetime('now'))
            ON CONFLICT(project_id) DO UPDATE SET live_url = excluded.live_url, updated_at = excluded.updated_at
        `).bind(project_id, live_url || null).run();

        return new Response(JSON.stringify({ success: true }), { status: 200, headers });
    } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), { status: 500, headers });
    }
}
