const fs = require('fs');
let content = fs.readFileSync('src/app/page.tsx', 'utf8');
content = content.replace(/const featuredProducts = productsData\.filter\(\(product\) => product\.isFeatured\);\r?\n/, '');
fs.writeFileSync('src/app/page.tsx', content, 'utf8');
console.log('Removed productsData usage');
