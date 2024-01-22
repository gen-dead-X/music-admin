import { TRACK_PRIVACY } from '@/enums/track';
import * as yup from 'yup';

const supportedAudioFileTypes = ['audio/*'];
const supportedImageFiles = [
  'image/jpeg',
  'image/jpg',
  'image/webp',
  'image/png',
];
const maxFileSize = 1024 * 1024;

export const trackValidationSchema = yup.object().shape({
  title: yup.string().required('Title is required'),
  audioFile: yup.mixed<File>(),
  artist: yup.string().required('Artist is required'),
  album: yup.string().required('Album is required'),
  genre: yup.string().required('Genre is required'),
  release: yup.date().required('Release date is required'),
  albumArtWork: yup.mixed<File>(),
  albumArtWorkName: yup.string().optional(),
  description: yup.string().optional(),
  uploader: yup.string().required('Uploader is required'),
  privacy: yup
    .string()
    .oneOf(
      Object.values(TRACK_PRIVACY),
      `Privacy must be one of ${Object.values(TRACK_PRIVACY)}`
    )
    .required('Privacy is required'),
});
