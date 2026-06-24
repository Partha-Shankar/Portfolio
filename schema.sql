-- Cloudflare D1 Schema
-- Run via: wrangler d1 execute portfolio-db --file=schema.sql

CREATE TABLE IF NOT EXISTS contacts (
    id          TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
    name        TEXT NOT NULL,
    email       TEXT NOT NULL,
    message     TEXT,
    posthog_distinct_id TEXT,
    ip          TEXT,
    city        TEXT,
    country     TEXT,
    created_at  TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS events (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    event_name  TEXT NOT NULL,
    properties  TEXT NOT NULL DEFAULT '{}',  -- JSON string
    distinct_id TEXT NOT NULL DEFAULT 'anonymous',
    created_at  TEXT DEFAULT (datetime('now'))
);

-- Indexes for common query patterns
CREATE INDEX IF NOT EXISTS idx_events_name     ON events(event_name);
CREATE INDEX IF NOT EXISTS idx_events_session  ON events(distinct_id);
CREATE INDEX IF NOT EXISTS idx_events_time     ON events(created_at);
CREATE INDEX IF NOT EXISTS idx_contacts_email  ON contacts(email);
CREATE INDEX IF NOT EXISTS idx_contacts_time   ON contacts(created_at);

-- Project live URL management (admin-controlled)
CREATE TABLE IF NOT EXISTS project_links (
    project_id  TEXT PRIMARY KEY,
    live_url    TEXT,
    updated_at  TEXT DEFAULT (datetime('now'))
);
