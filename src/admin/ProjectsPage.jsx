import React, { useEffect, useState } from 'react';
import { ExternalLink, Save, CheckCircle, Loader2, Globe, Trash2 } from 'lucide-react';
import { projectsData } from '../data/projects';

export default function ProjectsPage() {
    const [links, setLinks] = useState({});        // { project_id: live_url }
    const [editing, setEditing] = useState({});    // { project_id: string }
    const [saving, setSaving] = useState({});      // { project_id: bool }
    const [saved, setSaved] = useState({});        // { project_id: bool }

    // Fetch current live URLs from D1
    useEffect(() => {
        fetch('/api/projects')
            .then(r => r.json())
            .then(data => {
                const map = {};
                (data || []).forEach(row => { map[row.project_id] = row.live_url || ''; });
                setLinks(map);
                setEditing(map);
            })
            .catch(() => {});
    }, []);

    const handleSave = async (projectId) => {
        setSaving(s => ({ ...s, [projectId]: true }));
        try {
            const res = await fetch('/api/projects', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ project_id: projectId, live_url: editing[projectId] || null }),
            });
            if (res.ok) {
                setLinks(l => ({ ...l, [projectId]: editing[projectId] }));
                setSaved(s => ({ ...s, [projectId]: true }));
                setTimeout(() => setSaved(s => ({ ...s, [projectId]: false })), 2500);
            }
        } catch (e) {
            console.error(e);
        } finally {
            setSaving(s => ({ ...s, [projectId]: false }));
        }
    };

    const handleClear = (projectId) => {
        setEditing(e => ({ ...e, [projectId]: '' }));
    };

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-white font-heading">Project Live URLs</h2>
                <p className="text-gray-500 text-sm mt-1">
                    Set or update the live hosting URL for each project. The public portfolio will show a "Live Demo" button when a URL is set.
                </p>
            </div>

            <div className="grid gap-4">
                {projectsData.map(project => (
                    <div
                        key={project.id}
                        className="flex flex-col sm:flex-row sm:items-center gap-4 p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.10] transition-colors"
                    >
                        {/* Project info */}
                        <div className="flex items-center gap-4 sm:w-64 flex-shrink-0">
                            <div className="w-8 h-8 rounded-lg bg-white/[0.06] border border-white/[0.08] flex items-center justify-center flex-shrink-0">
                                <span className="text-xs font-bold text-gray-500">{project.title.slice(0, 2).toUpperCase()}</span>
                            </div>
                            <div>
                                <p className="font-bold text-white text-sm">{project.title}</p>
                                <p className="text-gray-600 text-xs">{project.category}</p>
                            </div>
                        </div>

                        {/* URL input */}
                        <div className="flex items-center gap-2 flex-1 min-w-0">
                            <Globe size={15} className="text-gray-600 flex-shrink-0" />
                            <input
                                type="url"
                                placeholder="https://your-deployment.example.com"
                                value={editing[project.id] || ''}
                                onChange={e => setEditing(ed => ({ ...ed, [project.id]: e.target.value }))}
                                className="flex-1 min-w-0 bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-indigo-500/50 transition-colors placeholder-gray-700"
                            />
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2 flex-shrink-0">
                            {editing[project.id] && (
                                <button
                                    onClick={() => handleClear(project.id)}
                                    className="p-2.5 rounded-lg text-gray-600 hover:text-red-400 hover:bg-red-500/10 transition-all"
                                    title="Clear URL"
                                >
                                    <Trash2 size={14} />
                                </button>
                            )}

                            {editing[project.id] && (
                                <a
                                    href={editing[project.id]}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2.5 rounded-lg text-gray-600 hover:text-indigo-400 hover:bg-indigo-500/10 transition-all"
                                    title="Preview link"
                                >
                                    <ExternalLink size={14} />
                                </a>
                            )}

                            <button
                                onClick={() => handleSave(project.id)}
                                disabled={
                                    saving[project.id] ||
                                    (editing[project.id] || '') === (links[project.id] || '')
                                }
                                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                                style={{
                                    background: saved[project.id] ? '#10b981' : '#6366f1',
                                    color: 'white',
                                }}
                            >
                                {saving[project.id] ? (
                                    <Loader2 size={14} className="animate-spin" />
                                ) : saved[project.id] ? (
                                    <CheckCircle size={14} />
                                ) : (
                                    <Save size={14} />
                                )}
                                {saved[project.id] ? 'Saved' : 'Save'}
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <p className="text-gray-700 text-xs">
                Changes take effect immediately. The public project detail pages fetch live URLs from the database on load.
            </p>
        </div>
    );
}
