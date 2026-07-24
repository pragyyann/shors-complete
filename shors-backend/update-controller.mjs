import fs from 'fs';
let content = fs.readFileSync('src/controllers/homepageShowcaseModule.controller.ts', 'utf8');

content = content.replace('blockOneHeading: req.body.blockOneHeading,', 'blockOneCollectionName: req.body.blockOneCollectionName,');
content = content.replace('blockTwoHeading: req.body.blockTwoHeading,', 'blockTwoCollectionName: req.body.blockTwoCollectionName,');
content = content.replace(
  "isActive: req.body.isActive !== undefined ? req.body.isActive === 'true' || req.body.isActive === true : undefined,",
  "blockOneIsActive: req.body.blockOneIsActive !== undefined ? req.body.blockOneIsActive === 'true' || req.body.blockOneIsActive === true : undefined,\n    blockTwoIsActive: req.body.blockTwoIsActive !== undefined ? req.body.blockTwoIsActive === 'true' || req.body.blockTwoIsActive === true : undefined,"
);

fs.writeFileSync('src/controllers/homepageShowcaseModule.controller.ts', content, 'utf8');
console.log('Controller updated');
