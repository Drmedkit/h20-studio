import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Car, CheckCircle } from 'lucide-react';
import BlogNavbar from '../../components/BlogNavbar';
import Footer from '../../components/Footer';

export default function LocationPage({ city, travelTime, travelRoute, intro, sections }) {
    return (
        <div className="bg-background min-h-screen text-offwhite">
            <BlogNavbar />

            {/* Hero */}
            <section className="relative pt-32 pb-24 px-6 md:px-12 bg-background border-b border-offwhite/5">
                <div className="max-w-5xl mx-auto">
                    <Link to="/" className="inline-flex items-center gap-2 font-data text-xs text-offwhite/40 uppercase tracking-widest mb-8 hover:text-accent transition-colors">
                        <ArrowLeft className="w-3 h-3" />
                        H20 Studio
                    </Link>
                    <p className="font-data text-accent text-sm uppercase tracking-widest mb-4">Podcast Studio</p>
                    <h1 className="font-heading font-bold text-5xl md:text-7xl text-offwhite tracking-tight mb-6">
                        {city}
                    </h1>
                    <p className="font-data text-offwhite/60 text-lg max-w-2xl leading-relaxed">{intro}</p>

                    {travelTime && (
                        <div className="mt-8 inline-flex items-center gap-3 bg-surface border border-offwhite/10 px-5 py-3 rounded-full">
                            <Car className="w-4 h-4 text-accent" />
                            <span className="font-data text-sm text-offwhite/70">
                                <span className="text-white font-bold">{travelTime}</span> rijden via {travelRoute}
                            </span>
                        </div>
                    )}
                </div>
            </section>

            {/* Content sections */}
            <div className="max-w-5xl mx-auto px-6 md:px-12 py-24 flex flex-col gap-24">
                {sections.map((section, i) => (
                    <div key={i} className="flex flex-col gap-6">
                        <h2 className="font-heading font-bold text-3xl md:text-4xl text-offwhite">{section.title}</h2>
                        {section.text && (
                            <p className="font-data text-offwhite/60 text-lg leading-relaxed max-w-3xl">{section.text}</p>
                        )}
                        {section.items && (
                            <ul className="flex flex-col gap-3 mt-2">
                                {section.items.map((item, j) => (
                                    <li key={j} className="flex items-start gap-3 font-data text-offwhite/70">
                                        <CheckCircle className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                ))}

                {/* Pricing */}
                <div className="flex flex-col gap-6">
                    <h2 className="font-heading font-bold text-3xl md:text-4xl text-offwhite">Tarieven</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {[
                            { label: 'Gratis Pilot', price: 'Gratis', sub: '30 minuten' },
                            { label: '1 Uur', price: '€395', sub: 'per sessie' },
                            { label: '2 Uur', price: '€595', sub: 'per sessie' },
                            { label: 'Halve Dag', price: '€795', sub: '4 uur' },
                        ].map((pkg) => (
                            <div key={pkg.label} className="bg-surface border border-offwhite/10 rounded-2xl p-6 flex flex-col gap-2">
                                <p className="font-data text-xs text-offwhite/40 uppercase tracking-widest">{pkg.label}</p>
                                <p className="font-drama italic text-3xl text-offwhite">{pkg.price}</p>
                                <p className="font-data text-xs text-offwhite/40">{pkg.sub}</p>
                            </div>
                        ))}
                    </div>
                    <p className="font-data text-sm text-offwhite/40">Altijd inclusief technicus/regisseur, 4-camera live schakeling en gebruik van alle apparatuur.</p>
                </div>

                {/* CTA */}
                <div className="bg-surface border border-offwhite/10 rounded-3xl p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div>
                        <h3 className="font-heading font-bold text-3xl text-offwhite mb-3">Klaar om te beginnen?</h3>
                        <p className="font-data text-offwhite/50">Plan een gratis pilot of bekijk alle pakketten op de hoofdpagina.</p>
                    </div>
                    <Link
                        to="/#prijzen"
                        className="shrink-0 flex items-center gap-3 bg-accent text-white px-8 py-4 rounded-full font-heading font-bold text-sm tracking-wide hover:bg-red-600 transition-colors"
                    >
                        Bekijk Pakketten
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>

            <Footer />
        </div>
    );
}
