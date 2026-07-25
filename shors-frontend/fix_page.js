const fs = require('fs');
const missingChunk = `        </div>

        {/* 2-Column Split Content */}
        <div className="manifesto-content-grid">
          {/* Left Column: Manifesto Content */}
          <div className="manifesto-left-col">
            <div className="manifesto-text-wrapper">
              <div className="manifesto-quote-block">
                <span className="quote-mark">&ldquo;</span>
                <p className="manifesto-big-quote">
                  Modern fashion has become generic, trend-driven, and entirely disconnected from cultural identity. We purchase containers to carry our objects, but we have stopped carrying our stories.
                </p>
                <span className="manifesto-quote-author">- The Loss of Story</span>
              </div>

              <div className="manifesto-philosophy-block">
                <h3 className="manifesto-subheading">We believe everyday items can carry history forward.</h3>
                <p className="manifesto-paragraph">
                  SHORS exists where India&apos;s timeless stories meet contemporary silhouettes. We are not traditional, not western, and not nostalgic. Instead, we translate forgotten scripts, regional art, architectural lines, and folk identity into premium canvases.
                </p>
                <p className="manifesto-paragraph">
                  Every bag we craft serves as an open manuscript. It is a canvas for conversation, designed to be carried proudly through the modern urban landscape.
                </p>
                
                {/* Styled actual signature */}
                <span style={{
                  marginTop: "2.5rem",
                  color: "var(--color-primary)",
                  fontFamily: "var(--font-poppins), sans-serif",
                  fontSize: "1rem",
                  display: "block"
                }}>
                  - <span style={{ fontFamily: "var(--font-cursive), cursive", fontSize: "2.2rem", verticalAlign: "middle" }}>SHORS</span>
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Immersive Imagery */}
          <div className="manifesto-right-col">
            <div className="manifesto-image-wrapper">
              {/* Primary Cinematic Landscape Image */}
              <img
                src="/manifesto-loom.png"
                alt="Artisan weaving workshop loom space"
                className="manifesto-main-landscape-img"
              />
              <div className="manifesto-landscape-overlay" />

              {/* Overlapping Secondary Image */}
              <div className="manifesto-overlap-card">
                <img
                  src="/craftsmanship.png"
                  alt="Raw cotton fibers, paisley wood blocks, and handcrafting details"
                  className="manifesto-overlap-card-img"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Craftsmanship Section - Immersive Full-Width Image with Overlaid Annotations */}
      <section className="editorial-craftsmanship-section">
        {/* Header container sits on page light background */}
        <div className="section-container" style={{ maxWidth: "1200px", padding: "0 2rem", margin: "0 auto" }}>
          <div className="section-header" style={{ textAlign: "center", marginBottom: "4rem" }}>
            <span className="section-kicker">The Workshop</span>
            <h2 className="section-title" style={{ margin: 0 }}>Honest Handiwork</h2>
          </div>
        </div>

        {/* Full-width visual container sits below heading */}
        <div className="craftsmanship-canvas-container">
          {/* Background Image & Gradient overlay */}
          <div className="craftsmanship-bg-container">
            <img
              src="/craftsmanship.png"
              alt="SHORS Craftsmanship and Handiwork"
              className="craftsmanship-bg-img"
            />
            <div className="craftsmanship-overlay" />
          </div>

          {/* Annotations overlaying the image canvas */}
          <div className="craftsmanship-annotations">
            <div className="annotation-item item-canvas">
              <span className="annotation-num">01</span>
              <div className="annotation-text">
                <h3>Premium Canvas</h3>
                <div className="annotation-line" />
                <p>Heavyweight 380 GSM natural cotton weave sourced locally and built to handle your daily commute.</p>
              </div>
            </div>

            <div className="annotation-item item-artwork">
              <span className="annotation-num">02</span>
              <div className="annotation-text">
                <h3>Original Artwork</h3>
                <div className="annotation-line" />
                <p>Designed by Sukrit, layering typographies and forgotten regional sketches into contemporary art.</p>
              </div>
            </div>

            <div className="annotation-item item-print">
              <span className="annotation-num">03</span>
              <div className="annotation-text">
                <h3>Print Precision</h3>
                <div className="annotation-line" />
                <p>Using advanced print transfers to ensure detailed drawings remain crisp over years of wear.</p>
              </div>
            </div>

            <div className="annotation-item item-dye">
              <span className="annotation-num">04</span>
              <div className="annotation-text">
                <h3>Hand-Dye Processes</h3>
                <div className="annotation-line" />
                <p>Individually dyed in micro-vats, producing small variations that make each bag completely unique.</p>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* 8. Testimonials Section - Redesigned Dark Interactive Slider */}
      <section className="testimonials-dark-section">
        {/* Centered Heading Section */}
        <div className="section-container" style={{ marginBottom: "5rem", textAlign: "center" }}>
          <span className="section-kicker">Curator Letters</span>
          <h2 className="section-title">
            The Voice of the Collective
          </h2>
        </div>

        <div className="testimonials-split-container">
          
          {/* Left Block */}
          <div className="testimonial-left-block">
            <p className="testimonial-desc-dark" style={{ fontSize: "1.1rem", lineHeight: "1.75" }}>
              Our customers love our products! Read their reviews to discover why they&apos;re raving about our quality, service, and overall experience. Join the satisfied ranks today!
            </p>
            
            <div className="testimonial-btn-row">
              <button className="btn-review-primary" onClick={() => scrollToSection("collection")}>
                Explore Collection
              </button>
            </div>
          </div>

          {/* Right Block (Testimonial Card + Slider Controls) */}
          <div className="testimonial-glow-container">
            
            {/* Navigation Arrows at top right of the card area */}
            <div className="testimonial-header-arrows">
              <button 
                className="arrow-nav-btn" 
                onClick={prevTestimonial}
                style={{ "--tx-hover": "-4px" }}
                aria-label="Previous testimonial"
              >
                ←
              </button>
              <button 
                className="arrow-nav-btn" 
                onClick={nextTestimonial}
                style={{ "--tx-hover": "4px" }}
                aria-label="Next testimonial"
              >
                →
              </button>
            </div>

            {/* Testimonial Card */}
            <div 
              key={activeTestimonial} 
              className="testimonial-card-premium animate-testimonial-slide"
            >
              <div className="testimonial-quote-icon">“</div>
              
              <p className="testimonial-quote-text">
                &ldquo;{testimonials[activeTestimonial].text}&rdquo;
              </p>
              
              <div className="testimonial-card-footer">
                <div className="testimonial-user-info">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={testimonials[activeTestimonial].avatar} 
                    alt={testimonials[activeTestimonial].author} 
                    className="testimonial-avatar-img"
                  />
                  <div className="testimonial-author-meta">
                    <h4 className="testimonial-author-name">{testimonials[activeTestimonial].author}</h4>
                  </div>
                </div>
                
                <div className="testimonial-stars-container">
                  {[...Array(5)].map((_, i) => (`

let fileContent = fs.readFileSync('src/app/page.tsx', 'utf8');
const searchString = \`        </div>
                      key={i} \`;
const replaceString = missingChunk + \`                      key={i} \`;

if (fileContent.includes(searchString)) {
  fileContent = fileContent.replace(searchString, replaceString);
  fs.writeFileSync('src/app/page.tsx', fileContent);
  console.log("Successfully fixed page.tsx");
} else {
  console.log("Could not find the search string to replace in page.tsx");
}
