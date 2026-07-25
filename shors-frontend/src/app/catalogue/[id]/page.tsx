"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import ProductCard from "@/components/ProductCard";

interface ProductType {
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
  gallery: string[];
  badge: string;
  categoryTags: string[];
  category: string;
  isAvailable: boolean;
}

export default function ProductDetail() {
  const params = useParams();
  const productId = params?.id as string;

  const [product, setProduct] = useState<ProductType | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedProducts, setRelatedProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    const fetchProductAndRelated = async () => {
      try {
        setLoading(true);
        // Fetch specific product by slug
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1"}/products/${productId}`);
        const json = await res.json();
        
        if (json.success && json.data) {
          const p = json.data;
          const mappedProduct: ProductType = {
            ...p,
            id: p.slug, // Frontend routes by slug
            numericId: p.id,
            image: p.images?.find((img: any) => img.imageType === "MAIN")?.imageUrl || "/indian-tote.png",
            hoverImage: p.images?.find((img: any) => img.imageType === "HOVER")?.imageUrl || p.images?.find((img: any) => img.imageType === "MAIN")?.imageUrl || "/indian-tote-alt.png",
            gallery: p.images?.map((img: any) => img.imageUrl) || ["/indian-tote.png"],
            story: p.description || "",
            material: p.material || "380 GSM Heavyweight Canvas",
            category: p.category || "Root Tote",
            categoryTags: [p.category || "Root Tote"],
            isAvailable: p.isActive,
            price: "$0",
            size: "OS",
            badge: "",
            printType: "Hand Screen Printed",
            colors: "Raw / Undyed / Pigment",
            features: "Reinforced straps, interior pocket"
          };
          setProduct(mappedProduct);
          document.title = `${mappedProduct.name} | SHORS`;
          
          // Fetch related products (all active, excluding this one)
          const relRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1"}/products`);
          const relJson = await relRes.json();
          if (relJson.success && relJson.data) {
            const mappedRelated = relJson.data.map((rp: any) => ({
              ...rp,
              id: rp.slug,
              numericId: rp.id,
              image: rp.images?.find((img: any) => img.imageType === "MAIN")?.imageUrl || "/indian-tote.png",
              hoverImage: rp.images?.find((img: any) => img.imageType === "HOVER")?.imageUrl || rp.images?.find((img: any) => img.imageType === "MAIN")?.imageUrl || "/indian-tote-alt.png",
              story: rp.description || "",
              material: rp.material || "380 GSM Heavyweight Canvas",
              category: rp.category || "Root Tote",
              categoryTags: [rp.category || "Root Tote"],
              isAvailable: rp.isActive,
              price: "$0",
              size: "OS",
              badge: "",
            })).filter((rp: any) => rp.isAvailable && rp.id !== productId).slice(0, 4);
            setRelatedProducts(mappedRelated);
          }
        }
      } catch (e) {
        console.error("Failed to fetch product", e);
      } finally {
        setLoading(false);
      }
    };
    
    if (productId) {
      fetchProductAndRelated();
    }
  }, [productId]);

  // State managers
  const [activeImage, setActiveImage] = useState("");
  const [activeTab, setActiveTab] = useState("details"); // details, washcare, shipping
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showZoomModal, setShowZoomModal] = useState(false);

  // Initialize page details
  useEffect(() => {
    if (product) {
      setActiveImage(product.gallery?.[0] || product.image);
      setSelectedSize(product.id === "custom-tote" ? "M" : "OS");
      
      const saved = localStorage.getItem(`shors-wishlist-${product.id}`);
      if (saved === "true") {
        setIsWishlisted(true);
      }
      
      // Scroll to top on navigation
      window.scrollTo({ top: 0, behavior: "instant" as any });
    }
  }, [product]);

  if (loading) {
    return (
      <div className="product-detail-page-wrapper manuscript-paper" style={{ minHeight: "80vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <p style={{ fontFamily: "var(--font-italiana)", fontSize: "1.5rem" }}>Loading Piece...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-not-found-wrapper manuscript-paper">
        <div className="not-found-container">
          <h2 className="italiana-title">Piece Not Found</h2>
          <p>The collection item you are looking for does not exist in the archive.</p>
          <Link href="/catalogue" className="btn-secondary-link">
            Return to Catalogue
          </Link>
        </div>
      </div>
    );
  }

  const toggleWishlist = () => {
    const nextState = !isWishlisted;
    setIsWishlisted(nextState);
    localStorage.setItem(`shors-wishlist-${product.id}`, String(nextState));
  };

  // Preorder modal trigger
  const handlePreorder = () => {
    window.dispatchEvent(new CustomEvent("open-preorder-modal", {
      detail: {
        productId: product.numericId ? Number(product.numericId) : Number(product.id),
        productName: product.name,
        category: product.category,
        quantity: quantity
      }
    }));
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${product.name} | SHORS`,
        text: product.story,
        url: window.location.href,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Product link copied to clipboard!");
    }
  };

  const sizesList = product.id === "custom-tote" ? ["S", "M", "L", "XL"] : ["OS"];

  return (
    <div className="product-detail-page-wrapper manuscript-paper">
      <div className="section-container">
        
        {/* Breadcrumb Navigation */}
        <div className="product-breadcrumb">
          <Link href="/catalogue">Catalogue</Link>
          <span className="breadcrumb-separator">/</span>
          <span>{product.name}</span>
        </div>

        {/* Core Layout Split */}
        <div className="product-detail-layout-grid">
          
          {/* LEFT: Image Gallery Column */}
          <div className="product-gallery-column">
            
            {/* Gallery Thumbnail Selector */}
            <div className="gallery-thumbnails-panel">
              {product.gallery?.map((imgUrl, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(imgUrl)}
                  className={`thumbnail-btn-box ${activeImage === imgUrl ? "active" : ""}`}
                >
                  <img src={imgUrl} alt={`${product.name} thumbnail ${idx + 1}`} />
                </button>
              ))}
            </div>

            {/* Main Stage Image */}
            <div className="gallery-main-stage" onClick={() => setShowZoomModal(true)}>
              <img
                src={activeImage || product.image}
                alt={product.name}
                className="gallery-stage-image"
              />
              <div className="gallery-zoom-prompt">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="zoom-icon">
                  <circle cx="11" cy="11" r="8" />
                  <path d="M21 21l-4.35-4.35M11 8v6M8 11h6" />
                </svg>
                <span>Click to Expand</span>
              </div>
            </div>

          </div>

          {/* RIGHT: Sticky Purchase Panel Column */}
          <div className="product-purchase-sticky-panel">
            <div className="sticky-panel-inner">
              
              {/* Badge & Collection Name */}
              <div className="panel-header-badge-row">
                <span className="panel-collection-kicker">
                  {product.category || "Signature Collection"}
                </span>
              </div>

              {/* Title & Collection Drop details */}
              <h1 className="panel-product-title italiana-title">{product.name}</h1>

              {/* Description Story */}
              <div className="panel-description-text">
                <p>{product.story}</p>
              </div>



              {/* Quantity Selector */}
              <div className="panel-quantity-section">
                <span className="selector-title-row">QUANTITY</span>
                <div className="quantity-counter-box">
                  <button
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="quantity-btn"
                    disabled={quantity <= 1}
                  >
                    —
                  </button>
                  <span className="quantity-value">{quantity}</span>
                  <button
                    onClick={() => setQuantity(q => q + 1)}
                    className="quantity-btn"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="panel-action-buttons-box">
                {product.isAvailable ? (
                  <>
                    <button onClick={handlePreorder} className="btn-buy-now">
                      PREORDER NOW
                    </button>
                    <button onClick={handlePreorder} className="btn-add-to-cart">
                      RESERVE PIECE
                    </button>
                  </>
                ) : (
                  <button className="btn-buy-now sold-out-disabled" disabled>
                    DROP CLOSED
                  </button>
                )}
              </div>

              {/* Preorder Philosophy Information */}
              <div className="preorder-explanation-box" style={{ width: "100%", margin: "0 0 2.2rem 0", padding: "1.5rem", backgroundColor: "rgba(139, 46, 46, 0.03)", border: "1px solid rgba(139, 46, 46, 0.08)", borderRadius: "12px", fontFamily: "var(--font-poppins), sans-serif", fontSize: "0.85rem", lineHeight: "1.6" }}>
                <div style={{ marginBottom: "0.85rem", display: "flex", gap: "0.5rem" }}>
                  <span style={{ color: "#8B263E", fontWeight: "600" }}>◆ DROP STATUS:</span>
                  <span style={{ color: "#0A0A0A", fontWeight: "500" }}>Preorders Open (Production Slot Reserved)</span>
                </div>
                <div style={{ marginBottom: "0.85rem" }}>
                  <strong style={{ color: "#0A0A0A", fontWeight: "600" }}>MADE TO ORDER:</strong> Each piece is custom crafted in limited batches after the preorder window closes. No mass production.
                </div>
                <div style={{ marginBottom: "0.85rem" }}>
                  <strong style={{ color: "#0A0A0A", fontWeight: "600" }}>TIMELINE:</strong> Production begins immediately after the drop closes. Crafting time is approximately 2–3 weeks.
                </div>
                <div>
                  <strong style={{ color: "#0A0A0A", fontWeight: "600" }}>EST. DISPATCH:</strong> Dispatches begin within 3–4 weeks. Global carbon-neutral shipping.
                </div>
              </div>

              {/* Share & Wishlist Row */}
              <div className="panel-utility-links-row">
                <button onClick={toggleWishlist} className={`utility-link-btn ${isWishlisted ? "wishlisted" : ""}`}>
                  <svg viewBox="0 0 24 24" fill={isWishlisted ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5">
                    <path d="M17.5 3c-1.93 0-3.6.85-4.5 2.2C12.1 3.85 10.43 3 8.5 3 5.42 3 3 5.42 3 8.5c0 5.25 7 11.5 9 12.5 2-1 9-7.25 9-12.5C21 5.42 18.58 3 17.5 3z" />
                  </svg>
                  <span>{isWishlisted ? "WISHLISTED" : "ADD TO WISHLIST"}</span>
                </button>
                <button onClick={handleShare} className="utility-link-btn">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="18" cy="5" r="3" />
                    <circle cx="6" cy="12" r="3" />
                    <circle cx="18" cy="19" r="3" />
                    <path d="M8.59 13.51l6.83 3.98M15.41 6.51l-6.82 3.98" />
                  </svg>
                  <span>SHARE PIECE</span>
                </button>
              </div>

              {/* Dynamic Accordion Tabs */}
              <div className="panel-tabs-accordion">
                <div className="tabs-header-nav">
                  <button
                    onClick={() => setActiveTab("details")}
                    className={`tab-header-btn ${activeTab === "details" ? "active" : ""}`}
                  >
                    Details & Specs
                  </button>
                  <button
                    onClick={() => setActiveTab("washcare")}
                    className={`tab-header-btn ${activeTab === "washcare" ? "active" : ""}`}
                  >
                    Washcare & Care
                  </button>
                  <button
                    onClick={() => setActiveTab("shipping")}
                    className={`tab-header-btn ${activeTab === "shipping" ? "active" : ""}`}
                  >
                    Shipping & Returns
                  </button>
                </div>

                <div className="tab-content-display">
                  {activeTab === "details" && (
                    <div className="tab-details-content">
                      <table className="details-specs-table">
                        <tbody>
                          <tr>
                            <td>Dimensions</td>
                            <td>{product.size}</td>
                          </tr>
                          <tr>
                            <td>Fabrication</td>
                            <td>{product.material}</td>
                          </tr>
                          <tr>
                            <td>Artwork Process</td>
                            <td>{product.printType}</td>
                          </tr>
                          <tr>
                            <td>Color Palette</td>
                            <td>{product.colors}</td>
                          </tr>
                          <tr>
                            <td>Construction Features</td>
                            <td>{product.features}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  )}

                  {activeTab === "washcare" && (
                    <div className="tab-washcare-content">
                      <ul className="care-instructions-list">
                        <li>Machine wash inside out in cold water using delicate cycles.</li>
                        <li>Wash with similar dark or neutral colors to maintain dye strength.</li>
                        <li>Do not bleach or dry clean. Hang dry away from direct scorching sunlight.</li>
                        <li>Iron inside out on medium heat; avoid applying direct heat onto the prints.</li>
                      </ul>
                    </div>
                  )}

                  {activeTab === "shipping" && (
                    <div className="tab-shipping-content">
                      <p>
                        <strong>Preorder Fulfillment</strong>: As each piece is custom-crafted, manufacturing starts immediately after the drop closes. Dispatches are expected within 3–4 weeks from registration. Standard delivery takes 5-7 business days once shipped.
                      </p>
                      <p>
                        <strong>Limited Run Returns</strong>: Due to the micro-batch, bespoke nature of our hand-pressed canvas releases, all sales are final. Replacements are issued strictly for transit-damaged or defective items.
                      </p>
                    </div>
                  )}
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Related Products Carousel */}
        <section className="related-products-carousel-section">
          <h2 className="related-carousel-title">You May Also Like</h2>
          <div className="related-products-grid">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>

      </div>

      {/* Lightbox / Zoom Stage Modal */}
      {showZoomModal && (
        <div className="lightbox-zoom-overlay" onClick={() => setShowZoomModal(false)}>
          <button className="lightbox-close-btn" onClick={() => setShowZoomModal(false)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
          <div className="lightbox-image-box" onClick={(e) => e.stopPropagation()}>
            <img src={activeImage || product.image} alt={product.name} className="lightbox-img" />
          </div>
        </div>
      )}

    </div>
  );
}
