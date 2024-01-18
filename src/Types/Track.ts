import { TRACK_PRIVACY } from '@/enums/track';

export type Track = {
  id?: string;
  title: string;
  audioFile: File;
  artist: string;
  album: string;
  genre: string;
  release: Date;
  albumArtWork?: File | undefined | string;
  albumArtWorkName?: string;
  description?: string;
  tags?: Array<string>;
  privacy: TRACK_PRIVACY;
};
