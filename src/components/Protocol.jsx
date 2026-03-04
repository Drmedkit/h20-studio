import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

// Abstract SVGs based on the "Brutalist Signal / Control Room" aesthetic
function Motif1() {
    const el = useRef(null);
    useGSAP(() => {
        gsap.to(el.current, { rotation: 360, duration: 30, repeat: -1, ease: 'linear' });
    }, []);
    return (
        <div className="relative w-full h-full max-w-[200px] max-h-[200px] opacity-70">
            <svg ref={el} viewBox="0 0 100 100" className="w-full h-full stroke-accent fill-none" strokeWidth="1">
                <circle cx="50" cy="50" r="40" strokeDasharray="4 4" />
                <circle cx="50" cy="50" r="25" />
                <circle cx="50" cy="50" r="5" className="fill-accent group-hover:scale-150 transition-transform" />
                <path d="M50 10 L50 90 M10 50 L90 50" strokeDasharray="2 4" opacity="0.5" />
            </svg>
        </div>
    );
}

function Motif2() {
    const el = useRef(null);
    useGSAP(() => {
        gsap.fromTo(el.current, { y: 0 }, { y: 200, duration: 2, repeat: -1, yoyo: true, ease: 'power1.inOut' });
    }, []);
    return (
        <div className="relative w-full h-full max-w-[200px] max-h-[200px] opacity-70 border border-offwhite/10 rounded-xl overflow-hidden bg-offwhite/[0.02]">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:20px_20px]" />
            <div ref={el} className="w-full h-[1px] bg-accent shadow-[0_0_15px_#e63b2e]" />
        </div>
    );
}

function Motif3() {
    const el = useRef(null);
    useGSAP(() => {
        // SVG dashoffset animation for drawing lines
        gsap.fromTo(el.current,
            { strokeDashoffset: 300 },
            { strokeDashoffset: 0, duration: 4, repeat: -1, ease: 'power2.inOut', yoyo: true }
        );
    }, []);
    return (
        <div className="relative w-full h-full max-w-[200px] max-h-[200px] opacity-70 flex items-center">
            <svg viewBox="0 0 100 50" className="w-full h-full stroke-accent fill-none drop-shadow-[0_0_8px_rgba(230,59,46,0.6)]" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path ref={el} d="M0 25 L30 25 L40 5 L50 45 L60 25 L100 25" strokeDasharray="300" strokeDashoffset="300" />
            </svg>
        </div>
    );
}

export default function Protocol() {
    const container = useRef(null);

    useGSAP(() => {
        const cards = gsap.utils.toArray('.protocol-card');

        // Pinning the whole section area
        ScrollTrigger.create({
            trigger: container.current,
            start: 'top top',
            end: `+=${cards.length * 100}%`,
            pin: true,
            scrub: 1,
        });

        cards.forEach((card, index) => {
            if (index === cards.length - 1) return; // Last card doesn't shrink

            gsap.to(card, {
                scale: 0.9,
                filter: 'blur(10px)',
                opacity: 0.6,
                backgroundColor: '#0a0a0a',
                ease: 'none',
                scrollTrigger: {
                    trigger: container.current,
                    start: `top+=${index * window.innerHeight} top`,
                    end: `top+=${(index + 1) * window.innerHeight} top`,
                    scrub: 1,
                }
            });
        });

        // Make cards come up from bottom
        cards.forEach((card, index) => {
            if (index === 0) return;

            gsap.from(card, {
                yPercent: 100,
                ease: 'none',
                scrollTrigger: {
                    trigger: container.current,
                    start: `top+=${(index - 1) * window.innerHeight} top`,
                    end: `top+=${index * window.innerHeight} top`,
                    scrub: 1,
                }
            });
        });

    }, { scope: container });

    const steps = [
        {
            num: '01',
            title: 'Boek & Briefing',
            desc: 'Je reserveert het gewenste tijdslot en we bespreken vooraf de technische eisen en camerahoeken.',
            Motif: Motif1
        },
        {
            num: '02',
            title: 'Opname & Regie',
            desc: 'Jij stuurt het gesprek. Onze technici sturen de camera\'s, audio en live mix vanuit de regiekamer.',
            Motif: Motif2
        },
        {
            num: '03',
            title: 'Export & Publicatie',
            desc: 'Direct je RAW bestanden mee na de shoot, of kies voor onze nabewerking voor een kant-en-klaar eindproduct.',
            Motif: Motif3
        }
    ];

    return (
        <section id="werkwijze" ref={container} className="relative w-full h-screen bg-background overflow-hidden">
            {steps.map((step, idx) => (
                <div
                    key={idx}
                    className="protocol-card absolute inset-0 w-full h-full flex flex-col md:flex-row items-center justify-center p-6 md:p-24"
                    style={{ zIndex: idx }}
                >
                    {/* Card Surface */}
                    <div className="relative w-full max-w-6xl h-full max-h-[70vh] bg-surface border border-offwhite/10 rounded-[3rem] shadow-2xl flex flex-col md:flex-row overflow-hidden group">

                        {/* Left Content */}
                        <div className="w-full md:w-1/2 p-12 md:p-20 flex flex-col justify-center z-10">
                            <span className="font-data text-accent font-bold text-lg mb-6 tracking-widest">
                                PROTOCOL_{step.num}
                            </span>
                            <h2 className="font-heading font-bold text-4xl md:text-5xl text-offwhite mb-6">
                                {step.title}
                            </h2>
                            <p className="font-data text-offwhite/60 text-lg leading-relaxed max-w-md">
                                {step.desc}
                            </p>
                        </div>

                        {/* Right Abstract Visual */}
                        <div className="w-full md:w-1/2 h-full bg-black/40 flex items-center justify-center p-12 relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-surface to-transparent w-32 z-10 hidden md:block"></div>
                            <div className="w-full h-full flex items-center justify-center relative z-0">
                                <div className="absolute w-[300px] h-[300px] bg-accent/5 rounded-full blur-[100px]"></div>
                                <step.Motif />
                            </div>
                        </div>

                    </div>
                </div>
            ))}
        </section>
    );
}
