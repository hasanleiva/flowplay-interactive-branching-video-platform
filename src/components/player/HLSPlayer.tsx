import React, { useEffect, useRef, useCallback } from 'react';
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
  const stableSetLoading = useCallback(setLoading, [setLoading]);
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !videoSrc) return;
    if (hlsRef.current) {
      hlsRef.current.destroy();
    }
    const hls = new Hls({
      // Fine-tune config for better resilience
      maxBufferLength: 30,
      maxMaxBufferLength: 600,
    });
    hlsRef.current = hls;
    if (Hls.isSupported()) {
      hls.loadSource(videoSrc);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        stableSetLoading(false);
        if (isPlaying) {
          video.play().catch(e => {
            if (e.name !== 'NotAllowedError' && e.name !== 'AbortError') {
              console.error('Play failed after manifest parse', e);
            }
          });
        }
      });
      hls.on(Hls.Events.ERROR, (event, data) => {
        if (data.fatal) {
          console.error('HLS fatal error:', data.details);
          switch (data.type) {
            case Hls.ErrorTypes.NETWORK_ERROR:
              console.log('Attempting to recover from network error...');
              hls.startLoad();
              break;
            case Hls.ErrorTypes.MEDIA_ERROR:
              console.log('Attempting to recover from media error...');
              hls.recoverMediaError();
              break;
            default:
              // Cannot recover, destroy HLS instance
              console.error('Unrecoverable HLS error, destroying instance.');
              hls.destroy();
              break;
          }
        } else {
          // Suppress non-fatal errors from console spam if needed
          // console.warn('HLS non-fatal error:', data.details);
        }
      });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      // Native HLS support on Safari
      video.src = videoSrc;
      video.addEventListener('loadedmetadata', () => {
        stableSetLoading(false);
        if (isPlaying) {
          video.play().catch(e => {
            if (e.name !== 'NotAllowedError' && e.name !== 'AbortError') {
              console.error('Native HLS play failed', e);
            }
          });
        }
      });
    }
    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
      }
    };
  }, [videoSrc, isPlaying, stableSetLoading]);
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (isPlaying) {
      video.play().catch(e => {
        if (e.name !== 'NotAllowedError' && e.name !== 'AbortError') {
          console.error('Play failed on isPlaying change', e);
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
      onCanPlay={() => stableSetLoading(false)}
      onWaiting={() => stableSetLoading(true)}
      onPlay={play}
      onPause={pause}
      onEnded={pause} // Pause video on end, no more feed
      loop={false}
    />
  );
}