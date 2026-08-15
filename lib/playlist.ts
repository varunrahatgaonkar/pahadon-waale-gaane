export interface TrackMetadata {
  id?: string;
  title: string;
  artist: string;
  duration?: string;
}

export const PLAYLIST_CONFIG = {
  youtubePlaylistId: "PLQdfb6nEJz_X-0Tkwec2N2Sj83d_DM36d",
  fallbackTrack: {
    title: "पहाड़ों वाले गाने",
    artist: "Radio Pahad • FM 92.7",
  } satisfies TrackMetadata,
  tracks: [
    { id: "S12_98s_x77", title: "Maahi Ve", artist: "Highway • A.R. Rahman", duration: "4:00" },
    { id: "d9IxdwEFkLg", title: "Moh Moh Ke Dhaage", artist: "Dum Laga Ke Haisha • Papon", duration: "5:22" },
    { id: "eB825hP-6yU", title: "Yun Hi Chala Chal Rahi", artist: "Swades • Udit Narayan & AR Rahman", duration: "7:28" },
    { id: "s7P7H8Lz31k", title: "Kasto Mazza", artist: "Parineeta • Sonu Nigam", duration: "4:50" },
    { id: "g-w3s3x_88k", title: "Subhanallah", artist: "Yeh Jawaani Hai Deewani • Sreerama Chandra", duration: "4:09" },
    { id: "cARxS1fO_6w", title: "Hawaayein", artist: "Jab Harry Met Sejal • Arijit Singh", duration: "4:50" },
    { id: "1x1s_7X_89g", title: "Safarnama", artist: "Tamasha • Lucky Ali", duration: "4:11" },
    { id: "z3wAjzRKLl0", title: "Kabira (Encore)", artist: "Yeh Jawaani Hai Deewani • Arijit Singh", duration: "4:29" },
    { id: "djU4Lq_xJ7k", title: "Ilahi", artist: "Yeh Jawaani Hai Deewani • Arijit Singh", duration: "3:48" },
    { id: "dx4Teh-n3ks", title: "Namo Namo", artist: "Kedarnath • Amit Trivedi", duration: "5:22" },
    { id: "8_80i_j8_98", title: "Kaafirana", artist: "Kedarnath • Arijit Singh", duration: "5:42" },
    { id: "1x0U1f1g84c", title: "Phir Se Udd Chala", artist: "Rockstar • Mohit Chauhan", duration: "4:31" },
    { id: "0o-18b7s_2Y", title: "Sham", artist: "Aisha • Amit Trivedi", duration: "4:44" },
    { id: "gN7Y8G2NnVE", title: "Bedu Pako Baramaasa", artist: "Pahadi Folk Classic", duration: "3:45" },
    { id: "4i0e_9s_x78", title: "Chalta Rahe Bus Ka Radio", artist: "Radio Pahad Special", duration: "4:12" },
  ] satisfies TrackMetadata[],
};
