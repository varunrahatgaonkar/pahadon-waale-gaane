export interface TrackMetadata {
  title: string;
  artist: string;
}

export const PLAYLIST_CONFIG = {
  youtubePlaylistId: "PLQdfb6nEJz_X-0Tkwec2N2Sj83d_DM36d",
  fallbackTrack: {
    title: "पहाड़ों वाले गाने",
    artist: "Radio Pahad • FM 92.7",
  } satisfies TrackMetadata,
};
