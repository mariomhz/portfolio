"use client";

import React, { useRef, useEffect } from "react";
import { useLenis } from "../context/LenisContext";

const lerp = (start, end, factor) => start + (end - start) * factor;

const ParallaxVideo = ({ src, poster, autoPlay = true, loop = true, muted = true }) => {
  const videoRef = useRef(null);
  const bounds = useRef(null);
  const currentTranslateY = useRef(0);
  const targetTranslateY = useRef(0);
  const rafId = useRef(null);
  const lenisRef = useRef(null);
  const boundsInitialized = useRef(false);

  const lenis = useLenis();
  lenisRef.current = lenis;

  useEffect(() => {
    let resizeTimer = null;

    const updateBounds = () => {
      if (videoRef.current) {
        const currentLenis = lenisRef.current;
        const scrollY = currentLenis ? currentLenis.scroll : window.scrollY;
        const rect = videoRef.current.getBoundingClientRect();
        bounds.current = {
          top: rect.top + scrollY,
          bottom: rect.bottom + scrollY,
        };
        boundsInitialized.current = true;
      }
    };

    const handleResize = () => {
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(updateBounds, 150);
    };

    const animate = () => {
      const currentLenis = lenisRef.current;

      if (currentLenis && !boundsInitialized.current) {
        updateBounds();
      }

      if (bounds.current && currentLenis && typeof currentLenis.scroll === 'number') {
        const relativeScroll = currentLenis.scroll - bounds.current.top;
        targetTranslateY.current = Math.max(-100, Math.min(100, relativeScroll * 0.2));
      }

      if (videoRef.current) {
        currentTranslateY.current = lerp(
          currentTranslateY.current,
          targetTranslateY.current,
          0.1
        );
        videoRef.current.style.transform = `translateY(${currentTranslateY.current}px) scale(1.25)`;
      }

      rafId.current = requestAnimationFrame(animate);
    };

    window.addEventListener("resize", handleResize);
    rafId.current = requestAnimationFrame(animate);

    return () => {
      if (resizeTimer) clearTimeout(resizeTimer);
      window.removeEventListener("resize", handleResize);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  const handleLoadedData = () => {
    if (videoRef.current) {
      const currentLenis = lenisRef.current;
      const scrollY = currentLenis ? currentLenis.scroll : window.scrollY;
      const rect = videoRef.current.getBoundingClientRect();
      bounds.current = {
        top: rect.top + scrollY,
        bottom: rect.bottom + scrollY,
      };
      boundsInitialized.current = true;
    }
  };

  return (
    <video
      ref={videoRef}
      src={src}
      poster={poster}
      autoPlay={autoPlay}
      loop={loop}
      muted={muted}
      playsInline
      onLoadedData={handleLoadedData}
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
        transform: "translateY(0) scale(1.25)",
      }}
    />
  );
};

export default ParallaxVideo;
