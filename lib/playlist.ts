export interface PlaylistConfig {
  title: string;
  subtitle: string;
  description: string;
  spotifyPlaylistId: string;
  youtubePlaylistId: string;
  fallbackTrack: {
    title: string;
    artist: string;
  };
}

export const PLAYLIST_CONFIG: PlaylistConfig = {
  title: "पहाड़ों वाले गाने",
  subtitle: "पहाड़ों वाले गाने",
  description:
    "gaane jo pahadiyon mein hi sahi lagte the. before Wi-Fi, before Google Maps ki 'no signal', bus ke radio pe yehi bajta tha.",
  spotifyPlaylistId: "0sPtH0QaSeu2Hcxahtry8K",
  youtubePlaylistId: "PLpBEVvHYIhR6UfahyxrMpCRoZNYEdavK0",
  fallbackTrack: {
    title: "पहाड़ों वाले गाने",
    artist: "Radio Pahad",
  },
};
