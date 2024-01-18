'use client';

import { Track } from '@/Types/Track';
import AnimatedInputLabel from '@/app/global/Inputs/AnimatedInputLabel';
import { trackValidationSchema } from '@/validators/track/track';
import { signInValidationSchema } from '@/validators/user/auth';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useForm } from 'react-hook-form';

interface Audio {
  audioFile: File;
  audioUrl: string;
}

interface AudioDropzoneProps {
  onAudioDrop: (audio: Audio) => void;
}

const AudioDropzone: React.FC<AudioDropzoneProps> = ({ onAudioDrop }) => {
  const [uploadedAudio, setUploadedAudio] = useState<Audio | null>(null);

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

          setUploadedAudio(audio);
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
        className="cursor-pointer border-[3px] border-dashed p-20 text-center text-2xl transition-all duration-200 hover:bg-slate-500"
      >
        <input {...getInputProps()} />
        <p>Drag and drop an audio file here, or click to select one</p>
      </div>

      {uploadedAudio && (
        <div>
          <p>Uploaded Audio:</p>

          <audio controls className="w-full">
            <source src={uploadedAudio.audioUrl} />
            Your browser does not support the audio element.
          </audio>
        </div>
      )}
    </div>
  );
};

const UploadBox = () => {
  const [audio, setAudio] = useState<Audio | null>(null);

  const handleAudioDrop = (audio: Audio) => {
    setAudio(audio);
  };

  const form = useForm<Track>({
    resolver: yupResolver(trackValidationSchema),
  });

  return (
    <div>
      <AudioDropzone onAudioDrop={handleAudioDrop} />
      {audio && (
        <div className="bg-slate-800 p-5">
          <input
            // label={'File Name'}
            type="text"
            name={'audioName'}
            defaultValue={audio.audioFile.name}
            className="w-full bg-transparent"
          />
        </div>
      )}
    </div>
  );
};

export default UploadBox;
