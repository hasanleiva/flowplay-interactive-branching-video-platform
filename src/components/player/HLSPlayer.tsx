import React, { useEffect, useRef } from 'react';
import Hls from 'hls.js';
import { usePlayerStore } from '@/stores/playerStore';
export function HLSPlayer() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<Hls | null>(null);
  const videoSrc = usePlayerStore(state => state.videoSrc);
  const isPlaying = usePlayerStore(state => state.isPlaying);
  const isMuted = usePlayerStore(state => state.isMuted);
  const setCurrentTime = usePlayerStore(state => state.setCurrentTime);
  const setDuration = usePlayerStore(state => state.setDuration);
  const setLoading = usePlayerStore(state => state.setLoading);
  const play = usePlayerStore(state => state.play);
  const pause = usePlayerStore(state => state.pause);
  const nextVideo = usePlayerStore(state => state.nextVideo);
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !videoSrc) return;

    // Clean up any previous Hls instance before creating a new one
    if (hlsRef.current) {
      hlsRef.current.destroy();
      hlsRef.current = null;
    }

    if (Hls.isSupported()) {
      const hls = new Hls();
      hlsRef.current = hls;
      hls.loadSource(videoSrc);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        setLoading(false);
        if (isPlaying) {
          video
            .play()
            .catch(e => {
              if (e.name !== 'NotAllowedError' && e.name !== 'AbortError') {
                console.error('Play failed', e);
              }
            });
        }
      });
      hls.on(Hls.Events.ERROR, (event, data) => {
        // Log only fatal (non‑recoverable) errors
        if (data.fatal) {
          console.error('HLS fatal error:', data);
        }
      });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = videoSrc;
      video.addEventListener('loadedmetadata', () => {
        setLoading(false);
        if (isPlaying) {
          video
            .play()
            .catch(e => {
              if (e.name !== 'NotAllowedError' && e.name !== 'AbortError') {
                console.error('Play failed', e);
              }
            });
        }
      });
    }

    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
    };
  }, [videoSrc]);
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (isPlaying) {
      video
        .play()
        .catch(e => {
          if (e.name !== 'NotAllowedError' && e.name !== 'AbortError') {
            console.error('Play failed', e);
          }
        });
    } else {
      video.pause();
    }
  }, [isPlaying]);
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = isMuted;
    }
  }, [isMuted]);
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };
  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };
  return (
    <video
      ref={videoRef}
      className="w-full h-full object-cover"
      playsInline
      onTimeUpdate={handleTimeUpdate}
      onLoadedMetadata={handleLoadedMetadata}
      onCanPlay={() => setLoading(false)}
      onWaiting={() => setLoading(true)}
      onPlay={play}
      onPause={pause}
      onEnded={nextVideo}
      loop={false}
    />
  );
}