"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";


const megaMenuCategories = [
  {
    title: "All",
    subtitle: "Explore Archive",
    image: "/dyed-tote-lifestyle.png",
    href: "/catalogue?tag=All"
  },
  {
    title: "Root Tote",
    subtitle: "Graphic Design",
    image: "/indian-tote.png",
    href: "/catalogue?tag=Root Tote"
  },
  {
    title: "Loud Tote",
    subtitle: "Hand-Dyed",
    image: "/dyed-tote.png",
    href: "/catalogue?tag=Loud Tote"
  },
  {
    title: "Ancient Tote",
    subtitle: "Limited Print",
    image: "/indian-tote-alt.png",
    href: "/catalogue?tag=Ancient Tote"
  },
  {
    title: "Premium Tote",
    subtitle: "Oversized Canvas",
    image: "/premium-tote.png",
    href: "/catalogue?tag=Premium Tote"
  }
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isHomePage, setIsHomePage] = useState(false);
  const headerRef = useRef<HTMLElement>(null);


  const [showMegaMenu, setShowMegaMenu] = useState(false);
  const megaMenuTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnterCatalogue = () => {
    if (megaMenuTimeoutRef.current) clearTimeout(megaMenuTimeoutRef.current);
    setShowMegaMenu(true);
  };

  const handleMouseLeaveCatalogue = () => {
    megaMenuTimeoutRef.current = setTimeout(() => {
      setShowMegaMenu(false);
    }, 100);
  };

  const handleMouseEnterMegaMenu = () => {
    if (megaMenuTimeoutRef.current) clearTimeout(megaMenuTimeoutRef.current);
    setShowMegaMenu(true);
  };

  const handleMouseLeaveMegaMenu = () => {
    setShowMegaMenu(false);
  };


  useEffect(() => {
    setIsHomePage(pathname === "/");

    const handleScroll = () => {
      const scrollPos = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0;
      setScrolled(scrollPos > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Check initial state
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("scroll", handleScroll);
    };
  }, [pathname]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const links = [
    { name: "Home", href: "/" },
    { name: "Catalogue", href: "/catalogue" },
    { name: "About", href: "/about" },
  ];

  // With a light mobile menu, the header on mobile should have a black logo
  const isDarkBg = (!mobileMenuOpen) && (isHomePage && !scrolled && !showMegaMenu);
  const graphicSrc = isDarkBg
    ? "/shors.logo.pngs/shors.logo.white.png"
    : "/shors.logo.pngs/shors.logo.black.png";
  const wordmarkSrc = isDarkBg
    ? "/shors.logo.pngs/shors.white.png"
    : "/shors.logo.pngs/shors.black.png";

  const featuredProducts = [
    { id: "indian-tote-off-white", image: "/indian-tote.png" },
    { id: "indian-tote-raw-natural", image: "/indian-tote-alt.png" },
    { id: "premium-tote-raw-canvas", image: "/premium-tote.png" },
    { id: "premium-tote-gold-accent", image: "/premium-tote-hover.png" },
    { id: "dyed-tote-rust", image: "/dyed-tote.png" },
  ];

  const headerClasses = [
    "blu-header",
    scrolled ? "scroll-on" : "",
    !isHomePage ? "not-home-page" : "",
    showMegaMenu ? "mega-menu-open" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <header className="blu-header-wrapper">
      <nav ref={headerRef} className={headerClasses}>
        {/* LEFT: Navigation Links */}
        <div className="blu-header-left">
          <ul>
            {links.map((link) => {
              const isCatalogue = link.name === "Catalogue";
              return (
                <li 
                  key={link.href}
                  onMouseEnter={isCatalogue ? handleMouseEnterCatalogue : undefined}
                  onMouseLeave={isCatalogue ? handleMouseLeaveCatalogue : undefined}
                >
                  <Link
                    href={link.href}
                    className={pathname === link.href ? "active" : ""}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                  {pathname === link.href && (
                    <span className="blu-active-dot" />
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        {/* CENTER: Brand Logo */}
        <div className="blu-header-center">
          <Link href="/" className="navbar-logo" onClick={() => setMobileMenuOpen(false)}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={graphicSrc}
              alt="SHORS Symbol"
              className="navbar-logo-symbol"
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={wordmarkSrc}
              alt="SHORS"
              className="navbar-logo-wordmark"
            />
          </Link>
        </div>

        {/* RIGHT: Actions */}
        <div className="blu-header-right">
          <ul>

            {/* Preorder CTA */}
            <li className="header_preorder" onClick={() => window.dispatchEvent(new Event("open-community-modal"))}>
              <span className="nav-preorder-link">
                PREORDER
              </span>
            </li>
          </ul>
        </div>

        {/* Mobile hamburger */}
        <button
          className="blu-mobile-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <div className={`hamburger-lines ${mobileMenuOpen ? "open" : ""}`}>
            <span />
            <span />
            <span />
          </div>
        </button>
      </nav>

      {/* Mega Menu Dropdown */}
      <div 
        className={`blu-mega-menu ${showMegaMenu ? "active" : ""}`}
        onMouseEnter={handleMouseEnterMegaMenu}
        onMouseLeave={handleMouseLeaveMegaMenu}
      >
        <div className="mega-menu-inner">
          <div className="mega-menu-grid">
            {megaMenuCategories.map((cat) => (
              <Link 
                key={cat.title} 
                href={cat.href}
                className="mega-menu-card"
                onClick={() => setShowMegaMenu(false)}
              >
                <div className="mega-menu-card-image-box">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={cat.image} alt={cat.title} className="mega-menu-card-image" />
                  <div className="mega-menu-card-overlay" />
                </div>
                <div className="mega-menu-card-title">{cat.title}</div>
                <div className="mega-menu-card-subtitle">{cat.subtitle}</div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer (Rich Editorial Layout) */}
      <div className={`blu-mobile-menu ${mobileMenuOpen ? "active" : ""}`}>
        <div className="blu-mobile-menu-scroll">
          
          {/* Top Primary Links */}
          <div className="mobile-menu-section mobile-menu-top-links">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`mobile-primary-link ${pathname === link.href ? "active" : ""}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/contact"
              className={`mobile-primary-link ${pathname === "/contact" ? "active" : ""}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
          </div>

          <div className="mobile-menu-divider" />

          {/* Horizontal Products Section */}
          <div className="mobile-menu-section">
            <span className="mobile-menu-kicker">Products you may like</span>
            <div className="mobile-menu-product-scroller">
              {featuredProducts.map((prod) => (
                <Link 
                  key={prod.id}
                  href={`/catalogue/${prod.id}`}
                  className="mobile-menu-product-card"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={prod.image} alt={prod.id} />
                </Link>
              ))}
            </div>
          </div>

          {/* Vertical Collections Section */}
          <div className="mobile-menu-section">
            <span className="mobile-menu-kicker">Collections</span>
            <div className="mobile-menu-collection-list">
              {megaMenuCategories.filter(cat => cat.title !== "All").map((cat) => (
                <Link
                  key={cat.title}
                  href={cat.href}
                  className="mobile-menu-collection-row"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={cat.image} alt={cat.title} />
                  <span>{cat.title}</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="mobile-menu-divider" />

          {/* Bottom Actions */}
          <div className="mobile-menu-bottom-actions">

            <button className="mobile-action-btn" onClick={() => { setMobileMenuOpen(false); window.dispatchEvent(new Event("open-community-modal")); }}>
              PREORDER ↗
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}
