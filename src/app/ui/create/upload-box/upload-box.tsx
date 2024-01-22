'use client';

import { Track } from '@/Types/Track';
import AnimatedInputLabel from '@/app/global/Inputs/AnimatedInputLabel';
import { trackValidationSchema } from '@/validators/track/track';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useCallback, useContext, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FormProvider, useForm } from 'react-hook-form';

import { IoCloudUploadSharp } from 'react-icons/io5';
import { FaTrashCan } from 'react-icons/fa6';
import { UserContext } from '@/context/User/UserContext';
import SubmitButton from '@/app/global/Buttons/SubmitButton';
import MiniMusicPlayer from '../../global/musicPlayer/miniMusicPlayer';
import { UPLOAD_NEW_TRACK_MUTATION } from '@/app/graphql/track/track.graphql';
import {
  errorMessageToast,
  successMessageToast,
} from '../../global/toast/reactToastify';
import { useMutation } from '@apollo/client';

interface Audio {
  audioFile: File;
  audioUrl: string;
}

interface AudioDropzoneProps {
  onAudioDrop: (audio: Audio) => void;
}

const AudioDropzone: React.FC<AudioDropzoneProps> = ({ onAudioDrop }) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      try {
        if (acceptedFiles.length) {
          const audioFile = acceptedFiles[0];
          const audioUrl = URL.createObjectURL(acceptedFiles[0]);

          const audio: Audio = {
            audioFile,
            audioUrl,
          };

          onAudioDrop(audio);
        }
      } catch (error) {
        console.log(error);
      }
    },
    [onAudioDrop]
  );

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'audio/*': [],
    },
    onDrop,
  });

  return (
    <div>
      <div
        {...getRootProps()}
        className={
          'cursor-pointer border-[3px] border-dashed bg-slate-50 p-20 text-center text-2xl transition-all duration-200 hover:bg-gray-200 dark:bg-gray-950 hover:dark:bg-gray-800 '
        }
      >
        <input {...getInputProps()} />
        <div className="flex justify-center">
          <IoCloudUploadSharp className="text-[8rem] text-blue-500" />
        </div>
        <p>Drag and drop here</p>
      </div>
    </div>
  );
};

export default function UploadBox() {
  const [audio, setAudio] = useState<Audio | null>(null);
  const { profile } = useContext(UserContext);

  const handleAudioDrop = (audio: Audio) => {
    setAudio(audio);
  };

  const [trackInput, { loading }] = useMutation(UPLOAD_NEW_TRACK_MUTATION, {
    onCompleted: ({ track }: { track: any }) => {
      if (track.success) {
        successMessageToast(track.message ?? 'Welcome Back!');
      } else {
        errorMessageToast(track?.message ?? '');
      }
    },
    onError(error) {
      errorMessageToast(error.message);
    },
  });

  const form = useForm<Track>({
    resolver: yupResolver(trackValidationSchema),
  });

  function handleTrackUpload(formValues: Track) {
    console.log(formValues);

    const newTrack = new FormData();

    newTrack.append('album', formValues.album);
    newTrack.append('title', formValues.title);
    newTrack.append('artist', formValues.artist);
    newTrack.append('audioFile', formValues.audioFile ?? '');
    newTrack.append('albumArtWork', formValues.albumArtWork ?? '');
    newTrack.append('albumArtWorkName', formValues.albumArtWorkName ?? '');
    newTrack.append('genre', formValues.genre);
    // newTrack.append('tags', JSON.stringify(formValues.tags));
    newTrack.append('genre', formValues.genre);
    newTrack.append('privacy', formValues.privacy);
    newTrack.append('description', formValues.description ?? '');
    newTrack.append('description', JSON.stringify(formValues.release));
    newTrack.append('uploader', formValues.uploader);
    newTrack.append('albumId', 'something');
    newTrack.append('userId', profile?.id ?? '');

    console.log(newTrack.forEach(data => console.log(data)));

    trackInput({ variables: newTrack });
  }

  return (
    <div className="bg-white p-5 dark:bg-[rgb(29,29,29)]">
      <AudioDropzone onAudioDrop={handleAudioDrop} />

      {audio && (
        <FormProvider {...form}>
          <form
            onSubmit={form.handleSubmit(handleTrackUpload)}
            className="my-5 flex flex-col gap-8"
          >
            <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
              <div className="flex w-full items-center gap-3">
                <div className="w-full">
                  <MiniMusicPlayer musicSrc={audio.audioUrl} />
                </div>

                <button onClick={() => setAudio(null)}>
                  <FaTrashCan className="text-4xl text-red-500 hover:text-red-300" />
                </button>
              </div>

              <AnimatedInputLabel
                label={'Title'}
                type="text"
                name={'title'}
                defaultValue={audio?.audioFile.name}
                className="my-auto w-full rounded-none border-[2px]"
              />
            </div>

            <div className="flex flex-col gap-5 md:flex-row">
              <AnimatedInputLabel
                label={'Artist'}
                type="text"
                name={'artist'}
                defaultValue={profile?.name}
                className="my-auto w-full rounded-none border-[2px]"
              />
              <AnimatedInputLabel
                label={'Album'}
                type="text"
                name={'album'}
                className="my-auto w-full rounded-none border-[2px]"
              />
            </div>

            <div className="flex flex-col gap-5 md:flex-row">
              <AnimatedInputLabel
                label={'Genre'}
                type="text"
                name={'genre'}
                className="my-auto w-full rounded-none border-[2px]"
              />
              <AnimatedInputLabel
                label={'Release'}
                type="date"
                name={'release'}
                className="my-auto w-full rounded-none border-[2px]"
              />
            </div>

            <div className="flex flex-col gap-5 md:flex-row">
              <AnimatedInputLabel
                label={'Album ArtWork'}
                type="file"
                name={'albumArtWork'}
                className="my-auto w-full rounded-none border-[2px]"
              />

              <AnimatedInputLabel
                label={'Album ArtWork Name'}
                type="text"
                name={'albumArtWorkName'}
                className="my-auto w-full rounded-none border-[2px]"
              />
            </div>

            <div className="flex flex-col gap-5 md:flex-row">
              <AnimatedInputLabel
                label={'Description'}
                type="text"
                name={'description'}
                className="my-auto w-full rounded-none border-[2px]"
              />
            </div>

            <div className="flex flex-col gap-5 md:flex-row">
              <AnimatedInputLabel
                label={'Tags'}
                type="text"
                name={'tags'}
                className="my-auto w-full rounded-none border-[2px]"
              />

              <AnimatedInputLabel
                label={'Privacy'}
                type="text"
                name={'privacy'}
                className="my-auto w-full rounded-none border-[2px]"
              />
            </div>

            <AnimatedInputLabel
              label={'Uploader'}
              type="text"
              name={'uploader'}
              defaultValue={profile?.name}
              className="my-auto w-full rounded-none border-[2px]"
            />

            <button type="submit">
              <SubmitButton
                className={loading ? ' submit-animation' : '' + 'rounded-full'}
              >
                Submit
              </SubmitButton>
            </button>
          </form>
        </FormProvider>
      )}
    </div>
  );
}
