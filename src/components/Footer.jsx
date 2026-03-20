import React, { useEffect, useState } from 'react';

export default function Footer() {
    const [time, setTime] = useState('');

    useEffect(() => {
        const updateTime = () => setTime(new Date().toLocaleTimeString('nl-NL', { hour12: false }) + ' CET');
        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <footer className="w-full bg-[#0a0a0a] rounded-t-[4rem] text-offwhite pt-24 pb-8 px-6 md:px-12 mt-[-4rem] relative z-20 shadow-[0_-20px_50px_rgba(0,0,0,0.5)] border-t border-offwhite/5 flex flex-col items-center">
            <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-4 gap-12 mb-20 mx-auto">

                {/* Brand */}
                <div className="md:col-span-2 flex flex-col gap-6">
                    <div className="flex items-center">
                        <img src="/h20-studio-logo.png" alt="H20 Studio Logo" className="h-10 object-contain" />
                    </div>
                    <p className="font-data text-offwhite/60 max-w-sm leading-relaxed text-sm">
                        Gaming Impacting the World. Dé plek voor professionele podcasts en video producties in het hart van de H20 Esports Campus.
                    </p>
                </div>

                {/* Links 1 */}
                <div className="flex flex-col gap-4">
                    <h4 className="font-heading font-bold text-lg mb-2">Navigatie</h4>
                    <a href="#faciliteiten" className="font-data text-sm text-offwhite/50 hover:text-accent transition-colors link-lift inline-block w-fit">Faciliteiten</a>
                    <a href="#werkwijze" className="font-data text-sm text-offwhite/50 hover:text-accent transition-colors link-lift inline-block w-fit">Werkwijze</a>
                    <a href="#tarieven" className="font-data text-sm text-offwhite/50 hover:text-accent transition-colors link-lift inline-block w-fit">Tarieven</a>
                    <a href="#" className="font-data text-sm text-offwhite/50 hover:text-accent transition-colors link-lift inline-block w-fit">Contact</a>
                </div>

                {/* Links 2 */}
                <div className="flex flex-col gap-4">
                    <h4 className="font-heading font-bold text-lg mb-2">Locatie</h4>
                    <a href="https://h20.gg" target="_blank" rel="noopener noreferrer" className="font-data text-sm text-offwhite/50 hover:text-white transition-colors leading-relaxed inline-block">
                        Spinnekop 2<br />
                        1444 GN Purmerend<br />
                        Nederland
                    </a>
                    <a href="mailto:sales@h20.gg" className="font-data text-sm text-accent hover:text-white transition-colors mt-2">sales@h20.gg</a>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="w-full max-w-7xl border-t border-offwhite/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-3 bg-surface px-4 py-2 rounded-full border border-offwhite/5">
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
                    <span className="font-data text-xs uppercase tracking-wider text-offwhite/70">System Operational</span>
                    <span className="font-data text-xs text-offwhite/30 border-l border-offwhite/10 pl-3 ml-1">{time}</span>
                </div>

                <div className="flex gap-6 font-data text-xs text-offwhite/40">
                    <a href="#" className="hover:text-offwhite transition-colors">Algemene Voorwaarden</a>
                    <a href="#" className="hover:text-offwhite transition-colors">Privacybeleid</a>
                    <span>&copy; {new Date().getFullYear()} H20 Esports Campus</span>
                </div>
            </div>
        </footer>
    );
}
