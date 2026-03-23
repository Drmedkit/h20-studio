import React, { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, Clock, Check, Loader2 } from 'lucide-react';

const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxCJc-qc31onGGR1xzgnZckq7yEHz7eo1r1x7NrTZxkhV9TRogXISlLcpYLcmSPm8Fq/exec';

// ── Time slot config based on what the user chose ──────────────────────────
function getSlotConfig(bookingConfig) {
    if (!bookingConfig) return { slots: [], cols: 3, label: 'Tijdslot' };
    const { goal, pkg } = bookingConfig;

    if (goal === 'format') {
        return {
            slots: ['10:00', '11:00', '14:00', '15:00'],
            cols: 4,
            label: 'Tijdslot (intake)',
        };
    }
    if (pkg === 'halve-dag') {
        return {
            slots: ['Ochtend (09:00–13:00)', 'Middag (13:00–17:00)'],
            cols: 2,
            label: 'Dagdeel',
        };
    }
    if (pkg === '2u') {
        return {
            slots: ['09:00–11:00', '11:00–13:00', '14:00–16:00', '16:00–18:00'],
            cols: 2,
            label: 'Tijdblok (2 uur)',
        };
    }
    // pilot, 1u, fallback
    return {
        slots: ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'],
        cols: 3,
        label: 'Tijdslot (1 uur)',
    };
}

function getSectionCopy(goal) {
    if (goal === 'format') return {
        title: 'Plan je Strategiesessie.',
        sub: 'Kies een moment voor een intake. We verkennen samen jouw format en stellen een aanpak voor.',
    };
    return {
        title: 'Claim jouw Tijdslot.',
        sub: 'Selecteer een datum in onze agenda en vertel ons meer over je project. We nemen binnen 24 uur contact met je op om de boeking te finaliseren.',
    };
}

// ── Package label for display ──────────────────────────────────────────────
function getBookingLabel(bookingConfig) {
    if (!bookingConfig) return '';
    const { goalLabel, pkgLabel, pkgSub, fullService, goal } = bookingConfig;
    let label = pkgLabel || goalLabel || '';
    if (pkgSub) label += ` — ${pkgSub}`;
    if (goal === 'seizoen') label += fullService ? ' (Full-service)' : ' (Alleen opname)';
    return label;
}

// ── Component ──────────────────────────────────────────────────────────────
const MONTH_NAMES = ['Januari', 'Februari', 'Maart', 'April', 'Mei', 'Juni', 'Juli', 'Augustus', 'September', 'Oktober', 'November', 'December'];

function daysInMonth(year, month) {
    return new Date(year, month + 1, 0).getDate();
}

// Monday-first offset (0=Ma, 6=Zo)
function monthStartOffset(year, month) {
    const day = new Date(year, month, 1).getDay(); // 0=Sun
    return (day + 6) % 7;
}

export default function Booking({ bookingConfig, setBookingConfig }) {
    const today = new Date();
    const [viewYear, setViewYear] = useState(today.getFullYear());
    const [viewMonth, setViewMonth] = useState(today.getMonth());
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [project, setProject] = useState('');
    const [status, setStatus] = useState('idle'); // idle | loading | success | error

    const slotConfig = getSlotConfig(bookingConfig);
    const copy = getSectionCopy(bookingConfig?.goal);
    const bookingLabel = getBookingLabel(bookingConfig);
    const days = ['Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za', 'Zo'];

    const totalDays = daysInMonth(viewYear, viewMonth);
    const startOffset = monthStartOffset(viewYear, viewMonth);
    const dates = Array.from({ length: totalDays }, (_, i) => i + 1);

    function prevMonth() {
        if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
        else setViewMonth(m => m - 1);
        setSelectedDate(null);
    }

    function nextMonth() {
        if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
        else setViewMonth(m => m + 1);
        setSelectedDate(null);
    }

    function isPastDate(date) {
        const d = new Date(viewYear, viewMonth, date);
        const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        return d < todayStart;
    }

    const isPrevMonthDisabled = viewYear === today.getFullYear() && viewMonth === today.getMonth();

    const formattedDate = selectedDate
        ? `${selectedDate} ${MONTH_NAMES[viewMonth]} ${viewYear}`
        : '—';

    useEffect(() => {
        setSelectedTime(slotConfig.slots[0] ?? '');
    }, [bookingConfig?.goal, bookingConfig?.pkg]);

    async function handleSubmit() {
        if (!name || !email) return;
        setStatus('loading');
        try {
            await fetch(SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    naam: name,
                    email,
                    telefoon: phone,
                    pakket: bookingLabel,
                    addons: bookingConfig?.addons?.map(a => a.label).join(', ') || '',
                    datum: formattedDate,
                    tijdslot: selectedTime,
                    project,
                }),
            });
            setStatus('success');
        } catch {
            setStatus('error');
        }
    }

    return (
        <section id="boeken" className="py-32 px-6 md:px-12 bg-surface relative z-10 w-full flex items-center justify-center border-t border-offwhite/5 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
            <div className="max-w-7xl mx-auto w-full">

                <div className="mb-20 max-w-2xl">
                    <h2 className="font-heading font-bold text-4xl md:text-5xl text-offwhite mb-4 tracking-tight">
                        {copy.title.replace('.', '')} <span className="text-accent italic font-drama">{copy.title.endsWith('.') ? '.' : copy.title.slice(-1) === '.' ? '.' : '.'}</span>
                    </h2>
                    <p className="font-data text-offwhite/50 text-lg">{copy.sub}</p>
                </div>

                <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">

                    {/* Left: Calendar + time slots */}
                    <div className="w-full lg:w-1/2 flex flex-col gap-8">

                        {/* Calendar */}
                        <div className="bg-background rounded-3xl p-8 border border-offwhite/10 shadow-inner">
                            <div className="flex items-center justify-between mb-8">
                                <h3 className="font-heading font-bold text-xl text-offwhite uppercase tracking-widest flex items-center gap-3">
                                    <CalendarIcon className="w-5 h-5 text-accent" />
                                    {MONTH_NAMES[viewMonth]} {viewYear}
                                </h3>
                                <div className="flex gap-2">
                                    <button
                                        onClick={prevMonth}
                                        disabled={isPrevMonthDisabled}
                                        className="w-8 h-8 rounded-full border border-offwhite/20 flex items-center justify-center hover:bg-offwhite/10 transition-colors text-offwhite/50 hover:text-white disabled:opacity-20 disabled:cursor-not-allowed"
                                    >&lt;</button>
                                    <button
                                        onClick={nextMonth}
                                        className="w-8 h-8 rounded-full border border-offwhite/20 flex items-center justify-center hover:bg-offwhite/10 transition-colors text-offwhite/50 hover:text-white"
                                    >&gt;</button>
                                </div>
                            </div>
                            <div className="grid grid-cols-7 gap-y-4 mb-4">
                                {days.map(day => (
                                    <div key={day} className="text-center font-data text-xs text-offwhite/40">{day}</div>
                                ))}
                                {Array.from({ length: startOffset }).map((_, i) => (
                                    <div key={`empty-${i}`} />
                                ))}
                                {dates.map(date => {
                                    const isSelected = date === selectedDate;
                                    const isPast = isPastDate(date);
                                    return (
                                        <button
                                            key={date}
                                            onClick={() => !isPast && setSelectedDate(date)}
                                            disabled={isPast}
                                            className={`relative w-10 h-10 mx-auto rounded-full flex items-center justify-center font-data text-sm transition-all
                                                ${isPast ? 'text-offwhite/20 cursor-not-allowed' : 'hover:bg-offwhite/10 text-offwhite/80'}
                                                ${isSelected ? 'bg-accent text-white font-bold shadow-[0_0_15px_rgba(230,59,46,0.5)]' : ''}
                                            `}
                                        >
                                            {date}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Time slots */}
                        {slotConfig.slots.length > 0 && (
                            <div className="bg-background/50 rounded-3xl p-8 border border-offwhite/10">
                                <h3 className="font-heading font-bold text-lg text-offwhite/70 mb-4 uppercase tracking-widest flex items-center gap-3">
                                    <Clock className="w-4 h-4 text-accent" />
                                    {slotConfig.label}
                                </h3>
                                <div className={`grid gap-3 font-data grid-cols-${slotConfig.cols}`}
                                    style={{ gridTemplateColumns: `repeat(${slotConfig.cols}, minmax(0, 1fr))` }}
                                >
                                    {slotConfig.slots.map(time => (
                                        <button
                                            key={time}
                                            onClick={() => setSelectedTime(time)}
                                            className={`py-3 rounded-xl border transition-all text-sm
                                                ${selectedTime === time
                                                    ? 'bg-offwhite text-background border-offwhite font-bold scale-[1.02]'
                                                    : 'border-offwhite/10 text-offwhite/60 hover:border-offwhite/30 hover:bg-offwhite/5'}
                                            `}
                                        >
                                            {time}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right: Form */}
                    <div className="w-full lg:w-1/2">
                        <form className="bg-background rounded-3xl p-8 md:p-10 border border-offwhite/10 flex flex-col gap-6 shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/20 blur-[50px] -mr-10 -mt-10 pointer-events-none"></div>

                            {/* Date + time summary */}
                            <div className="flex gap-4 mb-2">
                                <div className="w-1/2 flex flex-col gap-2">
                                    <label className="font-data text-xs text-offwhite/50 uppercase tracking-widest">Datum</label>
                                    <div className="font-heading font-bold text-xl text-offwhite bg-surface/50 px-4 py-3 rounded-xl border border-offwhite/5">
                                        {formattedDate}
                                    </div>
                                </div>
                                <div className="w-1/2 flex flex-col gap-2">
                                    <label className="font-data text-xs text-offwhite/50 uppercase tracking-widest">Tijdslot</label>
                                    <div className="font-heading font-bold text-lg text-offwhite bg-surface/50 px-4 py-3 rounded-xl border border-offwhite/5 truncate">
                                        {selectedTime || '—'}
                                    </div>
                                </div>
                            </div>

                            {/* Selected package (read-only) */}
                            <div className="flex flex-col gap-2">
                                <label className="font-data text-xs text-offwhite/50 uppercase tracking-widest">Gekozen pakket</label>
                                <div className="font-heading font-bold text-offwhite bg-surface/50 px-4 py-3 rounded-xl border border-accent/20 text-sm leading-snug">
                                    {bookingLabel}
                                </div>
                            </div>

                            {/* Selected add-ons (read-only, if any) */}
                            {bookingConfig?.addons?.length > 0 && (
                                <div className="flex flex-col gap-2">
                                    <label className="font-data text-xs text-offwhite/50 uppercase tracking-widest">Add-ons</label>
                                    <div className="flex flex-wrap gap-2">
                                        {bookingConfig.addons.map(addon => (
                                            <span
                                                key={addon.id}
                                                className="font-data text-xs bg-accent/10 text-accent px-3 py-1.5 rounded-full border border-accent/20"
                                            >
                                                {addon.label} — {addon.priceLabel}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Name */}
                            <div className="flex flex-col gap-2">
                                <label htmlFor="name" className="font-data text-xs text-offwhite/50 uppercase tracking-widest">Naam / Bedrijf</label>
                                <input
                                    type="text" id="name" value={name}
                                    onChange={e => setName(e.target.value)}
                                    placeholder="John Doe"
                                    className="bg-surface border border-offwhite/10 rounded-xl px-4 py-3 font-data text-offwhite placeholder:text-offwhite/20 focus:outline-none focus:border-accent transition-colors"
                                />
                                {name.length > 2 && (
                                    <p className="text-[#00ff41] text-[10px] font-data uppercase tracking-widest mt-1 opacity-80">Identiteit Bevestigd.</p>
                                )}
                            </div>

                            {/* Email */}
                            <div className="flex flex-col gap-2">
                                <label htmlFor="email" className="font-data text-xs text-offwhite/50 uppercase tracking-widest">E-mailadres</label>
                                <input
                                    type="email" id="email" value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    placeholder="john@example.com"
                                    className="bg-surface border border-offwhite/10 rounded-xl px-4 py-3 font-data text-offwhite placeholder:text-offwhite/20 focus:outline-none focus:border-accent transition-colors"
                                />
                                {email.includes('@') && email.includes('.') && (
                                    <p className="text-[#00ff41] text-[10px] font-data uppercase tracking-widest mt-1 opacity-80">Communicatiekanaal Geverifieerd.</p>
                                )}
                            </div>

                            {/* Phone */}
                            <div className="flex flex-col gap-2">
                                <label htmlFor="phone" className="font-data text-xs text-offwhite/50 uppercase tracking-widest">Telefoonnummer</label>
                                <input
                                    type="tel" id="phone" value={phone}
                                    onChange={e => setPhone(e.target.value)}
                                    placeholder="+31 6 00 00 00 00"
                                    className="bg-surface border border-offwhite/10 rounded-xl px-4 py-3 font-data text-offwhite placeholder:text-offwhite/20 focus:outline-none focus:border-accent transition-colors"
                                />
                            </div>

                            {/* Project details */}
                            <div className="flex flex-col gap-2">
                                <label htmlFor="project" className="font-data text-xs text-offwhite/50 uppercase tracking-widest">Project Details</label>
                                <textarea
                                    id="project" rows="3"
                                    value={project}
                                    onChange={e => setProject(e.target.value)}
                                    placeholder="Vertel ons kort over het soort podcast of video, speciale benodigdheden, etc."
                                    className="bg-surface border border-offwhite/10 rounded-xl px-4 py-3 font-data text-offwhite placeholder:text-offwhite/20 focus:outline-none focus:border-accent transition-colors resize-none"
                                />
                            </div>

                            {status === 'success' ? (
                                <div className="mt-4 w-full flex flex-col items-center gap-3 bg-accent/10 border border-accent/30 rounded-xl px-8 py-6">
                                    <Check className="w-8 h-8 text-accent" />
                                    <p className="font-heading font-bold text-offwhite text-lg text-center">Aanvraag Ontvangen.</p>
                                    <p className="font-data text-offwhite/50 text-sm text-center">We nemen binnen 24 uur contact met je op.</p>
                                </div>
                            ) : (
                                <button
                                    type="button"
                                    onClick={handleSubmit}
                                    disabled={!name || !email || !selectedDate || status === 'loading'}
                                    className="magnetic-btn mt-4 w-full group flex items-center justify-center gap-3 bg-accent text-white px-8 py-4 rounded-xl font-heading font-bold text-lg uppercase tracking-wider hover:bg-red-600 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                                >
                                    {status === 'loading' ? (
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                    ) : (
                                        <>
                                            <span>Verstuur Aanvraag</span>
                                            <Check className="w-5 h-5 opacity-0 -ml-8 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                                        </>
                                    )}
                                </button>
                            )}
                            {status === 'error' && (
                                <p className="text-center font-data text-[11px] text-red-400 mt-1">Er ging iets mis. Probeer het opnieuw of mail ons direct.</p>
                            )}
                            <p className="text-center font-data text-[11px] text-offwhite/40 mt-2 leading-relaxed max-w-sm mx-auto">Je aanvraag wordt zo snel mogelijk opgepakt door ons sales team. Wij nemen binnen 24 uur contact met je op om je boeking te bevestigen.</p>
                        </form>
                    </div>

                </div>
            </div>
        </section>
    );
}
