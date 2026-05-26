/**
 * Cloudflare Pages Function — GET /api/analytics
 * Returns aggregated analytics from D1 for the admin dashboard.
 * Protected: Cloudflare Access JWT is validated at network level before this runs.
 */
export async function onRequestGet(context) {
    const { env } = context;

    const headers = { 'Content-Type': 'application/json' };

    try {
        const [
            contactsResult,
            eventsResult,
            recentContactsResult,
            dailyVisitorsResult,
            sectionDwellsResult,
            geoDataResult,
            deviceDataResult,
            hourlyDataResult,
        ] = await Promise.all([
            env.DB.prepare('SELECT COUNT(*) as total FROM contacts').first(),
            env.DB.prepare('SELECT COUNT(DISTINCT distinct_id) as total FROM events').first(),
            env.DB.prepare('SELECT * FROM contacts ORDER BY created_at DESC LIMIT 50').all(),
            env.DB.prepare(`
                SELECT date(created_at) as date, COUNT(DISTINCT distinct_id) as visitors
                FROM events
                WHERE created_at >= datetime('now', '-30 days')
                GROUP BY date(created_at)
                ORDER BY date ASC
            `).all(),
            env.DB.prepare(`
                SELECT json_extract(properties, '$.section') as section,
                       ROUND(AVG(json_extract(properties, '$.durationMs')) / 1000, 1) as avg_seconds,
                       COUNT(*) as visits
                FROM events
                WHERE event_name = 'section_dwell'
                  AND json_extract(properties, '$.section') IS NOT NULL
                GROUP BY section
                ORDER BY avg_seconds DESC
            `).all(),
            env.DB.prepare(`
                SELECT country, COUNT(*) as count
                FROM contacts
                WHERE country IS NOT NULL
                GROUP BY country
                ORDER BY count DESC
                LIMIT 10
            `).all(),
            env.DB.prepare(`
                SELECT json_extract(properties, '$.browser') as browser, COUNT(*) as count
                FROM events
                WHERE event_name = 'page_view'
                GROUP BY browser
                ORDER BY count DESC
            `).all(),
            env.DB.prepare(`
                SELECT strftime('%H', created_at) as hour, COUNT(DISTINCT distinct_id) as visitors
                FROM events
                WHERE created_at >= datetime('now', '-7 days')
                GROUP BY hour
                ORDER BY hour ASC
            `).all(),
        ]);

        return new Response(
            JSON.stringify({
                totalContacts: contactsResult?.total || 0,
                uniqueVisitors: eventsResult?.total || 0,
                recentContacts: recentContactsResult?.results || [],
                dailyVisitors: dailyVisitorsResult?.results || [],
                sectionDwells: sectionDwellsResult?.results || [],
                geoData: geoDataResult?.results || [],
                deviceData: deviceDataResult?.results || [],
                hourlyData: hourlyDataResult?.results || [],
            }),
            { status: 200, headers }
        );
    } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), { status: 500, headers });
    }
}
