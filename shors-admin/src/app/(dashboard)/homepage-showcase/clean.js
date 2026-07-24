const fs = require('fs');
let content = fs.readFileSync('page.tsx', 'utf8');
const fieldsToRemove = ['Subtitle', 'CtaText', 'CtaLink', 'HoverTitle', 'HoverDescription'];
for (const block of ['blockOne', 'blockTwo']) {
  for (const field of fieldsToRemove) {
    const key = block + field;
    content = content.replace(new RegExp(`\\s*${key}:\\s*z\\.string\\(\\)\\.optional\\(\\)\\.nullable\\(\\),`, 'g'), '');
    content = content.replace(new RegExp(`\\s*${key}:\\s*\"\",`, 'g'), '');
    content = content.replace(new RegExp(`\\s*${key}:\\s*showcaseData\\.data\\.${key}\\s*\\|\\|\\s*\"\",`, 'g'), '');
    content = content.replace(new RegExp(`\\s*if\\s*\\(data\\.${key}\\)\\s*formData\\.append\\(\"${key}\",\\s*data\\.${key}\\);`, 'g'), '');
    const jsxRegex = new RegExp(`\\s*<div className=\"space-y-2\">[\\s\\S]*?\\{\\.\\.\\.register\\(\"${key}\"\\)\\}[\\s\\S]*?<\\/div>`, 'g');
    content = content.replace(jsxRegex, '');
  }
}
fs.writeFileSync('page.tsx', content, 'utf8');
console.log('Done');
