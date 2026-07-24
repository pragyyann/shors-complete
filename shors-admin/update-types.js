const fs = require('fs');
let content = fs.readFileSync('src/types/homepageShowcaseModule.ts', 'utf8');

content = content.replace('blockOneHeading: string | null;', 'blockOneCollectionName: string | null;\n  blockOneIsActive: boolean;');
content = content.replace('blockTwoHeading: string | null;', 'blockTwoCollectionName: string | null;\n  blockTwoIsActive: boolean;');
content = content.replace('  isActive: boolean;\n', '');

fs.writeFileSync('src/types/homepageShowcaseModule.ts', content, 'utf8');
console.log('Types updated');
