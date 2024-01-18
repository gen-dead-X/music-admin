import { TRACK_PRIVACY } from '@/enums/track';
import * as yup from 'yup';

const supportedFileTypes = ['image/jpeg', 'image/png', 'image/jpg'];
const maxFileSize = 1024 * 1024;

// export const trackValidationSchema = yup.object({
//   title: yup.string().required(),
//   audioFile: yup.mixed().test('fileSize', 'The file is too large', value => {
//     if (!value) return true; // attachment is optional

//     if (value instanceof File) {
//       return value?.size <= maxFileSize;
//     }
//   }),
//   audioFile: yup
//     .mixed<File | string>()
//     .test(
//       'file',
//       'Please Provide Item Image',
//       (value: File | string | undefined) => {
//         if (value) return true;
//         return false;
//       }
//     )
//     .test('fileSize', 'File size is too large', value => {
//       if (!value) return true;
//       if (value instanceof File) {
//         return value.size <= maxFileSize;
//       }
//       return true;
//     })
//     .test('fileType', 'Unsupported file type', value => {
//       if (!value) return true;
//       if (value instanceof File) {
//         return supportedFileTypes.includes(value.type);
//       }
//       return true;
//     }),
//   artist: yup.string().required(),
//   album: yup.string().required(),
//   genre: yup.string().required(),
//   release: yup.date().required(),
//   albumArtWork: yup
//     .mixed<File | string>()
//     .test('file', (value: File | string | undefined) => {
//       if (value) return true;
//       return false;
//     })
//     .test('fileSize', 'File size is too large', value => {
//       if (!value) return true;
//       if (value instanceof File) {
//         return value.size <= maxFileSize;
//       }
//       return true;
//     })
//     .test('fileType', 'Unsupported file type', value => {
//       if (!value) return true;
//       if (value instanceof File) {
//         return supportedFileTypes.includes(value.type);
//       }
//       return true;
//     }),
//   albumArtWorkName: yup.string().optional(),
//   description: yup.string().optional(),
//   tags: yup.array().of(yup.string()).optional(),
//   privacy: yup
//     .string()
//     .oneOf(
//       Object.values(TRACK_PRIVACY),
//       `Privacy Can Be Only Between ${Object.values(TRACK_PRIVACY)}`
//     )
//     .required(),
// });

export const trackValidationSchema = yup.object().shape({
  id: yup.string(),
  title: yup.string().required('Title is required'),
  audioFile: yup.mixed<File>().required('Audio file is required'),
  artist: yup.string().required('Artist is required'),
  album: yup.string().required('Album is required'),
  genre: yup.string().required('Genre is required'),
  release: yup.date().required('Release date is required'),
  albumArtWork: yup.mixed<File | string>().optional(),
  albumArtWorkName: yup.string().optional(),
  description: yup.string().optional(),
  tags: yup.array().of(yup.string()).optional(),
  privacy: yup
    .string()
    .oneOf(
      Object.values(TRACK_PRIVACY),
      `Privacy must be one of ${Object.values(TRACK_PRIVACY)}`
    )
    .required('Privacy is required'),
});
