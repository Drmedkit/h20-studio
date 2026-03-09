import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Mic, Headphones, Camera, MousePointer2, ArrowRight } from 'lucide-react';

function CursorScheduler() {
    const container = useRef(null);
    const cursorRef = useRef(null);

    useGSAP(() => {
        const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });
        tl.set(cursorRef.current, { x: 10, y: 10, opacity: 1, scale: 1 });
        tl.to(cursorRef.current, { x: 130, y: 70, duration: 1, ease: 'power2.inOut' })
            .to(cursorRef.current, { scale: 0.8, duration: 0.1 })
            .to('.day-wed', { backgroundColor: '#E63B2E', color: '#111111', duration: 0.1 }, "<")
            .to(cursorRef.current, { scale: 1, duration: 0.1 })
            .to(cursorRef.current, { x: 260, y: 130, duration: 0.8, ease: 'power2.inOut', delay: 0.5 })
            .to(cursorRef.current, { scale: 0.8, duration: 0.1 })
            .to('.save-btn', { scale: 0.95, duration: 0.1 }, "<")
            .to('.save-btn', { scale: 1, duration: 0.1 })
            .to(cursorRef.current, { scale: 1, duration: 0.1 }, "<")
            .to(cursorRef.current, { opacity: 0, duration: 0.3, delay: 0.3 })
            .set('.day-wed', { backgroundColor: 'transparent', color: '#F5F3EE' });
    }, { scope: container });

    const days = ['Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za', 'Zo'];

    return (
        <div ref={container} className="relative h-48 w-full max-w-sm bg-surface border border-offwhite/10 rounded-3xl p-5 flex flex-col justify-between shadow-xl">
            <div>
                <h4 className="font-heading font-bold text-offwhite text-sm mb-3">Kies Tijdslot</h4>
                <div className="grid grid-cols-7 gap-1">
                    {days.map((day, i) => (
                        <div key={i} className={`flex items-center justify-center h-10 rounded-md text-xs font-data border border-offwhite/5 transition-colors ${i === 2 ? 'day-wed' : 'text-offwhite/50'}`}>
                            {day}
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex justify-end">
                <button className="save-btn font-heading text-xs uppercase tracking-wider bg-offwhite text-background font-bold px-4 py-2 rounded-lg mt-2">
                    Bevestig <ArrowRight className="inline-block w-3 h-3 ml-1" />
                </button>
            </div>
            <div ref={cursorRef} className="absolute top-0 left-0 z-10 pointer-events-none drop-shadow-xl">
                <MousePointer2 className="text-white w-6 h-6 fill-black" strokeWidth={1.5} />
            </div>
        </div>);
}

function TelemetryTypewriter() {
    const [text, setText] = React.useState('');
    const fullText = "SYSTEM:_INITIALIZING...\nAUDIO:_SYNCED_AT_48kHz/24bit.\nVIDEO:_HD_4-CAMERA_LIVE.\nDIRECTOR:_LIVE_IN_STUDIO.\nSET:_FLEX_DECOR_READY.\nGUEST:_ENTRY_CONFIRMED.";

    React.useEffect(() => {
        let currentLength = 0;
        const interval = setInterval(() => {
            setText(fullText.slice(0, currentLength));
            currentLength++;
            if (currentLength > fullText.length) {
                clearInterval(interval);
                setTimeout(() => { setText(''); setIntervalFunction() }, 4000);
            }
        }, 45);

        const setIntervalFunction = () => {
            currentLength = 0;
            const newInterval = setInterval(() => {
                setText(fullText.slice(0, currentLength));
                currentLength++;
                if (currentLength > fullText.length) clearInterval(newInterval);
            }, 45);
        };
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="h-48 w-full max-w-sm bg-surface border border-accent/20 rounded-3xl p-5 overflow-hidden relative shadow-xl">
            <div className="flex items-center gap-2 mb-2 border-b border-offwhite/10 pb-2">
                <div className="w-2 h-2 rounded-full bg-accent animate-pulse shadow-[0_0_8px_rgba(230,59,46,0.6)]"></div>
                <span className="font-data text-[10px] text-accent font-bold tracking-widest uppercase">Live System Feed</span>
            </div>
            <p className="font-data text-xs text-offwhite/70 whitespace-pre-wrap leading-relaxed">
                {text}<span className="inline-block w-1.5 h-3 bg-accent ml-1 -mb-0.5 animate-pulse"></span>
            </p>
        </div>
    );
}

function DiagnosticShuffler() {
    const [cards, setCards] = React.useState([
        { id: 1, title: 'Broadcast Mics', icon: Mic, desc: 'Kraakheldere studio audio' },
        { id: 2, title: '4K Camera\'s', icon: Camera, desc: 'Filmische multicam opzet' },
        { id: 3, title: 'Akoestiek', icon: Headphones, desc: 'Optimale ruimte demping' }
    ]);

    React.useEffect(() => {
        const interval = setInterval(() => {
            setCards(prev => {
                const newCards = [...prev];
                const last = newCards.pop();
                newCards.unshift(last);
                return newCards;
            });
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative h-48 w-full max-w-sm flex items-center justify-center bg-surface border border-offwhite/10 rounded-3xl shadow-xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-offwhite/5 to-transparent opacity-50 pointer-events-none"></div>
            {cards.map((card, idx) => (
                <div
                    key={card.id}
                    className="absolute w-[85%] bg-background border border-offwhite/5 rounded-2xl p-4 shadow-xl flex items-center gap-4 transition-all duration-[600ms] ease-[cubic-bezier(0.34,1.56,0.64,1)]"
                    style={{ zIndex: 3 - idx, transform: `translateY(${idx * 18 - 10}px) scale(${1 - idx * 0.05})`, opacity: 1 - idx * 0.35 }}
                >
                    <div className="bg-accent/20 p-2.5 rounded-xl text-accent"><card.icon className="w-5 h-5" /></div>
                    <div>
                        <h4 className="font-heading font-bold text-offwhite text-sm uppercase tracking-wide">{card.title}</h4>
                        <p className="font-data text-xs text-offwhite/50">{card.desc}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default function FeaturesGrid() {
    const container = useRef(null);

    useGSAP(() => {
        gsap.from('.feature-grid-item', {
            scrollTrigger: {
                trigger: container.current,
                start: 'top 80%',
            },
            y: 40,
            opacity: 0,
            duration: 1,
            stagger: 0.15,
            ease: 'power3.out'
        });
    }, { scope: container });

    return (
        <section ref={container} className="py-32 px-6 md:px-12 bg-background relative z-10 w-full flex flex-col items-center border-t border-offwhite/5">
            <div className="max-w-7xl mx-auto w-full">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8 justify-items-center">

                    {/* Feature 1 */}
                    <div className="feature-grid-item w-full flex flex-col gap-6 items-center">
                        <DiagnosticShuffler />
                        <div className="text-center pt-4">
                            <h3 className="font-heading font-bold text-2xl text-offwhite uppercase tracking-tight">Apparatuur</h3>
                            <p className="font-data text-offwhite/50 mt-2 text-sm leading-relaxed max-w-xs mx-auto">
                                Plug & Play setup met focus op absolute broadcast kwaliteit.
                            </p>
                        </div>
                    </div>

                    {/* Feature 2 */}
                    <div className="feature-grid-item w-full flex flex-col gap-6 items-center">
                        <TelemetryTypewriter />
                        <div className="text-center pt-4">
                            <h3 className="font-heading font-bold text-2xl text-offwhite uppercase tracking-tight">Ontzorging</h3>
                            <p className="font-data text-offwhite/50 mt-2 text-sm leading-relaxed max-w-xs mx-auto">
                                Live multicam regie en audio opslag zonder technische ruis.
                            </p>
                        </div>
                    </div>

                    {/* Feature 3 */}
                    <div className="feature-grid-item w-full flex flex-col gap-6 items-center">
                        <CursorScheduler />
                        <div className="text-center pt-4">
                            <h3 className="font-heading font-bold text-2xl text-offwhite uppercase tracking-tight">Flexibiliteit</h3>
                            <p className="font-data text-offwhite/50 mt-2 text-sm leading-relaxed max-w-xs mx-auto">
                                Claim direct online jouw eigen tijdslot of dagdeel per project.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
