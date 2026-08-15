export interface TrackMetadata {
  id?: string;
  title: string;
  artist: string;
  duration?: string;
}

export const PLAYLIST_CONFIG = {
  // Your YouTube playlist
  youtubePlaylistId: "PLQdfb6nEJz_X-0Tkwec2N2Sj83d_DM36d",

  // Start playback from this video ID (Ilahi - Yeh Jawaani Hai Deewani)
  startVideoId: "6w67NOaRe-w",

  fallbackTrack: {
    title: "पहाड़ों वाले गाने",
    artist: "Radio Pahad • FM 92.7",
  } as TrackMetadata,

  // Shown in the playlist drawer (display only — actual playback is from the YT playlist above)
  tracks: [] as TrackMetadata[],
};
