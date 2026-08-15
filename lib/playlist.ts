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
    { title: "Bedu Pako Baramaasa", artist: "Pahadi Folk Classic", duration: "3:45" },
    { title: "Chalta Rahe Bus Ka Radio", artist: "Radio Pahad Special", duration: "4:12" },
    { title: "Moh Moh Ke Dhaage", artist: "Papon • Monali Thakur", duration: "5:22" },
    { title: "Yun Hi Chala Chal Rahi", artist: "Udit Narayan • AR Rahman", duration: "7:28" },
    { title: "Kasto Mazza Hai Parisa", artist: "Sonu Nigam • Parineeta", duration: "4:50" },
    { title: "Subhanallah", artist: "Sreerama Chandra • Pritam", duration: "4:09" },
    { title: "Hawaayein", artist: "Arijit Singh • Pritam", duration: "4:50" },
    { title: "Kishore Kumar Roadtrip Hits", artist: "Kishore Kumar", duration: "6:15" },
    { title: "Safarnama", artist: "Lucky Ali • Tamasha", duration: "4:11" },
    { title: "Dil Chahta Hai", artist: "Shankar Mahadevan", duration: "5:11" },
    { title: "Kabira (Encore)", artist: "Arijit Singh • Harshdeep Kaur", duration: "4:29" },
    { title: "Ilahi", artist: "Arijit Singh • Yeh Jawaani Hai Deewani", duration: "3:48" },
    { title: "Patakha Guddi", artist: "Nooran Sisters • AR Rahman", duration: "4:45" },
    { title: "Kun Faya Kun", artist: "AR Rahman • Javed Ali", duration: "7:53" },
    { title: "Bandeya Re Bandeya", artist: "Arijit Singh • Simmba", duration: "4:14" },
    { title: "Kaafirana", artist: "Arijit Singh • Kedarnath", duration: "5:42" },
    { title: "Namo Namo Shankara", artist: "Amit Trivedi • Kedarnath", duration: "5:22" },
    { title: "Phir Se Udd Chala", artist: "Mohit Chauhan • Rockstar", duration: "4:31" },
    { title: "Sham", artist: "Amit Trivedi • Aisha", duration: "4:44" },
    { title: "Pahaad Ki Subah", artist: "Himachali / Garhwali Beats", duration: "4:05" },
  ] satisfies TrackMetadata[],
};
