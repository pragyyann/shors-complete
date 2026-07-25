import React from "react";

export default function About() {
  return (
    <div className="about-page-manifesto">
      <div className="hidden-on-mobile">
        {/* HERO SECTION */}
      <section className="about-manifesto-hero">
        <div className="about-hero-image-box">
          <img
            src="/premium-tote-lifestyle.png"
            alt="SHORS Founders Campaign Hero"
            className="about-hero-bg"
          />
          <div className="about-hero-overlay" />
        </div>
      </section>

      {/* HERO STATEMENT BELOW HERO IMAGE */}
      <section className="about-hero-intro-section" style={{ padding: "8rem 4rem 4rem 4rem", textAlign: "center", backgroundColor: "#FAF8F5" }}>
        <div className="section-header" style={{ textAlign: "center", marginBottom: "4rem" }}>
          <span className="section-kicker">About Shors</span>
          <h2 className="section-title" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", textTransform: "uppercase", marginBottom: "1.5rem" }}>
            The People Behind The Story
          </h2>
        </div>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <p className="about-hero-sentence" style={{ color: "#756B61", fontSize: "clamp(1.1rem, 2vw, 1.45rem)", lineHeight: "1.6", fontStyle: "italic", marginTop: "1rem" }}>
            "We're not building another fashion label. We're building a cultural archive disguised as everyday objects."
          </p>
        </div>
      </section>

      {/* SECTION 01: The Founders (Split Layout) */}
      <section className="about-manifesto-split-section" style={{ paddingTop: "4rem" }}>
        <div className="section-header" style={{ textAlign: "center", marginBottom: "5rem" }}>
          <span className="section-kicker">The Founders</span>
          <h2 className="section-title">Rutal &amp; Monik</h2>
        </div>
        
        <div className="about-split-container">
          <div className="about-split-visual-col">
            <img
              src="/indian-tote-lifestyle.png"
              alt="Rutal and Monik portrait campaign"
              className="about-split-img"
              style={{ aspectRatio: "3 / 4" }}
            />
          </div>
          <div className="about-split-text-col">
            <div className="about-split-paragraphs" style={{ marginBottom: "3rem" }}>
              <p>
                SHORS began as an ongoing dialogue between two cities: London and Mumbai. Sifting through vintage textile archives and urban Indian streets, Rutal and Monik realized that contemporary creators from the diaspora were constantly forced to choose between rigid heritage pieces and sterile minimalism.
              </p>
              <p>
                Their shared vision was to build carryalls that were unapologetic in their cultural identity yet contemporary in their architectural layout. Inside SHORS, Rutal directs logistics, operations, and technical fabric sourcing, while Monik leads brand strategy and creative alignment.
              </p>
              <p>
                They believe in physical storytelling—objects that age gracefully with use, gathering characteristics and patina over time.
              </p>
            </div>
            <blockquote style={{ fontStyle: "italic", borderLeft: "2px solid #A65A3A", paddingLeft: "1.5rem", color: "#A65A3A", fontFamily: "var(--font-serif), serif", fontSize: "1.25rem", margin: "0" }}>
              "We never wanted to chase trends. We wanted to leave evidence."
            </blockquote>
          </div>
        </div>
      </section>

      {/* FULL WIDTH QUOTE */}
      <section className="about-fullwidth-quote" style={{ padding: "12rem 4rem", textAlign: "center", backgroundColor: "#FAF8F5" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <h2 style={{ fontFamily: "var(--font-serif), var(--font-italiana), serif", fontSize: "clamp(2.2rem, 4.5vw, 3.8rem)", fontWeight: "300", lineHeight: "1.25", color: "#2B211C" }}>
            "Culture survives because someone chooses to carry it."
          </h2>
        </div>
      </section>

      {/* SECTION 02: The Designer */}
      <section className="about-manifesto-split-section" style={{ backgroundColor: "#FAF8F5" }}>
        <div className="section-header" style={{ textAlign: "center", marginBottom: "5rem" }}>
          <span className="section-kicker">The Designer</span>
          <h2 className="section-title">Sukrit</h2>
        </div>

        <div className="about-split-container" style={{ gridTemplateColumns: "1fr 1.1fr" }}>
          <div className="about-split-text-col" style={{ paddingRight: "2rem" }}>
            <div className="about-split-paragraphs" style={{ marginBottom: "2rem" }}>
              <p>
                Every print, typographic curve, and illustration at SHORS originates from the desk of head designer Sukrit. Drawing inspiration from vintage Indian signage, post-independence architecture, and ancient scripts, Sukrit treats the canvas bag as a blank journal.
              </p>
              <p>
                His creative philosophy centers on quiet maximalism. Instead of standard motifs, he blends historical stamps, original street lettering, and textured graphics to capture pure human emotion.
              </p>
              <p>
                Each graphic begins as a physical brush sketch on paper, maintaining the subtle imperfections of handmade art.
              </p>
            </div>
            <div style={{ marginTop: "3rem", fontFamily: "var(--font-serif), serif", fontStyle: "italic", fontSize: "1.4rem", color: "#B68C52" }}>
              ~ Sukrit
            </div>
          </div>
          <div className="about-split-visual-col">
            <img
              src="/premium-tote-hover.png"
              alt="Sukrit portrait and print draft process"
              className="about-split-img"
              style={{ aspectRatio: "3 / 4" }}
            />
          </div>
        </div>
      </section>





      {/* SECTION 05: Behind The Scenes (Bento Gallery) */}
      <section className="about-manifesto-gallery-section" style={{ backgroundColor: "#FAF8F5", padding: "8rem 4rem" }}>
        <div className="about-gallery-container">
          <div className="section-header" style={{ textAlign: "center", marginBottom: "5rem" }}>
            <span className="section-kicker">Documentary</span>
            <h2 className="section-title">Behind The Scenes</h2>
          </div>

          <div className="about-bento-gallery">
            <div className="bento-cell bento-tall-1">
              <img src="/indian-tote-lifestyle.png" alt="Artisan printing sessions" />
            </div>
            <div className="bento-cell bento-wide-1">
              <img src="/premium-tote-lifestyle.png" alt="Studio moodboard and references" />
            </div>
            <div className="bento-cell bento-square-1">
              <img src="/dyed-tote-lifestyle.png" alt="Dyeing experimentation in workshop" />
            </div>
            <div className="bento-cell bento-tall-2">
              <img src="/dyed-tote.png" alt="Artisan design reviews and sketches" />
            </div>
            <div className="bento-cell bento-square-2">
              <img src="/premium-tote-hover.png" alt="Stitching copper details" />
            </div>
          </div>
        </div>
      </section>



      {/* FINAL SECTION: Emotion Outro */}
      <section className="about-manifesto-outro-section">
        <div className="about-outro-bg">
          <img src="/premium-tote-lifestyle.png" alt="SHORS Group Campaign" />
          <div className="about-outro-overlay" />
        </div>
        <div className="about-outro-content">
          <h2 className="about-outro-title" style={{ fontSize: "clamp(2rem, 5vw, 3.8rem)", marginBottom: "3rem" }}>
            "Every SHORS piece carries a little of each of us."
          </h2>
          <div style={{ borderTop: "1px solid rgba(250, 248, 245, 0.25)", paddingTop: "1.5rem", display: "inline-block", paddingLeft: "3rem", paddingRight: "3rem" }}>
            <span style={{ fontFamily: "var(--font-serif), serif", fontStyle: "italic", color: "#FAF8F5", fontSize: "1.1rem" }}>
              Rutal &amp; Monik
            </span>
          </div>
        </div>
      </section>
      </div>

      <div className="mobile-about-editorial hidden-on-desktop">
        
        {/* Founder Portrait & Story */}
        <div className="mobile-about-portrait">
          <img src="/indian-tote-lifestyle.png" alt="Rutal and Monik" style={{ height: "70vh", objectFit: "cover", margin: 0 }} />
          <div className="mobile-about-text-box" style={{ padding: "24px", textAlign: "left", alignItems: "flex-start", gap: "16px" }}>
            <span className="mobile-about-role" style={{ fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#A65A3A" }}>The Founders</span>
            <h2 className="mobile-about-name" style={{ fontSize: "30px", fontWeight: 300, margin: 0, textTransform: "uppercase" }}>Rutal &amp; Monik</h2>
            <p className="mobile-about-story" style={{ fontSize: "14px", lineHeight: 1.7, margin: 0, color: "#756B61", maxWidth: "100%" }}>
              "We never wanted to chase trends. We wanted to leave evidence."
            </p>
          </div>
        </div>

        {/* Designer Portrait & Story */}
        <div className="mobile-about-portrait">
          <img src="/premium-tote-hover.png" alt="Sukrit" style={{ height: "70vh", objectFit: "cover", margin: 0 }} />
          <div className="mobile-about-text-box" style={{ padding: "24px", textAlign: "left", alignItems: "flex-start", gap: "16px" }}>
            <span className="mobile-about-role" style={{ fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#A65A3A" }}>The Designer</span>
            <h2 className="mobile-about-name" style={{ fontSize: "30px", fontWeight: 300, margin: 0, textTransform: "uppercase" }}>Sukrit</h2>
            <p className="mobile-about-story" style={{ fontSize: "14px", lineHeight: 1.7, margin: 0, color: "#756B61", maxWidth: "100%" }}>
              "Quiet maximalism that captures pure human emotion."
            </p>
          </div>
        </div>

        {/* Workshop Imagery */}
        <div className="mobile-about-portrait">
          <img src="/antigravity-workshop.png" alt="Workshop" style={{ width: "100%", height: "auto", aspectRatio: "4/3", objectFit: "cover", margin: 0 }} />
        </div>

        {/* Closing */}
        <div className="mobile-about-closing" style={{ padding: "80px 24px", textAlign: "center" }}>
          <h3 style={{ fontSize: "12px", fontFamily: "var(--font-poppins), sans-serif", textTransform: "uppercase", letterSpacing: "0.15em", color: "#8B8177", lineHeight: 1.6 }}>
            "Culture survives because someone chooses to carry it."
          </h3>
        </div>

      </div>
    </div>
  );
}
