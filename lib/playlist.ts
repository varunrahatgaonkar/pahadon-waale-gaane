export interface TrackMetadata {
  id?: string;
  title: string;
  artist: string;
  duration?: string;
}

export const PLAYLIST_CONFIG = {
  // Your YouTube playlist — all playback uses this directly
  youtubePlaylistId: "PLecZCLJr4GNE",

  fallbackTrack: {
    title: "पहाड़ों वाले गाने",
    artist: "Radio Pahad • FM 92.7",
  } as TrackMetadata,

  // Shown in the playlist drawer (display only — actual playback is from the YT playlist above)
  tracks: [] as TrackMetadata[],
};
