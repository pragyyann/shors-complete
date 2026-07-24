import fs from 'fs';
let content = fs.readFileSync('src/validators/homepageShowcaseModule.validator.ts', 'utf8');

content = content.replace('blockOneHeading', 'blockOneCollectionName');
content = content.replace('blockTwoHeading', 'blockTwoCollectionName');

content = content.replace(
`    isActive: z
      .union([z.boolean(), z.string()])
      .optional()
      .transform((val) => {
        if (typeof val === "string") return val === "true";
        return val;
      }),`,
`    blockOneIsActive: z
      .union([z.boolean(), z.string()])
      .optional()
      .transform((val) => {
        if (typeof val === "string") return val === "true";
        return val;
      }),
    blockTwoIsActive: z
      .union([z.boolean(), z.string()])
      .optional()
      .transform((val) => {
        if (typeof val === "string") return val === "true";
        return val;
      }),`
);

fs.writeFileSync('src/validators/homepageShowcaseModule.validator.ts', content, 'utf8');
console.log('Validator updated');
