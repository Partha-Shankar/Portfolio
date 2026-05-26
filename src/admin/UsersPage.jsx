import React, { useEffect, useState } from 'react';
import { Search, MapPin, Mail, Calendar } from 'lucide-react';

export default function UsersPage() {
    const [contacts, setContacts] = useState([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/analytics')
            .then(res => res.json())
            .then(data => {
                setContacts(data.recentContacts || []);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    const filtered = contacts.filter(c => 
        c.name?.toLowerCase().includes(search.toLowerCase()) || 
        c.email?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h2 className="text-2xl font-bold text-white font-heading">Known Contacts</h2>
                
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input
                        type="text"
                        placeholder="Search by name or email..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="bg-white/[0.03] border border-white/[0.08] rounded-xl pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-indigo-500 w-full sm:w-64 transition-colors"
                    />
                </div>
            </div>

            <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-white/[0.06] text-xs font-semibold text-gray-400 bg-white/[0.01]">
                                <th className="p-4 pl-6">Contact</th>
                                <th className="p-4">Location</th>
                                <th className="p-4">Message</th>
                                <th className="p-4">Date</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/[0.04]">
                            {loading ? (
                                <tr><td colSpan="4" className="p-8 text-center text-gray-500">Loading contacts...</td></tr>
                            ) : filtered.length === 0 ? (
                                <tr><td colSpan="4" className="p-8 text-center text-gray-500">No contacts found</td></tr>
                            ) : (
                                filtered.map(c => (
                                    <tr key={c.id} className="hover:bg-white/[0.02] transition-colors">
                                        <td className="p-4 pl-6">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-indigo-500/10 text-indigo-400 flex items-center justify-center font-bold text-xs">
                                                    {c.name?.[0]?.toUpperCase()}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium text-gray-200">{c.name}</p>
                                                    <div className="flex items-center gap-1 text-xs text-gray-500 mt-0.5">
                                                        <Mail className="w-3 h-3" />
                                                        {c.email}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-1.5 text-sm text-gray-400">
                                                <MapPin className="w-3.5 h-3.5" />
                                                {[c.city, c.country].filter(Boolean).join(', ') || 'Unknown'}
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <p className="text-sm text-gray-400 max-w-xs truncate" title={c.message}>
                                                {c.message || '-'}
                                            </p>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-1.5 text-sm text-gray-400">
                                                <Calendar className="w-3.5 h-3.5" />
                                                {new Date(c.created_at).toLocaleDateString()}
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
