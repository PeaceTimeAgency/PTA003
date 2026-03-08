"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { articles } from "@/lib/news";
import { Section } from "@/components/layout/Section";

export default function NewsPage() {
  const featuredArticle = articles[0];
  const regularArticles = articles.slice(1);

  return (
    <main className="min-h-screen bg-background pt-12">
      <Section>
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-xs font-semibold text-primary tracking-[0.2em] uppercase mb-4"
        >
          Agency News
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-8xl font-black tracking-tighter text-white mb-16 uppercase"
        >
          Insights & <span className="text-gradient-primary">Updates.</span>
        </motion.h1>

        {/* Featured Article */}
        <Link href={`/news/${featuredArticle.slug}`} className="group block mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center glass-card p-12 rounded-[40px] border-white/5 transition-all duration-500 hover:border-primary/30">
            <div className="aspect-[16/9] overflow-hidden rounded-3xl">
              <img src={featuredArticle.image} alt={featuredArticle.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
            <div>
              <div className="flex items-center gap-3 mb-6">
                 <span className="text-xs font-black text-primary tracking-[0.2em] uppercase">{featuredArticle.category}</span>
                 <span className="h-px w-6 bg-border" />
                 <span className="text-xs font-mono text-foreground-muted uppercase">{featuredArticle.date}</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-white group-hover:text-primary transition-colors leading-tight mb-6 tracking-tight">
                {featuredArticle.title}
              </h2>
              <p className="text-lg text-foreground-muted mb-8 leading-relaxed">
                {featuredArticle.excerpt}
              </p>
              <div className="inline-flex items-center gap-2 text-xs font-bold text-white tracking-widest uppercase group-hover:gap-4 transition-all">
                READ FULL ARTICLE
                <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
          </div>
        </Link>

        {/* Article Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {regularArticles.map((article, i) => (
            <Link key={article.slug} href={`/news/${article.slug}`} className="group block">
              <div className="glass-card h-full p-8 rounded-3xl border-white/5 transition-all duration-300 hover:translate-y-[-4px] hover:border-primary/20 flex flex-col">
                <div className="aspect-video overflow-hidden rounded-2xl mb-8">
                  <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
                </div>
                <div className="text-[10px] font-black text-primary tracking-[0.2em] uppercase mb-4">{article.category}</div>
                <h3 className="text-2xl font-black text-white mb-4 group-hover:text-primary transition-colors leading-tight">
                  {article.title}
                </h3>
                <p className="text-foreground-muted text-sm leading-relaxed mb-8">
                  {article.excerpt}
                </p>
                <div className="mt-auto pt-4 flex items-center justify-between border-t border-white/5">
                  <span className="text-[10px] font-mono text-foreground-subtle uppercase">{article.date}</span>
                  <svg className="w-5 h-5 text-white/20 group-hover:text-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Section>
    </main>
  );
}
