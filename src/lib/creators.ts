export interface CreatorStats {
  followers: string;
  avgWatchTime: string;
  peakCCV: string;
  totalLikes: string;
}

export interface Creator {
  id: string;
  name: string;
  handle: string;
  description: string;
  image: string;
  category: string;
  stats: CreatorStats;
  tags: string[];
  socials: {
    tiktok: string;
    instagram?: string;
    twitter?: string;
  };
}

export const creators: Creator[] = [
  {
    id: "alex-rivers",
    name: "Alex Rivers",
    handle: "@alexrivers",
    description: "High-energy gaming content and late-night talk shows. Known for world-record speedruns and interactive community challenges.",
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=400&h=500&auto=format&fit=crop",
    category: "Gaming",
    stats: {
      followers: "1.2M",
      avgWatchTime: "42m",
      peakCCV: "45k",
      totalLikes: "25M"
    },
    tags: ["Competitive", "Speedrun", "Interactive"],
    socials: {
      tiktok: "https://tiktok.com/@alexrivers",
      instagram: "https://instagram.com/alexrivers"
    }
  },
  {
    id: "sarah-smiles",
    name: "Sarah Smiles",
    handle: "@sarahsmiles",
    description: "Empathetic storytelling and daily lifestyle vlogs. Specialist in building deep, long-term connections with her audience.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&h=600&auto=format&fit=crop",
    category: "Lifestyle",
    stats: {
      followers: "850k",
      avgWatchTime: "35m",
      peakCCV: "12k",
      totalLikes: "18M"
    },
    tags: ["Storytelling", "ASMR", "Mental Health"],
    socials: {
      tiktok: "https://tiktok.com/@sarahsmiles"
    }
  },
  {
    id: "tech-guru",
    name: "Tech Guru",
    handle: "@techguru",
    description: "Breaking down complex engineering and software concepts through interactive live builds and hardware modding.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&h=550&auto=format&fit=crop",
    category: "Tech",
    stats: {
      followers: "450k",
      avgWatchTime: "55m",
      peakCCV: "8k",
      totalLikes: "5M"
    },
    tags: ["Engineering", "Coding", "Tutorials"],
    socials: {
      tiktok: "https://tiktok.com/@techguru",
      twitter: "https://twitter.com/techguru"
    }
  },
  {
    id: "music-vibe",
    name: "Music Vibe",
    handle: "@musicvibe",
    description: "Live looping and multi-instrumental performances. Taking song requests and building tracks from scratch with the audience.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&h=500&auto=format&fit=crop",
    category: "Music",
    stats: {
      followers: "2.1M",
      avgWatchTime: "30m",
      peakCCV: "25k",
      totalLikes: "40M"
    },
    tags: ["Live Looping", "Performance", "Composer"],
    socials: {
      tiktok: "https://tiktok.com/@musicvibe"
    }
  }
];
