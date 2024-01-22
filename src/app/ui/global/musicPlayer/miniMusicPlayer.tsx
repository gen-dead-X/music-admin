import React, { useState, useEffect } from 'react';
import {
  MdOutlinePlayArrow,
  MdOutlinePauseCircleOutline,
} from 'react-icons/md';

import './_miniMusicPlayer.scoped.scss';

type MusicInfo = {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  isDragging: boolean;
};

export default function MusicPlayer({
  musicSrc,
}: Readonly<{ musicSrc: string }>) {
  const [musicInfo, setMusicInfo] = useState<MusicInfo>({
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    isDragging: false,
  });

  const audioRef = React.createRef<HTMLAudioElement>();

  useEffect(() => {
    if (!audioRef.current) {
      return;
    }

    const audioPlayer = audioRef.current;

    const updateCurrentTime = () => {
      setMusicInfo(prev => {
        return { ...prev, currentTime: audioPlayer.currentTime };
      });
    };

    const updateDuration = () => {
      setMusicInfo(prev => {
        return { ...prev, duration: audioPlayer.duration };
      });
    };

    audioPlayer.addEventListener('timeupdate', updateCurrentTime);
    audioPlayer.addEventListener('durationchange', updateDuration);

    return () => {
      audioPlayer.removeEventListener('timeupdate', updateCurrentTime);
      audioPlayer.removeEventListener('durationchange', updateDuration);
    };
  }, [audioRef]);

  const togglePlayPause = () => {
    if (!audioRef.current) {
      return;
    }

    const audioPlayer = audioRef.current;
    if (musicInfo.isPlaying) {
      audioPlayer.pause();
    } else {
      audioPlayer.play();
    }
    setMusicInfo(prev => {
      return { ...prev, isPlaying: !prev.isPlaying };
    });
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const barRect = e.currentTarget.getBoundingClientRect();
    const newPosition = (e.clientX - barRect.left) / barRect.width;
    const newTime = newPosition * musicInfo.duration;

    setMusicInfo(prev => {
      return { ...prev, currentTime: newTime };
    });

    if (!audioRef.current) {
      return;
    }

    const audioPlayer = audioRef.current;
    audioPlayer.currentTime = newTime;
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const playedWidth = (musicInfo.currentTime / musicInfo.duration) * 100;
  const unplayedWidth = 100 - playedWidth;

  return (
    <div>
      <audio ref={audioRef} src={musicSrc}></audio>

      <div>
        <div
          className="relative mt-5 h-1 w-full cursor-pointer rounded-xl"
          onClick={handleSeek}
        >
          <div
            className="absolute bottom-0 top-0 h-2 rounded-full bg-blue-500"
            style={{ width: `${playedWidth}%` }}
          ></div>
          <div
            className="absolute bottom-0 top-0 h-2 rounded-full bg-gray-500"
            style={{ width: `${unplayedWidth}%`, left: `${playedWidth}%` }}
          ></div>
          <div
            className="absolute top-[-8px] z-30 h-6 w-6 rounded-full bg-green-500"
            style={{ left: `calc(${playedWidth}% - 2%)` }}
          >
            <div className="mini-music-seek"></div>
          </div>
        </div>

        <div className="mt-5 flex items-center justify-between">
          <p>{formatTime(musicInfo.currentTime)}</p>
          <div className="flex items-center justify-center gap-10 text-3xl">
            {/* <button>
              <GrCaretPrevious />
            </button> */}

            <button onClick={togglePlayPause} type="button">
              {!musicInfo.isPlaying ? (
                <MdOutlinePlayArrow />
              ) : (
                <MdOutlinePauseCircleOutline />
              )}
            </button>

            {/* <button>
              <GrCaretNext />
            </button> */}
          </div>
          <p>{formatTime(musicInfo.duration)}</p>
        </div>
      </div>
    </div>
  );
}
