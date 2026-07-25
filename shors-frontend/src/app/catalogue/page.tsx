"use client";
import React, { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useIsMobile } from "@/hooks/useIsMobile";
import ProductCard from "@/components/ProductCard";

import Link from "next/link";

const tagsList = ["All", "Root Tote", "Premium Tote", "Loud Tote", "Ancient Tote"];

// Structure the 4 editorial collections
const collectionsData = [
  {
    key: "Root Tote",
    title: "ROOT TOTE",
    subtitle: "A quiet beginning.",
    description: "Designed for everyday rituals.",
    productIds: ["indian-tote-offwhite", "indian-tote-raw"]
  },
  {
    key: "Premium Tote",
    title: "PREMIUM TOTE",
    subtitle: "Oversized.",
    description: "Heavy canvas. Limited production.",
    productIds: ["premium-tote-raw", "premium-tote-gold"]
  },
  {
    key: "Loud Tote",
    title: "LOUD TOTE",
    subtitle: "Statement pieces.",
    description: "Experimental graphics.",
    productIds: ["dyed-tote-burgundy", "dyed-tote-emerald", "dyed-tote-black"]
  },
  {
    key: "Ancient Tote",
    title: "ANCIENT TOTE",
    subtitle: "Inspired by forgotten India.",
    description: "Forgotten details brought to light.",
    productIds: []
  }
];

const MobileProductCard = ({ product }: { product: any }) => {
  const getEditionNumber = () => {
    let sum = 0;
    for (let i = 0; i < product.id.length; i++) sum += product.id.charCodeAt(i);
    return `${(sum % 25) + 12}/50`;
  };

  return (
    <Link href={`/catalogue/${product.id}`} className="mobile-product-card-minimal">
      <img src={product.image} alt={product.name} />
      <div className="mobile-product-text">
        <h3 className="mobile-product-title">{product.name}</h3>
        <p className="mobile-product-desc">Edition {getEditionNumber()}</p>
        <button className="mobile-preorder-btn">PREORDER</button>
      </div>
    </Link>
  );
};

const getMobileInterleavedImage = (colKey: string, index: number) => {
  if (colKey === "Root Tote") {
    if (index === 0) return "/indian-tote-lifestyle.png";
    if (index === 1) return "/antigravity-workshop.png";
  }
  if (colKey === "Premium Tote") {
    if (index === 0) return "/premium-tote-lifestyle.png";
    if (index === 1) return "/craftsmanship.png";
  }
  if (colKey === "Loud Tote") {
    if (index === 0) return "/dyed-tote-lifestyle.png";
    if (index === 1) return "/manifesto-craft.png";
  }
  if (colKey === "Ancient Tote") {
    if (index === 0) return "/indian-tote-alt.png";
  }
  return null;
};

// Cycle organic aspect ratios for lookbook variety
const getAspectClass = (id: string, index: number) => {
  const mod = index % 4;
  if (mod === 0) return "aspect-portrait"; // 3:4
  if (mod === 1) return "aspect-square";   // 1:1
  if (mod === 2) return "aspect-tall";     // 2:3
  return "aspect-standard";                // 4:5
};

// Premium placeholder cards removed as per user request to prevent layout gaps
function CatalogueContent() {
  const { isMobile, isMounted } = useIsMobile();
  const [selectedTag, setSelectedTag] = useState("All");
  const [apiProducts, setApiProducts] = useState<any[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1"}/products`);
        const json = await res.json();
        if (json.success && json.data) {
          const mapped = json.data.map((p: any) => ({
            ...p,
            id: p.slug, // Map slug to id for frontend routing!
            numericId: p.id,
            image: p.images?.find((img: any) => img.imageType === "MAIN")?.imageUrl || "/indian-tote.png",
            hoverImage: p.images?.find((img: any) => img.imageType === "HOVER")?.imageUrl || p.images?.find((img: any) => img.imageType === "MAIN")?.imageUrl || "/indian-tote-alt.png",
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
    fetchProducts();
  }, []);

  const searchParams = useSearchParams();
  const tagParam = searchParams ? searchParams.get("tag") : null;

  useEffect(() => {
    if (tagParam) {
      if (tagsList.includes(tagParam)) {
        setSelectedTag(tagParam);
      } else if (tagParam === "All" || tagParam === "all") {
        setSelectedTag("All");
      }
    }
  }, [tagParam]);

  // Active collections reordering (selected on top, others below)
  const activeCollections = useMemo(() => {
    if (selectedTag === "All") {
      return collectionsData;
    }
    const selected = collectionsData.filter((col) => col.key === selectedTag);
    const others = collectionsData.filter((col) => col.key !== selectedTag);
    return [...selected, ...others];
  }, [selectedTag]);

  return (
    <div className="catalogue-page-wrapper editorial-lookbook-theme">
      
      {/* 1. Editorial Hero Campaign Banner (Full-Bleed) */}
      <section className="catalogue-hero-banner">
        <div className="hero-banner-image-box">
          <img
            src="/dyed-tote-lifestyle.png"
            alt="SHORS Editorial Archive Banner"
            className="hero-banner-bg"
          />
        </div>
      </section>

      {/* 2. Horizontal Category Navigation Pills */}
      <div className="lookbook-filter-container">
        <div className="collection-filter-bar-container">
          <div className="filter-pills-scrollable">
            {tagsList.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`filter-pill-button ${selectedTag === tag ? "active" : ""}`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Editorial Lookbook Sections */}
      <section className="editorial-lookbook-section" id="lookbook-catalogue-grid">
        <div className="editorial-collections-container">
          {activeCollections.map((col) => {
            // Get products matching this collection block
            const colProducts = apiProducts.filter((p) => p.category === col.key);

            if (colProducts.length === 0) {
              return null;
            }

            return (
              <motion.div
                key={col.key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="editorial-collection-block"
              >
                {/* section heading structured like a magazine section */}
                <div className="editorial-collection-header">
                  <h2 className="editorial-collection-title">{col.title}</h2>
                  <div className="editorial-collection-subtitle-row">
                    <span className="editorial-collection-subtitle">{col.subtitle}</span>
                    <span className="editorial-collection-desc">{col.description}</span>
                  </div>
                  <hr className="editorial-collection-divider" />
                </div>

                {/* Standard Responsive Grid Container for Catalogue */}
                <div className="editorial-product-grid">
                  {/* Render matching products */}
                  {colProducts.map((product) => {
                    return (
                      <ProductCard
                        key={product.id}
                        product={product}
                        aspectClass="aspect-standard"
                      />
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

    </div>
  );
}

export default function Catalogue() {
  return (
    <Suspense fallback={
      <div className="catalogue-page-wrapper editorial-lookbook-theme" style={{ padding: "8rem 2rem", textAlign: "center" }}>
        <span className="section-kicker">SHORS COLLECTION</span>
        <h2 className="section-title">Loading Archive...</h2>
      </div>
    }>
      <CatalogueContent />
    </Suspense>
  );
}
