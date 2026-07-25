const fs = require('fs');
let content = fs.readFileSync('src/app/page.tsx', 'utf8');
content = content.replace(/<FloatingAudioPlayer \/>\r?\n/, '');
fs.writeFileSync('src/app/page.tsx', content, 'utf8');
console.log('Removed FloatingAudioPlayer');
