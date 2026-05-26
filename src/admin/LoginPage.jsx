import React from 'react';
import { ShieldCheck, Lock, ArrowRight, Mail } from 'lucide-react';

/**
 * LoginPage — shown when Cloudflare Access JWT is missing.
 * Redirects the user to the Cloudflare Access authentication flow.
 * The actual auth (email OTP) is handled entirely by Cloudflare.
 */
export default function LoginPage() {
    const handleLogin = () => {
        // Cloudflare Access redirects to this page after auth.
        // Refreshing re-triggers CF Access check.
        window.location.reload();
    };

    return (
        <div className="min-h-screen bg-[#080810] flex items-center justify-center px-4 relative overflow-hidden">
            {/* Background grid */}
            <div
                className="absolute inset-0 pointer-events-none opacity-20"
                style={{
                    backgroundImage:
                        'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
                    backgroundSize: '40px 40px',
                }}
            />

            {/* Glow orbs */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-[140px] pointer-events-none" />

            <div className="relative z-10 w-full max-w-md">
                {/* Card */}
                <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-10 shadow-2xl backdrop-blur-sm">
                    {/* Icon */}
                    <div className="flex justify-center mb-8">
                        <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                            <ShieldCheck className="w-8 h-8 text-indigo-400" />
                        </div>
                    </div>

                    {/* Heading */}
                    <h1 className="text-2xl font-bold text-white text-center mb-2 font-heading">
                        Restricted Access
                    </h1>
                    <p className="text-gray-500 text-sm text-center mb-8 leading-relaxed">
                        This area is protected by{' '}
                        <span className="text-indigo-400 font-medium">Cloudflare Zero Trust</span>.
                        You'll receive a one-time PIN to your registered email.
                    </p>

                    {/* Info steps */}
                    <div className="space-y-3 mb-8">
                        {[
                            { icon: <Mail className="w-4 h-4" />, text: 'Enter your admin email address' },
                            { icon: <Lock className="w-4 h-4" />, text: 'Receive a 6-digit PIN via email' },
                            { icon: <ShieldCheck className="w-4 h-4" />, text: 'Enter the PIN to gain access' },
                        ].map((step, i) => (
                            <div
                                key={i}
                                className="flex items-center gap-3 bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-3"
                            >
                                <span className="text-indigo-400">{step.icon}</span>
                                <span className="text-gray-400 text-sm">{step.text}</span>
                            </div>
                        ))}
                    </div>

                    {/* CTA */}
                    <button
                        id="admin-login-btn"
                        onClick={handleLogin}
                        className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 group"
                    >
                        Authenticate with Cloudflare
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>

                {/* Footer */}
                <p className="text-center text-gray-700 text-xs mt-6">
                    Unauthorized access attempts are logged and reported.
                </p>
            </div>
        </div>
    );
}
