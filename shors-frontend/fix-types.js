const fs = require('fs');
let content = fs.readFileSync('src/app/page.tsx', 'utf8');
content = content.replace(
  'const getProductInfo = (productData, defaultName, defaultImg1, defaultImg2, defaultDesc) => {',
  'const getProductInfo = (productData: any, defaultName: string, defaultImg1: string, defaultImg2: string, defaultDesc: string) => {'
);
content = content.replace(
  'const img1 = productData.images?.find((img) => img.imageType === "MAIN")?.imageUrl || defaultImg1;',
  'const img1 = productData.images?.find((img: any) => img.imageType === "MAIN")?.imageUrl || defaultImg1;'
);
content = content.replace(
  'const img2 = productData.images?.find((img) => img.imageType === "HOVER")?.imageUrl || productData.images?.find((img) => img.imageType === "MAIN")?.imageUrl || defaultImg2;',
  'const img2 = productData.images?.find((img: any) => img.imageType === "HOVER")?.imageUrl || productData.images?.find((img: any) => img.imageType === "MAIN")?.imageUrl || defaultImg2;'
);
fs.writeFileSync('src/app/page.tsx', content, 'utf8');
console.log('Added type annotations');
