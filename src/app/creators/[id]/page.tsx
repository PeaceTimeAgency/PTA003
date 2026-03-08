"use client";

import { motion } from "framer-motion";
import { creators } from "@/lib/creators";
import { Section } from "@/components/layout/Section";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useParams } from "next/navigation";

export default function CreatorProfilePage() {
  const params = useParams();
  const creator = creators.find(c => c.id === params.id);

  if (!creator) return notFound();

  return (
    <main className="min-h-screen bg-background overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-[500px] h-[500px] bg-secondary/5 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      {/* Hero Section */}
      <Section className="relative z-10 pt-20">
        <Link href="/creators" className="inline-flex items-center gap-2 text-xs font-bold text-foreground-muted hover:text-primary transition-colors mb-12 group">
          <svg className="w-3 h-3 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
          </svg>
          BACK TO ROSTER
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Detailed Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative"
          >
            <div className="aspect-[3/4] rounded-[40px] overflow-hidden shadow-2xl relative">
              <img src={creator.image} alt={creator.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
            </div>
            {/* Live Indicator Overlay */}
            <div className="absolute top-8 right-8 bg-red-600 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest flex items-center gap-2 shadow-lg animate-pulse">
              <span className="w-1.5 h-1.5 rounded-full bg-white" />
              Live Soon
            </div>
          </motion.div>

          {/* Bio & Details */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="text-xs font-black text-primary tracking-[0.3em] uppercase">{creator.category}</span>
                <span className="h-px w-8 bg-border" />
                <span className="text-xs font-mono text-foreground-muted uppercase">{creator.handle}</span>
              </div>
              <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-white mb-8 leading-none">
                {creator.name.split(' ')[0]}
                <br />
                <span className="text-gradient-primary">{creator.name.split(' ')[1]}</span>
              </h1>
              <p className="text-xl text-foreground-muted leading-relaxed mb-12 max-w-lg">
                {creator.description}
              </p>
            </motion.div>

            {/* Stats Grid */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-2 gap-4 mb-12"
            >
              {Object.entries(creator.stats).map(([key, value]) => (
                <div key={key} className="glass-card p-6 rounded-3xl border-white/5">
                  <div className="text-[10px] font-bold text-foreground-subtle uppercase tracking-widest mb-1">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </div>
                  <div className="text-3xl font-black text-white">{value}</div>
                </div>
              ))}
            </motion.div>

            {/* Tags */}
            <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ delay: 0.3 }}
               className="flex flex-wrap gap-2"
            >
              {creator.tags.map(tag => (
                <span key={tag} className="text-xs font-bold px-4 py-2 rounded-full border border-white/10 bg-white/5 text-foreground-muted uppercase tracking-wider">
                  #{tag}
                </span>
              ))}
            </motion.div>
          </div>
        </div>
      </Section>

      {/* Socials / Embed Area */}
      <Section className="bg-background-surface">
        <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-black text-white mb-12 uppercase tracking-tighter">Official Channels</h2>
            <div className="flex justify-center gap-8">
                {creator.socials.tiktok && (
                    <a href={creator.socials.tiktok} target="_blank" className="glass-card p-8 rounded-full hover:shadow-neon-primary hover:border-primary transition-all duration-300">
                        <img src="https://www.vectorlogo.zone/logos/tiktok/tiktok-icon.svg" className="w-12 h-12 invert" alt="TikTok" />
                    </a>
                )}
                {creator.socials.twitter && (
                    <a href={creator.socials.twitter} target="_blank" className="glass-card p-8 rounded-full hover:shadow-neon-secondary hover:border-secondary transition-all duration-300">
                        <img src="https://www.vectorlogo.zone/logos/twitter/twitter-official.svg" className="w-12 h-12" alt="Twitter" />
                    </a>
                )}
            </div>
        </div>
      </Section>
    </main>
  );
}
