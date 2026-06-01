import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaChevronLeft, FaChevronRight, FaPlay } from "react-icons/fa";
import styles from "./VideoCoverflow.module.css";

const getOffset = (index, activeIndex, total) => {
  const raw = index - activeIndex;
  const half = total / 2;

  if (raw > half) return raw - total;
  if (raw < -half) return raw + total;
  return raw;
};

const getCardPose = (offset) => {
  const abs = Math.abs(offset);

  if (offset === 0) {
    return {
      x: 0,
      y: 0,
      z: 120,
      rotateY: 0,
      scale: 1,
      opacity: 1,
      blur: 0,
      zIndex: 4,
    };
  }

  if (offset === -1) {
    return {
      x: "-58%",
      y: 18,
      z: -110,
      rotateY: 34,
      scale: 0.8,
      opacity: 0.78,
      blur: 1.4,
      zIndex: 3,
    };
  }

  if (offset === 1) {
    return {
      x: "58%",
      y: 18,
      z: -110,
      rotateY: -34,
      scale: 0.8,
      opacity: 0.78,
      blur: 1.4,
      zIndex: 3,
    };
  }

  return {
    x: offset < 0 ? "-8%" : "8%",
    y: -82,
    z: -360,
    rotateY: offset < 0 ? 12 : -12,
    scale: 0.8,
    opacity: 0.42,
    blur: 3,
    zIndex: 1,
  };
};

export default function VideoCoverflow({ videos }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const wheelLock = useRef(false);
  const videoRefs = useRef([]);
  const total = videos.length;

  const goTo = useCallback((direction) => {
    setActiveIndex((current) => (current + direction + total) % total);
  }, [total]);

  useEffect(() => {
    const timer = window.setInterval(() => goTo(1), 5000);
    return () => window.clearInterval(timer);
  }, [goTo]);

  useEffect(() => {
    videoRefs.current.forEach((videoNode, index) => {
      if (!videoNode) return;

      if (index === activeIndex) {
        videoNode.muted = true;
        const playPromise = videoNode.play();
        if (playPromise?.catch) {
          playPromise.catch(() => {});
        }
      } else {
        videoNode.pause();
        videoNode.currentTime = 0;
      }
    });
  }, [activeIndex]);

  const handleWheel = useCallback((event) => {
    event.preventDefault();

    if (wheelLock.current) return;
    wheelLock.current = true;

    goTo(event.deltaY > 0 ? 1 : -1);
    window.setTimeout(() => {
      wheelLock.current = false;
    }, 720);
  }, [goTo]);

  const orderedVideos = useMemo(() => videos.map((video, index) => ({
    ...video,
    offset: getOffset(index, activeIndex, total),
    index,
  })), [activeIndex, total, videos]);

  return (
    <section className={styles.showcase} id="showreel" onWheel={handleWheel}>
      <div className={styles.ambientGlow} />

      <button className={`${styles.navButton} ${styles.prevButton}`} type="button" onClick={() => goTo(-1)} aria-label="Previous video">
        <FaChevronLeft />
      </button>

      <div className={styles.stage} aria-live="polite">
        <AnimatePresence initial={false}>
          {orderedVideos.map((video) => {
            const pose = getCardPose(video.offset);
            const isActive = video.offset === 0;

            return (
              <motion.article
                className={`${styles.card} ${isActive ? styles.activeCard : ""}`}
                key={video.title}
                animate={{
                  x: pose.x,
                  y: pose.y,
                  z: pose.z,
                  rotateY: pose.rotateY,
                  scale: pose.scale,
                  opacity: pose.opacity,
                  filter: `blur(${pose.blur}px)`,
                }}
                initial={false}
                transition={{ type: "spring", stiffness: 120, damping: 22, mass: 0.8 }}
                style={{ zIndex: pose.zIndex }}
              >
                <div className={styles.videoShell}>
                  <video
                    ref={(node) => {
                      videoRefs.current[video.index] = node;
                    }}
                    src={video.src}
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    aria-label={video.title}
                  />
                  <div className={styles.videoShade} />
                  <button className={styles.playButton} type="button" aria-label={`Play ${video.title}`}>
                    <FaPlay />
                  </button>
                </div>

                <div className={styles.cardMeta}>
                  <div>
                    <h3>{video.title}</h3>
                    <p>{video.category}</p>
                  </div>
                  {isActive && <span>{String(video.index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}</span>}
                </div>
              </motion.article>
            );
          })}
        </AnimatePresence>
      </div>

      <button className={`${styles.navButton} ${styles.nextButton}`} type="button" onClick={() => goTo(1)} aria-label="Next video">
        <FaChevronRight />
      </button>

      <div className={styles.dots} aria-label="Video carousel pagination">
        {videos.map((video, index) => (
          <button
            key={video.title}
            className={index === activeIndex ? styles.activeDot : ""}
            type="button"
            onClick={() => setActiveIndex(index)}
            aria-label={`Show ${video.title}`}
          />
        ))}
      </div>
    </section>
  );
}
