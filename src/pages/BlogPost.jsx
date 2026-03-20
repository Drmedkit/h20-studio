import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import BlogNavbar from '../components/BlogNavbar';
import { blogPosts } from '../data/blogPosts';

export default function BlogPost() {
    const { slug } = useParams();
    const post = blogPosts.find(p => p.slug === slug);

    if (!post) {
        return (
            <div className="bg-background min-h-screen text-offwhite flex items-center justify-center">
                <BlogNavbar />
                <div className="text-center">
                    <p className="font-data text-offwhite/40 text-lg">Artikel niet gevonden.</p>
                    <Link to="/blog" className="mt-4 inline-block font-data text-accent hover:underline">Terug naar blog</Link>
                </div>
            </div>
        );
    }

    const paragraphs = post.content.split('\n\n');
    const otherPosts = blogPosts.filter(p => p.slug !== slug).slice(0, 2);

    return (
        <div className="bg-background min-h-screen text-offwhite">
            <BlogNavbar />

            {/* Article header */}
            <section className="pt-32 pb-12 px-6 md:px-12 border-b border-offwhite/5">
                <div className="max-w-3xl mx-auto">
                    <div className="flex items-center gap-4 mb-8">
                        <Link to="/blog" className="inline-flex items-center gap-2 font-data text-xs text-offwhite/40 uppercase tracking-widest hover:text-accent transition-colors">
                            <ArrowLeft className="w-3 h-3" />
                            Blog
                        </Link>
                        <span className="text-offwhite/20">·</span>
                        <span className="font-data text-xs text-accent uppercase tracking-widest">{post.category}</span>
                        <span className="text-offwhite/20">·</span>
                        <span className="font-data text-xs text-offwhite/30">{post.readTime}</span>
                    </div>
                    <h1 className="font-heading font-bold text-4xl md:text-6xl text-offwhite tracking-tight leading-tight mb-6">
                        {post.title}
                    </h1>
                    <p className="font-data text-offwhite/50 text-lg leading-relaxed">{post.excerpt}</p>
                </div>
            </section>

            {/* Article content */}
            <article className="px-6 md:px-12 py-16">
                <div className="max-w-3xl mx-auto flex flex-col gap-6">
                    {paragraphs.map((block, i) => {
                        if (block.startsWith('## ')) {
                            return (
                                <h2 key={i} className="font-heading font-bold text-2xl md:text-3xl text-offwhite mt-8">
                                    {block.replace('## ', '')}
                                </h2>
                            );
                        }
                        if (block.startsWith('- ')) {
                            const items = block.split('\n').filter(l => l.startsWith('- '));
                            return (
                                <ul key={i} className="flex flex-col gap-3">
                                    {items.map((item, j) => (
                                        <li key={j} className="flex items-start gap-3 font-data text-offwhite/70 text-lg leading-relaxed">
                                            <span className="text-accent mt-1.5">—</span>
                                            {item.replace('- ', '')}
                                        </li>
                                    ))}
                                </ul>
                            );
                        }
                        return (
                            <p key={i} className="font-data text-offwhite/70 text-lg leading-relaxed">
                                {block}
                            </p>
                        );
                    })}
                </div>
            </article>

            {/* CTA */}
            <section className="px-6 md:px-12 pb-16">
                <div className="max-w-3xl mx-auto bg-surface border border-offwhite/10 rounded-3xl p-10 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div>
                        <h3 className="font-heading font-bold text-2xl text-offwhite mb-2">Klaar om te starten?</h3>
                        <p className="font-data text-offwhite/50 text-sm">Plan een gratis pilot en ontdek wat Studio H20 voor jou kan betekenen.</p>
                    </div>
                    <Link
                        to="/#prijzen"
                        className="shrink-0 flex items-center gap-3 bg-accent text-white px-8 py-4 rounded-full font-heading font-bold text-sm tracking-wide hover:bg-red-600 transition-colors"
                    >
                        Bekijk Pakketten
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </section>

            {/* More posts */}
            {otherPosts.length > 0 && (
                <section className="px-6 md:px-12 py-16 border-t border-offwhite/5">
                    <div className="max-w-3xl mx-auto">
                        <h3 className="font-heading font-bold text-xl text-offwhite mb-8 uppercase tracking-widest">Meer artikelen</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {otherPosts.map(p => (
                                <Link
                                    key={p.slug}
                                    to={`/blog/${p.slug}`}
                                    className="group bg-surface border border-offwhite/10 rounded-2xl p-6 flex flex-col gap-3 hover:border-offwhite/30 transition-all"
                                >
                                    <span className="font-data text-[10px] text-accent uppercase tracking-widest">{p.category}</span>
                                    <h4 className="font-heading font-bold text-offwhite group-hover:text-accent transition-colors">{p.title}</h4>
                                    <span className="font-data text-xs text-accent flex items-center gap-1">
                                        Lees meer <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
}
