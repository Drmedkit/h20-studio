import React, { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, Clock, ArrowRight, Check } from 'lucide-react';

export default function Booking({ bookingType, setBookingType }) {
    const [selectedDate, setSelectedDate] = useState(15);
    const [selectedTime, setSelectedTime] = useState('Ochtend (09:00 - 13:00)');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const days = ['Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za', 'Zo'];
    const dates = Array.from({ length: 31 }, (_, i) => i + 1);

    const times = bookingType === 'Dagdeel'
        ? ['Ochtend (09:00 - 13:00)', 'Middag (13:00 - 17:00)']
        : ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'];

    useEffect(() => {
        if (bookingType === 'Dagdeel') setSelectedTime('Ochtend (09:00 - 13:00)');
        else if (bookingType === 'Uur') setSelectedTime('14:00');
        else setSelectedTime('N.v.t.');
    }, [bookingType]);

    return (
        <section id="boeken" className="py-32 px-6 md:px-12 bg-surface relative z-10 w-full flex items-center justify-center border-t border-offwhite/5 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
            <div className="max-w-7xl mx-auto w-full">
                <div className="mb-20 max-w-2xl">
                    <h2 className="font-heading font-bold text-4xl md:text-5xl text-offwhite mb-4 tracking-tight">
                        Claim jouw <span className="text-accent italic font-drama">Tijdslot.</span>
                    </h2>
                    <p className="font-data text-offwhite/50 text-lg">Selecteer een datum in onze agenda en vertel ons meer over je project. We nemen binnen 24 uur contact met je op om de boeking te finaliseren.</p>
                </div>

                <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">

                    {/* Left: Calendar UI Mockup */}
                    <div className="w-full lg:w-1/2 flex flex-col gap-8">
                        {/* Month View */}
                        <div className="bg-background rounded-3xl p-8 border border-offwhite/10 shadow-inner">
                            <div className="flex items-center justify-between mb-8">
                                <h3 className="font-heading font-bold text-xl text-offwhite uppercase tracking-widest flex items-center gap-3">
                                    <CalendarIcon className="w-5 h-5 text-accent" />
                                    Oktober 2026
                                </h3>
                                <div className="flex gap-2">
                                    <button className="w-8 h-8 rounded-full border border-offwhite/20 flex items-center justify-center hover:bg-offwhite/10 transition-colors text-offwhite/50 hover:text-white">&lt;</button>
                                    <button className="w-8 h-8 rounded-full border border-offwhite/20 flex items-center justify-center hover:bg-offwhite/10 transition-colors text-offwhite/50 hover:text-white">&gt;</button>
                                </div>
                            </div>

                            <div className="grid grid-cols-7 gap-y-4 mb-4">
                                {days.map(day => (
                                    <div key={day} className="text-center font-data text-xs text-offwhite/40">{day}</div>
                                ))}
                                {dates.map(date => {
                                    const isSelected = date === selectedDate;
                                    const isPast = date < 12;
                                    return (
                                        <button
                                            key={date}
                                            onClick={() => !isPast && setSelectedDate(date)}
                                            disabled={isPast}
                                            className={`
                                                relative w-10 h-10 mx-auto rounded-full flex items-center justify-center font-data text-sm transition-all
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

                        {/* Time Slots */}
                        {bookingType !== 'Productie' && (
                            <div className="bg-background/50 rounded-3xl p-8 border border-offwhite/10">
                                <h3 className="font-heading font-bold text-lg text-offwhite/70 mb-4 uppercase tracking-widest flex items-center gap-3">
                                    <Clock className="w-4 h-4 text-accent" />
                                    Beschikbaarheid {bookingType === 'Dagdeel' ? '(Blok)' : '(Uur)'}
                                </h3>
                                <div className={`grid gap-3 font-data ${bookingType === 'Dagdeel' ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-3'}`}>
                                    {times.map(time => (
                                        <button
                                            key={time}
                                            onClick={() => setSelectedTime(time)}
                                            className={`
                                                py-3 rounded-xl border transition-all text-sm
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

                    {/* Right: Contact Form */}
                    <div className="w-full lg:w-1/2">
                        <form className="bg-background rounded-3xl p-8 md:p-10 border border-offwhite/10 flex flex-col gap-6 shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/20 blur-[50px] -mr-10 -mt-10 pointer-events-none"></div>

                            <div className="flex gap-4 mb-2">
                                <div className="w-1/2 flex flex-col gap-2">
                                    <label className="font-data text-xs text-offwhite/50 uppercase tracking-widest">Geselecteerde Datum</label>
                                    <div className="font-heading font-bold text-xl text-offwhite bg-surface/50 px-4 py-3 rounded-xl border border-offwhite/5">
                                        {selectedDate} Oktober 2026
                                    </div>
                                </div>
                                <div className="w-1/2 flex flex-col gap-2">
                                    <label className="font-data text-xs text-offwhite/50 uppercase tracking-widest">Tijdslot</label>
                                    <div className="font-heading font-bold text-xl text-offwhite bg-surface/50 px-4 py-3 rounded-xl border border-offwhite/5">
                                        {selectedTime}
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label htmlFor="name" className="font-data text-xs text-offwhite/50 uppercase tracking-widest">Naam / Bedrijf</label>
                                <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} placeholder="John Doe" className="bg-surface border border-offwhite/10 rounded-xl px-4 py-3 font-data text-offwhite placeholder:text-offwhite/20 focus:outline-none focus:border-accent transition-colors" />
                                {name.length > 2 && <p className="text-[#00ff41] text-[10px] font-data uppercase tracking-widest mt-1 opacity-80 transition-opacity">Identiteit Bevestigd.</p>}
                            </div>

                            <div className="flex flex-col gap-2">
                                <label htmlFor="email" className="font-data text-xs text-offwhite/50 uppercase tracking-widest">E-mailadres</label>
                                <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="john@example.com" className="bg-surface border border-offwhite/10 rounded-xl px-4 py-3 font-data text-offwhite placeholder:text-offwhite/20 focus:outline-none focus:border-accent transition-colors" />
                                {email.includes('@') && email.includes('.') && <p className="text-[#00ff41] text-[10px] font-data uppercase tracking-widest mt-1 opacity-80 transition-opacity">Communicatiekanaal Geverifieerd.</p>}
                            </div>

                            <div className="flex flex-col gap-2">
                                <label htmlFor="type" className="font-data text-xs text-offwhite/50 uppercase tracking-widest">Type Boeking</label>
                                <select
                                    id="type"
                                    value={bookingType}
                                    onChange={(e) => setBookingType(e.target.value)}
                                    className="bg-surface/50 border border-accent/30 text-accent rounded-xl px-4 py-3 font-data focus:outline-none focus:border-accent transition-colors appearance-none cursor-pointer"
                                    style={{ backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23e63b2e' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1em' }}
                                >
                                    <option value="Uur">Boeking per Uur (€150/u)</option>
                                    <option value="Dagdeel">Dagdeel (4 uur, €550)</option>
                                    <option value="Productie">Klantgerichte Productie (Aanvraag)</option>
                                </select>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label htmlFor="project" className="font-data text-xs text-offwhite/50 uppercase tracking-widest">Project Details</label>
                                <textarea id="project" rows="3" placeholder="Vertel ons kort over het soort podcast of video, speciale benodigdheden, etc." className="bg-surface border border-offwhite/10 rounded-xl px-4 py-3 font-data text-offwhite placeholder:text-offwhite/20 focus:outline-none focus:border-accent transition-colors resize-none"></textarea>
                            </div>

                            <button type="button" className="magnetic-btn mt-4 w-full group flex items-center justify-center gap-3 bg-accent text-white px-8 py-4 rounded-xl font-heading font-bold text-lg uppercase tracking-wider hover:bg-red-600 transition-colors">
                                <span>Verstuur Aanvraag</span>
                                <Check className="w-5 h-5 opacity-0 -ml-8 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                            </button>
                            <p className="text-center font-data text-[10px] text-offwhite/40 mt-2">Wij delen je gegevens nooit met derden.</p>
                        </form>
                    </div>

                </div>
            </div>
        </section>
    );
}
