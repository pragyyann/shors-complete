import React from "react";
import Link from "next/link";
import { Mail } from "lucide-react";

const Instagram = ({ size = 24 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

export default function Footer() {
  return (
    <footer className="footer">
      {/* 1. Scrolling News Ticker Banner */}
      <div className="footer-top-banner">
        <div className="ticker-track">
          {/* Set 1 */}
          <div className="ticker-item">#bringthe<span className="ticker-yellow">NOISE</span>back#bringthe<span className="ticker-yellow">SHOR</span>back &bull;&nbsp;</div>
          <div className="ticker-item">#bringthe<span className="ticker-yellow">NOISE</span>back#bringthe<span className="ticker-yellow">SHOR</span>back &bull;&nbsp;</div>
          <div className="ticker-item">#bringthe<span className="ticker-yellow">NOISE</span>back#bringthe<span className="ticker-yellow">SHOR</span>back &bull;&nbsp;</div>
          <div className="ticker-item">#bringthe<span className="ticker-yellow">NOISE</span>back#bringthe<span className="ticker-yellow">SHOR</span>back &bull;&nbsp;</div>
          <div className="ticker-item">#bringthe<span className="ticker-yellow">NOISE</span>back#bringthe<span className="ticker-yellow">SHOR</span>back &bull;&nbsp;</div>
          <div className="ticker-item">#bringthe<span className="ticker-yellow">NOISE</span>back#bringthe<span className="ticker-yellow">SHOR</span>back &bull;&nbsp;</div>
          {/* Set 2 (Duplicate for seamless loop) */}
          <div className="ticker-item">#bringthe<span className="ticker-yellow">NOISE</span>back#bringthe<span className="ticker-yellow">SHOR</span>back &bull;&nbsp;</div>
          <div className="ticker-item">#bringthe<span className="ticker-yellow">NOISE</span>back#bringthe<span className="ticker-yellow">SHOR</span>back &bull;&nbsp;</div>
          <div className="ticker-item">#bringthe<span className="ticker-yellow">NOISE</span>back#bringthe<span className="ticker-yellow">SHOR</span>back &bull;&nbsp;</div>
          <div className="ticker-item">#bringthe<span className="ticker-yellow">NOISE</span>back#bringthe<span className="ticker-yellow">SHOR</span>back &bull;&nbsp;</div>
          <div className="ticker-item">#bringthe<span className="ticker-yellow">NOISE</span>back#bringthe<span className="ticker-yellow">SHOR</span>back &bull;&nbsp;</div>
          <div className="ticker-item">#bringthe<span className="ticker-yellow">NOISE</span>back#bringthe<span className="ticker-yellow">SHOR</span>back &bull;&nbsp;</div>
        </div>
      </div>

      {/* 2. Three Editorial Columns */}
      <div className="footer-cols">
        {/* Left Column: Brand Vibe (Replaced text with responsive logo) */}
        <div className="footer-column footer-brand-column">
          <div className="footer-column-header brand-header-italiana">- SHORS</div>
          
          <div className="footer-brand-content">
            <h3 className="footer-brand-heading">
              Stories worth carrying.<br />
              Heritage, designed for today.
            </h3>
            <p className="footer-brand-description">
              SHORS transforms forgotten scripts, regional art, architectural beauty, and cultural identity into premium lifestyle pieces designed for today's generation.
            </p>
          </div>
        </div>

        {/* Middle Column: Explore Sitemap */}
        <div className="footer-column">
          <div className="footer-column-header">EXPLORE</div>
          <ul>
            <li><Link href="/catalogue">Collection</Link></li>
            <li><Link href="/about">Our Story</Link></li>
            <li><Link href="/catalogue">Archive</Link></li>
            <li><Link href="/about">Craftsmanship</Link></li>
          </ul>
        </div>

        {/* Right Column: Find Us / Connect */}
        <div className="footer-column">
          <div className="footer-column-header">CONNECT</div>
          <div className="footer-contact-item">
            <a href="https://instagram.com/shors.in" target="_blank" rel="noopener noreferrer">
              <span className="contact-label"><Instagram size={14} /> Instagram</span>
              <span className="contact-value">@shors.in</span>
            </a>
          </div>
          <div className="footer-contact-item">
            <a href="mailto:hello@shors.in">
              <span className="contact-label"><Mail size={14} /> Email</span>
              <span className="contact-value">hello@shors.in</span>
            </a>
          </div>
          <div className="footer-contact-item footer-hashtag">
            #HeritageInMotion
          </div>
        </div>
      </div>

      {/* 4. Brand typographic name left-aligned with smaller metadata stacked in front of it */}
      <div className="footer-bottom">
        <div className="footer-brand-title">
          SHORS
        </div>
        <div className="footer-bottom-meta">
          <p>&copy; {new Date().getFullYear()} SHORS. All noise reserved.</p>
          <p style={{ letterSpacing: "0.08em" }}>DESIGN HOUSE OF INDIA</p>
        </div>
      </div>
    </footer>
  );
}
