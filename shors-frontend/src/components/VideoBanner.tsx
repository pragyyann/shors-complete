"use client";
import React from "react";

interface VideoBannerProps {
  videoUrl?: string;
  campaignLabel?: string;
  title?: string;
  caption?: string;
}

export default function VideoBanner({
  videoUrl,
  campaignLabel = "Campaign Film",
  title = "The Story Behind SHORS",
  caption = "A cinematic journey into craftsmanship and heritage."
}: VideoBannerProps) {
  return (
    <section className="video-banner-section">
      <div className="video-banner-wrapper">
        
        {videoUrl ? (
          /* Render real background video if provided */
          <video
            className="video-banner-bg-video"
            src={videoUrl}
            autoPlay
            loop
            muted
            playsInline
          />
        ) : (
          /* Render crossed X placeholder vector if no video URL is set */
          <svg className="video-banner-x-bg" xmlns="http://www.w3.org/2000/svg">
            <line x1="0" y1="0" x2="100%" y2="100%" className="video-banner-x-line" />
            <line x1="100%" y1="0" x2="0" y2="100%" className="video-banner-x-line" />
          </svg>
        )}

        {/* Subtle textured overlay */}
        <div className="video-banner-overlay-texture" />

        {/* Content & Overlay (keeps layout & typography intact when video is present) */}
        <div className="video-banner-content">
          <span className="video-banner-label">{campaignLabel}</span>
          <h2 className="video-banner-title">{title}</h2>
          
          <div className="video-banner-play-btn" role="button" aria-label="Play Campaign Video">
            <svg className="video-banner-play-icon" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
          
          <p className="video-banner-caption">{caption}</p>
        </div>
      </div>
    </section>
  );
}
