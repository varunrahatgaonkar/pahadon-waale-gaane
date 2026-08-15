export interface TrackMetadata {
  title: string;
  artist: string;
}

export const PLAYLIST_CONFIG = {
  youtubePlaylistId: "PLecZCLJr4GNE",
  fallbackTrack: {
    title: "पहाड़ों वाले गाने",
    artist: "Radio Pahad • FM 92.7",
  } satisfies TrackMetadata,
};
