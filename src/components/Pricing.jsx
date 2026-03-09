import React, { useState } from 'react';
import { CheckCircle, ArrowRight } from 'lucide-react';

const GOALS = [
    { id: 'pilot',   label: 'Eerst uitproberen',     sub: 'Gratis pilot, geen verplichtingen' },
    { id: 'losse',   label: 'Losse opname(s)',        sub: 'Flexibel inboeken per sessie' },
    { id: 'format',  label: 'Nieuw format lanceren',  sub: 'Startpakketten incl. format-setup' },
    { id: 'seizoen', label: 'Volledig seizoen',       sub: 'Compleet ontzorgd van A tot Z' },
];

const PACKAGES = {
    pilot: [
        {
            id: 'gratis-pilot',
            label: 'Gratis Pilot',
            priceDisplay: 'Gratis',
            priceSub: 'eenmalig',
            price: 0,
            highlight: true,
            badge: null,
            features: [
                '1 uur studio gebruik',
                'High-end audio en video apparatuur',
                'Basic setup support',
                'Geen verplichtingen',
            ],
        },
    ],
    losse: [
        {
            id: '1u',
            label: '1 Uur',
            priceDisplay: '€395',
            priceSub: '/ sessie',
            price: 395,
            highlight: false,
            badge: null,
            features: [
                'Volledige studio toegang',
                'High-end apparatuur',
                'Basic technische support',
            ],
        },
        {
            id: '2u',
            label: '2 Uur',
            priceDisplay: '€595',
            priceSub: '/ sessie',
            price: 595,
            highlight: true,
            badge: 'MEEST FLEXIBEL',
            features: [
                'Volledige studio toegang',
                'High-end apparatuur',
                'Eigen technicus stand-by',
                'RAW bestanden direct mee',
            ],
        },
        {
            id: 'halve-dag',
            label: 'Halve Dag',
            priceDisplay: '€795',
            priceSub: '/ sessie',
            price: 795,
            highlight: false,
            badge: null,
            features: [
                '4 uur volledige studio toegang',
                'Alle 4K video en Shure audio',
                'Eigen technicus stand-by',
                'RAW bestanden direct mee',
            ],
        },
    ],
    format: [
        {
            id: 'startpakket-1',
            label: 'Startpakket 1',
            priceDisplay: '€2.450',
            priceSub: 'eenmalig',
            price: 2450,
            highlight: false,
            badge: null,
            features: [
                'Format-setup sessie',
                '2 opname sessies',
                'Basic post-productie',
                'Brand advies',
            ],
        },
        {
            id: 'startpakket-2',
            label: 'Startpakket 2',
            priceDisplay: '€5.950',
            priceSub: 'eenmalig',
            price: 5950,
            highlight: true,
            badge: null,
            features: [
                'Uitgebreide format-setup',
                '5 opname sessies',
                'Volledige post-productie',
                'Branding & design pakket',
                'Distributie setup',
            ],
        },
    ],
    seizoen: [
        {
            id: 'mini',
            label: 'Miniseizoen',
            sub: '6 afleveringen',
            priceOnly: 1995,       priceOnlyDisplay: '€1.995',
            priceFullService: 3595, priceFullServiceDisplay: '€3.595',
            priceSub: '/ seizoen',
            highlight: false,
            badge: null,
            featuresOnly:       ['6 opname sessies', 'Technische ondersteuning', 'RAW bestanden'],
            featuresFullService: ['6 opname sessies', 'Dedicated technicus', 'Post-productie', 'Basis distributie'],
        },
        {
            id: 'basis',
            label: 'Basis',
            sub: '12 afleveringen',
            priceOnly: 3495,       priceOnlyDisplay: '€3.495',
            priceFullService: 6295, priceFullServiceDisplay: '€6.295',
            priceSub: '/ seizoen',
            highlight: true,
            badge: 'BESTE PRIJS/AFL.',
            featuresOnly:       ['12 opname sessies', 'Vaste technicus', 'RAW bestanden'],
            featuresFullService: ['12 opname sessies', 'Dedicated technicus', 'Post-productie', 'Distributie begeleiding', 'Maandelijkse review'],
        },
        {
            id: 'max',
            label: 'Max',
            sub: '20 afleveringen',
            priceOnly: 5495,       priceOnlyDisplay: '€5.495',
            priceFullService: 9995, priceFullServiceDisplay: '€9.995',
            priceSub: '/ seizoen',
            highlight: false,
            badge: null,
            featuresOnly:       ['20 opname sessies', 'Prioriteit planning', 'RAW bestanden'],
            featuresFullService: ['20 opname sessies', 'Dedicated productieteam', 'Full post-productie', 'Volledige distributie', 'Format management'],
        },
    ],
};

const ADDONS = [
    { id: 'post',       label: 'Post-productie',      priceLabel: '€350',         price: 350  },
    { id: 'snippets',   label: '5 Social Snippets',   priceLabel: '€250',         price: 250  },
    { id: 'format-dev', label: 'Format Ontwikkeling', priceLabel: '€800–1.600',   price: null },
    { id: 'design',     label: 'Video/Audio Design',  priceLabel: '€400–800',     price: null },
    { id: 'decor',      label: 'Custom Decor',        priceLabel: '€500–2.500',   price: null },
    { id: 'regie',      label: 'Redactie & Regie',    priceLabel: '€125/uur',     price: null },
    { id: 'distributie',label: 'Distributie',         priceLabel: '€200/mnd',     price: null },
];

const STEPS = [
    { num: '01', label: 'DOEL' },
    { num: '02', label: 'PAKKET' },
    { num: '03', label: 'ADD-ONS' },
];

export default function Pricing({ setBookingType }) {
    const [step, setStep] = useState(1);
    const [goal, setGoal] = useState(null);
    const [pkg, setPkg] = useState(null);
    const [fullService, setFullService] = useState(false);
    const [selectedAddons, setSelectedAddons] = useState([]);

    const handleGoalSelect = (goalId) => {
        setGoal(goalId);
        setPkg(null);
        setFullService(false);
        setSelectedAddons([]);
        setStep(2);
    };

    const handlePkgSelect = (pkgId) => {
        setPkg(pkgId);
        setStep(3);
    };

    const toggleAddon = (addonId) => {
        setSelectedAddons(prev =>
            prev.includes(addonId) ? prev.filter(a => a !== addonId) : [...prev, addonId]
        );
    };

    const getPriceInfo = () => {
        if (!goal || !pkg) return null;
        const selectedPkg = PACKAGES[goal]?.find(p => p.id === pkg);
        if (!selectedPkg) return null;

        let base;
        if (goal === 'seizoen') {
            base = fullService ? selectedPkg.priceFullService : selectedPkg.priceOnly;
        } else {
            base = selectedPkg.price;
        }

        let addonTotal = 0;
        let hasRange = false;
        for (const id of selectedAddons) {
            const addon = ADDONS.find(a => a.id === id);
            if (addon?.price === null) hasRange = true;
            else if (addon?.price) addonTotal += addon.price;
        }

        if (base === null || base === undefined) return { display: 'Op aanvraag', isRange: false };
        if (base === 0 && addonTotal === 0 && !hasRange) return { display: 'Gratis', isRange: false };
        if (hasRange) return { display: `Vanaf \u20AC${(base + addonTotal).toLocaleString('nl-NL')}`, isRange: true };
        return { display: `\u20AC${(base + addonTotal).toLocaleString('nl-NL')}`, isRange: false };
    };

    const handleCTA = () => {
        if (setBookingType) setBookingType(goal || 'Uur');
        setTimeout(() => {
            document.getElementById('boeken')?.scrollIntoView({ behavior: 'smooth' });
        }, 50);
    };

    const priceInfo = getPriceInfo();
    const currentPackages = goal ? PACKAGES[goal] : [];
    const colClass =
        currentPackages.length === 1 ? 'max-w-sm mx-auto' :
        currentPackages.length === 2 ? 'md:grid-cols-2 max-w-3xl mx-auto' :
        'md:grid-cols-3';

    return (
        <section id="prijzen" className="py-32 px-6 md:px-12 bg-background relative z-10 w-full flex items-center justify-center">
            <div className="max-w-7xl mx-auto w-full">

                {/* Header */}
                <div className="mb-16 text-center max-w-2xl mx-auto">
                    <h2 className="font-heading font-bold text-4xl text-offwhite mb-4 tracking-tight">
                        Transparante Tarieven
                    </h2>
                    <p className="font-data text-sm text-offwhite/50">
                        Geen onverwachte kosten. Standaard inclusief gebruik van alle high-end apparatuur en (basic) technische support.
                    </p>
                </div>

                {/* Step indicator */}
                <div className="flex items-center justify-center gap-4 mb-16 font-data text-xs tracking-widest select-none">
                    {STEPS.map((s, i) => {
                        const stepNum = i + 1;
                        const isActive = step === stepNum;
                        const isDone = step > stepNum;
                        return (
                            <React.Fragment key={s.num}>
                                <button
                                    onClick={() => isDone ? setStep(stepNum) : undefined}
                                    className={`flex items-center gap-2 transition-colors duration-200 ${
                                        isActive  ? 'text-accent' :
                                        isDone    ? 'text-offwhite/60 hover:text-offwhite cursor-pointer' :
                                                    'text-offwhite/25 cursor-default'
                                    }`}
                                >
                                    <span>{s.num}</span>
                                    <span className="uppercase">{s.label}</span>
                                </button>
                                {i < STEPS.length - 1 && (
                                    <span className="text-offwhite/20">/</span>
                                )}
                            </React.Fragment>
                        );
                    })}
                </div>

                {/* Step 1 — Doel */}
                {step === 1 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
                        {GOALS.map((g) => (
                            <button
                                key={g.id}
                                onClick={() => handleGoalSelect(g.id)}
                                className="magnetic-btn bg-surface rounded-3xl p-8 border border-offwhite/10 text-left hover:border-accent/40 transition-all duration-300 group"
                            >
                                <h3 className="font-heading font-bold text-xl text-offwhite mb-2 tracking-tight group-hover:text-accent transition-colors duration-200">
                                    {g.label}
                                </h3>
                                <p className="font-data text-sm text-offwhite/50">{g.sub}</p>
                                <div className="mt-6 flex items-center gap-2 font-data text-xs text-accent uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                    <span>Selecteer</span>
                                    <ArrowRight className="w-3 h-3" />
                                </div>
                            </button>
                        ))}
                    </div>
                )}

                {/* Step 2 — Pakket */}
                {step === 2 && goal && (
                    <div>
                        {goal === 'seizoen' && (
                            <div className="flex items-center justify-center mb-10">
                                <div className="flex items-center gap-1 bg-surface rounded-full p-1 border border-offwhite/10 font-data text-xs uppercase tracking-widest">
                                    <button
                                        onClick={() => setFullService(false)}
                                        className={`px-5 py-2.5 rounded-full transition-all duration-200 ${!fullService ? 'bg-accent text-white' : 'text-offwhite/50 hover:text-offwhite'}`}
                                    >
                                        Alleen opname
                                    </button>
                                    <button
                                        onClick={() => setFullService(true)}
                                        className={`px-5 py-2.5 rounded-full transition-all duration-200 ${fullService ? 'bg-accent text-white' : 'text-offwhite/50 hover:text-offwhite'}`}
                                    >
                                        Full-service
                                    </button>
                                </div>
                            </div>
                        )}

                        <div className={`grid grid-cols-1 gap-8 ${colClass}`}>
                            {currentPackages.map((p) => {
                                const priceDisplay = goal === 'seizoen'
                                    ? (fullService ? p.priceFullServiceDisplay : p.priceOnlyDisplay)
                                    : p.priceDisplay;
                                const features = goal === 'seizoen'
                                    ? (fullService ? p.featuresFullService : p.featuresOnly)
                                    : p.features;

                                return (
                                    <div
                                        key={p.id}
                                        className={`bg-surface rounded-3xl p-8 border-2 flex flex-col justify-between transition-all duration-300 overflow-hidden relative ${
                                            p.highlight
                                                ? 'border-accent drop-shadow-[0_0_30px_rgba(230,59,46,0.15)] md:-translate-y-4'
                                                : 'border-offwhite/10'
                                        }`}
                                    >
                                        {p.highlight && (
                                            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 blur-3xl -mr-20 -mt-20 pointer-events-none" />
                                        )}
                                        <div>
                                            {p.badge && (
                                                <div className="inline-block bg-accent text-white font-heading font-bold text-[10px] px-3 py-1 rounded-full uppercase tracking-widest mb-4">
                                                    {p.badge}
                                                </div>
                                            )}
                                            <h3 className={`font-heading font-bold text-lg mb-1 uppercase tracking-widest ${p.highlight ? 'text-accent' : 'text-offwhite/70'}`}>
                                                {p.label}
                                            </h3>
                                            {p.sub && (
                                                <p className="font-data text-xs text-offwhite/40 mb-4 uppercase tracking-wider">{p.sub}</p>
                                            )}
                                            <div className="flex items-baseline gap-2 mb-6">
                                                <span className={`font-drama italic text-5xl ${p.highlight ? 'text-white' : 'text-offwhite'}`}>
                                                    {priceDisplay}
                                                </span>
                                                {p.priceSub && (
                                                    <span className="font-data text-sm text-offwhite/50">{p.priceSub}</span>
                                                )}
                                            </div>
                                            <ul className="flex flex-col gap-4 font-data text-sm text-offwhite/60 mb-8">
                                                {features.map((f, fi) => (
                                                    <li key={fi} className="flex items-start gap-3">
                                                        <CheckCircle className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                                                        {f}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <button
                                            onClick={() => handlePkgSelect(p.id)}
                                            className={`magnetic-btn w-full py-4 text-sm font-heading font-bold rounded-xl uppercase tracking-wide ${
                                                p.highlight
                                                    ? 'bg-accent text-white hover:bg-red-600'
                                                    : 'border border-offwhite/20 text-offwhite hover:bg-offwhite/5'
                                            }`}
                                        >
                                            {p.price === 0 ? 'Plan Gratis Pilot' : 'Selecteer Pakket'}
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* Step 3 — Add-ons */}
                {step === 3 && (
                    <div className="max-w-4xl mx-auto">
                        <p className="font-data text-xs text-offwhite/40 text-center mb-10 uppercase tracking-widest">
                            Optioneel — voeg toe wat bij jouw project past
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
                            {ADDONS.map((addon) => {
                                const isChecked = selectedAddons.includes(addon.id);
                                return (
                                    <button
                                        key={addon.id}
                                        onClick={() => toggleAddon(addon.id)}
                                        className={`flex items-center justify-between gap-4 bg-surface rounded-2xl p-5 border transition-all duration-200 text-left ${
                                            isChecked
                                                ? 'border-accent bg-accent/5'
                                                : 'border-offwhite/10 hover:border-offwhite/25'
                                        }`}
                                    >
                                        <div>
                                            <p className="font-heading font-bold text-sm text-offwhite uppercase tracking-wide">{addon.label}</p>
                                            <p className="font-data text-xs text-offwhite/40 mt-1">{addon.priceLabel}</p>
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
                    </div>
                )}

                {/* Live prijs + CTA */}
                {step === 3 && (
                    <div className="flex flex-col items-center gap-8 mt-4">
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
                )}

            </div>
        </section>
    );
}
