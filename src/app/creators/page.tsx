"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { creators } from "@/lib/creators";
import { Section } from "@/components/layout/Section";

export default function CreatorsPage() {
  return (
    <main className="min-h-screen bg-background pt-12">
      <Section className="pb-8">
        <div className="max-w-4xl">
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-xs font-semibold text-primary tracking-[0.2em] uppercase mb-4"
          >
            The Roster
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black tracking-tight text-white mb-6"
          >
            Elite <span className="text-gradient-primary">Creators.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-foreground-muted text-lg max-w-2xl leading-relaxed"
          >
            The Peace Time roster is home to the most dedicated, high-growth creators on TikTok LIVE. 
            We provide the infrastructure; they provide the talent.
          </motion.p>
        </div>
      </Section>

      <Section container={false} className="px-4 md:px-8 lg:px-12">
        <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
          {creators.map((creator, i) => (
            <motion.div
              key={creator.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="break-inside-avoid"
            >
              <Link href={`/creators/${creator.id}`} className="block group relative">
                <div className="relative overflow-hidden rounded-3xl glass-card transition-all duration-500 group-hover:shadow-neon-primary group-hover:scale-[1.02]">
                  {/* Image Container */}
                  <div className="aspect-[4/5] overflow-hidden">
                    <img 
                      src={creator.image} 
                      alt={creator.name} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 blur-sm group-hover:blur-none"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-black/20 to-transparent opacity-80" />
                  </div>

                  {/* Content Overlay */}
                  <div className="absolute inset-x-0 bottom-0 p-6 pt-12 text-left">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="h-px w-4 bg-primary" />
                      <span className="text-[10px] font-bold text-primary tracking-widest uppercase">{creator.category}</span>
                    </div>
                    <h3 className="text-2xl font-black text-white group-hover:text-primary transition-colors duration-300">
                      {creator.name}
                    </h3>
                    <p className="text-xs text-white/50 font-mono mt-1 group-hover:text-white/80 transition-colors">
                      {creator.handle}
                    </p>
                    
                    <div className="mt-4 flex flex-wrap gap-2">
                      {creator.tags.slice(0, 2).map(tag => (
                        <span key={tag} className="text-[9px] font-bold px-2 py-1 rounded bg-white/5 text-white/40 border border-white/10 uppercase tracking-tighter">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Hover stats reveal */}
                  <div className="absolute top-4 right-4 text-right transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="text-xl font-black text-primary drop-shadow-md">
                      {creator.stats.followers}
                    </div>
                    <div className="text-[9px] font-bold text-white/40 uppercase tracking-widest">
                      Followers
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </Section>
    </main>
  );
}
