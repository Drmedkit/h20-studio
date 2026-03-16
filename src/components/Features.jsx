import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Philosophy from './Philosophy';

gsap.registerPlugin(ScrollTrigger);

function FeatureParallax({ image, topSub, topMain, bottomSub, bottomAccent, bottomMain, hueRotate, topAlign = "left", bottomAlign = "right", imagePosition = "object-center" }) {
    const container = useRef(null);
    const imageRef = useRef(null);

    useGSAP(() => {
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
            <div className="absolute inset-0 z-0 w-full h-full">
                <img
                    ref={imageRef}
                    src={image}
                    alt="H20 Studio Feature"
                    className={`w-full h-[120%] -top-[10%] left-0 absolute object-cover ${imagePosition} opacity-50 sepia-[0.3] ${hueRotate}`}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-background via-background/20 via-30% via-transparent via-50% via-transparent via-70% via-background/20 to-background"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto w-full px-6 md:px-12 h-full flex flex-col justify-between gap-16 md:gap-32 lg:gap-40 xl:gap-48 py-12 md:py-16">
                {/* Statement 1 */}
                <div className={`flex flex-col gap-3 md:gap-4 ${topAlign === 'right' ? 'text-right items-end' : topAlign === 'center' ? 'text-center items-center' : 'text-left items-start'}`}>
                    <div className="overflow-hidden">
                        <p className="reveal-line font-heading text-base md:text-lg lg:text-xl text-offwhite/50 uppercase tracking-wider md:tracking-widest font-bold">
                            {topSub}
                        </p>
                    </div>
                    <div className="overflow-hidden">
                        <h3 className="reveal-line font-data text-xl md:text-3xl lg:text-4xl text-offwhite/70 italic line-through decoration-offwhite/20">
                            {topMain}
                        </h3>
                    </div>
                </div>

                {/* Statement 2 */}
                <div className={`flex flex-col gap-4 md:gap-6 max-w-5xl ${bottomAlign === 'right' ? 'text-right items-end self-end' : bottomAlign === 'center' ? 'text-center items-center self-center' : 'text-left items-start self-start'}`}>
                    <div className="overflow-hidden">
                        <p className="reveal-line font-heading text-lg md:text-xl lg:text-2xl text-offwhite uppercase tracking-wider md:tracking-widest font-bold">
                            {bottomSub}
                        </p>
                    </div>
                    <div className="overflow-hidden">
                        <h3 className="reveal-line font-drama italic text-4xl md:text-6xl lg:text-7xl xl:text-[6rem] text-offwhite leading-[1.1]">
                            <span className="text-accent">{bottomAccent}</span> {bottomMain}
                        </h3>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default function Features() {
    return (
        <div id="faciliteiten" className="relative z-10">
            <FeatureParallax
                image="/apparatuur.jpg"
                topSub="Veel studio's bezuinigen op:"
                topMain="betrouwbare beeld- en geluidskwaliteit."
                bottomSub="Wij garanderen:"
                bottomAccent="High-End"
                bottomMain="Apparatuur."
                hueRotate="hue-rotate-[-10deg]"
                topAlign="left"
                bottomAlign="right"
                imagePosition="object-[75%_50%]"
            />
            <Philosophy />
            <FeatureParallax
                image="/dame greenscreen.png"
                topSub="Elders ben je gebonden aan:"
                topMain={<>één statische set<br />en onhandig reserveren.</>}
                bottomSub="Krijg direct toegang tot:"
                bottomAccent="Greenscreens"
                bottomMain="& Flexibele Ruimtes."
                hueRotate="hue-rotate-[10deg]"
                topAlign="left"
                bottomAlign="right"
                imagePosition="object-[10%_50%]"
            />
        </div>
    );
}
