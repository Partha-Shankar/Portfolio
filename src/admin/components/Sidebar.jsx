import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
    LayoutDashboard, BarChart2, Users, Settings,
    ShieldCheck, LogOut, Zap, FolderOpen,
} from 'lucide-react';

const navItems = [
    { to: '/internal-ops/dashboard', icon: <LayoutDashboard size={18} />, label: 'Overview' },
    { to: '/internal-ops/analytics', icon: <BarChart2 size={18} />, label: 'Analytics' },
    { to: '/internal-ops/users', icon: <Users size={18} />, label: 'Contacts' },
    { to: '/internal-ops/projects', icon: <FolderOpen size={18} />, label: 'Projects' },
    { to: '/internal-ops/settings', icon: <Settings size={18} />, label: 'Settings' },
];

export default function Sidebar() {
    const navigate = useNavigate();

    return (
        <aside className="hidden lg:flex flex-col w-60 bg-[#0c0c18] border-r border-white/[0.06] shrink-0">
            {/* Logo */}
            <div className="flex items-center gap-3 px-6 py-6 border-b border-white/[0.06]">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center">
                    <Zap size={16} className="text-indigo-400" />
                </div>
                <div>
                    <p className="text-sm font-bold text-white font-heading">OpsPanel</p>
                    <p className="text-[10px] text-gray-600 uppercase tracking-widest">Admin</p>
                </div>
            </div>

            {/* Nav */}
            <nav className="flex-1 px-3 py-6 space-y-1">
                {navItems.map(({ to, icon, label }) => (
                    <NavLink
                        key={to}
                        to={to}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
                                isActive
                                    ? 'bg-indigo-500/10 text-indigo-300 border border-indigo-500/20'
                                    : 'text-gray-500 hover:text-gray-300 hover:bg-white/[0.04]'
                            }`
                        }
                    >
                        {icon}
                        {label}
                    </NavLink>
                ))}
            </nav>

            {/* Footer */}
            <div className="px-3 py-4 border-t border-white/[0.06] space-y-1">
                <div className="flex items-center gap-2 px-3 py-2">
                    <ShieldCheck size={14} className="text-emerald-500" />
                    <span className="text-[11px] text-emerald-600 font-medium">CF Access Protected</span>
                </div>
                <button
                    onClick={() => navigate('/')}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-600 hover:text-gray-400 hover:bg-white/[0.04] transition-all"
                >
                    <LogOut size={16} />
                    Back to Portfolio
                </button>
            </div>
        </aside>
    );
}
