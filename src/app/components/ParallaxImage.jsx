"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { useLenis } from "../context/LenisContext";

const lerp = (start, end, factor) => start + (end - start) * factor;

const ParallaxImage = ({ src, alt, width, height, priority = false }) => {
  const layerRef = useRef(null);
  const bounds = useRef(null);
  const currentTranslateY = useRef(0);
  const targetTranslateY = useRef(0);
  const rafId = useRef(null);
  const lenisRef = useRef(null);
  const boundsInitialized = useRef(false);

  const lenis = useLenis();
  lenisRef.current = lenis;

  useEffect(() => {
    const layer = layerRef.current;
    if (!layer) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      layer.style.transform = "translateY(0) scale(1.25)";
      return;
    }

    let resizeTimer = null;

    const updateBounds = () => {
      const currentLenis = lenisRef.current;
      const scrollY = currentLenis ? currentLenis.scroll : window.scrollY;
      const rect = layer.getBoundingClientRect();
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
      layer.style.transform =
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
    <div
      ref={layerRef}
      className="parallax-layer"
      style={{ transform: "translateY(0) scale(1.25)" }}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        sizes="125vw"
        unoptimized
      />
    </div>
  );
};

export default ParallaxImage;
