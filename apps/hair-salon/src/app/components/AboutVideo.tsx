'use client';

import { useEffect, useState } from 'react';
import { preconnect, preload } from 'react-dom';
import {
  MediaPlayer,
  MediaProvider,
  Poster,
  useMediaRemote,
  useMediaState,
} from '@vidstack/react';
import { Pause, Play } from 'lucide-react';
import type { MouseEvent } from 'react';
import { siteConfig } from '@/config/site';

type AboutVideoProps = {
  title: string;
  playLabel: string;
  pauseLabel: string;
};

type PlaybackButtonProps = Omit<AboutVideoProps, 'title'> & {
  hasRequestedPlay: boolean;
  onRequestPlay: () => void;
};

function PlaybackButton({
  playLabel,
  pauseLabel,
  hasRequestedPlay,
  onRequestPlay,
}: PlaybackButtonProps) {
  const remote = useMediaRemote();
  const paused = useMediaState('paused');
  const ended = useMediaState('ended');
  const showPlay = !hasRequestedPlay || paused || ended;

  useEffect(() => {
    if (hasRequestedPlay) void remote.play();
  }, [hasRequestedPlay, remote]);

  const togglePlayback = (event: MouseEvent<HTMLButtonElement>) => {
    if (!hasRequestedPlay) {
      onRequestPlay();
      return;
    } else if (showPlay) {
      void remote.play(event.nativeEvent);
    } else {
      void remote.pause(event.nativeEvent);
    }
  };

  return (
    <button
      type="button"
      aria-label={showPlay ? playLabel : pauseLabel}
      onClick={togglePlayback}
      className={`absolute z-20 flex items-center justify-center rounded-full bg-[#edbd58] text-[#211f1c] shadow-[0_8px_24px_rgba(0,0,0,0.28)] transition-all duration-300 hover:scale-105 hover:bg-[#f4cc78] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white ${showPlay ? 'left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2' : 'bottom-4 right-4 h-12 w-12'}`}
    >
      {showPlay ? (
        <Play className="ml-1 h-7 w-7 fill-current" aria-hidden="true" />
      ) : (
        <Pause className="h-6 w-6 fill-current" aria-hidden="true" />
      )}
    </button>
  );
}

export function AboutVideo({ title, playLabel, pauseLabel }: AboutVideoProps) {
  preconnect(new URL(siteConfig.media.aboutVideo.src).origin);
  preload(siteConfig.media.aboutVideo.poster, {
    as: 'image',
    fetchPriority: 'low',
  });

  const [hasRequestedPlay, setHasRequestedPlay] = useState(false);

  return (
    <MediaPlayer
      className="about-video-player absolute inset-0 block h-full w-full overflow-hidden bg-[#211f1c]"
      src={siteConfig.media.aboutVideo.src}
      load="play"
      title={title}
      playsInline
      preload="none"
    >
      <MediaProvider
        mediaProps={{
          onEnded: (event) => {
            event.currentTarget.currentTime = 0;
          },
        }}
      >
        <Poster src={siteConfig.media.aboutVideo.poster} alt={title} />
      </MediaProvider>
      <PlaybackButton
        playLabel={playLabel}
        pauseLabel={pauseLabel}
        hasRequestedPlay={hasRequestedPlay}
        onRequestPlay={() => setHasRequestedPlay(true)}
      />
    </MediaPlayer>
  );
}