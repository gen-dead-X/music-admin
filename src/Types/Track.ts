import { TRACK_PRIVACY } from '@/enums/track';

export type Track = {
  id?: string;
  title: string;
  audioFile?: File;
  artist: string;
  album: string;
  genre: string;
  release: Date;
  albumArtWork?: File;
  albumArtWorkName?: string;
  description?: string;
  tags?: Array<string | undefined>;
  privacy: TRACK_PRIVACY;
  uploader: string;
};
