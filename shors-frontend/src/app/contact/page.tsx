"use client";
import React from "react";

export default function Contact() {
  const triggerPreorder = () => {
    window.dispatchEvent(new Event("open-community-modal"));
  };

  return (
    <div className="contact-container manuscript-paper">
      <span style={{ fontFamily: "var(--font-jetbrains-mono)", color: "var(--color-primary)", letterSpacing: "0.2em", fontSize: "0.85rem", textTransform: "uppercase" }}>
        GET IN TOUCH
      </span>
      <h1 style={{ marginTop: "1rem" }}>
        LET&apos;S TALK STORIES
      </h1>
      {/* Restored copy text description */}
      <p style={{ color: "var(--color-text-muted)", fontSize: "1.1rem", marginTop: "1rem" }}>
        Whether you have questions about custom drops, need assistance with your pre-order registration, or just want to connect, reach out to our team.
      </p>

      <div className="contact-grid" style={{ marginTop: "4rem" }}>
        {/* Instagram Card */}
        <div className="contact-card">
          <div className="contact-icon">IG</div>
          <h3>INSTAGRAM</h3>
          <span className="contact-val">@shors.co</span>
          <a href="https://instagram.com/shors.co" target="_blank" rel="noopener noreferrer" className="contact-link">
            VISIT INSTAGRAM
          </a>
        </div>

        {/* Email Card */}
        <div className="contact-card">
          <div className="contact-icon">EM</div>
          <h3>EMAIL</h3>
          <span className="contact-val" style={{ fontSize: "1.1rem" }}>hello@shors.co</span>
          <a href="mailto:hello@shors.co" className="contact-link">
            SEND EMAIL
          </a>
        </div>

        {/* WhatsApp Card */}
        <div className="contact-card">
          <div className="contact-icon">WA</div>
          <h3>WHATSAPP</h3>
          <span className="contact-val">+91 WhatsApp</span>
          <a href="https://wa.me/919999999999" target="_blank" rel="noopener noreferrer" className="contact-link">
            START CHAT
          </a>
        </div>
      </div>

      <div 
        style={{ 
          border: "1px solid var(--color-border-warm)", 
          backgroundColor: "var(--color-surface-primary)", 
          padding: "3rem", 
          textAlign: "center",
          position: "relative",
          marginTop: "4rem",
          boxShadow: "0 10px 30px rgba(102, 93, 80, 0.03)"
        }}
      >
        <div 
          style={{ 
            position: "absolute", 
            inset: "8px", 
            border: "1px solid rgba(139, 46, 46, 0.08)", 
            pointerEvents: "none" 
          }} 
        />
        <h3 style={{ fontSize: "1.25rem", color: "var(--color-primary)", marginBottom: "1rem" }}>
          JOIN THE SHORS CIRCLE
        </h3>
        {/* Restored copy text description */}
        <p style={{ maxWidth: "500px", margin: "0 auto 2rem", fontSize: "0.95rem", color: "var(--color-text-muted)" }}>
          Get early access to limited drops, production updates, and exclusive releases before everyone else.
        </p>
        <button 
          className="btn-primary" 
          onClick={triggerPreorder}
          style={{ fontSize: "0.8rem", padding: "1rem 2rem" }}
        >
          UNLOCK EARLY ACCESS
        </button>
      </div>
    </div>
  );
}
