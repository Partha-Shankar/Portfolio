import React from 'react';
import { Shield, Key, Database, Globe } from 'lucide-react';

export default function SettingsPage() {
    return (
        <div className="space-y-6 max-w-4xl">
            <div>
                <h2 className="text-2xl font-bold text-white font-heading">Settings</h2>
                <p className="text-gray-500 text-sm mt-1">Manage integrations and system configuration.</p>
            </div>

            <div className="grid gap-4">
                {/* Security */}
                <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                            <Shield size={20} />
                        </div>
                        <h3 className="text-lg font-semibold text-white">Authentication</h3>
                    </div>
                    <p className="text-sm text-gray-400 mb-4">
                        This dashboard is secured via Cloudflare Zero Trust. To add or remove admin access, modify the Access Policy in your Cloudflare dashboard.
                    </p>
                    <div className="flex items-center gap-2 text-xs text-gray-500 bg-black/20 p-3 rounded-lg border border-white/[0.04]">
                        <Key size={14} />
                        Managed entirely at the network edge.
                    </div>
                </div>

                {/* Database */}
                <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400">
                            <Database size={20} />
                        </div>
                        <h3 className="text-lg font-semibold text-white">Database Storage</h3>
                    </div>
                    <p className="text-sm text-gray-400 mb-4">
                        Using Cloudflare D1 (SQLite) for storing contact submissions and analytics events.
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-black/20 p-3 rounded-lg border border-white/[0.04]">
                            <p className="text-xs text-gray-500 mb-1">Max Storage</p>
                            <p className="text-sm text-white font-medium">5 GB (Free Tier)</p>
                        </div>
                        <div className="bg-black/20 p-3 rounded-lg border border-white/[0.04]">
                            <p className="text-xs text-gray-500 mb-1">Auto-Backups</p>
                            <p className="text-sm text-white font-medium">Daily</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
