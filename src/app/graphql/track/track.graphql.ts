import { gql } from '@apollo/client';

export const UPLOAD_NEW_TRACK_MUTATION = gql`
  mutation Mutation($data: TrackInputs!) {
    uploadNewTrack(data: $data) {
      data {
        albumArtWork
        albumId
        artist
        description
        genre
        privacy
        release
        title
        uploader
      }
    }
  }
`;
