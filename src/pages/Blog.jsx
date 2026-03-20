import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import BlogNavbar from '../components/BlogNavbar';
import { blogPosts } from '../data/blogPosts';

const today = new Date();
today.setHours(0, 0, 0, 0);

const visiblePosts = blogPosts.filter(p => new Date(p.publishDate) <= today);

export default function Blog() {
    return (
        <div className="bg-background min-h-screen text-offwhite">
            <BlogNavbar />

            {/* Header */}
            <section className="pt-32 pb-16 px-6 md:px-12 border-b border-offwhite/5">
                <div className="max-w-5xl mx-auto">
                    <p className="font-data text-accent text-sm uppercase tracking-widest mb-4">Blog</p>
                    <h1 className="font-heading font-bold text-5xl md:text-7xl text-offwhite tracking-tight mb-6">
                        Achter de<br />
                        <span className="font-drama italic text-accent">Microfoon.</span>
                    </h1>
                    <p className="font-data text-offwhite/50 text-lg max-w-xl">
                        Inzichten over podcast productie, studio techniek en wat het verschil maakt tussen een goede en een geweldige aflevering.
                    </p>
                </div>
            </section>

            {/* Posts grid */}
            <section className="px-6 md:px-12 py-24">
                <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {visiblePosts.map((post) => (
                        <Link
                            key={post.slug}
                            to={`/blog/${post.slug}`}
                            className="group bg-surface border border-offwhite/10 rounded-3xl p-8 flex flex-col gap-4 hover:border-offwhite/30 transition-all duration-300 hover:-translate-y-1"
                        >
                            <div className="flex items-center justify-between">
                                <span className="font-data text-[10px] text-accent uppercase tracking-widest">{post.category}</span>
                                <span className="font-data text-[10px] text-offwhite/30">{post.readTime}</span>
                            </div>
                            <h2 className="font-heading font-bold text-xl text-offwhite leading-snug group-hover:text-accent transition-colors">
                                {post.title}
                            </h2>
                            <p className="font-data text-sm text-offwhite/50 leading-relaxed flex-1">{post.excerpt}</p>
                            <div className="flex items-center gap-2 font-data text-xs text-accent mt-2">
                                Lees meer
                                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    );
}
