import React, { useState } from 'react';
import { CheckCircle } from 'lucide-react';

const PACKAGES = [
    {
        id: 'gratis-pilot', label: 'Gratis Pilot',
        priceDisplay: 'Gratis', priceSub: 'eenmalig', price: 0,
        highlight: false, badge: null,
        category: 'Kennismaking',
        features: [
            '30 min proefopname',
            'Licht- en geluidtest',
            'Kennismaking & workflow uitleg',
            'Geen verplichtingen',
        ],
    },
    {
        id: '1u', label: '1 Uur',
        priceDisplay: '€395', priceSub: '/ sessie', price: 395,
        highlight: false, badge: null,
        category: 'Losse opname',
        features: [
            'Podcaststudio & voorbereiding set',
            'Technicus / regisseur inbegrepen',
            '4-camera live schakeling',
            'Professioneel licht & geluid',
        ],
    },
    {
        id: '2u', label: '2 Uur',
        priceDisplay: '€595', priceSub: '/ sessie', price: 595,
        highlight: true, badge: 'MEEST FLEXIBEL',
        category: 'Losse opname',
        features: [
            'Alles van 1 uur',
            'Extra opnametijd',
            'Mogelijkheid voor kleine decorwissel',
            'Technicus / regisseur inbegrepen',
        ],
    },
    {
        id: 'halve-dag', label: 'Halve Dag (4u)',
        priceDisplay: '€795', priceSub: '/ sessie', price: 795,
        highlight: false, badge: null,
        category: 'Losse opname',
        features: [
            'Bulk-opnames in één dagdeel',
            'Technicus / regisseur inbegrepen',
            'Koffie & thee verzorgd',
            'Volledige facilitaire ondersteuning',
        ],
    },
    {
        id: 'startpakket-1', label: 'Startpakket 1',
        priceDisplay: '€2.450', priceSub: 'eenmalig', price: 2450,
        highlight: false, badge: null,
        category: 'Nieuw format',
        features: [
            '3 afleveringen',
            'Format-setup',
            'Basis audio / video design',
            'Live schakelen',
            'Oplevering direct na opname',
        ],
    },
    {
        id: 'startpakket-2', label: 'Startpakket 2',
        priceDisplay: '€5.950', priceSub: 'eenmalig', price: 5950,
        highlight: false, badge: null,
        category: 'Nieuw format',
        features: [
            '3 afleveringen',
            'Uitgebreide format-ontwikkeling',
            'Audio / video design',
            'Redactie & live regie',
            'Basis montage & productiebegeleiding',
            '3 social snippets per aflevering',
        ],
    },
];

export const ADDONS = [
    { id: 'post',       label: 'Post-productie',       priceLabel: '€350',            price: 350,  sub: 'Knippen/inkorten, fine-tuning audio, kleurcorrectie en titels' },
    { id: 'snippets',   label: '5 Social Snippets',    priceLabel: '€250',            price: 250,  sub: 'Ondertiteling, hooks, headliner-stijl, diverse formaten' },
    { id: 'format-dev', label: 'Format Ontwikkeling',  priceLabel: '€800–1.600',      price: null, sub: 'Scripting, flow en format-bewaking' },
    { id: 'design',     label: 'Video / Audio Design', priceLabel: '€400–800',        price: null, sub: 'Leader, bumpers en custom motion graphics' },
    { id: 'decor',      label: 'Custom Decor / Set',   priceLabel: '€500–2.500',      price: null, sub: 'Van simpele kleurwissel tot eigen meubels en aankleding' },
    { id: 'regie',      label: 'Redactie & Regie',     priceLabel: '€125/uur',        price: null, sub: 'Inhoudelijke ondersteuning bij voorbereiding en tijdens opname' },
    { id: 'host',       label: 'Host / Presentator',   priceLabel: 'Vanaf €400/afl.', price: null, sub: 'Professionele dagvoorzitter of host voor elke aflevering' },
];

// ─── Step header ────────────────────────────────────────────────────────────
function StepRow({ num, label, summary, isActive, isCompleted, onEdit, children }) {
    return (
        <div className={`border-b transition-colors duration-300 ${isActive ? 'border-offwhite/10' : 'border-offwhite/5'}`} id={num === 2 ? 'addons-step' : undefined}>
            <div className="flex items-center justify-between py-6">
                <div className="flex items-center gap-5 min-w-0">
                    <span className={`font-data text-xs tracking-widest shrink-0 transition-colors ${isActive ? 'text-accent' : isCompleted ? 'text-offwhite/40' : 'text-offwhite/15'}`}>
                        {String(num).padStart(2, '0')}
                    </span>
                    <span className={`font-heading font-bold text-sm uppercase tracking-widest transition-colors ${isActive ? 'text-offwhite' : isCompleted ? 'text-offwhite/50' : 'text-offwhite/20'}`}>
                        {label}
                    </span>
                    {isCompleted && summary && (
                        <span className="font-data text-sm text-offwhite/35 truncate hidden sm:block">— {summary}</span>
                    )}
                </div>
                {isCompleted && (
                    <button
                        onClick={onEdit}
                        className="font-data text-[11px] text-accent uppercase tracking-widest hover:underline shrink-0 ml-4"
                    >
                        Wijzig
                    </button>
                )}
            </div>
            {isActive && <div className="pb-12">{children}</div>}
        </div>
    );
}

// ─── Main component ──────────────────────────────────────────────────────────
export default function Pricing({ setBookingConfig }) {
    const [activeStep, setActiveStep] = useState(1);
    const [pkg, setPkg] = useState(null);
    const [selectedAddons, setSelectedAddons] = useState([]);

    const pkgData = pkg ? PACKAGES.find(p => p.id === pkg) : null;

    const handlePkgSelect = (pkgId) => {
        const changed = pkgId !== pkg;
        setPkg(pkgId);
        if (changed) setSelectedAddons([]);
        setTimeout(() => {
            setActiveStep(2);
            setTimeout(() => {
                document.getElementById('addons-step')?.scrollIntoView({ behavior: 'smooth' });
            }, 400);
        }, 550);
    };

    const toggleAddon = (addonId) => {
        setSelectedAddons(prev =>
            prev.includes(addonId) ? prev.filter(a => a !== addonId) : [...prev, addonId]
        );
    };

    // ── Price calc ──
    const getPriceInfo = () => {
        if (!pkgData) return null;
        const base = pkgData.price;
        let addonTotal = 0;
        let hasRange = false;
        for (const id of selectedAddons) {
            const a = ADDONS.find(x => x.id === id);
            if (a?.price === null) hasRange = true;
            else if (a?.price) addonTotal += a.price;
        }
        if (base === 0 && addonTotal === 0 && !hasRange) return { display: 'Gratis', isRange: false };
        if (hasRange) return { display: `Vanaf \u20AC${(base + addonTotal).toLocaleString('nl-NL')}`, isRange: true };
        return { display: `\u20AC${(base + addonTotal).toLocaleString('nl-NL')}`, isRange: false };
    };

    const priceInfo = getPriceInfo();

    const step1Summary = pkgData?.label ?? null;
    const step2Summary = selectedAddons.length > 0
        ? `${selectedAddons.length} add-on${selectedAddons.length > 1 ? 's' : ''}`
        : 'Geen add-ons';

    const handleCTA = () => {
        if (!setBookingConfig) return;
        setBookingConfig({
            pkg,
            pkgLabel: pkgData?.label,
            pkgPriceDisplay: pkgData?.priceDisplay,
            pkgSub: pkgData?.priceSub ?? null,
            addons: selectedAddons.map(id => {
                const a = ADDONS.find(x => x.id === id);
                return { id, label: a?.label, priceLabel: a?.priceLabel };
            }),
            priceInfo,
        });
        setTimeout(() => {
            document.getElementById('boeken')?.scrollIntoView({ behavior: 'smooth' });
        }, 400);
    };

    return (
        <section id="prijzen" className="py-32 px-6 md:px-12 bg-background relative z-10 w-full flex items-center justify-center">
            <div className="max-w-6xl mx-auto w-full">

                {/* Header */}
                <div className="mb-16 text-center">
                    <h2 className="font-heading font-bold text-4xl text-offwhite mb-4 tracking-tight">
                        Transparante Tarieven
                    </h2>
                    <p className="font-data text-sm text-offwhite/50">
                        Geen onverwachte kosten. Standaard inclusief gebruik van alle high-end apparatuur en (basic) technische support.
                    </p>
                </div>

                {/* Accordion */}
                <div className="border-t border-offwhite/10">

                    {/* Step 1 — Pakket */}
                    <StepRow
                        num={1} label="Pakket"
                        summary={step1Summary}
                        isActive={activeStep === 1}
                        isCompleted={activeStep > 1}
                        onEdit={() => setActiveStep(1)}
                    >
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {PACKAGES.map((p) => {
                                const isSelected = pkg === p.id;
                                return (
                                    <div
                                        key={p.id}
                                        onClick={() => handlePkgSelect(p.id)}
                                        className={`bg-surface rounded-3xl p-7 border-2 flex flex-col justify-between transition-all duration-300 overflow-hidden relative cursor-pointer group ${
                                            p.highlight
                                                ? 'border-accent drop-shadow-[0_0_30px_rgba(230,59,46,0.15)] md:-translate-y-4'
                                                : isSelected
                                                ? 'border-offwhite/80 bg-offwhite/5 md:-translate-y-1'
                                                : 'border-offwhite/10 hover:border-offwhite/30'
                                        }`}
                                    >
                                        {p.highlight && (
                                            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 blur-3xl -mr-20 -mt-20 pointer-events-none" />
                                        )}
                                        <div>
                                            <div className="flex items-start justify-between mb-1">
                                                <span className="font-data text-[10px] text-offwhite/30 uppercase tracking-widest">{p.category}</span>
                                                {p.badge && (
                                                    <div className="inline-block bg-accent text-white font-heading font-bold text-[10px] px-3 py-1 rounded-full uppercase tracking-widest">
                                                        {p.badge}
                                                    </div>
                                                )}
                                            </div>
                                            <h3 className={`font-heading font-bold text-lg mb-4 uppercase tracking-widest transition-colors ${
                                                p.highlight ? 'text-accent' : isSelected ? 'text-offwhite' : 'text-offwhite/70 group-hover:text-offwhite'
                                            }`}>
                                                {p.label}
                                            </h3>
                                            <div className="flex items-baseline gap-2 mb-6">
                                                <span className="font-drama italic text-4xl text-offwhite">{p.priceDisplay}</span>
                                                {p.priceSub && (
                                                    <span className="font-data text-sm text-offwhite/50">{p.priceSub}</span>
                                                )}
                                            </div>
                                            <ul className="flex flex-col gap-3 font-data text-sm text-offwhite/60">
                                                {p.features.map((f, fi) => (
                                                    <li key={fi} className="flex items-start gap-3">
                                                        <CheckCircle className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                                                        {f}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className={`mt-6 w-full py-3 text-sm font-heading font-bold rounded-xl uppercase tracking-wide text-center transition-all duration-200 ${
                                            isSelected && !p.highlight
                                                ? 'bg-offwhite text-background'
                                                : isSelected && p.highlight
                                                ? 'bg-accent text-white'
                                                : p.highlight
                                                ? 'bg-accent text-white group-hover:bg-red-600'
                                                : 'border border-offwhite/20 text-offwhite/60 group-hover:border-offwhite/50 group-hover:text-offwhite'
                                        }`}>
                                            {isSelected ? 'Geselecteerd ✓' : p.price === 0 ? 'Plan Gratis Pilot' : 'Selecteer Pakket'}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </StepRow>

                    {/* Step 2 — Add-ons */}
                    <StepRow
                        num={2} label="Add-ons"
                        summary={activeStep > 2 ? step2Summary : null}
                        isActive={activeStep === 2}
                        isCompleted={false}
                        onEdit={null}
                    >
                        <p className="font-data text-xs text-offwhite/40 uppercase tracking-widest mb-8">
                            Optioneel — voeg toe wat bij jouw project past
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
                            {ADDONS.map((addon) => {
                                const isChecked = selectedAddons.includes(addon.id);
                                return (
                                    <button
                                        key={addon.id}
                                        onClick={() => toggleAddon(addon.id)}
                                        className={`flex items-center justify-between gap-4 bg-surface rounded-2xl p-5 border transition-all duration-200 text-left ${
                                            isChecked ? 'border-accent bg-accent/5' : 'border-offwhite/10 hover:border-offwhite/25'
                                        }`}
                                    >
                                        <div>
                                            <p className="font-heading font-bold text-sm text-offwhite uppercase tracking-wide">{addon.label}</p>
                                            <p className="font-data text-xs text-accent/80 mt-0.5">{addon.priceLabel}</p>
                                            {addon.sub && <p className="font-data text-xs text-offwhite/35 mt-1 leading-snug">{addon.sub}</p>}
                                        </div>
                                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                                            isChecked ? 'bg-accent border-accent' : 'border-offwhite/30'
                                        }`}>
                                            {isChecked && <div className="w-2 h-2 bg-white rounded-full" />}
                                        </div>
                                    </button>
                                );
                            })}
                        </div>

                        {/* Live prijs + CTA */}
                        <div className="flex flex-col items-center gap-8 pt-4 border-t border-offwhite/10">
                            {priceInfo && (
                                <div className="text-center">
                                    <p className="font-data text-xs text-offwhite/40 uppercase tracking-widest mb-3">Prijsindicatie</p>
                                    <p className="font-drama italic text-6xl text-offwhite">{priceInfo.display}</p>
                                    {priceInfo.isRange && (
                                        <p className="font-data text-xs text-offwhite/40 mt-2 uppercase tracking-widest">Exacte prijs op aanvraag</p>
                                    )}
                                </div>
                            )}
                            <button
                                onClick={handleCTA}
                                className="magnetic-btn bg-accent text-white px-10 py-4 rounded-full font-heading font-bold text-sm tracking-widest uppercase"
                            >
                                Claim Jouw Tijdslot
                            </button>
                        </div>
                    </StepRow>

                </div>
            </div>
        </section>
    );
}
