"use client";
import React, { useState, useEffect } from "react";

export default function PreOrderModal() {
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  // Product Data (from event)
  const [productId, setProductId] = useState<number>(0);
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState(1);

  // Customer Data
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (isVisible) {
      document.body.classList.add("preorder-modal-open");
    } else {
      document.body.classList.remove("preorder-modal-open");
    }
  }, [isVisible]);

  useEffect(() => {
    const handleManualOpen = (e: any) => {
      if (e.detail) {
        setProductId(e.detail.productId);
        setProductName(e.detail.productName);
        setCategory(e.detail.category);
        setQuantity(e.detail.quantity);
      }
      setIsVisible(true);
      setIsSuccess(false);
      setError("");
    };
    
    // Support CustomEvent for details
    window.addEventListener("open-preorder-modal", handleManualOpen);

    return () => {
      window.removeEventListener("open-preorder-modal", handleManualOpen);
    };
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    // Reset form after close so it's fresh next time
    setTimeout(() => {
      setIsSuccess(false);
      setName("");
      setPhone("");
      setEmail("");
      setCity("");
      setMessage("");
    }, 300);
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
      const payload = {
        productId,
        quantity,
        fullName: name.trim(),
        phone: `${countryCode} ${phone.trim()}`,
        email: email.trim() || undefined,
        city: city.trim() || undefined,
        message: message.trim() || undefined,
      };

      // Ensure API endpoint matches the backend v1 API path
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";
      const response = await fetch(`${apiUrl}/preorders/public`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setIsSuccess(true);
      } else {
        const errData = await response.json();
        setError(errData.message || "Failed to submit. Please try again.");
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
      <div className="modal-content preorder-workflow" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={handleDismiss} aria-label="Close modal">
          &times;
        </button>
        <div className="modal-floral-bg" />
        <div className="modal-body" style={{ maxHeight: '90vh', overflowY: 'auto' }}>
          {!isSuccess ? (
            <>
              <h2 className="modal-title" style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>
                RESERVE YOUR PIECE
              </h2>
              
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem", textAlign: "left" }}>
                
                {/* Product Information (Read-only) */}
                <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <div className="form-group" style={{ marginBottom: '0.5rem' }}>
                    <label className="form-label" style={{ opacity: 0.7 }}>Product</label>
                    <div style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--color-primary)' }}>{productName}</div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div className="form-group">
                      <label className="form-label" style={{ opacity: 0.7 }}>Category</label>
                      <div style={{ fontSize: '0.9rem' }}>{category}</div>
                    </div>
                    <div className="form-group">
                      <label className="form-label" style={{ opacity: 0.7 }}>Quantity</label>
                      <div style={{ fontSize: '0.9rem' }}>{quantity}</div>
                    </div>
                  </div>
                </div>

                {/* Customer Information */}
                <div className="form-group">
                  <label className="form-label" htmlFor="register-name">Full Name *</label>
                  <input
                    type="text"
                    id="register-name"
                    className="form-input"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="register-phone">Phone Number *</label>
                  <div className="phone-input-container">
                    <select
                      className="form-select"
                      value={countryCode}
                      onChange={(e) => setCountryCode(e.target.value)}
                      aria-label="Country Code"
                    >
                      <option value="+91">🇮🇳 +91</option>
                      <option value="+44">🇬🇧 +44</option>
                      <option value="+1">🇺🇸 +1</option>
                      <option value="+971">🇦🇪 +971</option>
                    </select>
                    <input
                      type="tel"
                      id="register-phone"
                      className="form-input"
                      placeholder="98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label" htmlFor="register-email">Email (Optional)</label>
                    <input
                      type="email"
                      id="register-email"
                      className="form-input"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="register-city">City (Optional)</label>
                    <input
                      type="text"
                      id="register-city"
                      className="form-input"
                      placeholder="e.g. Mumbai"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="register-message">Message / Notes (Optional)</label>
                  <textarea
                    id="register-message"
                    className="form-input"
                    placeholder="Any specific instructions or questions..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    style={{ minHeight: '80px', resize: 'vertical' }}
                  />
                </div>

                {error && <span className="form-error">{error}</span>}

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '1rem' }}>
                  <button type="submit" className="form-submit-btn" disabled={isSubmitting}>
                    {isSubmitting ? "PROCESSING..." : "Reserve My Piece"}
                  </button>
                  <button type="button" className="modal-no-thanks" onClick={handleDismiss} style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', padding: '0.8rem', color: '#fff' }}>
                    Cancel
                  </button>
                </div>
              </form>
            </>
          ) : (
            <div className="form-success-message" style={{ padding: '2rem 1rem' }}>
              <div className="success-icon" style={{ fontSize: '3rem', marginBottom: '1rem' }}>✦</div>
              <h2 className="modal-title" style={{ fontSize: '1.4rem', color: "var(--color-primary)", letterSpacing: '0.05em' }}>
                YOUR PIECE HAS BEEN RESERVED.
              </h2>
              <p className="modal-subtitle" style={{ marginBottom: '1rem', color: '#fff', fontSize: '1rem', lineHeight: '1.5' }}>
                Thank you for choosing SHORS.
              </p>
              <p className="modal-subtitle" style={{ marginBottom: '2rem', fontSize: '0.9rem', opacity: 0.8, lineHeight: '1.5' }}>
                Your preorder request has been received successfully.
                Our team will contact you shortly to confirm your production slot, delivery timeline, and payment details.
              </p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', width: '100%', maxWidth: '300px', margin: '0 auto' }}>
                <button type="button" className="form-submit-btn" onClick={handleDismiss}>
                  Continue Browsing
                </button>
                <button type="button" className="modal-no-thanks" onClick={handleDismiss}>
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
