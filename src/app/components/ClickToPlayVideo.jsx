"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import styles from "./ClickToPlayVideo.module.css";

const ClickToPlayVideo = ({
  sources = [],
  poster,
  captions,
  label = "Play video",
  aspectRatio = "16 / 9",
}) => {
  const videoRef = useRef(null);
  const [activated, setActivated] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!activated || !video) return;

    video.load();
    const attempt = video.play();
    if (attempt && typeof attempt.catch === "function") {
      attempt.catch(() => {});
    }
  }, [activated]);

  return (
    <div className={styles.wrapper} style={{ aspectRatio }}>
      {activated ? (
        <video
          ref={videoRef}
          className={styles.video}
          poster={poster}
          controls
          playsInline
          preload="auto"
        >
          {sources.map((source) => (
            <source key={source.src} src={source.src} type={source.type} />
          ))}
          {captions && (
            <track
              kind="captions"
              src={captions}
              srcLang="en"
              label="English"
              default
            />
          )}
          Your browser cannot play this video.
        </video>
      ) : (
        <button
          type="button"
          className={styles.posterButton}
          onClick={() => setActivated(true)}
        >
          {poster && (
            <Image
              src={poster}
              alt=""
              fill
              sizes="(max-width: 900px) 90vw, 45vw"
              className={styles.posterImage}
            />
          )}
          <span className={styles.playBadge} aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
          <span className={styles.playLabel}>{label}</span>
        </button>
      )}
    </div>
  );
};

export default ClickToPlayVideo;
