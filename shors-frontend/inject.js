const fs = require('fs');
let content = fs.readFileSync('src/app/page.tsx', 'utf8');

// Uncomment fetchShowcases();
content = content.replace(/\/\/\s*fetchShowcases\(\);/, 'fetchShowcases();');

const helperCode = `
  const getProductInfo = (productData, defaultName, defaultImg1, defaultImg2, defaultDesc) => {
    if (!productData) return { name: defaultName, img1: defaultImg1, img2: defaultImg2, desc: defaultDesc, isAvailable: true };
    const img1 = productData.images?.find((img) => img.imageType === "MAIN")?.imageUrl || defaultImg1;
    const img2 = productData.images?.find((img) => img.imageType === "HOVER")?.imageUrl || productData.images?.find((img) => img.imageType === "MAIN")?.imageUrl || defaultImg2;
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
`;

content = content.replace(
  /  return \(\s*<div\s*className="manuscript-paper"/,
  helperCode + '\n  return (\n    <div\n      className="manuscript-paper"'
);

content = content.replace(
  '<section id="collection" className="editorial-collection-page manuscript-paper" style={{ padding: "8vw 0", borderTop: "none" }}>',
  '{showcaseModule?.isActive !== false && (\n      <section id="collection" className="editorial-collection-page manuscript-paper" style={{ padding: "8vw 0", borderTop: "none" }}>'
);
content = content.replace(
  /<\/section>\s*\{\/\* 3\. The SHORS Manifesto Section/,
  '</section>\n      )}\n\n      {/* 3. The SHORS Manifesto Section'
);

content = content.replace(
  '<img src="/indian-tote-lifestyle.png" alt="Root Tote Collection Campaign" />',
  '<img src={showcaseModule?.blockOneBannerImage || "/indian-tote-lifestyle.png"} alt="Root Tote Collection Campaign" />'
);
content = content.replace(
  '<h3 className="premium-showcase-title">Root Tote</h3>',
  '<h3 className="premium-showcase-title">{showcaseModule?.blockOneHeading || "Root Tote"}</h3>'
);
content = content.replace(
  '<span className="premium-showcase-kicker">Everyday Rituals</span>',
  '<span className="premium-showcase-kicker">{showcaseModule?.blockOneLabel || "Everyday Rituals"}</span>'
);
content = content.replace(
  /<p className="premium-showcase-desc">\s*A quiet beginning\. Built from locally sourced heavyweight canvas, designed to carry daily essentials with effortless elegance\.\s*<\/p>/,
  '<p className="premium-showcase-desc">\n                          {showcaseModule?.blockOneDescription || "A quiet beginning. Built from locally sourced heavyweight canvas, designed to carry daily essentials with effortless elegance."}\n                        </p>'
);

content = content.replace(
  '<h3 className="premium-card-title">Root Tote (Off-White)</h3>',
  '<h3 className="premium-card-title">{b1p1.name}</h3>'
);
content = content.replace(
  '<p className="premium-card-desc">Durable, multi-utility canvas carryall designed for clean aesthetics and daily resilience.</p>',
  '<p className="premium-card-desc">{b1p1.desc}</p>'
);
content = content.replace(
  '<img src="/indian-tote.png" alt="Root Tote Bag (Off-White)" className="premium-card-img img-primary has-secondary" />',
  '<img src={b1p1.img1} alt="Root Tote Bag (Off-White)" className="premium-card-img img-primary has-secondary" />'
);
content = content.replace(
  '<img src="/indian-tote-alt.png" alt="Root Tote Bag (Off-White) alternate view" className="premium-card-img img-secondary" />',
  '<img src={b1p1.img2} alt="Root Tote Bag (Off-White) alternate view" className="premium-card-img img-secondary" />'
);

content = content.replace(
  '<h3 className="premium-card-title">Root Tote (Raw Natural)</h3>',
  '<h3 className="premium-card-title">{b1p2.name}</h3>'
);
content = content.replace(
  '<p className="premium-card-desc">Undyed raw canvas exhibiting natural seed-flecks, organic tones, and raw structural integrity.</p>',
  '<p className="premium-card-desc">{b1p2.desc}</p>'
);
content = content.replace(
  '<img src="/indian-tote-alt.png" alt="Root Tote Bag (Raw Natural)" className="premium-card-img img-primary has-secondary" />',
  '<img src={b1p2.img1} alt="Root Tote Bag (Raw Natural)" className="premium-card-img img-primary has-secondary" />'
);
content = content.replace(
  '<img src="/indian-tote.png" alt="Root Tote Bag (Raw Natural) alternate view" className="premium-card-img img-secondary" />',
  '<img src={b1p2.img2} alt="Root Tote Bag (Raw Natural) alternate view" className="premium-card-img img-secondary" />'
);


// Block 2 Desktop
content = content.replace(
  '<img src="/premium-tote-lifestyle.png" alt="Premium Tote Collection Campaign" />',
  '<img src={showcaseModule?.blockTwoBannerImage || "/premium-tote-lifestyle.png"} alt="Premium Tote Collection Campaign" />'
);
content = content.replace(
  '<h3 className="premium-showcase-title">Premium Tote</h3>',
  '<h3 className="premium-showcase-title">{showcaseModule?.blockTwoHeading || "Premium Tote"}</h3>'
);
content = content.replace(
  '<span className="premium-showcase-kicker">International Weave</span>',
  '<span className="premium-showcase-kicker">{showcaseModule?.blockTwoLabel || "International Weave"}</span>'
);
content = content.replace(
  /<p className="premium-showcase-desc">\s*Engineered for the international landscape\. Crafted for urban India and the UK diaspora, showing cultural identity without compromise\.\s*<\/p>/,
  '<p className="premium-showcase-desc">\n                          {showcaseModule?.blockTwoDescription || "Engineered for the international landscape. Crafted for urban India and the UK diaspora, showing cultural identity without compromise."}\n                        </p>'
);

content = content.replace(
  '<h3 className="premium-card-title">Premium Tote (Raw Canvas)</h3>',
  '<h3 className="premium-card-title">{b2p1.name}</h3>'
);
content = content.replace(
  '<p className="premium-card-desc">Reinforced double-layered stitch lines, inner sleeves, and a heavy-duty luxury canvas body.</p>',
  '<p className="premium-card-desc">{b2p1.desc}</p>'
);
content = content.replace(
  '<img src="/premium-tote.png" alt="Premium Tote Bag (Raw Canvas)" className="premium-card-img img-primary has-secondary" />',
  '<img src={b2p1.img1} alt="Premium Tote Bag (Raw Canvas)" className="premium-card-img img-primary has-secondary" />'
);
content = content.replace(
  '<img src="/premium-tote-hover.png" alt="Premium Tote Bag (Raw Canvas) alternate view" className="premium-card-img img-secondary" />',
  '<img src={b2p1.img2} alt="Premium Tote Bag (Raw Canvas) alternate view" className="premium-card-img img-secondary" />'
);

content = content.replace(
  '<h3 className="premium-card-title">Premium Tote (Gold Accent)</h3>',
  '<h3 className="premium-card-title">{b2p2.name}</h3>'
);
content = content.replace(
  '<p className="premium-card-desc">Hand-pulled screen-printed branding in rich gold, designed for an elevated statement of heritage.</p>',
  '<p className="premium-card-desc">{b2p2.desc}</p>'
);
content = content.replace(
  '<img src="/premium-tote-hover.png" alt="Premium Tote Bag (Gold Accent)" className="premium-card-img img-primary has-secondary" />',
  '<img src={b2p2.img1} alt="Premium Tote Bag (Gold Accent)" className="premium-card-img img-primary has-secondary" />'
);
content = content.replace(
  '<img src="/premium-tote.png" alt="Premium Tote Bag (Gold Accent) alternate view" className="premium-card-img img-secondary" />',
  '<img src={b2p2.img2} alt="Premium Tote Bag (Gold Accent) alternate view" className="premium-card-img img-secondary" />'
);


// Block 1 Mobile
content = content.replace(
  '<img src="/indian-tote-lifestyle.png" alt="Root Tote Collection Campaign" className="mobile-full-width-image" />',
  '<img src={showcaseModule?.blockOneBannerImage || "/indian-tote-lifestyle.png"} alt="Root Tote Collection Campaign" className="mobile-full-width-image" />'
);
content = content.replace(
  /<span style={{ fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#EAE8E3', marginBottom: '4px' }}>Everyday Rituals<\/span>/,
  '<span style={{ fontSize: \'10px\', letterSpacing: \'0.15em\', textTransform: \'uppercase\', color: \'#EAE8E3\', marginBottom: \'4px\' }}>{showcaseModule?.blockOneLabel || "Everyday Rituals"}</span>'
);
content = content.replace(
  '<h3 className="mobile-collection-title">Root Tote</h3>',
  '<h3 className="mobile-collection-title">{showcaseModule?.blockOneHeading || "Root Tote"}</h3>'
);
content = content.replace(
  /<p className="mobile-collection-desc">\s*A quiet beginning\. Built from locally sourced heavyweight canvas, designed to carry daily essentials with effortless elegance\.\s*<\/p>/,
  '<p className="mobile-collection-desc">\n                        {showcaseModule?.blockOneDescription || "A quiet beginning. Built from locally sourced heavyweight canvas, designed to carry daily essentials with effortless elegance."}\n                      </p>'
);

content = content.replace(
  '<img src="/indian-tote.png" alt="Root Tote Bag (Off-White)" />',
  '<img src={b1p1.img1} alt="Root Tote Bag (Off-White)" />'
);
content = content.replace(
  '<h3 className="mobile-product-title">Off-White</h3>',
  '<h3 className="mobile-product-title">{b1p1.name}</h3>'
);
content = content.replace(
  '<img src="/indian-tote-alt.png" alt="Root Tote Bag (Raw Natural)" />',
  '<img src={b1p2.img1} alt="Root Tote Bag (Raw Natural)" />'
);
content = content.replace(
  '<h3 className="mobile-product-title">Raw Natural</h3>',
  '<h3 className="mobile-product-title">{b1p2.name}</h3>'
);


// Block 2 Mobile
content = content.replace(
  '<img src="/premium-tote-lifestyle.png" alt="Premium Tote Collection Campaign" className="mobile-full-width-image" />',
  '<img src={showcaseModule?.blockTwoBannerImage || "/premium-tote-lifestyle.png"} alt="Premium Tote Collection Campaign" className="mobile-full-width-image" />'
);
content = content.replace(
  /<span style={{ fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#EAE8E3', marginBottom: '4px' }}>International Weave<\/span>/,
  '<span style={{ fontSize: \'10px\', letterSpacing: \'0.15em\', textTransform: \'uppercase\', color: \'#EAE8E3\', marginBottom: \'4px\' }}>{showcaseModule?.blockTwoLabel || "International Weave"}</span>'
);
content = content.replace(
  '<h3 className="mobile-collection-title">Premium Tote</h3>',
  '<h3 className="mobile-collection-title">{showcaseModule?.blockTwoHeading || "Premium Tote"}</h3>'
);
content = content.replace(
  /<p className="mobile-collection-desc">\s*Engineered for the international landscape\. Crafted for urban India and the UK diaspora, showing cultural identity without compromise\.\s*<\/p>/,
  '<p className="mobile-collection-desc">\n                        {showcaseModule?.blockTwoDescription || "Engineered for the international landscape. Crafted for urban India and the UK diaspora, showing cultural identity without compromise."}\n                      </p>'
);

content = content.replace(
  '<img src="/premium-tote.png" alt="Premium Tote Bag (Raw Canvas)" />',
  '<img src={b2p1.img1} alt="Premium Tote Bag (Raw Canvas)" />'
);
content = content.replace(
  '<h3 className="mobile-product-title">Raw Canvas</h3>',
  '<h3 className="mobile-product-title">{b2p1.name}</h3>'
);
content = content.replace(
  '<img src="/premium-tote-hover.png" alt="Premium Tote Bag (Gold Accent)" />',
  '<img src={b2p2.img1} alt="Premium Tote Bag (Gold Accent)" />'
);
content = content.replace(
  '<h3 className="mobile-product-title">Gold Accent</h3>',
  '<h3 className="mobile-product-title">{b2p2.name}</h3>'
);

fs.writeFileSync('src/app/page.tsx', content, 'utf8');
console.log('Injected successfully');
