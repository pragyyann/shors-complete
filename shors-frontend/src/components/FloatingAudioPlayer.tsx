"use client";
import React, { useState, useEffect, useRef } from "react";

let globalAudio: HTMLAudioElement | null = null;
let globalFadeInterval: NodeJS.Timeout | null = null;

const getAudioInstance = () => {
  if (typeof window === "undefined") return null;
  if (!globalAudio) {
    globalAudio = new Audio("/shors-audio.mp3");
    globalAudio.loop = true;
    globalAudio.preload = "metadata";
    globalAudio.volume = 0;

    globalAudio.addEventListener("error", (e) => {
      if (process.env.NODE_ENV === "development") {
        console.warn("SHORS Ambient Music failed to load or source is missing:", e);
      }
    });
  }
  return globalAudio;
};

export default function FloatingAudioPlayer() {
  const [musicState, setMusicState] = useState<"shors" | "silent">("shors");
  const interactionListenersRef = useRef<{ cleanup: () => void } | null>(null);

  const playAndFadeIn = () => {
    const audio = getAudioInstance();
    if (!audio) return;

    if (globalFadeInterval) clearInterval(globalFadeInterval);

    audio.play().then(() => {
      const duration = 500; // 500ms fade-in
      const targetVolume = 0.30; // comfortable volume 30%
      const intervalStepTime = 25;
      const steps = duration / intervalStepTime;
      const volumeStep = targetVolume / steps;

      globalFadeInterval = setInterval(() => {
        if (audio.volume < targetVolume) {
          audio.volume = Math.min(targetVolume, audio.volume + volumeStep);
        } else {
          if (globalFadeInterval) clearInterval(globalFadeInterval);
        }
      }, intervalStepTime);
    }).catch((err) => {
      if (process.env.NODE_ENV === "development") {
        console.warn("Audio playback deferred or autoplay blocked:", err);
      }
    });
  };

  const pauseAndFadeOut = () => {
    const audio = getAudioInstance();
    if (!audio) return;

    if (globalFadeInterval) clearInterval(globalFadeInterval);

    const duration = 400; // 400ms fade-out
    const startVolume = audio.volume;
    const intervalStepTime = 25;
    const steps = duration / intervalStepTime;
    const volumeStep = startVolume / steps;

    globalFadeInterval = setInterval(() => {
      if (audio.volume > 0) {
        audio.volume = Math.max(0, audio.volume - volumeStep);
      } else {
        audio.pause();
        if (globalFadeInterval) clearInterval(globalFadeInterval);
      }
    }, intervalStepTime);
  };

  const toggleMusic = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    if (interactionListenersRef.current) {
      interactionListenersRef.current.cleanup();
    }

    const nextState = musicState === "shors" ? "silent" : "shors";
    setMusicState(nextState);
    if (typeof window !== "undefined") {
      localStorage.setItem("musicState", nextState);
    }

    const audio = getAudioInstance();
    if (audio) {
      if (nextState === "shors") {
        playAndFadeIn();
      } else {
        pauseAndFadeOut();
      }
    }
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    const audio = getAudioInstance();
    if (!audio) return;

    // Default to "shors" if no preference key is found
    const saved = localStorage.getItem("musicState") as "shors" | "silent" | null;
    const initial = saved || "shors";
    setMusicState(initial);

    const handleFirstInteraction = () => {
      cleanupListeners();
      const current = localStorage.getItem("musicState") as "shors" | "silent" | null;
      const currentVal = current || "shors";
      if (currentVal === "shors") {
        playAndFadeIn();
      }
    };

    const cleanupListeners = () => {
      window.removeEventListener("click", handleFirstInteraction);
      window.removeEventListener("keydown", handleFirstInteraction);
      window.removeEventListener("touchstart", handleFirstInteraction);
      window.removeEventListener("scroll", handleFirstInteraction);
    };

    interactionListenersRef.current = { cleanup: cleanupListeners };

    if (initial === "shors") {
      // Set up interaction listeners by default (scroll, click, keydown, touchstart)
      window.addEventListener("click", handleFirstInteraction);
      window.addEventListener("keydown", handleFirstInteraction);
      window.addEventListener("touchstart", handleFirstInteraction);
      window.addEventListener("scroll", handleFirstInteraction, { passive: true });

      // Attempt immediate play (autoplay)
      audio.play().then(() => {
        // Autoplay succeeded: remove fallback listeners
        cleanupListeners();

        const duration = 500; // 500ms fade-in
        const targetVolume = 0.30;
        const intervalStepTime = 25;
        const steps = duration / intervalStepTime;
        const volumeStep = targetVolume / steps;

        if (globalFadeInterval) clearInterval(globalFadeInterval);
        globalFadeInterval = setInterval(() => {
          if (audio.volume < targetVolume) {
            audio.volume = Math.min(targetVolume, audio.volume + volumeStep);
          } else {
            if (globalFadeInterval) clearInterval(globalFadeInterval);
          }
        }, intervalStepTime);
      }).catch((err) => {
        // Autoplay blocked: listeners remain active to handle first interaction
        if (process.env.NODE_ENV === "development") {
          console.warn("Autoplay blocked, waiting for user interaction:", err);
        }
      });
    }

    return () => {
      cleanupListeners();
      // Audio is meant to stop when component unmounts (e.g. leaving home page)
      const a = getAudioInstance();
      if (a) a.pause();
    };
  }, []);

  return (
    <button 
      onClick={toggleMusic}
      className="floating-audio-player"
      aria-label="Toggle Background Music"
    >
      MUSIC: <span className={musicState === "shors" ? "audio-active" : "audio-muted"}>
        {musicState === "shors" ? "SHORS" : "SILENT"}
      </span>
    </button>
  );
}
