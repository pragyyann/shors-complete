const fs = require('fs');
let content = fs.readFileSync('prisma/schema.prisma', 'utf8');

// Block 1
content = content.replace('blockOneHeading               String?', 'blockOneCollectionName        String?');
content = content.replace('blockOneProductTwoId          Int?', 'blockOneProductTwoId          Int?\n  blockOneIsActive              Boolean  @default(true)');

// Block 2
content = content.replace('blockTwoHeading               String?', 'blockTwoCollectionName        String?');
content = content.replace('blockTwoProductTwoId          Int?', 'blockTwoProductTwoId          Int?\n  blockTwoIsActive              Boolean  @default(true)');

// Remove global isActive
content = content.replace('  isActive              Boolean  @default(true)\n', '');

fs.writeFileSync('prisma/schema.prisma', content, 'utf8');
console.log('Schema updated');
