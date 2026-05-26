import React from 'react';
import { MapPin, Mail, Clock, User } from 'lucide-react';

function timeAgo(dateStr) {
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return 'just now';
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    return `${Math.floor(hrs / 24)}d ago`;
}

export default function ActivityFeed({ contacts = [] }) {
    if (contacts.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-12 text-gray-700">
                <Clock size={32} className="mb-3 opacity-40" />
                <p className="text-sm">No activity yet. Waiting for visitors...</p>
            </div>
        );
    }

    return (
        <div className="space-y-3">
            {contacts.map((c, i) => (
                <div
                    key={c.id || i}
                    className="flex items-start gap-4 p-4 bg-white/[0.02] border border-white/[0.05] rounded-xl hover:border-white/[0.1] transition-all"
                >
                    {/* Avatar */}
                    <div className="w-9 h-9 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-300 text-sm font-bold shrink-0">
                        {c.name?.[0]?.toUpperCase() || '?'}
                    </div>

                    <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2 flex-wrap">
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-medium text-white truncate">{c.name}</span>
                                <span className="inline-flex items-center gap-1 text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full px-2 py-0.5">
                                    <User size={9} />
                                    Contact
                                </span>
                            </div>
                            <span className="text-[11px] text-gray-700 shrink-0">{timeAgo(c.created_at)}</span>
                        </div>

                        <div className="flex items-center gap-1 mt-1">
                            <Mail size={11} className="text-gray-600" />
                            <span className="text-xs text-gray-600 truncate">{c.email}</span>
                        </div>

                        {(c.city || c.country) && (
                            <div className="flex items-center gap-1 mt-0.5">
                                <MapPin size={11} className="text-gray-700" />
                                <span className="text-xs text-gray-700">
                                    {[c.city, c.country].filter(Boolean).join(', ')}
                                </span>
                            </div>
                        )}

                        {c.message && (
                            <p className="text-xs text-gray-600 mt-2 italic leading-relaxed line-clamp-2">
                                "{c.message}"
                            </p>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}
