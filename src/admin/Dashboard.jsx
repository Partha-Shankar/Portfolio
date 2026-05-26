import React, { useEffect, useState } from 'react';
import { Users, Eye, Clock, Mail } from 'lucide-react';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import StatCard from './components/StatCard';
import ActivityFeed from './components/ActivityFeed';

export default function Dashboard() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch aggregated data from our D1 worker
        // In local dev, we might mock this or just handle errors gracefully if the worker isn't running
        fetch('/api/analytics')
            .then((res) => res.json())
            .then((json) => {
                setData(json);
                setLoading(false);
            })
            .catch((err) => {
                console.error('Failed to fetch analytics:', err);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div className="flex h-full items-center justify-center text-gray-500">Loading metrics...</div>;
    }

    // Fallback data if API fails or is empty
    const stats = data || {
        uniqueVisitors: 0,
        totalContacts: 0,
        dailyVisitors: [],
        recentContacts: [],
    };

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white font-heading">Overview</h2>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                    label="Unique Visitors"
                    value={stats.uniqueVisitors.toLocaleString()}
                    icon={Users}
                    accent="indigo"
                    trend={12.5}
                />
                <StatCard
                    label="Form Submissions"
                    value={stats.totalContacts.toLocaleString()}
                    icon={Mail}
                    accent="emerald"
                    trend={4.2}
                />
                <StatCard
                    label="Avg. Session Duration"
                    value="2m 45s"
                    icon={Clock}
                    accent="violet"
                />
                <StatCard
                    label="Conversion Rate"
                    value={`${stats.uniqueVisitors ? ((stats.totalContacts / stats.uniqueVisitors) * 100).toFixed(1) : 0}%`}
                    icon={Eye}
                    accent="amber"
                />
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                {/* Traffic Chart */}
                <div className="xl:col-span-2 bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6">
                    <h3 className="text-sm font-semibold text-white mb-6">Traffic Over Time (30d)</h3>
                    <div className="h-72">
                        {stats.dailyVisitors.length > 0 ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={stats.dailyVisitors}>
                                    <defs>
                                        <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                                    <XAxis
                                        dataKey="date"
                                        stroke="#4b5563"
                                        fontSize={12}
                                        tickLine={false}
                                        axisLine={false}
                                        tickFormatter={(str) => {
                                            const d = new Date(str);
                                            return `${d.getMonth() + 1}/${d.getDate()}`;
                                        }}
                                    />
                                    <YAxis
                                        stroke="#4b5563"
                                        fontSize={12}
                                        tickLine={false}
                                        axisLine={false}
                                    />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: '#111118',
                                            borderColor: 'rgba(255,255,255,0.1)',
                                            borderRadius: '8px',
                                        }}
                                        itemStyle={{ color: '#e5e7eb' }}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="visitors"
                                        stroke="#6366f1"
                                        strokeWidth={2}
                                        fillOpacity={1}
                                        fill="url(#colorVisits)"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="flex h-full items-center justify-center text-gray-600 text-sm">
                                Not enough data for chart
                            </div>
                        )}
                    </div>
                </div>

                {/* Activity Feed */}
                <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6">
                    <h3 className="text-sm font-semibold text-white mb-6">Recent Activity</h3>
                    <div className="h-72 overflow-y-auto pr-2 custom-scrollbar">
                        <ActivityFeed contacts={stats.recentContacts} />
                    </div>
                </div>
            </div>
        </div>
    );
}
