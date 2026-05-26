import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../admin/components/Sidebar';
import TopBar from '../admin/components/TopBar';

/**
 * AdminLayout — clean SaaS shell with sidebar.
 * Intentionally has NO Lenis, GSAP, or portfolio animations.
 */
export default function AdminLayout() {
    return (
        <div className="admin-shell flex h-screen bg-[#080810] text-gray-100 overflow-hidden font-sans">
            <Sidebar />
            <div className="flex flex-col flex-1 overflow-hidden">
                <TopBar />
                <main className="flex-1 overflow-y-auto p-6 lg:p-8 space-y-8">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
