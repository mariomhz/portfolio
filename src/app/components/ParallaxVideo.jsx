"use client";

import React, { useRef, useEffect, useState } from "react";
import { useLenis } from "../context/LenisContext";

const lerp = (start, end, factor) => start + (end - start) * factor;

const ParallaxVideo = ({ sources = [], poster, loop = true }) => {
  const videoRef = useRef(null);
  const bounds = useRef(null);
  const currentTranslateY = useRef(0);
  const targetTranslateY = useRef(0);
  const rafId = useRef(null);
  const lenisRef = useRef(null);
  const boundsInitialized = useRef(false);

  const [shouldLoad, setShouldLoad] = useState(false);

  const lenis = useLenis();
  lenisRef.current = lenis;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;

    if (typeof IntersectionObserver === "undefined") {
      setShouldLoad(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !shouldLoad) return;

    video.muted = true;
    video.load();
    const play = () => {
      const attempt = video.play();
      if (attempt && typeof attempt.catch === "function") {
        attempt.catch(() => {});
      }
    };
    video.addEventListener("loadeddata", play, { once: true });
    return () => video.removeEventListener("loadeddata", play);
  }, [shouldLoad]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      video.style.transform = "translateY(0) scale(1.25)";
      return;
    }

    let resizeTimer = null;

    const updateBounds = () => {
      const currentLenis = lenisRef.current;
      const scrollY = currentLenis ? currentLenis.scroll : window.scrollY;
      const rect = video.getBoundingClientRect();
      bounds.current = {
        top: rect.top + scrollY,
        bottom: rect.bottom + scrollY,
      };
      boundsInitialized.current = true;
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

      if (bounds.current && currentLenis && typeof currentLenis.scroll === "number") {
        const relativeScroll = currentLenis.scroll - bounds.current.top;
        targetTranslateY.current = Math.max(-100, Math.min(100, relativeScroll * 0.2));
      }

      currentTranslateY.current = lerp(
        currentTranslateY.current,
        targetTranslateY.current,
        0.1
      );
      video.style.transform =
        "translateY(" + currentTranslateY.current + "px) scale(1.25)";

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

  return (
    <video
      ref={videoRef}
      poster={poster}
      loop={loop}
      playsInline
      preload="none"
      aria-hidden="true"
      tabIndex={-1}
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
        transform: "translateY(0) scale(1.25)",
      }}
    >
      {shouldLoad &&
        sources.map((source) => (
          <source key={source.src} src={source.src} type={source.type} />
        ))}
    </video>
  );
};

export default ParallaxVideo;
