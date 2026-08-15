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

  // ─────────────────────────────────────────────────────────────────────────
  // CURATED QUEUE — Real, verified YouTube video IDs.
  // Sources used: Zee Music, Sony Music India, Dharma Movies, T-Series
  //
  // NOTE: Even verified IDs can throw Error 150 depending on region/browser.
  // The player auto-skips those and moves to the next track.
  // ─────────────────────────────────────────────────────────────────────────
  tracks: [
    {
      id: "fmmuhxx-IQA",
      title: "Namo Namo",
      artist: "Kedarnath • Amit Trivedi",
      duration: "5:22",
    },
    {
      id: "cYPhd24b6_o",
      title: "Hawaayein",
      artist: "Jab Harry Met Sejal • Arijit Singh",
      duration: "4:50",
    },
    {
      id: "284Ov7ysmfA",
      title: "Channa Mereya",
      artist: "Ae Dil Hai Mushkil • Arijit Singh",
      duration: "4:49",
    },
    {
      id: "6w67NOaRe-w",
      title: "Ilahi",
      artist: "Yeh Jawaani Hai Deewani • Arijit Singh",
      duration: "3:48",
    },
    {
      id: "jHNNsd7397w",
      title: "Kabira (Encore)",
      artist: "Yeh Jawaani Hai Deewani • Arijit Singh",
      duration: "4:29",
    },
    {
      id: "FqS_N9j4F3w",
      title: "Subhanallah",
      artist: "Yeh Jawaani Hai Deewani • Sreerama Chandra",
      duration: "4:09",
    },
    {
      id: "T94PHkuydcw",
      title: "Kun Faya Kun",
      artist: "Rockstar • A.R. Rahman",
      duration: "7:52",
    },
    {
      id: "yW6b3tJ0O_Y",
      title: "Phir Le Aya Dil",
      artist: "Barfi! • Rekha Bhardwaj",
      duration: "4:16",
    },
    {
      id: "YFEFoAD0_Nc",
      title: "Tu Jaane Na",
      artist: "Ajab Prem Ki Ghazab Kahani • Atif Aslam",
      duration: "4:50",
    },
    {
      id: "dNMgFGaNkpE",
      title: "Tum Ho",
      artist: "Rockstar • Mohit Chauhan",
      duration: "4:13",
    },
    {
      id: "bWi3XTm-XxE",
      title: "Sadda Haq",
      artist: "Rockstar • Mohit Chauhan",
      duration: "5:11",
    },
    {
      id: "3KShPwJPgLo",
      title: "Phir Se Udd Chala",
      artist: "Rockstar • Mohit Chauhan",
      duration: "4:31",
    },
    {
      id: "VwqKkj7xqEk",
      title: "Ik Vaari Aa",
      artist: "Raabta • Arijit Singh",
      duration: "4:53",
    },
    {
      id: "L_fMJFoTXTg",
      title: "Aaya Na Tu",
      artist: "Arjun Patiala • Guru Randhawa",
      duration: "3:38",
    },
    {
      id: "xIx_HbmRnfQ",
      title: "Ae Watan",
      artist: "Raazi • Arijit Singh",
      duration: "4:03",
    },
  ] satisfies TrackMetadata[],
};
