import React, { useEffect, useState } from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell
} from 'recharts';

const COLORS = ['#6366f1', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444'];

export default function AnalyticsPage() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/analytics')
            .then((res) => res.json())
            .then((json) => {
                setData(json);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    if (loading) return <div className="text-gray-500">Loading analytics...</div>;

    const stats = data || { sectionDwells: [], deviceData: [] };

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white font-heading">Deep Analytics</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Section Dwell Times */}
                <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6">
                    <h3 className="text-sm font-semibold text-white mb-6">Average Time per Section (s)</h3>
                    <div className="h-80">
                        {stats.sectionDwells.length > 0 ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={stats.sectionDwells} layout="vertical" margin={{ left: 20 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={true} vertical={false} />
                                    <XAxis type="number" stroke="#4b5563" fontSize={12} />
                                    <YAxis dataKey="section" type="category" stroke="#4b5563" fontSize={12} width={80} />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#111118', borderColor: 'rgba(255,255,255,0.1)' }}
                                    />
                                    <Bar dataKey="avg_seconds" fill="#8b5cf6" radius={[0, 4, 4, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="flex h-full items-center justify-center text-gray-600">No dwell data yet</div>
                        )}
                    </div>
                </div>

                {/* Device/Browser Split */}
                <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6">
                    <h3 className="text-sm font-semibold text-white mb-6">Browsers</h3>
                    <div className="h-80">
                        {stats.deviceData.length > 0 ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={stats.deviceData}
                                        dataKey="count"
                                        nameKey="browser"
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={100}
                                        paddingAngle={5}
                                    >
                                        {stats.deviceData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip contentStyle={{ backgroundColor: '#111118', borderColor: 'rgba(255,255,255,0.1)' }} />
                                </PieChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="flex h-full items-center justify-center text-gray-600">No browser data yet</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
