const fs = require('fs');
let content = fs.readFileSync('src/app/page.tsx', 'utf8');

console.log(content.includes('</section>\n\n      {/* 3. The SHORS Manifesto Section'));

let match = content.match(/<\/section>\s*\{\/\* 3\. The SHORS Manifesto Section/);
console.log(match ? 'Found match regex' : 'No match regex');
