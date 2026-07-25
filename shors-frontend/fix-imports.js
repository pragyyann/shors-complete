const fs = require('fs');
let content = fs.readFileSync('src/app/page.tsx', 'utf8');
content = content.replace(/import productsData from "@\/data\/products\.json";\r?\n/, '');
content = content.replace(/import FloatingAudioPlayer from "@\/components\/FloatingAudioPlayer";\r?\n/, '');
fs.writeFileSync('src/app/page.tsx', content, 'utf8');
console.log('Removed invalid imports');
