import fs from 'fs';
let content = fs.readFileSync('src/app/page.tsx', 'utf8');

// Replace blockOneHeading with blockOneCollectionName
content = content.replace('showcaseModule?.blockOneHeading', 'showcaseModule?.blockOneCollectionName');
content = content.replace('showcaseModule?.blockTwoHeading', 'showcaseModule?.blockTwoCollectionName');

// The original hardcoded grid layout in frontend:
// {(!isMounted || !isMobile) ? (
//   <>
//     {/* ROW 1: Root Tote Collection (Left Showcase) - DESKTOP */}
//     <div className="editorial-collection-grid editorial-collection-grid-left">

// I need to add conditions based on blockOneIsActive and blockTwoIsActive.
// But wait, the entire section has `{showcaseModule?.isActive !== false && (`
// Let's replace `showcaseModule?.isActive !== false && (` with `(showcaseModule?.blockOneIsActive !== false || showcaseModule?.blockTwoIsActive !== false) && (`

content = content.replace(
  '{showcaseModule?.isActive !== false && (',
  '{(showcaseModule?.blockOneIsActive !== false || showcaseModule?.blockTwoIsActive !== false) && ('
);

// Now wrap the left grid:
content = content.replace(
  '<div className="editorial-collection-grid editorial-collection-grid-left">',
  '{showcaseModule?.blockOneIsActive !== false && (<div className="editorial-collection-grid editorial-collection-grid-left">'
);
// The left grid ends with:
//       {/* Placeholders for future cms injection */}
//       <div className="premium-card-placeholder" />
//       <div className="premium-card-placeholder" />
//     </div>
// Then follows:
//     {/* ROW 2: Premium Tote Collection (Right Showcase) - DESKTOP */}
content = content.replace(
  '      <div className="premium-card-placeholder" />\n                  </div>\n\n                  {/* ROW 2: Premium Tote Collection (Right Showcase) - DESKTOP */}',
  '      <div className="premium-card-placeholder" />\n                  </div>)}\n\n                  {/* ROW 2: Premium Tote Collection (Right Showcase) - DESKTOP */}'
);

// Actually, regex replacement might be brittle here. Let's just find exactly where the left grid ends.
