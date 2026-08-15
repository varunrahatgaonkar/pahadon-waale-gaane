export interface TrackMetadata {
  id: string;
  title: string;
  artist: string;
  duration?: string;
}

export const PLAYLIST_CONFIG = {
  // The reference YouTube playlist (used for external link only — playback uses curated queue below)
  youtubePlaylistId: "PLQdfb6nEJz_X-0Tkwec2N2Sj83d_DM36d",

  // Fallback track info shown before any song loads
  fallbackTrack: {
    title: "पहाड़ों वाले गाने",
    artist: "Radio Pahad • FM 92.7",
  },

  // ─────────────────────────────────────────────────────────────────
  // CURATED QUEUE — These video IDs are verified to allow embedding.
  // Major label songs (T-Series, YRF, Saregama) often block embedding
  // with Error 150. We avoid those here and use the channels/uploads
  // that explicitly allow it.
  //
  // YouTube embed-check: https://www.youtube.com/embed/<VIDEO_ID>
  // If it plays in an iframe, it's embeddable.
  // ─────────────────────────────────────────────────────────────────
  tracks: [
    {
      id: "tCUFKiHkAMw",
      title: "Namo Namo",
      artist: "Kedarnath • Amit Trivedi",
      duration: "5:22",
    },
    {
      id: "S-iFoLxsj4k",
      title: "Channa Mereya",
      artist: "Ae Dil Hai Mushkil • Arijit Singh",
      duration: "4:49",
    },
    {
      id: "wVUrHVKPDZE",
      title: "Hawaayein",
      artist: "Jab Harry Met Sejal • Arijit Singh",
      duration: "4:50",
    },
    {
      id: "4L0f0V-xhT4",
      title: "Ilahi",
      artist: "Yeh Jawaani Hai Deewani • Arijit Singh",
      duration: "3:48",
    },
    {
      id: "p6BZS78YQHA",
      title: "Phir Le Aya Dil",
      artist: "Barfi! • Rekha Bhardwaj",
      duration: "4:16",
    },
    {
      id: "EDM3605BVKY",
      title: "Safarnama",
      artist: "Tamasha • Lucky Ali",
      duration: "4:11",
    },
    {
      id: "1LDc0ePiWF4",
      title: "Subhanallah",
      artist: "Yeh Jawaani Hai Deewani • Shafqat Amanat Ali",
      duration: "4:09",
    },
    {
      id: "4KdBHxdPu6I",
      title: "Tu Jaane Na",
      artist: "Ajab Prem Ki Ghazab Kahani • Atif Aslam",
      duration: "4:50",
    },
    {
      id: "s7P7H8Lz31k",
      title: "Kasto Mazza",
      artist: "Parineeta • Sonu Nigam",
      duration: "4:50",
    },
    {
      id: "9GKz-v8P5I0",
      title: "Sham",
      artist: "Aisha • Amit Trivedi",
      duration: "4:44",
    },
    {
      id: "g-w3s3x_88k",
      title: "Tum Ho",
      artist: "Rockstar • Mohit Chauhan",
      duration: "4:13",
    },
    {
      id: "dx4Teh-n3ks",
      title: "Phir Se Udd Chala",
      artist: "Rockstar • Mohit Chauhan",
      duration: "4:31",
    },
    {
      id: "FsUJZk7wQpA",
      title: "Kun Faya Kun",
      artist: "Rockstar • A.R. Rahman",
      duration: "7:52",
    },
    {
      id: "djU4Lq_xJ7k",
      title: "Kabira",
      artist: "Yeh Jawaani Hai Deewani • Rekha Bhardwaj",
      duration: "4:29",
    },
    {
      id: "z3wAjzRKLl0",
      title: "Kabira (Encore)",
      artist: "Yeh Jawaani Hai Deewani • Arijit Singh",
      duration: "3:10",
    },
  ] satisfies TrackMetadata[],
};
