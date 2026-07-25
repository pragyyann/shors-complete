"use client";
import React, { useState, useEffect } from "react";
import ProductCard from "@/components/ProductCard";
import VideoBanner from "@/components/VideoBanner";
import { useIsMobile } from "@/hooks/useIsMobile";

const translations = [
  { word: "Noise", lang: "English" },
  { word: "शोर", lang: "Hindi" },
  { word: "شور", lang: "Urdu" },
  { word: "ਸ਼ੋਰ", lang: "Punjabi" },
  { word: "শোর", lang: "Bengali" },
  { word: "કોલાહલ", lang: "Gujarati" },
  { word: "கோலாஹலம்", lang: "Tamil" },
  { word: "ఘోష", lang: "Telugu" },
  { word: "ಶೋರ್", lang: "Kannada" },
  { word: "അട്ടഹാസം", lang: "Malayalam" },
  { word: "शोर", lang: "Konkani" },
  { word: "शोर", lang: "Marathi" },
  { word: "हल्ला", lang: "Assamese" },
  { word: "हल्ला", lang: "Nepali" },
  { word: "ସୋর", lang: "Odia" },
  { word: "शोर", lang: "Sanskrit" },
  { word: "كولاهال", lang: "Kashmiri" },
  { word: "شور", lang: "Sindhi" },
  { word: "ಕೋಲಾಹಲ", lang: "Tulu" },
  { word: "शोर", lang: "Bodo" },
  { word: "शोर", lang: "Dogri" },
  { word: "शोर", lang: "Maithili" },
  { word: "ᱥᱚᱨ", lang: "Santali" }
];

const testimonials = [
  {
    id: 1,
    text: "This bag doesn't just carry my books; it carries my heritage. The Devanagari details and heavy loom texture make it a constant conversation starter in London.",
    author: "P. Sharma",
    rating: 5.0,
    avatar: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23777777'%3E%3Cpath d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'/%3E%3C/svg%3E"
  },
  {
    id: 2,
    text: "The hand-dye color tones are so deep and rich. You can feel the weight of the 380 GSM canvas immediately. A beautifully constructed heritage piece.",
    author: "Verified Customer",
    rating: 5.0,
    avatar: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23777777'%3E%3Cpath d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'/%3E%3C/svg%3E"
  },
  {
    id: 3,
    text: "SHORS has completely redefined what everyday utility means. It's spacious, structural, and makes a bold cultural statement. I get asked about it everywhere I go.",
    author: "Anonymous",
    rating: 5.0,
    avatar: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23777777'%3E%3Cpath d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'/%3E%3C/svg%3E"
  },
  {
    id: 4,
    text: "The integration of traditional motifs with a modern street-ready silhouette is flawless. It stands out in any crowd, whether in Tokyo or New York.",
    author: "M. Nair",
    rating: 5.0,
    avatar: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23777777'%3E%3Cpath d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'/%3E%3C/svg%3E"
  },
  {
    id: 5,
    text: "Sturdy handles, rich fabric, and a story behind the print. It's not just a collection; it's a movement. Absolute perfection in craftsmanship.",
    author: "A. Roy",
    rating: 5.0,
    avatar: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23777777'%3E%3Cpath d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'/%3E%3C/svg%3E"
  }
];

export default function Home() {
  const { isMobile, isMounted } = useIsMobile();
  const [translationIndex, setTranslationIndex] = useState(0);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [heroData, setHeroData] = useState<any>(null);
  const [apiProducts, setApiProducts] = useState<any[]>([]);
  const [showcaseModule, setShowcaseModule] = useState<any>(null);

  useEffect(() => {
    const fetchHero = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1"}/hero`,
        );
        const json = await res.json();
        if (json.success && json.data) {
          setHeroData(json.data);
        }
      } catch (e) {
        console.error("Failed to fetch hero data", e);
      }
    };
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1"}/products`,
        );
        const json = await res.json();
        if (json.success && json.data) {
          const mapped = json.data.map((p: any) => ({
            ...p,
            id: p.slug,
            numericId: p.id,
            image:
              p.images?.find((img: any) => img.imageType === "MAIN")
                ?.imageUrl || "/indian-tote.png",
            hoverImage:
              p.images?.find((img: any) => img.imageType === "HOVER")
                ?.imageUrl ||
              p.images?.find((img: any) => img.imageType === "MAIN")
                ?.imageUrl ||
              "/indian-tote-alt.png",
            story: p.description || "",
            material: p.material || "380 GSM Heavyweight Canvas",
            category: p.category || "Root Tote",
            isAvailable: p.isActive,
            price: "$0",
            size: "OS",
            badge: "",
          }));
          // Only keep active products
          setApiProducts(mapped.filter((p: any) => p.isAvailable));
        }
      } catch (e) {
        console.error("Failed to fetch products", e);
      }
    };
    const fetchShowcases = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1"}/homepage-showcase-module`,
        );
        const json = await res.json();
        if (json.success && json.data) {
          setShowcaseModule(json.data);
        }
      } catch (e) {
        console.error("Failed to fetch showcase module", e);
      }
    };
    fetchHero();
    fetchProducts();
    fetchShowcases();
  }, []);


  const nextTestimonial = () => {
    setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };
  
  useEffect(() => {
    const interval = setInterval(() => {
      setTranslationIndex((prev) => (prev + 1) % translations.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [activeTestimonial]);

  const openPreorder = () => {
    window.dispatchEvent(new Event("open-preorder-modal"));
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };


  const getProductInfo = (productData: any, defaultName: string, defaultImg1: string, defaultImg2: string, defaultDesc: string) => {
    if (!productData) return { name: defaultName, img1: defaultImg1, img2: defaultImg2, desc: defaultDesc, isAvailable: true };
    const img1 = productData.images?.find((img: any) => img.imageType === "MAIN")?.imageUrl || defaultImg1;
    const img2 = productData.images?.find((img: any) => img.imageType === "HOVER")?.imageUrl || productData.images?.find((img: any) => img.imageType === "MAIN")?.imageUrl || defaultImg2;
    return {
      name: productData.name || defaultName,
      img1,
      img2,
      desc: productData.description || defaultDesc,
      isAvailable: productData.isActive !== false
    };
  };

  const b1p1 = getProductInfo(showcaseModule?.blockOneProductOne, "Root Tote (Off-White)", "/indian-tote.png", "/indian-tote-alt.png", "Durable, multi-utility canvas carryall designed for clean aesthetics and daily resilience.");
  const b1p2 = getProductInfo(showcaseModule?.blockOneProductTwo, "Root Tote (Raw Natural)", "/indian-tote-alt.png", "/indian-tote.png", "Undyed raw canvas exhibiting natural seed-flecks, organic tones, and raw structural integrity.");
  
  const b2p1 = getProductInfo(showcaseModule?.blockTwoProductOne, "Premium Tote (Raw Canvas)", "/premium-tote.png", "/premium-tote-hover.png", "Reinforced double-layered stitch lines, inner sleeves, and a heavy-duty luxury canvas body.");
  const b2p2 = getProductInfo(showcaseModule?.blockTwoProductTwo, "Premium Tote (Gold Accent)", "/premium-tote-hover.png", "/premium-tote.png", "Hand-pulled screen-printed branding in rich gold, designed for an elevated statement of heritage.");

  return (
    <div
      className="manuscript-paper" style={{ display: "flex", flexDirection: "column", width: "100%" }}>
      {/* 1. Hero Section - Immersive Full-Bleed Luxury Redesign */}
      <section className="hero-cinematic-full">
        {/* Subtle ghost watermark behind/beside the product */}
        <div className="hero-watermark">SHORS</div>

        {/* Campaign background image */}
        <div className="hero-bg-frame">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={
              isMobile && heroData?.mobileMediaUrl
                ? heroData.mobileMediaUrl
                : heroData?.desktopMediaUrl || "/hero-story.png"
            }
            alt={
              heroData?.title || "SHORS handcrafted heritage tote bag campaign"
            }
            className="hero-bg-img"
          />
        </div>

        {/* Minimal Editorial Content Layer - positioned bottom-left */}
        <div className="hero-editorial-container">
          <button
            className="btn-editorial-cta"
            onClick={() => scrollToSection("collection")}
          >
            Explore Collection <span className="cta-arrow">→</span>
          </button>
        </div>
      </section>



      {/* Cinematic Video Placeholder */}
      <VideoBanner />

      {/* 2. Featured Collections Section (Collection Showcase) */}
      {(showcaseModule?.blockOneIsActive !== false || showcaseModule?.blockTwoIsActive !== false) && (
      <section id="collection" className="editorial-collection-page manuscript-paper" style={{ padding: "8vw 0", borderTop: "none" }}>
        <div className="editorial-fluid-container">

          <div className="section-header" style={{ textAlign: "center", marginBottom: isMobile ? "28px" : "6rem" }}>
            <span className="section-kicker">Signature Drops</span>
            <h2 className="section-title" style={{ fontSize: "clamp(26px, 5vw, 4rem)", textTransform: "uppercase", margin: "16px 0 8px 0" }}>
              The Curated Archive
            </h2>
            {isMobile && (
              <p style={{ fontFamily: "var(--font-serif), serif", fontSize: "14px", color: "#756B61", margin: 0, fontStyle: "italic" }}>
                An exploration of heritage and physical evidence.
              </p>
            )}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
            
            {/* Conditional Rendering: Desktop vs Mobile (No CSS Hacks) */}
            {(!isMounted || !isMobile) ? (
              <>
                {/* ROW 1: Root Tote Collection (Left Showcase) - DESKTOP */}
                {showcaseModule?.blockOneIsActive !== false && (
                <div className="editorial-collection-grid editorial-collection-grid-left">
                  {/* Showcase Card */}
                  <div className="premium-showcase-card">
                    <img src={showcaseModule?.blockOneBannerImage || "/indian-tote-lifestyle.png"} alt="Root Tote Collection Campaign" />
                    <div className="premium-showcase-overlay">
                      <h3 className="premium-showcase-title">{showcaseModule?.blockOneCollectionName || "Root Tote"}</h3>
                      <div className="premium-showcase-desc-box">
                        <span className="premium-showcase-kicker">{showcaseModule?.blockOneLabel || "Everyday Rituals"}</span>
                        <div className="premium-showcase-divider" />
                        <p className="premium-showcase-desc">
                          {showcaseModule?.blockOneDescription || "A quiet beginning. Built from locally sourced heavyweight canvas, designed to carry daily essentials with effortless elegance."}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Product 1: Off-White */}
                  <div className="premium-card-wrapper" onClick={openPreorder}>
                    <div className="premium-card-image-box">
                      <img src={b1p1.img1} alt="Root Tote Bag (Off-White)" className="premium-card-img img-primary has-secondary" />
                      <img src={b1p1.img2} alt="Root Tote Bag (Off-White) alternate view" className="premium-card-img img-secondary" />
                      <div className="premium-card-overlay">
                        <span className="preorder-badge">PRE-ORDER</span>
                        <h3 className="premium-card-title">{b1p1.name}</h3>
                        <p className="premium-card-desc">{b1p1.desc}</p>
                      </div>
                    </div>
                  </div>

                  {/* Product 2: Raw Natural */}
                  <div className="premium-card-wrapper" onClick={openPreorder}>
                    <div className="premium-card-image-box">
                      <img src={b1p2.img1} alt="Root Tote Bag (Raw Natural)" className="premium-card-img img-primary has-secondary" />
                      <img src={b1p2.img2} alt="Root Tote Bag (Raw Natural) alternate view" className="premium-card-img img-secondary" />
                      <div className="premium-card-overlay">
                        <span className="preorder-badge">PRE-ORDER</span>
                        <h3 className="premium-card-title">{b1p2.name}</h3>
                        <p className="premium-card-desc">{b1p2.desc}</p>
                      </div>
                    </div>
                  </div>

                  {/* Placeholders for future cms injection */}
                  <div className="premium-card-placeholder" />
                  <div className="premium-card-placeholder" />
                </div>
                )}

                {/* ROW 2: Premium Tote Collection (Right Showcase) - DESKTOP */}
                {showcaseModule?.blockTwoIsActive !== false && (
                <div className="editorial-collection-grid editorial-collection-grid-right">
                  {/* Product 1: Raw Canvas */}
                  <div className="premium-card-wrapper" onClick={openPreorder}>
                    <div className="premium-card-image-box">
                      <img src={b2p1.img1} alt="Premium Tote Bag (Raw Canvas)" className="premium-card-img img-primary has-secondary" />
                      <img src={b2p1.img2} alt="Premium Tote Bag (Raw Canvas) alternate view" className="premium-card-img img-secondary" />
                      <div className="premium-card-overlay">
                        <span className="preorder-badge">PRE-ORDER</span>
                        <h3 className="premium-card-title">{b2p1.name}</h3>
                        <p className="premium-card-desc">{b2p1.desc}</p>
                      </div>
                    </div>
                  </div>

                  {/* Product 2: Gold Accent */}
                  <div className="premium-card-wrapper" onClick={openPreorder}>
                    <div className="premium-card-image-box">
                      <img src={b2p2.img1} alt="Premium Tote Bag (Gold Accent)" className="premium-card-img img-primary has-secondary" />
                      <img src={b2p2.img2} alt="Premium Tote Bag (Gold Accent) alternate view" className="premium-card-img img-secondary" />
                      <div className="premium-card-overlay">
                        <span className="preorder-badge">PRE-ORDER</span>
                        <h3 className="premium-card-title">{b2p2.name}</h3>
                        <p className="premium-card-desc">{b2p2.desc}</p>
                      </div>
                    </div>
                  </div>

                  {/* Placeholders for future cms injection */}
                  <div className="premium-card-placeholder" />
                  <div className="premium-card-placeholder" />

                  {/* Showcase Card */}
                  <div className="premium-showcase-card">
                    <img src={showcaseModule?.blockTwoBannerImage || "/premium-tote-lifestyle.png"} alt="Premium Tote Collection Campaign" />
                    <div className="premium-showcase-overlay">
                      <h3 className="premium-showcase-title">{showcaseModule?.blockTwoCollectionName || "Premium Tote"}</h3>
                      <div className="premium-showcase-desc-box">
                        <span className="premium-showcase-kicker">{showcaseModule?.blockTwoLabel || "International Weave"}</span>
                        <div className="premium-showcase-divider" />
                        <p className="premium-showcase-desc">
                          {showcaseModule?.blockTwoDescription || "Engineered for the international landscape. Crafted for urban India and the UK diaspora, showing cultural identity without compromise."}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                )}
              </>
            ) : (
              <>
                {/* STRICT MOBILE LAYOUT: Pure column, ZERO placeholders, natural heights */}
                <div className="mobile-only-collection-stack">
                  
                  {showcaseModule?.blockOneIsActive !== false && (
                  <>
                  {/* Root Tote Collection */}
                  <div className="mobile-campaign-tile">
                    <img src={showcaseModule?.blockOneBannerImage || "/indian-tote-lifestyle.png"} alt="Root Tote Collection Campaign" className="mobile-full-width-image" />
                    <div className="mobile-feature-overlay">
                      <span style={{ fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#EAE8E3', marginBottom: '4px' }}>{showcaseModule?.blockOneLabel || "Everyday Rituals"}</span>
                      <h3 className="mobile-collection-title">{showcaseModule?.blockOneCollectionName || "Root Tote"}</h3>
                      <p className="mobile-collection-desc">
                        {showcaseModule?.blockOneDescription || "A quiet beginning. Built from locally sourced heavyweight canvas, designed to carry daily essentials with effortless elegance."}
                      </p>
                      <button className="mobile-editorial-arrow" onClick={openPreorder} style={{ background: 'none', border: 'none', padding: 0 }}>
                        EXPLORE COLLECTION →
                      </button>
                    </div>
                  </div>

                  <div className="mobile-product-grid-2col">
                    <div className="mobile-product-card-minimal" onClick={openPreorder}>
                      <img src={b1p1.img1} alt="Root Tote Bag (Off-White)" />
                      <div className="mobile-product-text">
                        <h3 className="mobile-product-title">{b1p1.name}</h3>
                        <p className="mobile-product-desc">Edition 12/50</p>
                        <button className="mobile-preorder-btn">PREORDER</button>
                      </div>
                    </div>
                    <div className="mobile-product-card-minimal" onClick={openPreorder}>
                      <img src={b1p2.img1} alt="Root Tote Bag (Raw Natural)" />
                      <div className="mobile-product-text">
                        <h3 className="mobile-product-title">{b1p2.name}</h3>
                        <p className="mobile-product-desc">Edition 14/50</p>
                        <button className="mobile-preorder-btn">PREORDER</button>
                      </div>
                    </div>
                  </div>
                  </>
                  )}

                  {showcaseModule?.blockTwoIsActive !== false && (
                  <>
                  {/* Premium Tote Collection */}
                  <div className="mobile-campaign-tile">
                    <img src={showcaseModule?.blockTwoBannerImage || "/premium-tote-lifestyle.png"} alt="Premium Tote Collection Campaign" className="mobile-full-width-image" />
                    <div className="mobile-feature-overlay">
                      <span style={{ fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#EAE8E3', marginBottom: '4px' }}>{showcaseModule?.blockTwoLabel || "International Weave"}</span>
                      <h3 className="mobile-collection-title">{showcaseModule?.blockTwoCollectionName || "Premium Tote"}</h3>
                      <p className="mobile-collection-desc">
                        {showcaseModule?.blockTwoDescription || "Engineered for the international landscape. Crafted for urban India and the UK diaspora, showing cultural identity without compromise."}
                      </p>
                      <button className="mobile-editorial-arrow" onClick={openPreorder} style={{ background: 'none', border: 'none', padding: 0 }}>
                        EXPLORE COLLECTION →
                      </button>
                    </div>
                  </div>

                  <div className="mobile-product-grid-2col">
                    <div className="mobile-product-card-minimal" onClick={openPreorder}>
                      <img src={b2p1.img1} alt="Premium Tote Bag (Raw Canvas)" />
                      <div className="mobile-product-text">
                        <h3 className="mobile-product-title">{b2p1.name}</h3>
                        <p className="mobile-product-desc">Edition 24/50</p>
                        <button className="mobile-preorder-btn">PREORDER</button>
                      </div>
                    </div>
                    <div className="mobile-product-card-minimal" onClick={openPreorder}>
                      <img src={b2p2.img1} alt="Premium Tote Bag (Gold Accent)" />
                      <div className="mobile-product-text">
                        <h3 className="mobile-product-title">{b2p2.name}</h3>
                        <p className="mobile-product-desc">Edition 27/50</p>
                        <button className="mobile-preorder-btn">PREORDER</button>
                      </div>
                    </div>
                  </div>
                  </>
                  )}
                  
                </div>
              </>
            )}

          </div>
        </div>
      </section>
      )}

      {/* 3. The SHORS Manifesto Section (Merged Philosophy & Problem) - Full Bleed Redesign */}
      <section id="philosophy" className="manifesto-fullbleed-section">
        {/* Centered Heading */}
        <div className="manifesto-header">
          <span className="section-kicker">
            The Manifesto
          </span>
          <h2 className="section-title">Heritage in Motion</h2>
        </div>

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
                <span 
                  className="brand-header-italiana"
                  style={{
                    marginTop: "2.5rem",
                    color: "var(--color-primary)",
                    display: "block",
                    fontSize: "1.8rem"
                  }}
                >
                  - SHORS
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
                style={{ "--tx-hover": "-4px" } as React.CSSProperties}
                aria-label="Previous testimonial"
              >
                ←
              </button>
              <button 
                className="arrow-nav-btn" 
                onClick={nextTestimonial}
                style={{ "--tx-hover": "4px" } as React.CSSProperties}
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
                  {[...Array(5)].map((_, i) => (
                    <svg 
                      key={i} 
                      className="star-icon-gold" 
                      viewBox="0 0 20 20" 
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="testimonial-rating-num">
                    {testimonials[activeTestimonial].rating.toFixed(1)}
                  </span>
                </div>
              </div>
            </div>

            {/* Centered pagination dots directly under the review box */}
            <div className="testimonial-pagination-centered">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  className={`pagination-dot ${idx === activeTestimonial ? "dot-active" : ""}`}
                  onClick={() => setActiveTestimonial(idx)}
                  aria-label={`Go to testimonial ${idx + 1}`}
                />
              ))}
            </div>

          </div>

        </div>
      </section>

      {/* 9. Final Call-to-Action Section */}
      <section className="section-editorial" style={{ padding: 0, borderBottom: "none" }}>
        <div className="final-cta-card" style={{ width: "100%" }}>
          <h2>Carry More Than a Bag.</h2>
          <p>Carry a piece of India&apos;s heritage into modern everyday life.</p>
          <button className="btn-primary" onClick={openPreorder}>
            Explore Collection
          </button>
        </div>
      </section>
    
          </div>
  );
}
