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
  tier?: 'staff' | 'top' | 'new' | 'recruiter';
  webhookUrl?: string;
  liveUrl?: string;
  socials: {
    tiktok: string;
    instagram?: string;
    twitter?: string;
    youtube?: string;
    discord?: string;
    twitch?: string;
    steam?: string;
    website?: string;
  };
}

export const creators: Creator[] = [
  {
    id: "baked",
    name: "Baked",
    handle: "@baked.laze",
    description: "Hi, I’m Nick, founder of Peace Time Agency. I work directly with creators to help them grow on TikTok LIVE through stream strategy, setup guidance, and community support. My goal is simple, help creators stay consistent, improve their content, and turn streaming into real opportunity.",
    image: "/creators/baked.jpg",
    category: "Agency Staff",
    stats: {
      followers: "N/A",
      avgWatchTime: "N/A",
      peakCCV: "N/A",
      totalLikes: "0"
    },
    tags: ["Staff", "Gaming"],
    tier: "staff",
    liveUrl: "https://www.tiktok.com/@baked.laze/live",
    socials: {
      tiktok: "https://www.tiktok.com/@baked.laze"
    }
  },
  {
    id: "oopsitsjrpgtime",
    name: "OopsItsJRPGTime",
    handle: "@oopsitsjrpgtime",
    description: "Hello there my name is OopsItsJRPGTime or \"Oops\" for short! If I were to have to describe myself as a vibe it would have to be \"Chill.\" I stream mostly JRPG Games from classic to new and anywhere in between! I first fell in love with Jrpg games back on the SNES with my very first game ever Breath of Fire and from then on I was hooked! My goal for streaming has always been to make amazing friends, so will you be my friend?!",
    image: "/creators/oopsitsjrpgtime.jpg",
    category: "Gaming",
    stats: {
      followers: "New",
      avgWatchTime: "N/A",
      peakCCV: "N/A",
      totalLikes: "0"
    },
    tags: ["Gaming", "JRPGs", "Classic"],
    tier: "new",
    liveUrl: "https://www.tiktok.com/@oopsitsjrpgtime/live",
    socials: {
      tiktok: "https://www.tiktok.com/@oopsitsjrpgtime",
      twitch: "https://www.twitch.tv/oopsitsjrpgtime",
      youtube: "https://www.youtube.com/@OopsItsJRPGTIME",
      discord: "https://discordapp.com/users/oopsitsjrpgtime",
      steam: "https://steamcommunity.com/id/OopsItsJRPGTIME",
      website: "https://www.oopsitsjrpgtime.com/"
    }
  }
];

