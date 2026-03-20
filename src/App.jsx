import React, { useRef, useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowRight, Menu, X } from 'lucide-react';

import FeaturesGrid from './components/FeaturesGrid';
import Features from './components/Features';
import Protocol from './components/Protocol';
import Pricing from './components/Pricing';
import Booking from './components/Booking';
import Footer from './components/Footer';

import Purmerend from './pages/locations/Purmerend';
import Hoorn from './pages/locations/Hoorn';
import Zaandam from './pages/locations/Zaandam';
import Alkmaar from './pages/locations/Alkmaar';
import AmsterdamNoord from './pages/locations/AmsterdamNoord';
import NoordHolland from './pages/locations/NoordHolland';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';

gsap.registerPlugin(ScrollTrigger);

function MobileMenu({ onClose }) {
  const overlayRef = useRef(null);
  const itemsRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.from(overlayRef.current, { opacity: 0, duration: 0.3 })
      .from('.mobile-menu-item', { y: 40, opacity: 0, stagger: 0.08, duration: 0.5 }, '-=0.1')
      .from('.mobile-menu-cta', { y: 20, opacity: 0, duration: 0.4 }, '-=0.2');
  }, { scope: overlayRef });

  function scrollTo(id) {
    gsap.to(overlayRef.current, {
      opacity: 0, duration: 0.25, ease: 'power2.in',
      onComplete: () => { onClose(); document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); }
    });
  }

  const links = [
    { label: 'Faciliteiten', id: 'faciliteiten' },
    { label: 'Werkwijze',    id: 'werkwijze'    },
    { label: 'Tarieven',     id: 'prijzen'      },
    { label: 'Blog',         id: null, href: '/blog' },
  ];

  return (
    <div ref={overlayRef} className="fixed inset-0 z-40 bg-background/97 backdrop-blur-xl flex flex-col items-center justify-center gap-2 px-8">
      <div ref={itemsRef} className="flex flex-col items-center gap-8 w-full">
        {links.map(({ label, id, href }) => (
          href
            ? <Link key={label} to={href} onClick={onClose} className="mobile-menu-item w-full text-center font-drama italic text-5xl text-offwhite hover:text-accent transition-colors leading-tight">{label}</Link>
            : <button key={id} onClick={() => scrollTo(id)} className="mobile-menu-item w-full text-center font-drama italic text-5xl text-offwhite hover:text-accent transition-colors leading-tight">{label}</button>
        ))}
      </div>
      <button
        onClick={() => scrollTo('prijzen')}
        className="mobile-menu-cta mt-12 bg-accent text-white px-12 py-4 rounded-full font-heading font-bold text-lg tracking-wide"
      >
        Boek de Studio
      </button>
    </div>
  );
}

function Navbar() {
  const navRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useGSAP(() => {
    ScrollTrigger.create({
      start: 'top -50',
      end: 99999,
      toggleClass: { className: 'nav-scrolled', targets: navRef.current }
    });
  });

  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const currentY = window.scrollY;
        if (currentY < 80) {
          gsap.to(navRef.current, { y: '0%', duration: 0.4, ease: 'power2.out' });
        } else if (currentY > lastY + 8) {
          gsap.to(navRef.current, { y: '-150%', duration: 0.4, ease: 'power2.in' });
        } else if (currentY < lastY - 8) {
          gsap.to(navRef.current, { y: '0%', duration: 0.4, ease: 'power2.out' });
        }
        lastY = currentY;
        ticking = false;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav ref={navRef} className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-6xl px-6 py-4 flex items-center justify-between rounded-full border border-transparent transition-all duration-500 bg-surface/60 backdrop-blur-xl border-offwhite/10">
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center">
          <img src="/h20-studio-logo.png" alt="H20 Studio Logo" className="h-10 object-contain" />
        </button>
        <div className="hidden md:flex items-center gap-8 font-data text-sm uppercase tracking-wider text-offwhite/80">
          <a href="#faciliteiten" className="hover:text-white link-lift">Faciliteiten</a>
          <a href="#werkwijze" className="hover:text-white link-lift">Werkwijze</a>
          <a href="#prijzen" className="hover:text-white link-lift">Tarieven</a>
          <Link to="/blog" className="hover:text-white link-lift">Blog</Link>
        </div>
        <button onClick={() => document.getElementById('prijzen')?.scrollIntoView({ behavior: 'smooth' })} className="magnetic-btn hidden md:block bg-accent text-white px-6 py-2.5 rounded-full font-heading font-bold text-sm tracking-wide">
          Boek de Studio
        </button>
        <button onClick={() => setMenuOpen(o => !o)} className="md:hidden text-offwhite p-1 z-50 relative">
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {menuOpen && <MobileMenu onClose={() => setMenuOpen(false)} />}
    </>
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
            Huur een professionele podcast studio van hoge kwaliteit. Plug & play apparatuur, volledige technische ontzorging en een premium setting bij H20.
          </p>
          <div className="hero-cta mt-10">
            <button onClick={() => document.getElementById('prijzen')?.scrollIntoView({ behavior: 'smooth' })} className="magnetic-btn group flex items-center gap-3 bg-white text-background px-8 py-4 rounded-full font-heading font-bold text-lg">
              <span>Bekijk Pakketten</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Home() {
  const [bookingConfig, setBookingConfig] = useState(null);

  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash) {
      setTimeout(() => {
        document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, []);

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

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/podcast-studio-purmerend"       element={<Purmerend />} />
      <Route path="/podcast-studio-hoorn"           element={<Hoorn />} />
      <Route path="/podcast-studio-zaandam"         element={<Zaandam />} />
      <Route path="/podcast-studio-alkmaar"         element={<Alkmaar />} />
      <Route path="/podcast-studio-amsterdam-noord" element={<AmsterdamNoord />} />
      <Route path="/podcast-studio-noord-holland"   element={<NoordHolland />} />
      <Route path="/blog"                           element={<Blog />} />
      <Route path="/blog/:slug"                     element={<BlogPost />} />
    </Routes>
  );
}
