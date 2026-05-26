import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

export default function StatCard({ label, value, subValue, trend, icon: Icon, accent = 'indigo' }) {
    const colors = {
        indigo: 'bg-indigo-500/10 border-indigo-500/20 text-indigo-400',
        emerald: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400',
        violet: 'bg-violet-500/10 border-violet-500/20 text-violet-400',
        amber: 'bg-amber-500/10 border-amber-500/20 text-amber-400',
        rose: 'bg-rose-500/10 border-rose-500/20 text-rose-400',
    };

    const TrendIcon =
        trend > 0 ? TrendingUp : trend < 0 ? TrendingDown : Minus;
    const trendColor =
        trend > 0 ? 'text-emerald-400' : trend < 0 ? 'text-rose-400' : 'text-gray-600';

    return (
        <div className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-5 hover:border-white/[0.12] transition-all duration-200 group">
            <div className="flex items-start justify-between mb-4">
                <div className={`w-10 h-10 rounded-xl border flex items-center justify-center ${colors[accent]}`}>
                    {Icon && <Icon size={18} />}
                </div>
                {trend !== undefined && (
                    <div className={`flex items-center gap-1 text-xs font-medium ${trendColor}`}>
                        <TrendIcon size={12} />
                        {Math.abs(trend)}%
                    </div>
                )}
            </div>

            <p className="text-2xl font-bold text-white font-heading tabular-nums">{value}</p>
            <p className="text-xs text-gray-600 mt-1">{label}</p>
            {subValue && <p className="text-[11px] text-gray-700 mt-1">{subValue}</p>}
        </div>
    );
}
