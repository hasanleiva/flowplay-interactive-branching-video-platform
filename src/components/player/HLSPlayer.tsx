import React, { useEffect, useRef } from 'react';
import Hls from 'hls.js';
import { usePlayerStore } from '@/stores/playerStore';
export function HLSPlayer() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoSrc = usePlayerStore(state => state.videoSrc);
  const isPlaying = usePlayerStore(state => state.isPlaying);
  const isMuted = usePlayerStore(state => state.isMuted);
  const setCurrentTime = usePlayerStore(state => state.setCurrentTime);
  const setDuration = usePlayerStore(state => state.setDuration);
  const setLoading = usePlayerStore(state => state.setLoading);
  const play = usePlayerStore(state => state.play);
  const pause = usePlayerStore(state => state.pause);
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !videoSrc) return;
    let hls: Hls | null = null;
    if (Hls.isSupported()) {
      hls = new Hls();
      hls.loadSource(videoSrc);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        setLoading(false);
        if (isPlaying) video.play().catch(e => console.error("Autoplay failed", e));
      });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = videoSrc;
      video.addEventListener('loadedmetadata', () => {
        setLoading(false);
        if (isPlaying) video.play().catch(e => console.error("Autoplay failed", e));
      });
    }
    return () => {
      if (hls) {
        hls.destroy();
      }
    };
  }, [videoSrc, setLoading, isPlaying]);
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (isPlaying) {
      video.play().catch(e => console.error("Play failed", e));
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
      loop={false} // Important for branching logic
    />
  );
}