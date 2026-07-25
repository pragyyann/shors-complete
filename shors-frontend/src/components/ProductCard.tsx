"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

interface Product {
  id: string;
  numericId?: number;
  name: string;
  price: string;
  size: string;
  material: string;
  printType: string;
  colors: string;
  features: string;
  story: string;
  image: string;
  hoverImage: string;
  badge: string;
  isAvailable: boolean;
  category: string;
}

interface ProductCardProps {
  product: Product;
  aspectClass?: string;
}

export default function ProductCard({ product, aspectClass = "aspect-standard" }: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Sync wishlist status with localStorage
  useEffect(() => {
    const saved = localStorage.getItem(`shors-wishlist-${product.id}`);
    if (saved === "true") {
      setIsWishlisted(true);
    }
  }, [product.id]);

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const nextState = !isWishlisted;
    setIsWishlisted(nextState);
    localStorage.setItem(`shors-wishlist-${product.id}`, String(nextState));
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    window.dispatchEvent(new CustomEvent("open-preorder-modal", {
      detail: {
        productId: product.numericId ? Number(product.numericId) : Number(product.id),
        productName: product.name,
        category: product.category,
        quantity: 1
      }
    }));
  };

  // Helper to generate deterministic Limited Edition numbers (e.g. 17 / 50) based on ID
  const getEditionNumber = () => {
    let sum = 0;
    for (let i = 0; i < product.id.length; i++) {
      sum += product.id.charCodeAt(i);
    }
    const num = (sum % 25) + 12; // Static number between 12 and 37
    return `${num} / 50`;
  };

  const editionNumber = getEditionNumber();
  
  // Extract Canvas Weight from material string or fallback to "380 GSM"
  const canvasWeight = product.material.match(/\d+\s*GSM/)?.[0] || "380 GSM";

  return (
    <article className="editorial-product-card">
      <Link href={`/catalogue/${product.id}`} className="editorial-image-link-wrapper">
        <div className={`editorial-card-image-box ${aspectClass}`}>
          {/* Bookmark Button Overlay */}
          <button
            onClick={toggleWishlist}
            className={`editorial-wishlist-btn ${isWishlisted ? "active" : ""}`}
            aria-label="Toggle Wishlist"
          >
            <svg
              viewBox="0 0 24 24"
              fill={isWishlisted ? "#FF69B4" : "none"}
              stroke="#FF69B4"
              strokeWidth="2"
            >
              <path d="M17.5 3c-1.93 0-3.6.85-4.5 2.2C12.1 3.85 10.43 3 8.5 3 5.42 3 3 5.42 3 8.5c0 5.25 7 11.5 9 12.5 2-1 9-7.25 9-12.5C21 5.42 18.58 3 17.5 3z" />
            </svg>
          </button>



          {/* Editorial Images */}
          <img
            src={product.image}
            alt={product.name}
            className="editorial-main-img"
            loading="lazy"
          />
          <img
            src={product.hoverImage}
            alt={`${product.name} alternate view`}
            className="editorial-hover-img"
            loading="lazy"
          />

          {/* Premium Hover Overlay revealing Story, Material, Size, Edition */}
          <div className="editorial-hover-overlay">
            <p className="editorial-hover-story">{product.story}</p>
            <div className="editorial-hover-metadata">
              <span className="editorial-hover-meta-item">Material: {product.material}</span>
              <span className="editorial-hover-meta-item">Size: {product.size}</span>
              <span className="editorial-hover-meta-item">Edition: {editionNumber}</span>
            </div>
            <span className="editorial-hover-action">Reserve Piece &rarr;</span>
          </div>

          {/* Mobile Pagination Dots Overlay */}
          <div className="mobile-card-pagination">
            <span className="mobile-dot active"></span>
            <span className="mobile-dot"></span>
            <span className="mobile-dot"></span>
          </div>
        </div>

        {/* Text Information underneath */}
        <div className="editorial-card-info">
          
          <div className="editorial-card-info-top">
            <div className="editorial-card-title-price">
              <h3 className="editorial-card-title">{product.name}</h3>
              <p className="editorial-card-subtitle mobile-detail">
                {product.category}
              </p>
            </div>
            <button className="mobile-quick-add" onClick={handleQuickAdd} aria-label="Quick Add">
              +
            </button>
          </div>
          
          {/* Metadata hidden on mobile */}
          <div className="editorial-card-metadata desktop-only-metadata">
            <span className="editorial-meta-item collection-label">
              {product.category}
            </span>
            <span className="editorial-meta-item highlight-terracotta">Edition {editionNumber}</span>
            <span className="editorial-meta-item">{product.material}</span>
            <span className="editorial-meta-item">Canvas Weight: {canvasWeight}</span>
          </div>

          <button onClick={handleQuickAdd} className="editorial-card-reserve-btn desktop-only-reserve">
            Reserve Piece &rarr;
          </button>
        </div>
      </Link>
    </article>
  );
}
