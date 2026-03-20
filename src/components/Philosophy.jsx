import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function Philosophy() {
    const container = useRef(null);
    const imageRef = useRef(null);

    useGSAP(() => {
        // Parallax background
        gsap.to(imageRef.current, {
            yPercent: 20,
            ease: 'none',
            scrollTrigger: {
                trigger: container.current,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true
            }
        });

        // Text Reveal effect
        const lines = gsap.utils.toArray('.reveal-line');
        lines.forEach((line) => {
            gsap.from(line, {
                y: 40,
                opacity: 0,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: line,
                    start: 'top 85%',
                }
            });
        });

    }, { scope: container });

    return (
        <section ref={container} className="relative w-screen min-h-screen bg-black flex items-center justify-center overflow-hidden py-20 md:py-32">
            {/* Background with Parallax */}
            <div className="absolute inset-0 z-0 w-full h-full">
                <img
                    ref={imageRef}
                    src="/complete ontzorging.jpg"
                    alt="H20 Studio Sfeer"
                    className="w-full h-[120%] -top-[10%] left-0 absolute object-cover opacity-50 sepia-[0.3] hue-rotate-[-30deg]"
                    loading="lazy"
                    decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-background via-background/20 via-30% via-transparent via-50% via-transparent via-70% via-background/20 to-background"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto w-full px-6 md:px-12 h-full flex flex-col justify-between gap-16 md:gap-32 lg:gap-40 xl:gap-48 py-12 md:py-16">
                {/* Statement 1 */}
                <div className="flex flex-col gap-3 md:gap-4">
                    <div className="overflow-hidden">
                        <p className="reveal-line font-heading text-base md:text-lg lg:text-xl text-offwhite/50 uppercase tracking-wider md:tracking-widest font-bold">
                            De meeste studio's bieden enkel:
                        </p>
                    </div>
                    <div className="overflow-hidden">
                        <h3 className="reveal-line font-data text-xl md:text-3xl lg:text-4xl text-offwhite/70 italic line-through decoration-offwhite/20">
                            een ruimte met een microfoon.
                        </h3>
                    </div>
                </div>

                {/* Statement 2 */}
                <div className="flex flex-col gap-4 md:gap-6 text-right items-end self-end">
                    <div className="overflow-hidden">
                        <p className="reveal-line font-heading text-lg md:text-xl lg:text-2xl text-offwhite uppercase tracking-wider md:tracking-widest font-bold">
                            Wij bieden:
                        </p>
                    </div>
                    <div className="overflow-hidden max-w-5xl">
                        <h3 className="reveal-line font-drama italic text-4xl md:text-6xl lg:text-7xl xl:text-[6rem] text-offwhite leading-[1.1]">
                            <span className="text-accent">Complete ontzorging</span> voor jouw verhaal.
                        </h3>
                    </div>
                </div>
            </div>
        </section>
    );
}
