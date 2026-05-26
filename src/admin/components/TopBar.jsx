import React from 'react';
import { useLocation } from 'react-router-dom';
import { Bell, RefreshCw } from 'lucide-react';
import { getAdminSession } from '../../lib/cloudflare';

const routeTitles = {
    '/internal-ops/dashboard': { title: 'Overview', desc: 'Portfolio performance at a glance' },
    '/internal-ops/analytics': { title: 'Analytics', desc: 'Visitor behaviour & section engagement' },
    '/internal-ops/users': { title: 'Contacts', desc: 'Form submissions & known visitors' },
    '/internal-ops/settings': { title: 'Settings', desc: 'Dashboard & integration configuration' },
};

export default function TopBar() {
    const location = useLocation();
    const session = getAdminSession();
    const meta = routeTitles[location.pathname] || { title: 'Admin', desc: '' };

    return (
        <header className="flex items-center justify-between px-6 lg:px-8 py-4 border-b border-white/[0.06] bg-[#0a0a15] shrink-0">
            <div>
                <h1 className="text-base font-semibold text-white font-heading">{meta.title}</h1>
                <p className="text-xs text-gray-600 mt-0.5">{meta.desc}</p>
            </div>

            <div className="flex items-center gap-3">
                <button
                    onClick={() => window.location.reload()}
                    className="p-2 rounded-lg text-gray-600 hover:text-gray-300 hover:bg-white/[0.05] transition-all"
                    title="Refresh data"
                >
                    <RefreshCw size={15} />
                </button>

                {/* Admin avatar */}
                <div className="flex items-center gap-2 bg-white/[0.04] border border-white/[0.08] rounded-xl px-3 py-1.5">
                    <div className="w-6 h-6 rounded-full bg-indigo-500/30 flex items-center justify-center text-indigo-300 text-xs font-bold">
                        {session?.email?.[0]?.toUpperCase() || 'A'}
                    </div>
                    <span className="text-xs text-gray-400 hidden sm:block max-w-[160px] truncate">
                        {session?.email || 'admin'}
                    </span>
                </div>
            </div>
        </header>
    );
}
