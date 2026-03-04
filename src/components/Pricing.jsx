import React from 'react';
import { CheckCircle } from 'lucide-react';

export default function Pricing({ setBookingType }) {
    const handleBookClick = (type) => {
        if (setBookingType) setBookingType(type);
        document.getElementById('boeken')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section id="tarieven" className="py-32 px-6 md:px-12 bg-background relative z-10 w-full flex items-center justify-center">
            <div className="max-w-7xl mx-auto w-full">
                <div className="mb-20 text-center max-w-2xl mx-auto">
                    <h2 className="font-heading font-bold text-4xl text-offwhite mb-4 tracking-tight">
                        Transparante Tarieven
                    </h2>
                    <p className="font-data text-offwhite/50">Geen onverwachte kosten. Standaard inclusief gebruik van alle high-end apparatuur en (basic) technische support.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Tier 1 */}
                    <div className="bg-surface rounded-3xl p-8 border border-offwhite/10 flex flex-col justify-between">
                        <div>
                            <h3 className="font-heading font-bold text-lg text-offwhite/70 mb-2 uppercase tracking-widest">Pilot</h3>
                            <div className="flex items-baseline gap-2 mb-6">
                                <span className="font-drama italic text-5xl text-offwhite">€150</span>
                                <span className="font-data text-sm text-offwhite/50">/ uur</span>
                            </div>
                            <ul className="flex flex-col gap-4 font-data text-sm text-offwhite/60 mb-8">
                                <li className="flex items-start gap-3"><CheckCircle className="w-4 h-4 text-accent shrink-0 mt-0.5" /> Gebruik van de studio ruimte</li>
                                <li className="flex items-start gap-3"><CheckCircle className="w-4 h-4 text-accent shrink-0 mt-0.5" /> High-end audio en video apparatuur</li>
                                <li className="flex items-start gap-3"><CheckCircle className="w-4 h-4 text-accent shrink-0 mt-0.5" /> Basic setup support</li>
                            </ul>
                        </div>
                        <button onClick={() => handleBookClick('Uur')} className="magnetic-btn w-full py-4 text-sm font-heading font-bold border border-offwhite/20 text-offwhite rounded-xl hover:bg-offwhite/5 uppercase tracking-wide">
                            Boek per Uur
                        </button>
                    </div>

                    {/* Tier 2 (Highlighted) */}
                    <div className="bg-surface rounded-3xl p-8 border-2 border-accent relative transform md:-translate-y-4 flex flex-col justify-between drop-shadow-[0_0_30px_rgba(230,59,46,0.15)] overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
                        <div>
                            <div className="inline-block bg-accent text-white font-heading font-bold text-[10px] px-3 py-1 rounded-full uppercase tracking-widest mb-4">Meest Gekozen</div>
                            <h3 className="font-heading font-bold text-lg text-accent mb-2 uppercase tracking-widest">Dagdeel</h3>
                            <div className="flex items-baseline gap-2 mb-6">
                                <span className="font-drama italic text-5xl text-white">€550</span>
                                <span className="font-data text-sm text-offwhite/70">/ 4 uur</span>
                            </div>
                            <ul className="flex flex-col gap-4 font-data text-sm text-offwhite mb-8">
                                <li className="flex items-start gap-3"><CheckCircle className="w-4 h-4 text-accent shrink-0 mt-0.5" /> Halve dag volledige studio toegang</li>
                                <li className="flex items-start gap-3"><CheckCircle className="w-4 h-4 text-accent shrink-0 mt-0.5" /> Alle 4K video en Shure audio</li>
                                <li className="flex items-start gap-3"><CheckCircle className="w-4 h-4 text-accent shrink-0 mt-0.5" /> Eigen technicus stand-by</li>
                                <li className="flex items-start gap-3"><CheckCircle className="w-4 h-4 text-accent shrink-0 mt-0.5" /> RAW bestanden direct mee</li>
                            </ul>
                        </div>
                        <button onClick={() => handleBookClick('Dagdeel')} className="magnetic-btn w-full py-4 text-sm font-heading font-bold bg-accent text-white rounded-xl hover:bg-red-600 uppercase tracking-wide">
                            Boek Dagdeel
                        </button>
                    </div>

                    {/* Tier 3 */}
                    <div className="bg-surface rounded-3xl p-8 border border-offwhite/10 flex flex-col justify-between">
                        <div>
                            <h3 className="font-heading font-bold text-lg text-offwhite/70 mb-2 uppercase tracking-widest">Productie</h3>
                            <div className="flex items-baseline gap-2 mb-6">
                                <span className="font-drama italic text-3xl text-offwhite">Op aanvraag</span>
                            </div>
                            <ul className="flex flex-col gap-4 font-data text-sm text-offwhite/60 mb-8">
                                <li className="flex items-start gap-3"><CheckCircle className="w-4 h-4 text-accent shrink-0 mt-0.5" /> Maatwerk video producties</li>
                                <li className="flex items-start gap-3"><CheckCircle className="w-4 h-4 text-accent shrink-0 mt-0.5" /> Volledige regie (multi-cam)</li>
                                <li className="flex items-start gap-3"><CheckCircle className="w-4 h-4 text-accent shrink-0 mt-0.5" /> Post-productie (montage, shorts)</li>
                                <li className="flex items-start gap-3"><CheckCircle className="w-4 h-4 text-accent shrink-0 mt-0.5" /> Live-streaming opties</li>
                            </ul>
                        </div>
                        <button onClick={() => handleBookClick('Productie')} className="magnetic-btn w-full py-4 text-sm font-heading font-bold border border-offwhite/20 text-offwhite rounded-xl hover:bg-offwhite/5 uppercase tracking-wide">
                            Neem Contact Op
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
