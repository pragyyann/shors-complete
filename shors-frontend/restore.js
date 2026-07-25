const fs = require('fs');
let content = fs.readFileSync('src/app/page.tsx', 'utf8');

// Replace state block
content = content.replace(
  '  const [activeTestimonial, setActiveTestimonial] = useState(0);',
`  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [heroData, setHeroData] = useState<any>(null);
  const [apiProducts, setApiProducts] = useState<any[]>([]);
  const [showcaseModule, setShowcaseModule] = useState<any>(null);

  useEffect(() => {
    const fetchHero = async () => {
      try {
        const res = await fetch(
          \`\${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1"}/hero\`,
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
          \`\${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1"}/products\`,
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
          \`\${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1"}/homepage-showcase-module\`,
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
`
);

// Replace hero section
content = content.replace(
  /<section className="hero-cinematic-full">[\s\S]*?<\/section>/,
`<section className="hero-cinematic-full">
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
      </section>`
);

// Add ProductCard back because git checkout removed the import if I hadn't already added it?
// Wait, git checkout probably brought it back. Let's make sure `apiProducts.map` is used if it was.
// The user said: "Do NOT remove or change the global apiProducts fetch because it is still required by the catalogue page."
content = content.replace(
  /\{productsData\.map\(\(product\) => \(/g,
  '{apiProducts.map((product: any) => ('
);

fs.writeFileSync('src/app/page.tsx', content, 'utf8');
console.log('Restored state');
