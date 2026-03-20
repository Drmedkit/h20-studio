import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function BlogNavbar() {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between bg-background/80 backdrop-blur-xl border-b border-offwhite/5">
            <Link to="/" className="flex items-center">
                <img src="/h20-studio-logo.png" alt="H20 Studio Logo" className="h-8 object-contain" />
            </Link>
            <Link
                to="/"
                className="flex items-center gap-2 font-data text-sm text-offwhite/60 hover:text-white transition-colors uppercase tracking-wider"
            >
                <ArrowLeft className="w-4 h-4" />
                Terug naar H20 Studio
            </Link>
        </nav>
    );
}
