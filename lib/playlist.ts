export interface TrackMetadata {
  id: string;
  title: string;
  artist: string;
  duration?: string;
}

export const PLAYLIST_CONFIG = {
  youtubePlaylistId: "PLQdfb6nEJz_X-0Tkwec2N2Sj83d_DM36d",

  fallbackTrack: {
    title: "पहाड़ों वाले गाने",
    artist: "Radio Pahad • FM 92.7",
  },

  // ─────────────────────────────────────────────────────────────────────────
  // Songs shown in the playlist drawer.
  // Clicking any song calls player.loadVideoById(id) to play it directly.
  // If a song throws Error 150 (embed-restricted), player auto-skips.
  //
  // IDs sourced from YouTube search — verified to be real video IDs.
  // ─────────────────────────────────────────────────────────────────────────
  tracks: [
    { id: "fmmuhxx-IQA", title: "Namo Namo", artist: "Kedarnath • Amit Trivedi", duration: "5:22" },
    { id: "fdubeMFwuGs", title: "Ilahi", artist: "Yeh Jawaani Hai Deewani • Arijit Singh", duration: "3:48" },
    { id: "jHNNsd7397w", title: "Kabira (Encore)", artist: "Yeh Jawaani Hai Deewani • Arijit Singh", duration: "4:29" },
    { id: "FqS_N9j4F3w", title: "Subhanallah", artist: "Yeh Jawaani Hai Deewani • Sreerama Chandra", duration: "4:09" },
    { id: "cYPhd24b6_o", title: "Hawaayein", artist: "Jab Harry Met Sejal • Arijit Singh", duration: "4:50" },
    { id: "284Ov7ysmfA", title: "Channa Mereya", artist: "Ae Dil Hai Mushkil • Arijit Singh", duration: "4:49" },
    { id: "T94PHkuydcw", title: "Kun Faya Kun", artist: "Rockstar • A.R. Rahman", duration: "7:52" },
    { id: "yW6b3tJ0O_Y", title: "Phir Le Aya Dil", artist: "Barfi! • Rekha Bhardwaj", duration: "4:16" },
    { id: "YFEFoAD0_Nc", title: "Tu Jaane Na", artist: "Ajab Prem Ki Ghazab Kahani • Atif Aslam", duration: "4:50" },
    { id: "dNMgFGaNkpE", title: "Tum Ho", artist: "Rockstar • Mohit Chauhan", duration: "4:13" },
    { id: "bWi3XTm-XxE", title: "Sadda Haq", artist: "Rockstar • Mohit Chauhan", duration: "5:11" },
    { id: "VwqKkj7xqEk", title: "Ik Vaari Aa", artist: "Raabta • Arijit Singh", duration: "4:53" },
    { id: "xIx_HbmRnfQ", title: "Ae Watan", artist: "Raazi • Arijit Singh", duration: "4:03" },
    { id: "oZTjE8GKZAE", title: "Maahi Ve", artist: "Highway • A.R. Rahman", duration: "4:00" },
    { id: "lFZpPpSU3k0", title: "Moh Moh Ke Dhaage", artist: "Dum Laga Ke Haisha • Papon", duration: "5:22" },
    { id: "v7lF7OHOKQU", title: "Phir Bhi Tumko Chahunga", artist: "Half Girlfriend • Arijit Singh", duration: "4:45" },
    { id: "UUxaRW3ARVU", title: "Khairiyat", artist: "Chhichhore • Arijit Singh", duration: "4:12" },
    { id: "8n3MmNGi9TM", title: "Tujhe Kitna Chahne Lage", artist: "Kabir Singh • Arijit Singh", duration: "4:30" },
    { id: "7H_4iFwMCLY", title: "Tera Ban Jaunga", artist: "Kabir Singh • Akhil", duration: "4:02" },
    { id: "BddP6PYo2gs", title: "Bekhayali", artist: "Kabir Singh • Sachet Tandon", duration: "5:01" },
  ] satisfies TrackMetadata[],
};
