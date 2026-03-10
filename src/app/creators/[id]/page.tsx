import { creators } from "@/lib/creators";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Activity, Users, Clock, Heart } from "lucide-react";
import { Section } from "@/components/layout/Section";

interface CreatorPageProps {
  params: Promise<{ id: string }>;
}

// Generate static params for build time optimization
export function generateStaticParams() {
  return creators.map((creator) => ({
    id: creator.id,
  }));
}

export default async function CreatorPage({ params }: CreatorPageProps) {
  const { id } = await params;
  const creator = creators.find((c) => c.id === id);

  if (!creator) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background text-foreground pt-24 pb-12">
      {/* Background Effects */}
      <div className="fixed inset-0 bg-dot-grid opacity-20 pointer-events-none mix-blend-screen" />
      <div className="fixed inset-0 bg-gradient-to-b from-background via-background/90 to-background pointer-events-none" />

      {/* Hero ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] bg-primary/20 blur-[150px] pointer-events-none rounded-full" />

      <Section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Navigation */}
        <div className="mb-12">
          <Link 
            href="/#creators" 
            className="inline-flex items-center gap-2 text-sm font-semibold text-foreground-muted hover:text-primary transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Back to Network
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          
          {/* Left Column: Image & Status */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden glass-card shadow-lg shadow-black/50 border border-white/10 group">
              <img
                 src={creator.image}
                 alt={creator.name}
                 className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
              
              {/* Category Badge */}
              <div className="absolute top-6 left-6 flex items-center gap-2 z-10">
                 <span className="px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-[10px] font-black text-primary uppercase tracking-widest">
                   {creator.category}
                 </span>
                 {creator.tier === 'top' && (
                    <span className="px-3 py-1.5 rounded-full bg-primary/20 backdrop-blur-md border border-primary/30 text-[10px] font-black text-primary uppercase tracking-widest shadow-[0_0_15px_rgba(255,60,95,0.4)]">
                      Top Performance
                    </span>
                 )}
                 {creator.tier === 'new' && (
                    <span className="px-3 py-1.5 rounded-full bg-blue-500/20 backdrop-blur-md border border-blue-500/30 text-[10px] font-black text-blue-400 uppercase tracking-widest">
                      New Arrival
                    </span>
                 )}
              </div>
            </div>

            <div className="flex gap-4">
              <a 
                href={creator.socials.tiktok} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-4 rounded-xl bg-primary text-white font-bold transition-all duration-300 hover:bg-primary-dark hover:shadow-neon-primary group"
              >
                <span>View on TikTok</span>
                <ExternalLink className="w-4 h-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </div>
          </div>

          {/* Right Column: Info & Stats */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            <div className="mb-8">
              <h1 className="text-5xl lg:text-7xl font-black text-white tracking-tight mb-2 flex items-center gap-4 flex-wrap">
                {creator.name}
              </h1>
              <p className="text-xl font-mono text-primary tracking-wide">
                {creator.handle}
              </p>
            </div>

            <div className="mb-10">
              <h3 className="text-sm font-semibold text-foreground-muted uppercase tracking-widest mb-4">About</h3>
              <p className="text-lg text-white/80 leading-relaxed font-medium">
                {creator.description}
              </p>
            </div>

            <div className="mb-10">
              <h3 className="text-sm font-semibold text-foreground-muted uppercase tracking-widest mb-4">Specialties</h3>
              <div className="flex flex-wrap gap-2">
                {creator.tags.map(tag => (
                  <span 
                    key={tag} 
                    className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm font-bold text-white/70 uppercase tracking-wider"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Stats Grid */}
            <div>
              <h3 className="text-sm font-semibold text-foreground-muted uppercase tracking-widest mb-4">Performance Metrics</h3>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                
                {/* Followers */}
                <div className="p-5 rounded-2xl bg-white/5 border border-white/10 glass-panel">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="w-4 h-4 text-primary" />
                    <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Followers</span>
                  </div>
                  <div className="text-2xl font-black text-white">{creator.stats.followers}</div>
                </div>

                {/* Avg Watch Time */}
                <div className="p-5 rounded-2xl bg-white/5 border border-white/10 glass-panel">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-4 h-4 text-blue-400" />
                    <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Avg Watch</span>
                  </div>
                  <div className="text-2xl font-black text-white">{creator.stats.avgWatchTime}</div>
                </div>

                {/* Peak CCV */}
                <div className="p-5 rounded-2xl bg-white/5 border border-white/10 glass-panel">
                  <div className="flex items-center gap-2 mb-2">
                    <Activity className="w-4 h-4 text-green-400" />
                    <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Peak CCV</span>
                  </div>
                  <div className="text-2xl font-black text-white">{creator.stats.peakCCV}</div>
                </div>

                {/* Total Likes */}
                <div className="p-5 rounded-2xl bg-white/5 border border-white/10 glass-panel">
                  <div className="flex items-center gap-2 mb-2">
                    <Heart className="w-4 h-4 text-pink-500" />
                    <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Total Likes</span>
                  </div>
                  <div className="text-2xl font-black text-white">{creator.stats.totalLikes}</div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </Section>
    </div>
  );
}
