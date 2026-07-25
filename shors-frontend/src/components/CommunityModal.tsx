"use client";
import React, { useState, useEffect, useRef } from "react";

export default function CommunityModal() {
  const [isVisible, setIsVisible] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const hasTriggeredRef = useRef(false);
  const timeThresholdReached = useRef(false);

  // Manual Trigger Event Listener
  useEffect(() => {
    const handleManualOpen = () => {
      // Manual trigger overrides session shown limit (but maybe not if they already joined)
      setIsVisible(true);
      sessionStorage.setItem("shors_community_shown", "true");
      sessionStorage.setItem("shors_community_trigger", "manual");
    };

    window.addEventListener("open-community-modal", handleManualOpen);
    return () => window.removeEventListener("open-community-modal", handleManualOpen);
  }, []);

  // Auto Triggers (Timer, Scroll, Exit Intent)
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Session Rules for auto-triggers
    const hasJoined = localStorage.getItem("shors_community_joined");
    const hasShownInSession = sessionStorage.getItem("shors_community_shown");
    
    if (hasJoined || hasShownInSession) {
      return;
    }

    const checkAndTrigger = (triggerType: string) => {
      if (hasTriggeredRef.current) return;
      if (document.body.classList.contains("preorder-modal-open")) return;
      
      hasTriggeredRef.current = true;
      sessionStorage.setItem("shors_community_shown", "true");
      sessionStorage.setItem("shors_community_trigger", triggerType);
      setIsVisible(true);
    };

    const checkScrollPercentage = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll <= 0) return 100;
      return (window.scrollY / maxScroll) * 100;
    };

    // 1. Time Tracking (30s)
    const timer = setTimeout(() => {
      timeThresholdReached.current = true;
      
      // If they've already scrolled >40% by the time 30s hits
      if (checkScrollPercentage() >= 40) {
        checkAndTrigger("time_and_scroll");
      }
    }, 30000);

    // 2. Scroll Tracking (Wait for 40% AND 30s)
    const handleScroll = () => {
      if (hasTriggeredRef.current) return;
      if (!timeThresholdReached.current) return; // Must wait 30s first

      if (checkScrollPercentage() >= 40) {
        checkAndTrigger("time_and_scroll");
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    // 3. Exit Intent (Desktop)
    const handleMouseLeave = (e: MouseEvent) => {
      if (hasTriggeredRef.current) return;
      // Mouse leaves viewport through the top
      if (e.clientY <= 0) {
        checkAndTrigger("exit_intent_desktop");
      }
    };
    document.addEventListener("mouseleave", handleMouseLeave);

    // 4. Mobile Exit Intent (Visibility Change after 30s)
    const handleVisibilityChange = () => {
      if (hasTriggeredRef.current) return;
      if (document.visibilityState === "hidden" && timeThresholdReached.current) {
        // Trigger modal so it's there when they return
        checkAndTrigger("exit_intent_mobile");
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      setError("Name and Phone number are required.");
      return;
    }
    
    setIsSubmitting(true);
    setError("");

    try {
      const triggerType = sessionStorage.getItem("shors_community_trigger") || "unknown";
      
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const response = await fetch(`${baseUrl}/api/v1/community`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone: `${countryCode} ${phone}`,
          email: email || "",
          sourcePage: window.location.pathname,
          triggerType
        }),
      });

      if (response.ok) {
        setIsSuccess(true);
        localStorage.setItem("shors_community_joined", "true");
        setTimeout(() => {
          setIsVisible(false);
        }, 4000);
      } else {
        setError("Failed to submit. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isVisible) return null;

  return (
    <div className={`modal-overlay ${isVisible ? "active" : ""}`} onClick={handleDismiss}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={handleDismiss} aria-label="Close modal">
          &times;
        </button>
        <div className="modal-floral-bg" />
        <div className="modal-body">
          {!isSuccess ? (
            <>
              <h2 className="modal-title">
                MADE WITH PASSION. MEANT TO MAKE <span>SHORS.</span>
              </h2>
              <p className="modal-subtitle">
                Become part of the SHORS Circle. Get early access to limited drops, production updates, and exclusive releases before everyone else.
              </p>
              
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <div className="form-group">
                  <label className="form-label" htmlFor="community-name">Full Name</label>
                  <input
                    type="text"
                    id="community-name"
                    className="form-input"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="community-phone">Phone Number</label>
                  <div className="phone-input-container">
                    <select
                      className="form-select"
                      value={countryCode}
                      onChange={(e) => setCountryCode(e.target.value)}
                      aria-label="Country Code"
                    >
                      <option value="+91">🇮🇳 +91</option>
                      <option value="+44">🇬🇧 +44</option>
                    </select>
                    <input
                      type="tel"
                      id="community-phone"
                      className="form-input"
                      placeholder="98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="community-email">Email Address (Optional)</label>
                  <input
                    type="email"
                    id="community-email"
                    className="form-input"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                {error && <span className="form-error">{error}</span>}

                <button type="submit" className="form-submit-btn" disabled={isSubmitting}>
                  {isSubmitting ? "JOINING..." : "UNLOCK EARLY ACCESS"}
                </button>
              </form>
              <button className="modal-no-thanks" onClick={handleDismiss}>
                No, Thanks
              </button>
            </>
          ) : (
            <div className="form-success-message">
              <div className="success-icon">✦</div>
              <h2 className="modal-title" style={{ color: "var(--color-primary)" }}>WELCOME TO THE CIRCLE</h2>
              <p className="modal-subtitle" style={{ marginBottom: 0 }}>
                You are now on the early access list. We will reach out when the next drop approaches.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
