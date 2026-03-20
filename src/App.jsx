import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowRight } from 'lucide-react';

import FeaturesGrid from './components/FeaturesGrid';
import Features from './components/Features';
import Protocol from './components/Protocol';
import Pricing from './components/Pricing';
import Booking from './components/Booking';
import Footer from './components/Footer';

gsap.registerPlugin(ScrollTrigger);

function Navbar() {
  const navRef = useRef(null);

  useGSAP(() => {
    ScrollTrigger.create({
      start: 'top -50',
      end: 99999,
      toggleClass: { className: 'nav-scrolled', targets: navRef.current }
    });
  }, { scope: navRef });

  return (
    <nav ref={navRef} className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-6xl px-6 py-4 flex items-center justify-between rounded-full border border-transparent transition-all duration-500 bg-surface/60 backdrop-blur-xl border-offwhite/10">
      <div className="flex items-center gap-3">
        <img src="/H20 - basic - rood.png" alt="H20 Studio Logo" className="h-8 w-8 object-contain" />
        <span className="font-heading font-bold text-xl tracking-tighter">H20 STUDIO</span>
      </div>
      <div className="hidden md:flex items-center gap-8 font-data text-sm uppercase tracking-wider text-offwhite/80">
        <a href="#faciliteiten" className="hover:text-white link-lift">Faciliteiten</a>
        <a href="#werkwijze" className="hover:text-white link-lift">Werkwijze</a>
        <a href="#prijzen" className="hover:text-white link-lift">Tarieven</a>
      </div>
      <button onClick={() => document.getElementById('boeken')?.scrollIntoView({ behavior: 'smooth' })} className="magnetic-btn bg-accent text-white px-6 py-2.5 rounded-full font-heading font-bold text-sm tracking-wide">
        Boek de Studio
      </button>
    </nav>
  );
}

function Hero() {
  const container = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.from('.hero-text', {
      y: 40,
      opacity: 0,
      duration: 1.2,
      stagger: 0.08
    })
      .from('.hero-cta', {
        y: 20,
        opacity: 0,
        duration: 0.8
      }, "-=0.6");
  }, { scope: container });

  return (
    <section ref={container} className="relative h-[100dvh] w-full bg-background flex items-end pb-24 px-6 md:px-12">
      {/* Background Image with Heavy Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <img src="/header.jpg" alt="H20 Podcast Studio" className="w-full h-full object-cover" fetchpriority="high" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/20 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-background/40 backdrop-blur-[2px]"></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col justify-end">
        <div className="max-w-4xl">
          <h1 className="flex flex-col gap-2">
            <span className="hero-text font-heading font-bold text-4xl md:text-6xl text-offwhite tracking-tight">
              Claim de
            </span>
            <span className="hero-text font-drama italic text-7xl md:text-[8rem] text-accent leading-[0.85] pr-10">
              Microfoon.
            </span>
          </h1>
          <p className="hero-text mt-8 font-data text-lg md:text-xl text-offwhite/70 max-w-xl leading-relaxed">
            Huur een professionele podcast studio van hoge kwaliteit. Plug & play apparatuur, volledige technische ontzorging en een premium setting in het H20 Esports Campus.
          </p>
          <div className="hero-cta mt-10">
            <button className="magnetic-btn group flex items-center gap-3 bg-white text-background px-8 py-4 rounded-full font-heading font-bold text-lg">
              <span>Bekijk Beschikbaarheid</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function App() {
  const [bookingConfig, setBookingConfig] = useState(null);

  return (
    <main className="bg-background min-h-screen text-offwhite overflow-hidden selection:bg-accent selection:text-white">
      <Navbar />
      <Hero />
      <FeaturesGrid />
      <Features />
      <Protocol />
      <Pricing setBookingConfig={setBookingConfig} />
      {bookingConfig && <Booking bookingConfig={bookingConfig} setBookingConfig={setBookingConfig} />}
      <Footer />
    </main>
  );
}

export default App;
